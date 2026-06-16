# Tier 4 E2E Test Strategy Proposal

## 1. Observation
- `TEST_INFRA.md` specifies 6 features (1: Public Pages Rendering, 2: Dynamic Data Loading, 3: Admin Auth, 4: Admin Data Mutation, 5: CV Extraction API, 6: SEO Metadata).
- `TEST_INFRA.md` lists 3 existing scenarios:
  1. Visitor reads home and applies to job (Features 1, 2, 5).
  2. Admin logs in and updates organigramme (Features 3, 4).
  3. SEO bot crawls the public pages (Features 1, 2, 6).
- `SCOPE.md` requires Playwright tests targeting the local Next.js instance via `http://localhost:3000` to be written into the `tests/e2e/tier4/` directory.
- The tests should rely on UI elements and mock backend calls if necessary (opaque-box).

## 2. Logic Chain
1. We must satisfy the requirement of at least 5 realistic application scenarios.
2. The first 3 scenarios are pre-defined and cover most features. We need 2 additional scenarios that combine available features.
3. **Scenario 4**: A comprehensive end-to-end flow involving an admin creating content and a visitor seeing it. This combines Features 1, 2, 3, 4, 6 (Public Pages Rendering, Dynamic Data Loading, Admin Auth, Admin Data Mutation, SEO Metadata). Admin logs in, creates a job, and the visitor checks the public job board and its SEO tags.
4. **Scenario 5**: A flow focusing on the application process and its review. This combines Features 1, 3, 4, 5 (Public Pages Rendering, Admin Auth, Admin Data Mutation, CV Extraction API). A candidate applies via the public site, triggering the CV extraction API; then an admin logs in, views the submitted CV, and updates the application status.
5. To keep the tests maintainable and isolated, each scenario should have its own `.spec.ts` file in the `tests/e2e/tier4/` directory.

## 3. Caveats
- Playwright tests are opaque-box. Mocking the backend API (like the CV Extraction API) might be required if the backend is not running during the tests. The implementation strategy assumes `page.route` can be used to mock these responses if needed.
- Data cleanup (or test isolation) is necessary since Scenario 4 and 5 involve data mutation that could affect subsequent test runs. Playwright's isolated contexts or database seeding/teardown strategies should be handled by the implementer.

## 4. Conclusion
The implementation strategy involves creating 5 Playwright test files in the `tests/e2e/tier4/` directory, each covering a distinct real-world scenario.

**Proposed Test Files and Steps:**

1. **`tests/e2e/tier4/visitor_applies.spec.ts`** (Scenario 1 - Features 1, 2, 5)
   - Navigate to home page and verify public rendering.
   - Navigate to job board and check for dynamic loading.
   - Select a job and submit a CV document through the application form.
   - Verify that the CV Extraction API is called and a success message is displayed.

2. **`tests/e2e/tier4/admin_organigramme.spec.ts`** (Scenario 2 - Features 3, 4)
   - Go to admin login, enter valid credentials, and submit.
   - Assert redirection to the dashboard.
   - Navigate to the Organigramme section.
   - Add a new team member and save.
   - Verify the UI updates to reflect the new member.

3. **`tests/e2e/tier4/seo_crawling.spec.ts`** (Scenario 3 - Features 1, 2, 6)
   - Request the home page and verify default SEO metadata (title, description).
   - Navigate to a dynamic page (e.g., a specific news article or job posting).
   - Verify the SEO tags reflect the dynamic content (e.g., job title is in the meta title).

4. **`tests/e2e/tier4/admin_job_management.spec.ts`** (Scenario 4 - Features 1, 2, 3, 4, 6)
   - Admin logs in, goes to Job Management, creates a new job with specific title and SEO description, and saves it.
   - In a new browser context (unauthenticated visitor), navigate to the Careers page.
   - Verify the newly created job is visible.
   - Open the job details and verify the specific SEO metadata matches what the admin entered.

5. **`tests/e2e/tier4/admin_application_review.spec.ts`** (Scenario 5 - Features 1, 3, 4, 5)
   - In an unauthenticated context, submit an application with a CV file.
   - Wait for successful submission.
   - Switch to an Admin context, log in, and navigate to Applications.
   - Find the newly submitted application and verify the extracted CV data is displayed.
   - Update the application status to "Reviewed" and assert the UI reflects the saved status.

## 5. Verification Method
- Ensure the 5 files are created in `tests/e2e/tier4/`.
- Run the tests via `npx playwright test tests/e2e/tier4/` to ensure they compile and execute.
- Check Playwright test reports to verify that all outlined steps are executed and assertions pass.
