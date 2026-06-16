import { test, expect } from '@playwright/test';

test.describe('Tier 4 - Scenario 2: Admin logs in and updates organigramme', () => {
  test('Admin authentication and data mutation in organigramme', async ({ page }) => {
    // Step 1: Navigate to the admin login page and authenticate with valid credentials.
    await page.goto('/admin/login');
    await page.getByLabel(/email|utilisateur/i).fill('admin@test.com');
    await page.getByLabel(/password|mot de passe/i).fill('password123');
    await page.getByRole('button', { name: /login|connexion/i }).click();

    // Step 2: Access the "Organigramme" management dashboard.
    // Assuming redirection to admin dashboard
    await expect(page).toHaveURL(/.*admin.*/);
    await page.getByRole('link', { name: /organigramme/i }).click();
    await expect(page).toHaveURL(/.*organigramme.*/);

    // Step 3: Submit a form to add or update an employee's data.
    const uniqueEmployeeName = `Test Employee ${Date.now()}`;
    await page.getByRole('button', { name: /add|ajouter/i }).click();
    await page.getByLabel(/name|nom/i).fill(uniqueEmployeeName);
    await page.getByLabel(/role|rôle/i).fill('QA Engineer');
    await page.getByRole('button', { name: /save|enregistrer/i }).click();

    // Step 4: Validate that the updated information is visible in the admin UI table/list.
    await expect(page.getByText(/success|succès/i)).toBeVisible();
    const row = page.getByRole('row', { name: new RegExp(uniqueEmployeeName, 'i') });
    await expect(row).toBeVisible();
  });
});
