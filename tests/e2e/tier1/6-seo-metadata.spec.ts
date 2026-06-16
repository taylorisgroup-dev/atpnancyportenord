import { test, expect } from '@playwright/test';

test.describe('SEO Metadata', () => {
  test('should have correct title and description on Home page', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/.+/);
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /.+/);
  });

  test('should have correct Open Graph tags on Home page', async ({ page }) => {
    await page.goto('/');
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute('content', /.+/);
    const ogType = page.locator('meta[property="og:type"]');
    await expect(ogType).toHaveAttribute('content', 'website');
  });

  test('should have dynamic SEO metadata on specific Job Offer page', async ({ page }) => {
    await page.goto('/emplois/1');
    await expect(page).toHaveTitle(/.*Emploi.*/i);
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute('content', /.+/);
  });

  test('should have canonical URLs defined', async ({ page }) => {
    await page.goto('/');
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute('href', /.+/);
  });

  test('should set robots meta tag appropriately', async ({ page }) => {
    await page.goto('/');
    const robots = page.locator('meta[name="robots"]');
    await expect(robots).toHaveAttribute('content', /index/i);
  });
});
