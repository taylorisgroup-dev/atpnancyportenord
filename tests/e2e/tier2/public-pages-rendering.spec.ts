import { test, expect } from '@playwright/test';

test.describe('Tier 2: Public Pages Rendering (Boundaries & Corner Cases)', () => {
  
  test('Case 1: Viewport Boundary - Minimum (320x480)', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 480 });
    await page.goto('/');
    
    // Check if elements do not overflow the horizontal axis
    const noHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth <= document.documentElement.clientWidth;
    });
    expect(noHorizontalOverflow).toBe(true);
  });

  test('Case 2: Viewport Boundary - Maximum (3840x2160)', async ({ page }) => {
    await page.setViewportSize({ width: 3840, height: 2160 });
    await page.goto('/');
    
    const bodyExists = await page.locator('body').isVisible();
    expect(bodyExists).toBe(true);
  });

  test('Case 3: URL Boundary - Non-existent deep path', async ({ page }) => {
    const response = await page.goto('/this/path/does/not/exist/at/all/123456789');
    
    expect(response?.status()).toBe(404);
    await expect(page.locator('body')).toContainText(/404|not found/i);
  });

  test('Case 4: Network Boundary - Slow 3G/Timeout', async ({ page }) => {
    test.setTimeout(15000); // Allow test to run longer
    
    await page.route('**/*', async (route) => {
      // Add a large delay
      await new Promise(resolve => setTimeout(resolve, 10000));
      await route.continue();
    });

    try {
      // It might timeout or load. We just ensure it doesn't cause an unhandled crash.
      await page.goto('/', { timeout: 12000 });
      const bodyExists = await page.locator('body').isVisible();
      expect(bodyExists).toBe(true);
    } catch (e) {
      // If it throws a timeout error from Playwright, that's expected behavior
      // The application itself shouldn't crash
      expect(e.message).toContain('Timeout');
    }
  });

  test('Case 5: Locale Boundary - Unsupported', async ({ page }) => {
    await page.setExtraHTTPHeaders({ 'Accept-Language': 'zh-CN,zh;q=0.9' });
    const response = await page.goto('/');
    
    expect(response?.ok()).toBeTruthy();
    
    const htmlLang = await page.evaluate(() => document.documentElement.lang);
    expect(htmlLang).toMatch(/^fr/i); // Expecting fallback to French
  });
});
