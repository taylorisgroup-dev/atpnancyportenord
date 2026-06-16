# Handoff Report - Tier 2 E2E Tests (Boundary & Corner Cases)

## 1. Observation
- `TEST_INFRA.md` specifies testing philosophy: "Opaque-box, requirement-driven. No dependency on implementation design. Methodology: Category-Partition + BVA + Pairwise + Workload Testing."
- Tier 2 testing requires "≥5 per feature (where boundaries exist)".
- Target features identified from `TEST_INFRA.md`:
  1. Public Pages Rendering
  2. Dynamic Data Loading
  3. Admin Auth
  4. Admin Data Mutation
  5. CV Extraction API
  6. SEO Metadata
- The Next.js application will be using Server-Side Rendering (SSR) and Supabase/Firebase backend (`ORIGINAL_REQUEST.md`).

## 2. Logic Chain
Based on the boundary value analysis (BVA) for web applications:
- We test extremes of input fields (empty, massive size, negative/zero when applicable).
- We test viewport and network boundaries (timeouts, extreme sizes).
- We test data loading boundaries (empty arrays, massive arrays, missing optional fields).
- Each test case defines a specific Playwright action and expected outcome.

Here are the 30 test cases (5 per feature):

### Feature 1: Public Pages Rendering
1. **Case 1 (Viewport Boundary - Minimum):** Render homepage at a minimal viewport (e.g., 320x480).
   - *Action:* `page.setViewportSize({ width: 320, height: 480 }); page.goto('/');`
   - *Expected:* Elements do not overflow the horizontal axis (`page.evaluate(() => document.documentElement.scrollWidth === document.documentElement.clientWidth)` is true).
2. **Case 2 (Viewport Boundary - Maximum):** Render homepage at an extreme 4K viewport (e.g., 3840x2160).
   - *Action:* `page.setViewportSize({ width: 3840, height: 2160 }); page.goto('/');`
   - *Expected:* Layout does not break; container constraints work correctly.
3. **Case 3 (URL Boundary - Non-existent deep path):** Attempt to load a deeply nested non-existent URL.
   - *Action:* `page.goto('/this/path/does/not/exist/at/all/123456789');`
   - *Expected:* Custom 404 page renders properly with a 404 HTTP status code.
4. **Case 4 (Network Boundary - Slow 3G/Timeout):** Emulate extremely slow network conditions on public routes.
   - *Action:* Use Playwright `route.continue()` with a massive delay (e.g., 10 seconds).
   - *Expected:* Fallback UI, SSR cache, or appropriate loading skeleton is displayed without an unhandled crash.
5. **Case 5 (Locale Boundary - Unsupported):** Request the page with an unsupported `Accept-Language` header (e.g., `zh-CN`).
   - *Action:* `page.setExtraHTTPHeaders({ 'Accept-Language': 'zh-CN,zh;q=0.9' }); page.goto('/');`
   - *Expected:* Page gracefully falls back to the default language (French).

### Feature 2: Dynamic Data Loading (Organigramme, Annuaire, Vidéos)
6. **Case 6 (Data Boundary - Empty List):** Mock backend to return an empty array (0 items) for the directory.
   - *Action:* Intercept API/Supabase call and fulfill with `[]`.
   - *Expected:* UI shows a "No data available" message instead of crashing or rendering empty cards.
7. **Case 7 (Data Boundary - Massive List):** Mock backend to return a massive array (e.g., 5000 items).
   - *Action:* Intercept API/Supabase call and fulfill with `Array.from({ length: 5000 })`.
   - *Expected:* Pagination or virtualization handles it; DOM size remains reasonable (no out-of-memory crash).
8. **Case 8 (Data Boundary - Extreme String Length):** Data items contain extremely long strings (e.g., 10,000 character descriptions).
   - *Action:* Intercept API and fulfill with `description: "A".repeat(10000)`.
   - *Expected:* Text truncates with CSS (e.g., `line-clamp`) or wraps properly without breaking layout.
9. **Case 9 (Data Boundary - Missing Fields):** Data items omit optional fields (e.g., missing profile image, missing title).
   - *Action:* Intercept API and fulfill with items lacking non-mandatory keys.
   - *Expected:* Fallback placeholders/images are displayed.
10. **Case 10 (Pagination Boundary - Invalid Params):** Request data with invalid pagination/filter parameters.
    - *Action:* `page.goto('/annuaire?page=-1&limit=999999');`
    - *Expected:* API returns 400 or defaults to valid limits, UI handles it gracefully.

### Feature 3: Admin Auth
11. **Case 11 (Input Boundary - Empty Fields):** Submit login form completely empty.
    - *Action:* `page.goto('/admin/login'); page.click('button[type="submit"]');`
    - *Expected:* Client-side validation prevents submission; UI shows "Required" errors.
12. **Case 12 (Input Boundary - Massive String):** Submit login with extremely long strings in email/password.
    - *Action:* Fill email and password with 10,000 characters and submit.
    - *Expected:* Rejection without application crash (preventing DoS); UI displays clear error.
13. **Case 13 (Input Boundary - XSS/SQLi Payload):** Submit login with script injection characters.
    - *Action:* Fill email with `<script>alert(1)</script>' OR 1=1--`.
    - *Expected:* Input is sanitized; login fails cleanly with "Invalid credentials".
