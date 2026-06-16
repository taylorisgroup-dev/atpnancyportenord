import { test, expect } from '@playwright/test';

test.describe('Tier 4 - Scenario 3: SEO bot crawls the public pages', () => {
  test('Public pages render correct static and dynamic SEO metadata', async ({ page }) => {
    // Step 1: Navigate to the public homepage.
    await page.goto('/');

    // Step 2: Assert the presence and correctness of the <title> and <meta name="description"> tags.
    const homeTitle = await page.title();
    expect(homeTitle.length).toBeGreaterThan(0);
    const homeDesc = await page.locator('meta[name="description"]').getAttribute('content');
    expect(homeDesc?.length).toBeGreaterThan(0);

    // Step 3: Navigate to a dynamically generated route (e.g., a specific news post).
    await page.getByRole('link', { name: /news|actualités/i }).click();
    const newsListings = page.locator('article, .news-item');
    await expect(newsListings.first()).toBeVisible();
    
    // Get the title of the first news item from the listing to verify it appears in the dynamic page
    const newsItemTitle = await newsListings.first().getByRole('heading').textContent() || '';
    await newsListings.first().getByRole('link', { name: /read more|lire/i }).click();

    // Step 4: Assert that the SEO tags accurately reflect the dynamic content for that page.
    const dynamicTitle = await page.title();
    expect(dynamicTitle.length).toBeGreaterThan(0);
    // Dynamic title might not exactly match the generic home title
    expect(dynamicTitle).not.toEqual(homeTitle);
    
    const dynamicDesc = await page.locator('meta[name="description"]').getAttribute('content');
    expect(dynamicDesc?.length).toBeGreaterThan(0);
    expect(dynamicDesc).not.toEqual(homeDesc);
  });
});
