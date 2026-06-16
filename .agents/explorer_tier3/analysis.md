# Tier 3 Pairwise Coverage Plan

## Objective
Design Playwright End-to-End tests in `tests/e2e/tier3/` to achieve comprehensive pairwise coverage of the 6 major features identified in the `TEST_INFRA.md` architecture.

## Feature Inventory
1. Public Pages Rendering
2. Dynamic Data Loading
3. Admin Auth
4. Admin Data Mutation
5. CV Extraction API
6. SEO Metadata

Total pairs to cover: `(6 * 5) / 2 = 15` pairs.

## Test Files and Scenarios

### 1. `tests/e2e/tier3/public-interactions.spec.ts`

**Test A: Dynamic SEO on Public Pages**
- **Features Covered:** 1 (Public Pages), 2 (Dynamic Data), 6 (SEO Metadata)
- **Pairs Covered:** (1,2), (1,6), (2,6)
- **Description:** Navigate to a dynamically generated public page (e.g., an individual job listing). Verify that the public UI renders correctly, the content relies on dynamic data loading, and the `<head>` SEO metadata (title, description, OpenGraph tags) precisely matches the dynamically loaded content.

**Test B: Public CV Submission on Dynamic Page**
- **Features Covered:** 1 (Public Pages), 2 (Dynamic Data), 5 (CV Extraction)
- **Pairs Covered:** (1,5), (2,5)
- **Description:** On a dynamically loaded public job page, a user submits their CV file. The test intercepts and verifies the call to the CV Extraction API, checking that the public UI gracefully handles the upload process and displays a success state using the dynamically parsed applicant data.

**Test C: CV Extraction Success & SEO Validation**
- **Features Covered:** 5 (CV Extraction), 6 (SEO Metadata)
- **Pairs Covered:** (5,6)
- **Description:** Submit a CV through the CV Extraction API, redirecting to a success/confirmation page. Verify that the success page's SEO metadata (e.g., setting `noindex` so applicant data isn't crawled) is correctly set, proving the CV processing pipeline integrates safely with SEO rules.

### 2. `tests/e2e/tier3/admin-interactions.spec.ts`

**Test D: Admin Content Mutation & Dynamic Preview**
- **Features Covered:** 2 (Dynamic Data), 3 (Admin Auth), 4 (Admin Mutation), 6 (SEO Metadata)
- **Pairs Covered:** (2,3), (2,4), (3,4), (3,6), (4,6)
- **Description:** An admin logs in securely and mutates content (e.g., creates a new job posting or organigramme entry). The test verifies the successful mutation, checks the admin's dynamic preview of the new data, and asserts that the admin panel generates the correct expected SEO metadata for the new entry.

**Test E: Admin Moderation of Extracted CVs**
- **Features Covered:** 3 (Admin Auth), 4 (Admin Mutation), 5 (CV Extraction)
- **Pairs Covered:** (3,5), (4,5)
- **Description:** An authenticated admin uploads a CV directly via the admin panel (using the CV Extraction API). The admin then modifies the extracted results and submits a data mutation to save the finalized candidate profile. 

### 3. `tests/e2e/tier3/cross-domain.spec.ts`

**Test F: Authenticated Admin View of Public Pages**
- **Features Covered:** 1 (Public Pages), 3 (Admin Auth)
- **Pairs Covered:** (1,3)
- **Description:** An admin logs in and navigates to the public site. The test verifies that public pages render correctly and that admin-only contextual features (like an "Edit this page" overlay) are securely injected into the public UI without disrupting normal layout.

**Test G: Public Visibility of Admin Mutations**
- **Features Covered:** 1 (Public Pages), 4 (Admin Mutation)
- **Pairs Covered:** (1,4)
- **Description:** An admin mutates global public data (e.g., company description). The test logs out (or uses an incognito context), navigates to the public page, and ensures the Public Pages Rendering accurately reflects the mutation in real-time or after expected ISR revalidation.

## Pairwise Coverage Matrix Check
- (1,2): Test A
- (1,3): Test F
- (1,4): Test G
- (1,5): Test B
- (1,6): Test A
- (2,3): Test D
- (2,4): Test D
- (2,5): Test B
- (2,6): Test A, Test D
- (3,4): Test D, Test E
- (3,5): Test E
- (3,6): Test D
- (4,5): Test E
- (4,6): Test D
- (5,6): Test C

*All 15 pairwise interactions are fully exercised.*