14. **Case 14 (Session Boundary - Missing Token):** Directly access protected admin routes without authentication.
    - *Action:* Clear cookies/storage, `page.goto('/admin/dashboard');`
    - *Expected:* Immediate redirect back to `/admin/login`.
15. **Case 15 (Session Boundary - Malformed Token):** Access admin route with a fake/expired session token.
    - *Action:* Set cookie `session=invalid_token_123`, `page.goto('/admin/dashboard');`
    - *Expected:* Unauthorized response and redirect to `/admin/login`.

### Feature 4: Admin Data Mutation
16. **Case 16 (Mutation Boundary - Empty Required Data):** Submit an update form clearing all required fields.
    - *Action:* In admin edit mode, clear required text inputs and submit.
    - *Expected:* Validation blocks mutation; changes are not saved to the backend.
17. **Case 17 (File Boundary - Massive File):** Upload an extremely large file (e.g., 500MB) when limits exist.
    - *Action:* `page.setInputFiles('input[type="file"]', 'large_mock_file.txt');`
    - *Expected:* Upload rejected with a "File too large" error before full transmission.
18. **Case 18 (File Boundary - Invalid Disguised Type):** Upload a file with invalid type disguised as an image.
    - *Action:* Upload `malicious.exe` renamed to `image.jpg`.
    - *Expected:* Backend MIME/magic-number validation rejects the file.
19. **Case 19 (Data Boundary - Unicode/Zero-width):** Update a text field with Unicode edge cases (Emojis, RTL, Zero-width).
    - *Action:* Fill input with `👩‍🚀 إختبار   text` and save.
    - *Expected:* Data is saved and rendered correctly without corruption.
20. **Case 20 (Data Boundary - Negative/Zero Values):** Submit mutation request with negative or zero values for strictly positive numeric fields (e.g., sorting order).
    - *Action:* Fill "order" field with `-1` or `0` and save.
    - *Expected:* Validation blocks it or handles it gracefully.

### Feature 5: CV Extraction API
21. **Case 21 (File Boundary - Empty 0-byte File):** Upload an empty file to the CV Extraction endpoint.
    - *Action:* Post a 0-byte file to the extraction API route.
    - *Expected:* API returns a 400 Bad Request with an "Invalid file" or similar message.
22. **Case 22 (File Boundary - Corrupted PDF):** Upload a severely corrupted PDF.
    - *Action:* Post a text file renamed to `.pdf`.
    - *Expected:* API handles parsing error cleanly (returns 400/422, not 500 crash).
23. **Case 23 (Data Boundary - Massive Text Content):** Upload a CV with an extreme amount of text (e.g., 100 pages).
    - *Action:* Upload a massive PDF.
    - *Expected:* API processes with timeout handling or size limit rejection.
24. **Case 24 (File Boundary - Unsupported Format):** Upload an explicitly unsupported format.
    - *Action:* Upload a `.sh` or `.exe` file.
    - *Expected:* Immediate rejection with 415 Unsupported Media Type.
25. **Case 25 (Data Boundary - No Extractable Text):** Upload a valid PDF containing only images (no OCR text).
    - *Action:* Upload an image-only PDF.
    - *Expected:* API returns an empty extraction result or specific "No text found" status without failing.

### Feature 6: SEO Metadata
26. **Case 26 (Data Boundary - Massive Title):** A dynamic page with an extremely long title (e.g., 500 chars).
    - *Action:* Intercept and mock data to return a 500-char title. Check `<title>`.
    - *Expected:* Title is gracefully truncated or safely rendered in the DOM.
27. **Case 27 (Data Boundary - Missing Description):** A dynamic page missing a meta description in its data.
    - *Action:* Intercept and mock data to omit description.
    - *Expected:* Default fallback meta description is injected into `<meta name="description">`.
28. **Case 28 (URL Boundary - Special Chars):** Dynamic routes with special characters in URL.
    - *Action:* `page.goto('/user/Jean-François!@');`
    - *Expected:* Canonical URLs inside `<link rel="canonical">` are correctly URI-encoded.
29. **Case 29 (Data Boundary - Missing OG Image):** Missing OpenGraph image URL in data.
    - *Action:* Intercept and mock data to omit OG image.
    - *Expected:* Fallback OpenGraph image (`og:image`) is injected.
30. **Case 30 (Data Boundary - HTML Injection in Meta):** Meta tags sourced from data containing HTML injection.
    - *Action:* Mock data title as `<script>alert(1)</script>`.
    - *Expected:* Meta tags are correctly HTML-escaped and do not execute as script.

## 3. Caveats
- As this is an opaque-box test design, I did not review the specific Supabase schema or Next.js App Router endpoints, assuming standard REST/GraphQL/Server Action patterns.
- Mocking (`route.fulfill()`) will need to be properly configured by the implementer in Playwright.

## 4. Conclusion
30 boundary and corner-case tests have been designed for the Tier 2 test suite. These tests ensure the application does not crash under extreme conditions and gracefully handles missing, massive, or malformed data inputs.

## 5. Verification Method
- The Implementer agent should read this document and implement the Playwright tests (`.spec.ts` files).
- Run `npx playwright test --project=chromium` on the implemented tests.
- Verify that 30 tests pass.
