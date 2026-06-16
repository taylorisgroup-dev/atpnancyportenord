# Tier 2 E2E Tests: Boundary & Corner Cases

## 1. Observation
- The project is migrating to Next.js with Supabase backend.
- We need 30 Tier 2 E2E test cases focusing on Boundary Value Analysis (BVA), edge cases, and error-prone inputs across 6 distinct features.
- Testing infrastructure is Playwright. Tests are to be written as opaque-box cases based on specifications.

## 2. Logic Chain
For each feature, boundary conditions were identified:
- **Public Pages Rendering:** Limits on URLs, viewports, rapid interactions, invalid methods.
- **Dynamic Data Loading:** Empty sets, large sets, missing fields, extremely long content, latency boundaries.
- **Admin Auth:** Input field limits, brute force limits, whitespace handling, session expiration.
- **Admin Data Mutation:** Payload size limits, negative numbers, malicious payloads (XSS), concurrency, non-existent records.
- **CV Extraction API:** 0-byte files, max size files, disguised formats, corrupted files, max filename lengths.
- **SEO Metadata:** Extremely long strings, special characters, missing data, empty URLs.

### Feature 1: Public Pages Rendering
1. **Extremely long URL path** 
   - *Action:* Navigate to `/[2000_char_string]`.
   - *Expected:* 404 page gracefully rendered without breaking layout or server crash.
2. **Minimum supported viewport** 
   - *Action:* Render homepage with viewport 320x568 (e.g., iPhone SE).
   - *Expected:* No horizontal scrolling, elements do not overlap, text remains readable.
3. **Maximum logical viewport** 
   - *Action:* Render homepage at 3840x2160 (4K).
   - *Expected:* Content is centered/stretched appropriately, images are not pixelated, layout does not break.
4. **Extremely rapid client-side navigation** 
   - *Action:* Click 10 different internal links within 2 seconds.
   - *Expected:* Final page loads correctly, no memory leaks or blank white screens.
5. **Unsupported HTTP method** 
   - *Action:* Send POST request to a statically rendered public page route using `request.post('/')`.
   - *Expected:* 405 Method Not Allowed or appropriate generic error page without leaking stack traces.

### Feature 2: Dynamic Data Loading
6. **Zero items returned (Empty State)** 
   - *Action:* Mock Supabase response to return `[]` for Annuaire/Organigramme.
   - *Expected:* UI displays a graceful "No results found" message instead of crashing or showing empty tables.
7. **Extreme payload size (Max items)** 
   - *Action:* Mock Supabase response to return 10,000 items.
   - *Expected:* UI implements virtualization or pagination, page does not freeze, DOM node count remains stable.
8. **Extremely long text fields (Overflow)** 
   - *Action:* Mock Supabase to return an item with a 10,000-character description.
   - *Expected:* Text is truncated with ellipsis or scrollable, does not break grid/flex containers.
9. **Missing optional fields (Null values)** 
   - *Action:* Mock Supabase to return items with all optional fields set to `null` or missing.
   - *Expected:* UI falls back to default values or hides elements cleanly without throwing undefined errors.
10. **High latency simulation (Timeout boundary)** 
    - *Action:* Delay Supabase response by 10 seconds (just before browser timeout).
    - *Expected:* Loading skeleton or spinner is shown, page eventually loads without showing a premature timeout error.

### Feature 3: Admin Auth
11. **Empty credentials submission** 
    - *Action:* Click login with empty email and password fields.
    - *Expected:* Client-side validation prevents submission, highlights fields in red.
12. **Extremely long credentials** 
    - *Action:* Enter an email and password of 500 characters each and submit.
    - *Expected:* Server rejects with 400 Bad Request or invalid credentials, no server crash (buffer overflow).
13. **Boundary of Rate Limiting (Brute force)** 
    - *Action:* Submit invalid credentials 10 times consecutively in 1 second.
    - *Expected:* 11th attempt receives 429 Too Many Requests, UI shows "Please wait before trying again".
14. **Session expiration during action (Boundary)** 
    - *Action:* Authenticate, manually delete session cookie/token, attempt to navigate to a protected admin route.
    - *Expected:* Immediate redirection to the login page with a "Session expired" message.
