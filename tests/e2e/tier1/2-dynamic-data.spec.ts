import { test, expect } from '@playwright/test';

test.describe('Dynamic Data Pages', () => {
  test('should load and display the Organigramme list', async ({ page }) => {
    await page.goto('/organigramme');
    await expect(page.locator('[data-testid="organigramme-list"]')).toBeVisible();
    const items = page.locator('[data-testid="organigramme-item"]');
    await expect(items.first()).toBeVisible();
  });

  test('should load and display the Directory (Annuaire) items', async ({ page }) => {
    await page.goto('/annuaire');
    await expect(page.locator('[data-testid="annuaire-list"]')).toBeVisible();
    const items = page.locator('[data-testid="annuaire-item"]');
    await expect(items.first()).toBeVisible();
  });

  test('should load and display Agenda events', async ({ page }) => {
    await page.goto('/agenda');
    await expect(page.locator('[data-testid="agenda-list"]')).toBeVisible();
    const events = page.locator('[data-testid="agenda-item"]');
    await expect(events.first()).toBeVisible();
  });

  test('should load and display Job Offers', async ({ page }) => {
    await page.goto('/emplois');
    await expect(page.locator('[data-testid="job-list"]')).toBeVisible();
    const jobs = page.locator('[data-testid="job-item"]');
    await expect(jobs.first()).toBeVisible();
  });

  test('should load and display Actions', async ({ page }) => {
    await page.goto('/actions');
    await expect(page.locator('[data-testid="actions-list"]')).toBeVisible();
    const actions = page.locator('[data-testid="action-item"]');
    await expect(actions.first()).toBeVisible();
  });
});
