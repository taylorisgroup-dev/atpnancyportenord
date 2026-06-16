# Synthesized Tier 1 Playwright Test Plan (Gen 2)

## Overview
Generate/rewrite 30 Playwright tests (`.spec.ts`) in `tests/e2e/tier1/` based on this revised plan.
**CRITICAL**: You must fix the integrity violations identified in the first iteration.

## Integrity Directives
1. **NO ALLOWING 500 ERRORS**: `expect([200, 500]).toContain(response.status())` is FORBIDDEN. If testing a valid CV, you MUST assert `expect(response.status()).toBe(200)`. If testing an error, assert the exact error code (e.g. 400).
2. **NO WILDCARDS FOR CORRECTNESS**: Do not use `/.+/` or `.*` to assert SEO metadata. Use exact expected strings (e.g., `'ATP Nancy - Accueil'`) or strict matching logic.
3. **STATE TEARDOWN IS REQUIRED**: For mutation tests (admin), do not rely on hardcoded IDs (like `item-1`). Create an item dynamically, edit it, and use `test.afterEach` or inline cleanup to delete it so tests do not pollute the database.
4. **VALID PDF MOCKS**: When testing the valid PDF extraction, provide a syntactically valid minimal PDF buffer, not a raw string like `'dummy-pdf-content'` which breaks the parser.

## Test Files
Maintain the same 6 files and 5 tests per file as previously defined:
1. `1-public-pages.spec.ts`
2. `2-dynamic-data.spec.ts`
3. `3-admin-auth.spec.ts`
4. `4-admin-mutation.spec.ts`
5. `5-cv-extraction-api.spec.ts`
6. `6-seo-metadata.spec.ts`

Apply the integrity directives to the respective tests. For tests that require data, assume standard Playwright setups (e.g., creating a temporary item with a unique UUID in the title for isolated teardowns).

DO NOT run `npx playwright test`. Just generate the code files.
