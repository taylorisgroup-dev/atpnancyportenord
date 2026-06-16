# Tier 4 E2E Test Implementation Strategy

## 1. Observation
- `TEST_INFRA.md` defines the features inventory (1: Public Pages Rendering, 2: Dynamic Data Loading, 3: Admin Auth, 4: Admin Data Mutation, 5: CV Extraction API, 6: SEO Metadata).
- `TEST_INFRA.md` currently lists 3 scenarios for Tier 4, leaving a requirement of "AT LEAST 5 realistic application scenarios" unmet.
- The 3 defined scenarios are:
  1. Visitor reads home and applies to job (Features 1, 2, 5)
  2. Admin logs in and updates organigramme (Features 3, 4)
  3. SEO bot crawls the public pages (Features 1, 2, 6)
- `SCOPE.md` specifies that Playwright tests for Tier 4 should be placed in `tests/e2e/tier4/` and should be opaque-box.

## 2. Logic Chain
- To meet the threshold of 5 scenarios, two additional scenarios must be proposed that combine the existing features realistically.
- **Scenario 4 (Content Lifecycle):** Combining Admin Auth (3), Admin Data Mutation (4), Public Pages (1), Dynamic Data Loading (2), and SEO Metadata (6). An admin creates a piece of content (e.g., job posting), which is then verified by a public visitor for both rendering and SEO metadata.
- **Scenario 5 (E2E Applicant Workflow):** Combining Public Pages (1), Dynamic Data Loading (2), CV Extraction API (5), Admin Auth (3), and Admin Data Mutation (4). A visitor applies to a job using the CV API, and an admin subsequently reviews and updates the application status.
- Splitting these into separate files within `tests/e2e/tier4/` will keep tests isolated and maintainable, adhering to Playwright best practices.

## 3. Caveats
- The exact CSS selectors, form field names, and mock backend responses depend on the Next.js implementation details which are opaque to this strategy.
- Implementers must ensure that test scenarios do not permanently mutate production state if run against a live database (mocks or isolated databases are assumed).
- We assume standard mock behavior for the CV Extraction API if a real endpoint is not available.

## 4. Conclusion
The implementation strategy is to create the following 5 Playwright test files in the `tests/e2e/tier4/` directory:

### Strategy Details & Test Steps

**1. `tests/e2e/tier4/visitor_apply_job.spec.ts`**
*Features: 1, 2, 5*
* Scenario 1: Visitor reads home and applies to job
* **Steps:**
  1. Navigate to the public homepage and verify rendering.
  2. Navigate to a dynamic job posting page.
  3. Upload a mock CV file to trigger the CV Extraction API.
  4. Verify the form fields are auto-filled.
  5. Fill remaining fields and submit the application.
  6. Verify the success message appears.

**2. `tests/e2e/tier4/admin_update_organigramme.spec.ts`**
*Features: 3, 4*
* Scenario 2: Admin logs in and updates organigramme
* **Steps:**
  1. Navigate to the admin login page.
  2. Enter valid admin credentials and submit.
  3. Navigate to the organigramme management section.
  4. Add a new team member or update an existing one.
  5. Save changes and verify the success notification.
  6. Refresh the page to verify data persistence.

**3. `tests/e2e/tier4/seo_bot_crawl.spec.ts`**
*Features: 1, 2, 6*
* Scenario 3: SEO bot crawls the public pages
* **Steps:**
  1. Request the public homepage.
  2. Extract and verify standard SEO metadata (title, description, open graph).
  3. Request a dynamic page (e.g., specific job posting).
  4. Verify dynamic SEO metadata matches the loaded data.
  5. Verify canonical URLs and robots meta tags are correct.

**4. `tests/e2e/tier4/admin_content_lifecycle.spec.ts`**
*Features: 1, 2, 3, 4, 6*
* Scenario 4: Admin creates a job posting, visitor verifies it and its SEO
* **Steps:**
  1. Login as Admin.
  2. Navigate to job postings management and create a new posting.
  3. Log out.
  4. Navigate to the public job listings as a visitor.
  5. Verify the newly created job posting appears dynamically.
  6. Click the job posting and verify the SEO metadata corresponds to the new content.

**5. `tests/e2e/tier4/e2e_application_review.spec.ts`**
*Features: 1, 2, 3, 4, 5*
* Scenario 5: Visitor applies via CV extraction, Admin reviews the application
* **Steps:**
  1. Visitor navigates to a job posting and applies using the CV Extraction API.
  2. Visitor submits the application successfully.
  3. Admin logs in to the system.
  4. Admin navigates to the application review dashboard.
  5. Admin locates the newly submitted application.
  6. Admin updates the application status (e.g., to "Reviewed") and verifies the state change.

## 5. Verification Method
- **Implementation:** Check that the 5 `.spec.ts` files exist in `tests/e2e/tier4/`.
- **Validation:** Run `npx playwright test tests/e2e/tier4/` and ensure all tests pass (or mock responses are correctly stubbed if the application is not fully implemented).
- **Coverage:** Manually map the features covered in each `.spec.ts` file to ensure all 6 features are exercised across the suite as planned.
