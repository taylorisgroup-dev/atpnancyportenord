# Tier 1 Test Strategy and Case Designs

## 1. Observation
- `SCOPE.md` specifies the architecture and milestones: 6 features defined in `TEST_INFRA.md`, generate Playwright tests in `tests/e2e/`, Tier 1 requires ≥5 tests per feature (happy path / equivalence class representatives), do not run tests, only generate files.
- `TEST_INFRA.md` defines 6 features: Public Pages Rendering, Dynamic Data Loading, Admin Auth, Admin Data Mutation, CV Extraction API, SEO Metadata.
- `TEST_INFRA.md` coverage thresholds for Tier 1: ≥5 per feature.

## 2. Logic Chain
Based on the observations, we must design exactly 5 Tier 1 test cases for each of the 6 features. Tier 1 testing focuses on "happy path" and "equivalence class representatives" to ensure core functionality is intact without exhaustive edge case coverage (which belongs in Tier 2).

**Feature 1: Public Pages Rendering**
*Logic*: Verify that all major public-facing routes render correctly without errors.
- Test 1.1: Home page renders correctly with main layout elements (header, footer).
- Test 1.2: 'La Suite d'ATP' (About/Team) page renders correctly.
- Test 1.3: 'Le Club Entreprises' (Partners) page renders correctly.
- Test 1.4: 'Recrutement' (Careers) page renders correctly.
- Test 1.5: 'Contact' page renders correctly (form/details present).

**Feature 2: Dynamic Data Loading**
*Logic*: Verify that pages depending on external or dynamic data fetch and display it correctly.
- Test 2.1: Home page loads and displays dynamic news or featured content.
- Test 2.2: 'La Suite d'ATP' page loads and displays the organigramme data.
- Test 2.3: 'Le Club Entreprises' page loads and displays the list of partners.
- Test 2.4: 'Recrutement' page loads and displays the list of open job offers.
- Test 2.5: Dynamic components display appropriate loading states or handle empty data (e.g., 0 job offers) gracefully without crashing.

**Feature 3: Admin Auth**
*Logic*: Verify the core authentication flows for the admin area.
- Test 3.1: Successful login with valid credentials redirects to the admin dashboard.
- Test 3.2: Login fails with invalid password and displays an appropriate error message.
- Test 3.3: Login fails with missing/empty credentials and displays validation errors.
- Test 3.4: Successful logout clears session and redirects back to the login page.
- Test 3.5: Accessing the admin dashboard without authentication redirects to the login page.

**Feature 4: Admin Data Mutation**
*Logic*: Verify that an authenticated admin can perform basic CRUD operations.
- Test 4.1: Admin can successfully create a new data entry (e.g., job offer or partner).
- Test 4.2: Admin can successfully edit and save changes to an existing entry.
- Test 4.3: Admin can successfully delete an existing entry.
- Test 4.4: Form validation correctly prevents submission of incomplete/invalid data.
- Test 4.5: Admin can successfully upload a media asset/document.

**Feature 5: CV Extraction API**
*Logic*: Verify the core capabilities and common equivalence classes of the CV parsing endpoint.
- Test 5.1: API successfully extracts text and structured data from a valid PDF CV.
- Test 5.2: API successfully extracts data from a valid DOCX CV.
- Test 5.3: API correctly rejects an unsupported file format (e.g., .txt or .png) with a 400 error.
- Test 5.4: API handles file size limit exceedance gracefully with appropriate error code.
- Test 5.5: API returns an appropriate error for a corrupted/unreadable PDF file.

**Feature 6: SEO Metadata**
*Logic*: Verify that standard SEO tags are populated correctly for both static and dynamic pages.
- Test 6.1: Home page contains valid static `<title>`, `<meta name="description">`, and canonical URL.
- Test 6.2: Home page contains valid Open Graph tags (`og:title`, `og:image`, `og:description`).
- Test 6.3: 'Recrutement' (static) page contains correct SEO metadata matching its content.
- Test 6.4: Individual job offer (dynamic) pages have specific SEO metadata generated from the offer details.
- Test 6.5: All major public pages contain correct robots meta tags (e.g., `index, follow`).

## 3. Caveats
- Exact application routes, database structures, and backend mechanisms are not strictly defined yet. The test cases use standard placeholders (e.g., 'La Suite d'ATP', 'organigramme', 'partners') inferred from the context.
- We assume standard login forms and standard Next.js data fetching/mutation paradigms.
- For Admin Data Mutation, tests may require mocked responses or an isolated test database to prevent state bleed between tests.
- For CV Extraction API, we assume a Playwright API request test, utilizing placeholder test files (PDF, DOCX).

## 4. Conclusion
We have formulated a test strategy producing 30 distinct Playwright test cases covering Tier 1 (happy path/equivalence classes) for the 6 core features. These case designs are ready to be implemented as Playwright `.spec.ts` files in `tests/e2e/tier1/` or `tests/e2e/` by the implementer agent.

## 5. Verification Method
- Read `handoff.md` to confirm the presence of exactly 30 distinct test cases mapped evenly to the 6 features.
- Confirm that the proposed tests align with Playwright's capabilities for UI and API testing in a Next.js environment.
- Review `TEST_INFRA.md` to ensure no Tier 1 scope requirements were missed.
