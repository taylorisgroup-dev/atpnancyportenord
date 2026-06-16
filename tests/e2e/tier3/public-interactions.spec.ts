import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('Tier 3: Public Interactions & Pairwise Integration', () => {

  test('Test A: Dynamic SEO on Public Pages (Features 1, 2, 6)', async ({ page }) => {
    // Navigate to a dynamically generated job page
    await page.goto('/jobs/developer-123');

    // 1 & 2: Verify public UI renders correctly with dynamic data
    await expect(page.locator('h1')).toContainText('Software Developer');
    await expect(page.locator('.job-description')).toBeVisible();

    // 6: Verify SEO metadata matches dynamic content
    const title = await page.title();
    expect(title).toBe('Software Developer - ATP Nancy');
    
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /Join our team as a Software Developer/);

    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute('content', 'Software Developer - ATP Nancy');
  });

  test('Test B: Public CV Submission on Dynamic Page (Features 1, 2, 5)', async ({ page }) => {
    // Intercept CV Extraction API
    await page.route('/api/cv-extract', async route => {
      const json = { success: true, parsedData: { name: 'John Doe', email: 'john@example.com' } };
      await route.fulfill({ json });
    });

    await page.goto('/jobs/developer-123');

    // Verify dynamic data loading
    await expect(page.locator('h1')).toContainText('Software Developer');

    // Submit CV file
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.locator('button:has-text("Apply with CV")').click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles({
      name: 'resume.pdf',
      mimeType: 'application/pdf',
      buffer: Buffer.from('dummy pdf content')
    });

    await page.locator('button:has-text("Submit Application")').click();

    // Verify the UI gracefully handles the parsed data
    await expect(page.locator('.application-success')).toBeVisible();
    await expect(page.locator('.parsed-name')).toHaveText('John Doe');
    await expect(page.locator('.parsed-email')).toHaveText('john@example.com');
  });

  test('Test C: CV Extraction Success & SEO Validation (Features 5, 6)', async ({ page }) => {
    // Mock the submission to redirect to success page
    await page.route('/api/cv-submit', async route => {
      await route.fulfill({ status: 200, json: { redirectUrl: '/application/success-456' } });
    });

    await page.goto('/jobs/developer-123/apply');
    
    // Fill required fields
    await page.fill('input[name="applicantName"]', 'Jane Doe');
    await page.locator('button:has-text("Confirm & Send")').click();

    // Wait for redirect to success page
    await page.waitForURL('/application/success-456');

    // 6: Verify SEO metadata on success page enforces noindex
    const metaRobots = page.locator('meta[name="robots"]');
    await expect(metaRobots).toHaveAttribute('content', 'noindex, nofollow');
    
    // Ensure applicant name isn't somehow leaked in the title for SEO safety
    const title = await page.title();
    expect(title).toBe('Application Successful');
  });

});
