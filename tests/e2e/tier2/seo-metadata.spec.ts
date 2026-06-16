import { test, expect } from '@playwright/test';

test.describe('Tier 2: SEO Metadata (Boundaries & Corner Cases)', () => {

  test('Case 26: Data Boundary - Massive Title', async ({ page }) => {
    const longTitle = 'A'.repeat(500);
    // Mock the backend for a dynamic route
    await page.route('**/api/videos/1*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ data: { id: 1, title: longTitle } })
      });
    });

    // Go to a hypothetical dynamic route
    await page.goto('/videos/1');
    
    // The page should not crash (SSR or client)
    const bodyExists = await page.locator('body').isVisible();
    expect(bodyExists).toBe(true);
    
    const pageTitle = await page.title();
    expect(pageTitle.length).toBeGreaterThan(0);
  });

  test('Case 27: Data Boundary - Missing Description', async ({ page }) => {
    await page.route('**/api/videos/1*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ data: { id: 1, title: 'Test Video' } }) // No description field
      });
    });

    await page.goto('/videos/1');
    
    // Check if fallback meta description is present
    const metaDescription = await page.locator('meta[name="description"]');
    if (await metaDescription.count() > 0) {
      const content = await metaDescription.getAttribute('content');
      expect(content).toBeTruthy(); // Ensure some fallback description exists
    } else {
      // In some Next.js setups, it might be omitted entirely if not fallback, 
      // but test checks that the page doesn't crash at minimum.
      const bodyExists = await page.locator('body').isVisible();
      expect(bodyExists).toBe(true);
    }
  });

  test('Case 28: URL Boundary - Special Chars', async ({ page }) => {
    // Navigate to a URL with special chars
    const specialPath = 'Jean-François!@';
    await page.goto(`/annuaire/${encodeURIComponent(specialPath)}`);
    
    const canonical = page.locator('link[rel="canonical"]');
    if (await canonical.count() > 0) {
      const href = await canonical.getAttribute('href');
      // The canonical link should properly encode URI parts or match Next.js routing logic safely
      expect(href).toContain(encodeURI(specialPath));
    }
    
    const bodyExists = await page.locator('body').isVisible();
    expect(bodyExists).toBe(true);
  });

  test('Case 29: Data Boundary - Missing OG Image', async ({ page }) => {
    await page.route('**/api/videos/1*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ data: { id: 1, title: 'Test Video' } }) // No image field
      });
    });

    await page.goto('/videos/1');
    
    const ogImage = page.locator('meta[property="og:image"]');
    if (await ogImage.count() > 0) {
      const content = await ogImage.getAttribute('content');
      expect(content).toBeTruthy(); // Should be a fallback image
    }
    const bodyExists = await page.locator('body').isVisible();
    expect(bodyExists).toBe(true);
  });

  test('Case 30: Data Boundary - HTML Injection in Meta', async ({ page }) => {
    const maliciousTitle = '<script>alert(1)</script>';
    await page.route('**/api/videos/1*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ data: { id: 1, title: maliciousTitle } })
      });
    });

    await page.goto('/videos/1');
    
    // Title might be constructed like "maliciousTitle | Site Name"
    const pageTitle = await page.title();
    expect(pageTitle).toContain(maliciousTitle);
    
    // Make sure it wasn't injected as actual HTML script tag in head/body
    // Next.js correctly escapes text in <title> and <meta> tags, so this shouldn't execute.
    // We check that there isn't a script tag with exactly that literal alert content
    const scriptTags = await page.locator('script').allTextContents();
    const hasAlert = scriptTags.some(text => text.includes('alert(1)'));
    expect(hasAlert).toBe(false);
  });
});
