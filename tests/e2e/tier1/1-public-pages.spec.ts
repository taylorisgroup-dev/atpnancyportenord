import { test, expect } from '@playwright/test';

test.describe('Public Pages', () => {
  test('should render the Home page with main sections', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });

  test('should render the About page content', async ({ page }) => {
    await page.goto('/about');
    await expect(page.locator('h1', { hasText: 'About' })).toBeVisible();
  });

  test('should render the President\'s message page', async ({ page }) => {
    await page.goto('/mot-du-president');
    await expect(page.locator('h1', { hasText: /Président/i })).toBeVisible();
  });

  test('should render the Contact page and form elements', async ({ page }) => {
    await page.goto('/contact');
    await expect(page.locator('form')).toBeVisible();
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should render the Legal page', async ({ page }) => {
    await page.goto('/legal');
    await expect(page.locator('h1', { hasText: /Mentions légales/i })).toBeVisible();
  });
});
