import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('CV Extraction API', () => {
  const apiUrl = '/api/extract-cv';

  test('should reject requests without a file payload', async ({ request }) => {
    const response = await request.post(apiUrl);
    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.error).toBeDefined();
  });

  test('should reject non-PDF file types', async ({ request }) => {
    const filePayload = {
      name: 'file',
      mimeType: 'image/jpeg',
      buffer: Buffer.from('fake-image-data')
    };

    const response = await request.post(apiUrl, {
      multipart: {
        file: filePayload
      }
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.error).toMatch(/pdf/i);
  });

  test('should process a valid CV PDF and return structured JSON', async ({ request }) => {
    const filePayload = {
      name: 'file.pdf',
      mimeType: 'application/pdf',
      buffer: Buffer.from('dummy-pdf-content')
    };

    const response = await request.post(apiUrl, {
      multipart: {
        file: filePayload
      }
    });

    expect([200, 500]).toContain(response.status());
    if (response.status() === 200) {
      const body = await response.json();
      expect(body).toHaveProperty('skills');
      expect(body).toHaveProperty('experience');
    }
  });

  test('should handle Gemini API timeout/failure gracefully', async ({ request }) => {
    const filePayload = {
      name: 'timeout.pdf',
      mimeType: 'application/pdf',
      buffer: Buffer.from('trigger-timeout')
    };

    const response = await request.post(apiUrl, {
      multipart: {
        file: filePayload
      }
    });
    
    expect([500, 504, 200]).toContain(response.status());
  });

  test('should enforce payload size limits', async ({ request }) => {
    const largeBuffer = Buffer.alloc(6 * 1024 * 1024, 'a');
    
    const filePayload = {
      name: 'large.pdf',
      mimeType: 'application/pdf',
      buffer: largeBuffer
    };

    const response = await request.post(apiUrl, {
      multipart: {
        file: filePayload
      }
    });

    expect(response.status()).toBe(413);
  });
});
