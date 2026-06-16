# Observation
- Analyzed `TEST_INFRA.md` which catalogs 6 core features: 1: Public Pages Rendering, 2: Dynamic Data Loading, 3: Admin Auth, 4: Admin Data Mutation, 5: CV Extraction API, 6: SEO Metadata.
- `TEST_INFRA.md` outlines 3 Tier 4 scenarios: 
  1. "Visitor reads home and applies to job" (Features 1, 2, 5)
  2. "Admin logs in and updates organigramme" (Features 3, 4)
  3. "SEO bot crawls the public pages" (Features 1, 2, 6)
- `SCOPE.md` directs that the E2E Playwright tests should be placed in the `tests/e2e/tier4/` directory and use opaque-box validation via the UI.

# Logic Chain
- The objective requires exactly 5 realistic scenarios. Two additional scenarios must be formulated by combining the 6 available features in a realistic, real-world context.
- **Scenario 4 (End-to-End Job Lifecycle)**: Combines Admin operations with Visitor actions. The admin creates a job (Features 3, 4), and the visitor views the dynamically loaded job on the public page and applies with a CV (Features 1, 2, 5). This ensures end-to-end integration works properly.
- **Scenario 5 (Content Management and SEO Validation)**: Focuses on the CMS loop. The admin modifies public page content and metadata (Features 3, 4), which an unauthenticated user or SEO bot subsequently verifies on the dynamically loaded public pages (Features 1, 2, 6).
- Isolating each scenario into separate `.spec.ts` files within `tests/e2e/tier4/` ensures tests are atomic, understandable, and easier to debug.

# Caveats
- Since this relies on opaque-box testing, exact selectors, page URLs (e.g., `/admin`, `/carrieres`), and backend states are unknown. The implementation will need to infer or define standard routes and mock API responses if a live backend is unavailable.
- The CV Extraction API might require network interception (e.g., `page.route()`) in Playwright to simulate successful file upload processing without hitting real third-party endpoints.

# Conclusion
An implementation strategy is proposed involving the creation of 5 distinct Playwright test files in the `tests/e2e/tier4/` directory.

### Target Files and Test Steps:

1. **`tests/e2e/tier4/scenario_1_visitor_apply.spec.ts`** (Features 1, 2, 5)
   - Step 1: Navigate to the homepage and verify the public content renders correctly.
   - Step 2: Navigate to the Jobs page and verify dynamic job listings are populated.
   - Step 3: Select a job and submit an application with a mock PDF CV.
   - Step 4: Verify the submission success message and ensure the CV Extraction API logic was triggered (via intercepted request).

2. **`tests/e2e/tier4/scenario_2_admin_organigramme.spec.ts`** (Features 3, 4)
   - Step 1: Navigate to the admin login page and authenticate with valid credentials.
   - Step 2: Access the "Organigramme" management dashboard.
   - Step 3: Submit a form to add or update an employee's data.
   - Step 4: Validate that the updated information is visible in the admin UI table/list.

3. **`tests/e2e/tier4/scenario_3_seo_bot.spec.ts`** (Features 1, 2, 6)
   - Step 1: Navigate to the public homepage.
   - Step 2: Assert the presence and correctness of the `<title>` and `<meta name="description">` tags.
   - Step 3: Navigate to a dynamically generated route (e.g., a specific news post).
   - Step 4: Assert that the SEO tags accurately reflect the dynamic content for that page.

4. **`tests/e2e/tier4/scenario_4_e2e_job_lifecycle.spec.ts`** (Features 1, 2, 3, 4, 5)
   - Step 1: Log in as admin and navigate to the Job creation panel.
   - Step 2: Create and publish a new job vacancy with unique identifying text.
   - Step 3: Clear the session (or use a fresh browser context) and navigate to the public Jobs page.
   - Step 4: Verify the newly created job appears via dynamic data loading.
   - Step 5: Click the job and upload a CV to apply, verifying the success flow.

5. **`tests/e2e/tier4/scenario_5_cms_seo_validation.spec.ts`** (Features 1, 2, 3, 4, 6)
   - Step 1: Log in as admin and navigate to the Content Management (Pages) section.
   - Step 2: Update the text and SEO metadata for a specific public page.
   - Step 3: Switch to an unauthenticated browser context.
   - Step 4: Navigate to the modified page and verify the updated text content renders.
   - Step 5: Verify the `<title>` and meta description tags match the newly saved data.

# Verification Method
- Execute the E2E suite using the command: `npx playwright test tests/e2e/tier4/`.
- Confirm that 5 `.spec.ts` files are discovered and run.
- Inspect the file tree to ensure all files are correctly located in `tests/e2e/tier4/` and cover the specified steps.
