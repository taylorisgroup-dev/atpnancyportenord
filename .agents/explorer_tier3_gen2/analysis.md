# Tier 3 E2E Tests - Refactoring Analysis

## Observation
The auditor flagged `tests/e2e/tier3/*.spec.ts` with an INTEGRITY VIOLATION. The tests heavily rely on Playwright's `page.route` to intercept API calls and inject hardcoded JSON responses. This completely bypasses the real backend application logic, database integrations, and network layers, creating a facade that passes even if the backend is non-existent or broken.

## Analysis
End-to-End (E2E) tests are designed to validate the system as a whole, from the user interface down to the database and back. By mocking the API layer:
1. The tests fail to provide confidence in the application's actual functionality.
2. Cross-domain tests (like an admin mutating data and a public user viewing it) become meaningless because they merely verify that Playwright can intercept two different endpoints and return predefined mock data.
3. Authentication state is artificially forced rather than testing the real authentication flow (e.g., cookie/session creation, redirection).

To resolve this, all `page.route` interceptions must be entirely removed. The tests must interact with the application strictly through the browser interface as a user would, trusting the application's backend to process data, set cookies, and return real HTML/JSON. Since the backend is currently unwritten, these tests will legitimately fail, which accurately reflects the current implementation status.

## Proposed Fix Strategy

1. **Eliminate All Mocks**: Remove every instance of `page.route()` and `route.fulfill()` from `public-interactions.spec.ts`, `admin-interactions.spec.ts`, and `cross-domain.spec.ts`.
2. **Genuine UI Authentication**: Replace the mock `/api/auth/session` setup in `beforeEach` and inline contexts with a genuine UI login flow. The test will navigate to an assumed login page (e.g., `/admin/login`), fill in credentials, and submit the form to establish a real session.
3. **Real Form Submissions and File Uploads**: Instead of mocking `/api/admin/jobs` or `/api/cv-extract`, the tests will fill out the forms and upload files, clicking the submit buttons and waiting for the actual application to process the request and redirect the user or show a success toast.
4. **End-to-End Cross-Domain Verification**: For the admin mutation test, the admin context will submit a real form to save settings. Then, a separate public context will navigate to the public page and assert the updated text from the DOM. This relies on the real backend saving to the database and reading from it.
5. **Robust Waiting and Assertions**: Since API calls take real time, tests will rely on `page.waitForURL` and Playwright's auto-retrying assertions (`expect(locator).toBeVisible()`) rather than waiting for mocked network responses.

## Corrected Code Structure

### 1. `tests/e2e/tier3/public-interactions.spec.ts`
- **Test B**: Remove `/api/cv-extract` mock. The test will upload a CV buffer/fixture and click "Submit Application". It will then assert the parsed data in the UI, assuming the real backend performs the extraction.
- **Test C**: Remove `/api/cv-submit` mock. Fill the form, click "Confirm & Send", and wait for the real backend to redirect to the success page (`/application/success-*`) before verifying SEO metadata.

### 2. `tests/e2e/tier3/admin-interactions.spec.ts`
- **Authentication**: 
  ```typescript
  test.beforeEach(async ({ page }) => {
    // Genuine UI login flow
    await page.goto('/admin/login');
    await page.fill('input[name="email"]', 'admin@atpnancy.local');
    await page.fill('input[name="password"]', 'adminpass');
    await page.locator('button[type="submit"]').click();
    await page.waitForURL('**/admin**'); // Wait for login to complete
  });
  ```
- **Test D**: Remove `/api/admin/jobs` mock. Fill the job creation form, click "Save & Preview", and wait for the real backend to create the job and redirect to the preview URL.
- **Test E**: Remove `/api/cv-extract` and `/api/admin/candidates` mocks. Upload the CV, wait for the form fields to be populated by the real backend, modify them, and click save.

### 3. `tests/e2e/tier3/cross-domain.spec.ts`
- **Test F**: Implement the UI login flow for the admin context instead of mocking the session, then navigate to `/about-us` to verify the admin overlay.
- **Test G (The Cross-Domain Flow)**:
  - **Admin Context**: Login via UI, navigate to `/admin/settings/company`, fill the textarea with a unique string, and save.
  - **Public Context**: Remove the `/api/public/settings` mock. Navigate to `/about-us` and assert that the `.company-description` contains the unique string that the admin just saved. This proves the data made the full round-trip to the database and back.
