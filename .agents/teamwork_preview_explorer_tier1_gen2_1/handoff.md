# Tier 1 Feature Coverage: Integrity Audit Fix Strategy

## Observation
I have inspected the `auditor_report.md` and the relevant test files in `tests/e2e/tier1/`.
1. `5-cv-extraction-api.spec.ts`: The success test provides an invalid PDF (`Buffer.from('dummy-pdf-content')`) which causes a backend failure. It asserts `expect([200, 500]).toContain(response.status())`, meaning it silently passes when the API throws a 500. The timeout test similarly accepts 500/504/200.
2. `6-seo-metadata.spec.ts`: The tests verify SEO tags using wildcard regex `/.+/`. This only verifies the tags exist but not that the content is actually correct for the page.
3. `4-admin-mutation.spec.ts`: Tests modify persistent state (adding a job, editing an agenda event, deleting an organigramme member) on hardcoded entities without any setup or teardown, which guarantees flaky/failing tests on subsequent runs.

## Logic Chain
1. Permitting `500` or `504` error codes in assertions circumvents actual validation of functionality. A success test must strictly expect `200` to be valid. The invalid PDF payload must be replaced with a valid, minimal base64-encoded PDF or a physical fixture to achieve a `200` response.
2. Wildcard assertions (`/.+/`) in SEO metadata do not verify correctness. We must assert against known string literals (e.g., `'Home | ATP Nancy'`) or mock the page data so we can predict and verify the exact SEO output.
3. Stateful e2e tests without proper isolation (setup and teardown) pollute the database. We must either intercept and mock the mutations (using `page.route`) or use API-based teardown steps (`test.beforeEach` to create dedicated test resources, and `test.afterEach` to delete them).

## Caveats
- I am assuming that the backend implementation for CV Extraction is capable of correctly parsing a minimal valid PDF and returning the expected JSON. If it's not implemented, the test *should* fail.
- Mocking state mutations via `page.route` validates the frontend but not the backend integration. If true E2E is desired, API teardown must be implemented instead. I will recommend the API teardown approach for maximum coverage.

## Conclusion
The Tier 1 tests require a complete rewrite of assertions and lifecycle hooks to meet integrity standards. The fix strategy dictates strict status code checks, deterministic assertions, and guaranteed state isolation.

### Revised Test Case Designs

#### `5-cv-extraction-api.spec.ts`
- **Fix Strategy**: Provide a valid minimal PDF file, strictly assert a `200` status code, and remove array-based status assertions.
- **Test Names & Logic**:
  - `should reject requests without a file payload`: Assert `400`.
  - `should reject non-PDF file types`: Assert `400` with descriptive error.
  - `should process a valid CV PDF and return structured JSON`: Read a valid minimal PDF fixture (or base64 decode one). Send the multipart request. Assert exactly `expect(response.status()).toBe(200)`. Assert `body` has populated `skills` and `experience`.
  - `should handle Gemini API timeout/failure gracefully`: Mock the upstream failure via backend flag/header if supported, or remove the test if we cannot accurately force a timeout without a real 500. If testing a backend timeout is required, assert exactly `503` or `504` with a defined JSON error structure, never `500`.
  - `should enforce payload size limits`: Assert `413`.

#### `6-seo-metadata.spec.ts`
- **Fix Strategy**: Replace wildcards with exact string matches representing the actual application configuration.
- **Test Names & Logic**:
  - `should have correct title and description on Home page`: Assert `title` is exactly the site's expected default (e.g., `'ATP Nancy - Accueil'`), and `description` matches the exact static text.
  - `should have correct Open Graph tags on Home page`: Assert `og:title` matches the static title precisely.
  - `should have dynamic SEO metadata on specific Job Offer page`: Use `page.route` to mock `/api/emplois/1` to return a specific job object (e.g., `{ title: 'Ingénieur' }`). Then assert `title` and `og:title` explicitly contain `'Ingénieur'`.
  - `should have canonical URLs defined`: Assert `href` equals the exact expected base URL + pathname.

#### `4-admin-mutation.spec.ts`
- **Fix Strategy**: Implement resource lifecycle isolation using `test.beforeEach` and `test.afterEach` coupled with the Playwright `request` API for direct database cleanup.
- **Test Names & Logic**:
  - *Setup Hook*: Add a `test.afterEach` that loops through an array of created resource IDs and sends `DELETE` requests to clean them up.
  - `should add a new Job Offer`: Fill and submit the form. Wait for redirect. Verify presence in UI. Extract the created Job ID from the UI or API response and push it to the cleanup array.
  - `should edit an existing Agenda event`: In `beforeEach`, create a new Agenda event via API and store its ID. In the test, edit that specific event via UI. Assert the change. In `afterEach`, delete the event.
  - `should delete an Organigramme member`: In `beforeEach`, create a new Organigramme member via API. In the test, delete it via UI. Assert it is removed from the UI. No `afterEach` delete required as it was deleted in the test.

## Verification Method
- **To verify 500 error rejection**: Run `npx playwright test tests/e2e/tier1/5-cv-extraction-api.spec.ts`. It must fail if the API returns 500.
- **To verify strict SEO**: Change the `title` in the app temporarily. Run `6-seo-metadata.spec.ts`. The test must fail, proving it doesn't use wildcards.
- **To verify teardown**: Run `4-admin-mutation.spec.ts` 5 times sequentially. It must pass all 5 times without "duplicate resource" or "resource not found" errors.
