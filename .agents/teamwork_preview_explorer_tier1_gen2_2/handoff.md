# Tier 1 Tests Fix Strategy & Design

## Observation
- **`5-cv-extraction-api.spec.ts`**: The test `should process a valid CV PDF and return structured JSON` passes an invalid `Buffer.from('dummy-pdf-content')` payload. The assertion allows `[200, 500]` as passing HTTP status codes and conditionally checks the response body only if the status is 200. Another test allows `[500, 504, 200]`.
- **`6-seo-metadata.spec.ts`**: Tests for title, description, open graph tags, and canonical URLs use the wildcard regex `/.+/`, which checks for the presence of a non-empty string but not correctness.
- **`4-admin-mutation.spec.ts`**: Tests perform stateful mutations (e.g., adding a Job Offer, editing `[data-testid="edit-agenda-item-1"]`, deleting `[data-testid="delete-organigramme-item-1"]`) without creating isolated test data first or cleaning up the state afterwards, which will lead to test flakiness on subsequent runs.

## Logic Chain
1. By allowing 500 HTTP status codes to pass and using conditional logic for assertions in `5-cv-extraction-api.spec.ts`, the test framework is essentially ignoring unhandled exceptions and failing to certify that CV extraction actually works. To fix this, the test must send a structurally valid minimal PDF, expect a strict 200 status code, and unconditionally assert the JSON schema of the response.
2. The use of `/.+/` wildcards in `6-seo-metadata.spec.ts` renders the SEO tests ineffective because any placeholder text satisfies the condition. A valid test must assert actual business values (e.g., containing "ATP Nancy" or expected descriptions).
3. The mutation tests in `4-admin-mutation.spec.ts` assume specific data exists (like item-1) and permanently alter the state. Running this suite repeatedly against a persistent database will fail once the data is deleted or altered. Managing state through strict setup (creating unique items) and teardown (deleting them) guarantees isolation.

## Caveats
- If the CV extraction backend endpoint (`/api/extract-cv`) calls an external API (like Gemini) that is unavailable or rate-limited during CI, a strict 200 assertion might fail intermittently. To handle this properly without circumventing the audit, either the backend must return a controlled 503/422 status (which the test checks as an expected graceful failure path) or a mock implementation of the external service must be used at the backend level.
- The SEO specific text matches must align with the actual content populated in the application.

## Conclusion
The Tier 1 tests require structural rewrites to enforce strict correctness, properly manage state, and reject any 500 Internal Server Errors. 

### Revised Test Case Designs

**1. `5-cv-extraction-api.spec.ts`**
- *Test Name*: `should process a valid CV PDF and return structured JSON`
  - *Logic*: Create a valid minimal PDF buffer (e.g., `%PDF-1.4...`). Send to `/api/extract-cv`. Strictly assert `expect(response.status()).toBe(200)`. Unconditionally assert the response body contains `skills` and `experience` fields.
- *Test Name*: `should reject non-PDF file types`
  - *Logic*: Keep existing logic but strictly assert `toBe(400)` or `toBe(415)`.
- *Test Name*: `should handle external API failures gracefully` (Replacing the timeout test)
  - *Logic*: Trigger a known failure state (e.g., file too large, or a specific test file that forces a backend timeout). Assert that the backend returns a well-formed error code (e.g., 503 Service Unavailable or 504 Gateway Timeout) and JSON error message, explicitly rejecting a 500 Internal Server Error.

**2. `6-seo-metadata.spec.ts`**
- *Test Name*: `should have correct title and description on Home page`
  - *Logic*: Assert `toHaveTitle(/ATP Nancy/i)` and description content matching expected keywords, replacing `/.+/`.
- *Test Name*: `should have correct Open Graph tags on Home page`
  - *Logic*: Assert `og:title` contains specific text like `ATP Nancy`.
- *Test Name*: `should have canonical URLs defined`
  - *Logic*: Assert canonical href matches `^https?:\/\/.+` or the exact base URL of the site.

**3. `4-admin-mutation.spec.ts`**
- *Test Name*: `should add and delete a new Job Offer`
  - *Logic*: Generate a unique title (e.g., `Job ${Date.now()}`). Create the job. Assert it appears in the list. Finally, in a teardown hook (`test.afterEach` or end of the test), delete the created job offer.
- *Test Name*: `should edit an isolated Agenda event`
  - *Logic*: Setup: Create a new Agenda event specifically for this test. Edit the newly created event. Assert the update was successful. Teardown: Delete the event.
- *Test Name*: `should delete an isolated Organigramme member`
  - *Logic*: Setup: Create a new Organigramme member. Delete the member. Assert the member is no longer visible.

## Verification Method
1. Execute `npx playwright test tests/e2e/tier1/5-cv-extraction-api.spec.ts` and ensure it fails if a 500 error is returned.
2. Execute `npx playwright test tests/e2e/tier1/6-seo-metadata.spec.ts` and ensure it fails if the metadata is empty or just generic spaces.
3. Execute `npx playwright test tests/e2e/tier1/4-admin-mutation.spec.ts` multiple times in succession to verify that tests pass consistently without accumulating garbage data or failing due to missing records.
