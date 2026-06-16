# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tier1\5-cv-extraction-api.spec.ts >> CV Extraction API >> should reject non-PDF file types
- Location: tests\e2e\tier1\5-cv-extraction-api.spec.ts:14:7

# Error details

```
Error: apiRequestContext.post: connect ECONNREFUSED ::1:3000
Call log:
  - → POST http://localhost:3000/api/extract-cv
    - user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.96 Safari/537.36
    - accept: */*
    - accept-encoding: gzip,deflate,br
    - content-type: multipart/form-data; boundary=----WebKitFormBoundaryk3x9ezL3BW1TmZGL
    - content-length: 193

```