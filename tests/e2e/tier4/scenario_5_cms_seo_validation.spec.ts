import { test, expect } from '@playwright/test';

test.describe('Tier 4 - Scenario 5: CMS and SEO Validation Loop', () => {
  test('Admin modifies page content and SEO, bot verifies them', async ({ browser }) => {
    // Step 1: Log in as admin and navigate to the Content Management (Pages) section.
    const adminContext = await browser.newContext();
    const adminPage = await adminContext.newPage();
    
    await adminPage.goto('/admin/login');
    await adminPage.getByLabel(/email/i).fill('admin@test.com');
    await adminPage.getByLabel(/password/i).fill('password123');
    await adminPage.getByRole('button', { name: /login/i }).click();
    
    await adminPage.getByRole('link', { name: /pages|content/i }).click();

    // Step 2: Update the text and SEO metadata for a specific public page.
    await adminPage.getByRole('link', { name: /about|à propos/i }).click();
    
    const timestamp = Date.now();
    const uniqueContent = `Updated about content ${timestamp}`;
    const uniqueSeoTitle = `About Us - ${timestamp}`;
    const uniqueSeoDesc = `Discover our story ${timestamp}`;

    await adminPage.getByLabel(/content|contenu/i).fill(uniqueContent);
    await adminPage.getByLabel(/seo title|titre seo/i).fill(uniqueSeoTitle);
    await adminPage.getByLabel(/seo description/i).fill(uniqueSeoDesc);
    await adminPage.getByRole('button', { name: /save|enregistrer/i }).click();
    await expect(adminPage.getByText(/success/i)).toBeVisible();
    await adminContext.close();

    // Step 3: Switch to an unauthenticated browser context.
    const publicContext = await browser.newContext();
    const publicPage = await publicContext.newPage();

    // Step 4: Navigate to the modified page and verify the updated text content renders.
    await publicPage.goto('/about'); // Assuming /about is the updated page
    await expect(publicPage.getByText(uniqueContent)).toBeVisible();

    // Step 5: Verify the <title> and meta description tags match the newly saved data.
    const title = await publicPage.title();
    expect(title).toContain(uniqueSeoTitle);
    
    const metaDesc = await publicPage.locator('meta[name="description"]').getAttribute('content');
    expect(metaDesc).toBe(uniqueSeoDesc);

    await publicContext.close();
  });
});
