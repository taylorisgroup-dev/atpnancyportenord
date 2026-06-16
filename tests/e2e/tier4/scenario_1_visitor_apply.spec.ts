import { test, expect } from '@playwright/test';

test.describe('Tier 4 - Scenario 1: Visitor reads home and applies to job', () => {
  test('Visitor views public content and applies via CV extraction', async ({ page }) => {
    // Intercept CV Extraction API
    let apiTriggered = false;
    await page.route('**/api/cv-extract', async (route) => {
      apiTriggered = true;
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, parsedData: { name: 'John Doe' } })
      });
    });

    // Step 1: Navigate to the homepage and verify the public content renders correctly.
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    // Step 2: Navigate to the Jobs page and verify dynamic job listings are populated.
    await page.getByRole('link', { name: /jobs|carrières/i }).click();
    await expect(page).toHaveURL(/.*(jobs|carrieres).*/);
    const jobListings = page.locator('article, .job-listing');
    await expect(jobListings.first()).toBeVisible();

    // Step 3: Select a job and submit an application with a mock PDF CV.
    await jobListings.first().getByRole('link', { name: /details|postuler|apply/i }).click();
    
    // Fill application form
    await page.getByLabel(/name|nom/i).fill('Test Visitor');
    await page.getByLabel(/email/i).fill('test@visitor.com');
    
    // Create a dummy PDF buffer or file input
    const buffer = Buffer.from('dummy pdf content');
    await page.getByLabel(/cv|resume/i).setInputFiles({
      name: 'mock_cv.pdf',
      mimeType: 'application/pdf',
      buffer
    });

    await page.getByRole('button', { name: /submit|postuler/i }).click();

    // Step 4: Verify the submission success message and ensure the CV Extraction API logic was triggered
    await expect(page.getByText(/success|succès|merci/i)).toBeVisible();
    expect(apiTriggered).toBe(true);
  });
});
