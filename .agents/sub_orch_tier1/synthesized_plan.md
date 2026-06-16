# Synthesized Tier 1 Playwright Test Plan

## Overview
Generate 30 Playwright tests (`.spec.ts`) in `tests/e2e/tier1/` based on this plan.

## Test File 1: `1-public-pages.spec.ts`
1. `should render the Home page with main sections` (assert hero and footer)
2. `should render the About page content`
3. `should render the President's message page`
4. `should render the Contact page and form elements`
5. `should render the Legal page`

## Test File 2: `2-dynamic-data.spec.ts`
1. `should load and display the Organigramme list`
2. `should load and display the Directory (Annuaire) items`
3. `should load and display Agenda events`
4. `should load and display Job Offers`
5. `should load and display Actions`

## Test File 3: `3-admin-auth.spec.ts`
1. `should render the admin login page`
2. `should reject invalid admin credentials`
3. `should successfully login with valid credentials`
4. `should redirect unauthenticated users away from admin dashboard`
5. `should successfully logout`

## Test File 4: `4-admin-mutation.spec.ts`
1. `should render the admin dashboard layout and settings forms`
2. `should update basic site settings successfully`
3. `should add a new Job Offer`
4. `should edit an existing Agenda event`
5. `should delete an Organigramme member`

## Test File 5: `5-cv-extraction-api.spec.ts`
1. `should reject requests without a file payload`
2. `should reject non-PDF file types`
3. `should process a valid CV PDF and return structured JSON`
4. `should handle Gemini API timeout/failure gracefully`
5. `should enforce payload size limits`

## Test File 6: `6-seo-metadata.spec.ts`
1. `should have correct title and description on Home page`
2. `should have correct Open Graph tags on Home page`
3. `should have dynamic SEO metadata on specific Job Offer page`
4. `should have canonical URLs defined`
5. `should set robots meta tag appropriately`

## Implementation Details
- Use standard Playwright Next.js test patterns (`@playwright/test`).
- Write opaque-box tests that assume basic data-testids or typical DOM structures, as the implementation doesn't fully exist yet.
- Put tests in `tests/e2e/tier1/`.
- Do NOT run `npx playwright test`. Just generate the code files.
