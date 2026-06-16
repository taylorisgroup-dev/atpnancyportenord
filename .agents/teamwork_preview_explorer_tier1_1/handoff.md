# Handoff Report: Tier 1 Feature Coverage Test Strategy

## 1. Observation
- `SCOPE.md` requires generating ≥5 Playwright test cases for each of the 6 features defined in `TEST_INFRA.md`.
- `TEST_INFRA.md` lists the following 6 features:
  1. Public Pages Rendering
  2. Dynamic Data Loading
  3. Admin Auth
  4. Admin Data Mutation
  5. CV Extraction API
  6. SEO Metadata
- The test philosophy mandates "Opaque-box, requirement-driven" testing without dependence on implementation design, using standard Playwright assertions (`expect`).
- Tests are to be placed in `.spec.ts` files under `tests/e2e/tier1/` or `tests/e2e/`.

## 2. Logic Chain
- To achieve Tier 1 coverage, we need "happy path / equivalence class representatives" for each feature.
- **Feature 1 (Public Pages Rendering)**: Needs tests covering main routes rendering properly (Home, About, Jobs, Contact, 404) to ensure the UI is fundamentally sound.
- **Feature 2 (Dynamic Data Loading)**: Needs tests checking data fetching for lists (jobs), single items (job detail, team members), and edge cases (loading states, empty lists).
- **Feature 3 (Admin Auth)**: Needs tests covering login success, login failure, route protection (redirection when unauthenticated), logout, and session persistence.
- **Feature 4 (Admin Data Mutation)**: Needs tests for CRUD operations in the admin panel (Create job, Edit job, Delete job, Update team member, form validation).
- **Feature 5 (CV Extraction API)**: Needs tests for the job application flow, focusing on valid CV uploads, invalid formats, size limits, and UI integration.
- **Feature 6 (SEO Metadata)**: Needs tests validating `<head>` tags (title, description, Open Graph) on static and dynamic pages, plus canonical links and robots.txt.
- By defining these 30 distinct scenarios, we directly fulfill the scope requirement to provide 5 concrete test designs per feature.

## 3. Caveats
- No implementation code exists yet in this environment; the tests are designed conceptually and may require specific locators (e.g., `data-testid` attributes) to be added to the application code for robustness.
- The tests assume certain application routes (e.g., `/admin`, `/jobs`, `/contact`) that might need adjustments based on the actual Next.js routing structure.
- Mocking strategies (e.g., for the CV Extraction API or database interactions) are suggested but need to be concretized by the implementer.

## 4. Conclusion
We recommend organizing the 30 tests into separate `.spec.ts` files within `tests/e2e/tier1/` (e.g., `public-pages.spec.ts`, `dynamic-data.spec.ts`, etc.). The following test cases are planned:

**Feature 1: Public Pages Rendering**
1. `should render the home page with main navigation and footer`
2. `should render the about page with company history`
3. `should render the jobs listing page layout`
4. `should render the contact form on the contact page`
5. `should display a custom 404 page for invalid routes`

**Feature 2: Dynamic Data Loading**
1. `should fetch and display a list of jobs from the API`
2. `should load and display details for a specific job ID`
3. `should dynamically render team members on the organigramme page`
4. `should display a loading indicator while fetching dynamic data`
5. `should handle empty states gracefully when no data is returned`

**Feature 3: Admin Auth**
1. `should successfully log in an admin with valid credentials`
2. `should display an error message for invalid login credentials`
3. `should redirect unauthenticated users away from protected admin routes`
4. `should successfully log out the admin and terminate session`
5. `should persist the admin session across page reloads`

**Feature 4: Admin Data Mutation**
1. `should allow an admin to create a new job posting`
2. `should allow an admin to update an existing job posting`
3. `should allow an admin to delete a job posting`
4. `should allow an admin to update team member information`
5. `should show validation errors when submitting incomplete mutation forms`

**Feature 5: CV Extraction API**
1. `should successfully upload and process a valid PDF CV`
2. `should reject unsupported file formats (e.g., .exe) with an error`
3. `should reject files exceeding the maximum payload size`
4. `should display a success message to the user after CV submission`
5. `should gracefully handle API timeouts or corrupted PDF uploads`

**Feature 6: SEO Metadata**
1. `should contain correct title and description tags on the home page`
2. `should dynamically generate SEO metadata for job detail pages`
3. `should include valid Open Graph tags for social sharing`
4. `should serve a valid robots.txt file`
5. `should include canonical link tags on public pages`

## 5. Verification Method
- **Implementation Validation**: Implementers can write the Playwright code for each test defined above inside `tests/e2e/tier1/`.
- **Command**: Run `npx playwright test tests/e2e/tier1/` to verify the tests execute (they will likely fail until the application features are implemented).
- **Count Check**: Verify that `npx playwright test --list` outputs exactly 30 tests spanning all 6 defined features.
