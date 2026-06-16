import { test, expect } from '@playwright/test';

test.describe('Admin Mutations', () => {
  test.beforeEach(async ({ page }) => {
    // Mock login step or login actually
    await page.goto('/admin/login');
    await page.fill('input[name="email"]', 'admin@example.com');
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    await page.waitForURL(/\/admin\/dashboard/);
  });

  test('should render the admin dashboard layout and settings forms', async ({ page }) => {
    await page.goto('/admin/settings');
    await expect(page.locator('[data-testid="settings-form"]')).toBeVisible();
  });

  test('should update basic site settings successfully', async ({ page }) => {
    await page.goto('/admin/settings');
    await page.fill('input[name="siteName"]', 'New Site Name');
    await page.click('button[type="submit"]');
    await expect(page.locator('[data-testid="success-toast"]')).toBeVisible();
  });

  test('should add a new Job Offer', async ({ page }) => {
    await page.goto('/admin/emplois/new');
    await page.fill('input[name="title"]', 'New Job Position');
    await page.fill('textarea[name="description"]', 'Job Description');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/\/admin\/emplois/);
    await expect(page.locator('text=New Job Position')).toBeVisible();
  });

  test('should edit an existing Agenda event', async ({ page }) => {
    await page.goto('/admin/agenda');
    await page.click('[data-testid="edit-agenda-item-1"]');
    await page.fill('input[name="title"]', 'Updated Event Title');
    await page.click('button[type="submit"]');
    await expect(page.locator('text=Updated Event Title')).toBeVisible();
  });

  test('should delete an Organigramme member', async ({ page }) => {
    await page.goto('/admin/organigramme');
    page.on('dialog', dialog => dialog.accept());
    await page.click('[data-testid="delete-organigramme-item-1"]');
    await expect(page.locator('[data-testid="organigramme-item-1"]')).not.toBeVisible();
  });
});
