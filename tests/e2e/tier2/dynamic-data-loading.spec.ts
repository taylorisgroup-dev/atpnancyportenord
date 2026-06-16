import { test, expect } from '@playwright/test';

test.describe('Tier 2: Dynamic Data Loading (Boundaries & Corner Cases)', () => {

  test('Case 6: Data Boundary - Empty List', async ({ page }) => {
    // Intercept API call and fulfill with []
    // Note: Assuming a generic pattern since we don't have exact routes
    await page.route('**/api/annuaire*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ data: [], count: 0 })
      });
    });

    await page.goto('/annuaire');
    
    // UI should show a fallback message
    const bodyText = await page.locator('body').textContent();
    // Assuming 'aucun' or similar fallback is rendered
    expect(bodyText?.toLowerCase()).toMatch(/aucun|no data|vide/);
  });

  test('Case 7: Data Boundary - Massive List', async ({ page }) => {
    const massiveData = Array.from({ length: 5000 }, (_, i) => ({
      id: i.toString(),
      name: `User ${i}`,
      role: 'Test'
    }));

    await page.route('**/api/annuaire*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ data: massiveData, count: 5000 })
      });
    });

    await page.goto('/annuaire');
    
    // Page renders
    const bodyExists = await page.locator('body').isVisible();
    expect(bodyExists).toBe(true);
    
    // Should not render 5000 elements at once due to pagination/virtualization
    // Since we don't know the exact class, we just make sure page responds
    const allLinks = await page.locator('a').count();
    expect(allLinks).toBeLessThan(5000); 
  });

  test('Case 8: Data Boundary - Extreme String Length', async ({ page }) => {
    const longString = 'A'.repeat(10000);
    await page.route('**/api/annuaire*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: [{ id: '1', name: 'Extreme User', description: longString }],
          count: 1
        })
      });
    });

    await page.goto('/annuaire');
    
    // Layout does not break
    await expect(page.locator('body')).toContainText('Extreme User');
  });

  test('Case 9: Data Boundary - Missing Fields', async ({ page }) => {
    await page.route('**/api/annuaire*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: [{ id: '1', name: 'Missing Fields User' }], // omitting image, description
          count: 1
        })
      });
    });

    await page.goto('/annuaire');
    
    // Render without crashing
    await expect(page.locator('body')).toContainText('Missing Fields User');
    const bodyExists = await page.locator('body').isVisible();
    expect(bodyExists).toBe(true);
  });

  test('Case 10: Pagination Boundary - Invalid Params', async ({ page }) => {
    const response = await page.goto('/annuaire?page=-1&limit=999999');
    
    // Check if API returns 400 or handles it gracefully by defaulting parameters
    expect([200, 400, 404]).toContain(response?.status());
    
    const bodyExists = await page.locator('body').isVisible();
    expect(bodyExists).toBe(true);
  });
});