15. **Whitespace-padded credentials** 
    - *Action:* Enter valid email and password but with 5 leading and trailing spaces.
    - *Expected:* System either trims whitespace and logs in, or explicitly rejects, but does not throw an unhandled error.

### Feature 4: Admin Data Mutation
16. **Maximum input size for text fields** 
    - *Action:* Submit an update with a string of 1MB in a text area.
    - *Expected:* Server rejects with 413 Payload Too Large or UI prevents input > max length.
17. **Zero/Negative values in numeric fields** 
    - *Action:* Update a sort order or ID field to `-1` or `0` where only positive integers are expected.
    - *Expected:* Client/Server validation rejects the input with a descriptive error.
18. **XSS payload in input fields** 
    - *Action:* Submit `<script>alert('xss')</script>` as a title.
    - *Expected:* Input is sanitized upon saving or escaped upon rendering, script does not execute.
19. **Concurrent identical mutations (Race condition)** 
    - *Action:* Send two identical update requests simultaneously using Playwright `Promise.all`.
    - *Expected:* Both succeed idempotently or one succeeds and the other fails safely, no data corruption.
20. **Mutating non-existent record** 
    - *Action:* Send an update request for a record ID that was just deleted (e.g. ID `999999`).
    - *Expected:* 404 Not Found error returned, UI handles the error gracefully.

### Feature 5: CV Extraction API
21. **Zero-byte file upload** 
    - *Action:* Upload a 0-byte `empty.pdf` file to the extraction API.
    - *Expected:* API rejects with 400 Bad Request indicating the file is empty.
22. **Maximum file size limit** 
    - *Action:* Upload a PDF slightly above the limit (e.g., 20.01MB if limit is 20MB).
    - *Expected:* Immediate rejection (413 Payload Too Large), ideally before full upload.
23. **Unsupported file type disguised as PDF** 
    - *Action:* Upload an `.exe` file renamed to `resume.pdf`.
    - *Expected:* API detects invalid MIME type or signature, rejects with 415 Unsupported Media Type.
24. **Corrupted file upload** 
    - *Action:* Upload a file containing random binary garbage but with a `.pdf` extension.
    - *Expected:* Parser catches the error, returns a 422 Unprocessable Entity, does not crash.
25. **Extremely long filename** 
    - *Action:* Upload a valid PDF but with a filename of 255 characters.
    - *Expected:* File is processed successfully, filename is truncated or safely stored without DB error.

### Feature 6: SEO Metadata
26. **Extremely long Meta Title** 
    - *Action:* Navigate to a page with a dynamic title of 300 characters.
    - *Expected:* Title tag is present, potentially truncated safely by Next.js, no 500 error.
27. **Special characters and emojis in Meta Description** 
    - *Action:* Load a page where the description contains `'"&<>??`.
    - *Expected:* Characters are properly HTML-escaped in the `<meta name="description">` tag.
28. **Missing dynamic SEO data** 
    - *Action:* Load a dynamic page where the database SEO fields are `null`.
    - *Expected:* Fallback default SEO metadata (Title, Description, OpenGraph) is generated correctly.
29. **Zero-length canonical URL** 
    - *Action:* Simulate an environment where the base URL or path resolves to empty.
    - *Expected:* Canonical tag either omits the href or uses a safe fallback, but does not produce an invalid `<link rel="canonical" href="">`.
30. **OpenGraph image max URL length** 
    - *Action:* Load a page with an OG image URL of 2000 characters.
    - *Expected:* The `<meta property="og:image">` tag correctly renders the full URL without breaking the HTML structure.

## 3. Caveats
- Exact limits (e.g., file size max, max length for inputs) are assumed conceptually and will need actual values inserted during implementation.
- Mocking Supabase in Playwright requires intercepting network requests which assumes the application architecture queries the API directly from the client, or we intercept Next.js Server Actions/API routes.

## 4. Conclusion
30 Tier 2 E2E test cases have been fully defined. They encompass the requested boundary and corner cases for all 6 core features. These are ready for implementation in Playwright.

## 5. Verification Method
- **Method:** To verify, implementers should create `.spec.ts` files corresponding to these definitions and execute `npx playwright test`. 
- **Validation:** Tests should pass only when the Next.js application properly handles these boundary conditions as expected.

