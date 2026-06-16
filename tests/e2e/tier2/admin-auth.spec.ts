import { test, expect } from '@playwright/test';

test.describe('Tier 2: Admin Auth (Boundaries & Corner Cases)', () => {

  test('Case 11: Input Boundary - Empty Fields', async ({ page }) => {
    await page.goto('/admin/login');
    
    // Wait for the form to be ready
    await page.waitForLoadState('networkidle');
    const submitButton = page.locator('button[type="submit"]');
    if (await submitButton.isVisible()) {
      await submitButton.click();
      
      // Check for validation error messages
      const bodyText = await page.locator('body').textContent();
      expect(bodyText?.toLowerCase()).toMatch(/requis|required|obligatoire|invalid/);
    }
  });

  test('Case 12: Input Boundary - Massive String', async ({ page }) => {
    await page.goto('/admin/login');
    
    const longString = 'A'.repeat(10000);
    const inputs = page.locator('input:not([type="hidden"])');
    
    if (await inputs.count() >= 2) {
      // Typically email and password
      await inputs.nth(0).fill(longString);
      await inputs.nth(1).fill(longString);
      await page.click('button[type="submit"]');
    }
    
    // Shouldn't crash
    const bodyExists = await page.locator('body').isVisible();
    expect(bodyExists).toBe(true);
  });

  test('Case 13: Input Boundary - XSS/SQLi Payload', async ({ page }) => {
    await page.goto('/admin/login');
    
    const payload = "<script>alert(1)</script>' OR 1=1--";
    const inputs = page.locator('input:not([type="hidden"])');
    
    if (await inputs.count() >= 2) {
      await inputs.nth(0).fill(payload);
      await inputs.nth(1).fill('password123');
      await page.click('button[type="submit"]');
    }
    
    // Verify it doesn't log in and stays on login page or shows error
    await page.waitForTimeout(500); // small wait for redirect or error
    expect(page.url()).toContain('/admin/login');
  });

  test('Case 14: Session Boundary - Missing Token', async ({ page, context }) => {
    await context.clearCookies();
    await page.goto('/admin/dashboard');
    
    // Immediate redirect back to /admin/login
    expect(page.url()).toContain('/admin/login');
  });

  test('Case 15: Session Boundary - Malformed Token', async ({ page, context }) => {
    // Navigate to any page to ensure context URL is valid for cookies
    await page.goto('/');
    const url = new URL(page.url());
    
    await context.addCookies([{
      name: 'session',
      value: 'invalid_token_123',
      domain: url.hostname,
      path: '/'
    }]);
    
    await page.goto('/admin/dashboard');
    
    // Unauthorized response and redirect to login
    expect(page.url()).toContain('/admin/login');
  });
});
