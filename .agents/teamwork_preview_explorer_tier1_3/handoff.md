# Handoff Report: Tier 1 Feature Coverage Test Strategy

## 1. Observation
- The `SCOPE.md` file defines the "Tier 1 Tests Generation" milestone, requiring exactly 30 Playwright tests (5 per feature for 6 features). Tests must use black-box/opaque-box methodology where possible.
- The `TEST_INFRA.md` file lists the 6 features:
  1. Public Pages Rendering
  2. Dynamic Data Loading
  3. Admin Auth
  4. Admin Data Mutation
  5. CV Extraction API
  6. SEO Metadata
- The `PROJECT.md` file reveals the tech stack: Next.js App Router, Tailwind, Supabase (`site_settings` single row JSON blob), and a Gemini-powered `/api/extract-cv` Route Handler.

## 2. Logic Chain
To provide 100% Tier 1 coverage while maintaining an opaque-box approach, I mapped 5 distinct test scenarios to each feature's expected user behaviors and edge cases:

**Feature 1: Public Pages Rendering**
1. `should render the Home page with main sections`: Navigate to `/`. Assert presence of hero section and footer.
2. `should render the About page content`: Navigate to `/about`. Assert title and about text.
3. `should render the President's message page`: Navigate to `/president`. Assert title and image/text blocks.
4. `should render the Contact page and form elements`: Navigate to `/contact`. Assert presence of contact form, phone, and address.
5. `should render the Legal page`: Navigate to `/legal`. Assert text content for privacy policy.

**Feature 2: Dynamic Data Loading**
1. `should load and display the Organigramme list`: Navigate to `/organigramme`. Assert at least one member card renders.
2. `should load and display the Directory (Annuaire) items`: Navigate to `/directory`. Assert presence of directory entries.
3. `should load and display Agenda events`: Navigate to `/agenda`. Assert presence of upcoming events.
4. `should load and display Job Offers`: Navigate to `/jobs`. Assert presence of job postings.
5. `should load and display Actions`: Navigate to `/actions`. Assert presence of action/project items.

**Feature 3: Admin Auth**
1. `should render the admin login page`: Navigate to `/admin/login`. Assert presence of email/password inputs.
2. `should reject invalid admin credentials`: Submit invalid credentials. Assert error message appears.
3. `should successfully login with valid credentials`: Submit valid credentials. Assert redirect to `/admin/dashboard`.
4. `should redirect unauthenticated users away from admin dashboard`: Directly navigate to `/admin/dashboard`. Assert redirect to `/admin/login`.
5. `should successfully logout`: From an authenticated state, click logout. Assert session is cleared and redirect to `/admin/login`.

**Feature 4: Admin Data Mutation**
1. `should render the admin dashboard layout and settings forms`: Navigate to `/admin/dashboard`. Assert presence of settings UI.
2. `should update basic site settings successfully`: Modify a simple text field and submit. Assert success toast/message.
3. `should add a new Job Offer`: Open Jobs section, add details, submit. Assert new job appears in the admin list.
4. `should edit an existing Agenda event`: Edit an event title and submit. Assert updated title is displayed.
5. `should delete an Organigramme member`: Delete a member and confirm. Assert member is removed from the list.

**Feature 5: CV Extraction API**
1. `should reject requests without a file payload`: POST `/api/extract-cv` with empty body. Assert 400 status.
2. `should reject non-PDF file types`: POST `/api/extract-cv` with a `.txt` file. Assert 400 or 415 status.
3. `should process a valid CV PDF and return structured JSON`: POST valid PDF. Assert 200 status and expected JSON schema (name, skills).
4. `should handle Gemini API timeout/failure gracefully`: Mock Gemini failure, POST request. Assert 500 status and error message.
5. `should enforce payload size limits`: POST oversized PDF. Assert 413 Payload Too Large status.

**Feature 6: SEO Metadata**
1. `should have correct title and description on Home page`: Navigate to `/`. Assert `<title>` and `<meta name="description">`.
2. `should have correct Open Graph tags on Home page`: Navigate to `/`. Assert `og:title`, `og:description`, `og:image`.
3. `should have dynamic SEO metadata on specific Job Offer page`: Navigate to a specific job (e.g., `/jobs/1`). Assert title reflects job details.
4. `should have canonical URLs defined`: Navigate to `/about`. Assert `<link rel="canonical">` tag.
5. `should set robots meta tag appropriately`: Navigate to `/`. Assert `<meta name="robots" content="index, follow">`.

## 3. Caveats
- Precise element selectors (e.g., `data-testid`) and routing paths are hypothesized based on Next.js standards, as the UI has not yet been fully implemented.
- Mocking configurations for Supabase (DB), Firebase (Auth), and Gemini API will be required for the implementation phase to ensure these tests run deterministically without modifying production data.

## 4. Conclusion
A complete Tier 1 feature coverage strategy has been defined, encompassing 30 distinct test cases structured for the Playwright test runner. The test strategy is opaque-box and aligns with the requirements outlined in `TEST_INFRA.md`.

## 5. Verification Method
- Ensure 30 distinct tests are planned and assigned.
- Upon implementation, run `npx playwright test --list` to verify the tests are correctly recognized by the framework.
