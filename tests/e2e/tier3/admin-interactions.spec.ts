import { test, expect } from '@playwright/test';

test.describe('Tier 3: Admin Interactions & Pairwise Integration', () => {

  test.beforeEach(async ({ page }) => {
    // Mock login for admin routes
    await page.route('/api/auth/session', async route => {
      await route.fulfill({
        status: 200,
        json: { user: { role: 'ADMIN', name: 'Admin User' } }
      });
    });
  });

  test('Test D: Admin Content Mutation & Dynamic Preview (Features 2, 3, 4, 6)', async ({ page }) => {
    // 3: Admin logs in securely (mocked in beforeEach)
    await page.goto('/admin/jobs/new');
    await expect(page.locator('h1')).toHaveText('Create New Job');

    // 4: Admin mutates content
    await page.fill('input[name="title"]', 'Senior DevOps Engineer');
    await page.fill('textarea[name="description"]', 'Manage our cloud infrastructure.');
    
    // Mock the creation endpoint
    await page.route('/api/admin/jobs', async route => {
      await route.fulfill({ status: 201, json: { id: 'devops-999', slug: 'senior-devops-engineer' } });
    });

    await page.locator('button:has-text("Save & Preview")').click();

    // 2: Check dynamic preview
    await page.waitForURL('/admin/preview/jobs/senior-devops-engineer');
    await expect(page.locator('.preview-pane h1')).toHaveText('Senior DevOps Engineer');

    // 6: Check generated SEO metadata in the preview
    const generatedTitle = await page.locator('.seo-preview-title').innerText();
    expect(generatedTitle).toBe('Senior DevOps Engineer - ATP Nancy');
    
    const generatedDesc = await page.locator('.seo-preview-desc').innerText();
    expect(generatedDesc).toContain('Manage our cloud infrastructure.');
  });

  test('Test E: Admin Moderation of Extracted CVs (Features 3, 4, 5)', async ({ page }) => {
    // 3: Admin logs in securely
    await page.goto('/admin/cv-upload');

    // 5: Upload CV using the Extraction API directly from admin panel
    await page.route('/api/cv-extract', async route => {
      await route.fulfill({
        status: 200,
        json: { 
          success: true, 
          parsedData: { name: 'Alice Smith', skills: ['React', 'Node.js'] } 
        }
      });
    });

    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.locator('button:has-text("Upload CV File")').click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles({
      name: 'alice_cv.pdf',
      mimeType: 'application/pdf',
      buffer: Buffer.from('alice resume content')
    });

    // Wait for the extraction to populate the form
    await expect(page.locator('input[name="candidateName"]')).toHaveValue('Alice Smith');
    await expect(page.locator('input[name="skills"]')).toHaveValue('React, Node.js');

    // 4: Admin modifies extracted results and submits mutation
    await page.fill('input[name="skills"]', 'React, Node.js, TypeScript');
    
    await page.route('/api/admin/candidates', async route => {
      await route.fulfill({ status: 201, json: { success: true, id: 'cand-123' } });
    });

    await page.locator('button:has-text("Save Candidate Profile")').click();

    // Verify success state
    await expect(page.locator('.toast-success')).toContainText('Candidate profile saved');
  });

});
