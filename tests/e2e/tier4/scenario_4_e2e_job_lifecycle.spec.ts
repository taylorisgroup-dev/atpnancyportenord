import { test, expect } from '@playwright/test';

test.describe('Tier 4 - Scenario 4: End-to-End Job Lifecycle', () => {
  test('Admin creates a job and visitor applies', async ({ browser }) => {
    // Step 1: Log in as admin and navigate to the Job creation panel.
    const adminContext = await browser.newContext();
    const adminPage = await adminContext.newPage();
    
    await adminPage.goto('/admin/login');
    await adminPage.getByLabel(/email/i).fill('admin@test.com');
    await adminPage.getByLabel(/password/i).fill('password123');
    await adminPage.getByRole('button', { name: /login/i }).click();
    
    await adminPage.getByRole('link', { name: /jobs|carrières/i }).click();
    await adminPage.getByRole('button', { name: /add|créer/i }).click();

    // Step 2: Create and publish a new job vacancy with unique identifying text.
    const uniqueJobTitle = `E2E Test Job ${Date.now()}`;
    await adminPage.getByLabel(/title|titre/i).fill(uniqueJobTitle);
    await adminPage.getByLabel(/description/i).fill('This is a test job description.');
    await adminPage.getByRole('button', { name: /save|publier/i }).click();
    await expect(adminPage.getByText(/success/i)).toBeVisible();
    await adminContext.close();

    // Step 3: Clear the session (or use a fresh browser context) and navigate to the public Jobs page.
    const visitorContext = await browser.newContext();
    const visitorPage = await visitorContext.newPage();
    
    let apiTriggered = false;
    await visitorPage.route('**/api/cv-extract', async (route) => {
      apiTriggered = true;
      await route.fulfill({ status: 200, body: JSON.stringify({ success: true }) });
    });

    await visitorPage.goto('/');
    await visitorPage.getByRole('link', { name: /jobs|carrières/i }).click();

    // Step 4: Verify the newly created job appears via dynamic data loading.
    const newJobLocator = visitorPage.getByText(uniqueJobTitle);
    await expect(newJobLocator).toBeVisible();

    // Step 5: Click the job and upload a CV to apply, verifying the success flow.
    await newJobLocator.click(); // or navigate to details
    await visitorPage.getByLabel(/name|nom/i).fill('E2E Applicant');
    await visitorPage.getByLabel(/email/i).fill('applicant@e2e.com');
    
    const buffer = Buffer.from('dummy pdf content for E2E');
    await visitorPage.getByLabel(/cv|resume/i).setInputFiles({
      name: 'e2e_cv.pdf',
      mimeType: 'application/pdf',
      buffer
    });

    await visitorPage.getByRole('button', { name: /submit|postuler/i }).click();
    await expect(visitorPage.getByText(/success|succès/i)).toBeVisible();
    expect(apiTriggered).toBe(true);
    
    await visitorContext.close();
  });
});
