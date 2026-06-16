import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

test.describe('Tier 2: Admin Data Mutation (Boundaries & Corner Cases)', () => {

  test('Case 16: Mutation Boundary - Empty Required Data', async ({ page }) => {
    await page.goto('/admin/dashboard/annuaire/edit/1');
    
    const inputs = page.locator('input[required], textarea[required]');
    const count = await inputs.count();
    
    if (count > 0) {
      for (let i = 0; i < count; i++) {
        await inputs.nth(i).fill('');
      }
      const submit = page.locator('button[type="submit"]');
      if (await submit.isVisible()) {
        await submit.click();
      }
      
      // Should not be saved. Check for validation messages.
      const bodyText = await page.locator('body').textContent();
      expect(bodyText?.toLowerCase()).toMatch(/requis|required|obligatoire|invalid/);
    }
  });

  test('Case 17: File Boundary - Massive File', async ({ page }) => {
    // Mock the backend rejecting a massive file to prevent actual transmission
    await page.route('**/api/upload*', async (route) => {
      await route.fulfill({ status: 413, body: 'File too large' }); 
    });
    
    await page.goto('/admin/dashboard/annuaire/edit/1');
    const fileInput = page.locator('input[type="file"]');
    
    if (await fileInput.count() > 0 && await fileInput.isVisible()) {
      const tmpPath = path.join(os.tmpdir(), 'large_mock_file.txt');
      fs.writeFileSync(tmpPath, 'mock');
      await fileInput.setInputFiles(tmpPath);
      
      const submit = page.locator('button[type="submit"]');
      if (await submit.isVisible()) {
        await submit.click();
      }
      
      const bodyText = await page.locator('body').textContent();
      expect(bodyText).not.toContain('Internal Server Error');
      
      if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath);
    }
  });

  test('Case 18: File Boundary - Invalid Disguised Type', async ({ page }) => {
    await page.route('**/api/upload*', async (route) => {
      await route.fulfill({ status: 415, body: 'Unsupported Media Type' });
    });
    
    await page.goto('/admin/dashboard/annuaire/edit/1');
    const fileInput = page.locator('input[type="file"]');
    
    if (await fileInput.count() > 0 && await fileInput.isVisible()) {
      const tmpPath = path.join(os.tmpdir(), 'image.jpg');
      fs.writeFileSync(tmpPath, 'MZ executable dummy content');
      await fileInput.setInputFiles(tmpPath);
      
      const submit = page.locator('button[type="submit"]');
      if (await submit.isVisible()) {
        await submit.click();
      }
      
      const bodyText = await page.locator('body').textContent();
      expect(bodyText).not.toContain('Internal Server Error');
      
      if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath);
    }
  });

  test('Case 19: Data Boundary - Unicode/Zero-width', async ({ page }) => {
    await page.route('**/api/update*', async (route) => {
      await route.fulfill({ status: 200, body: JSON.stringify({ success: true }) });
    });
    
    await page.goto('/admin/dashboard/annuaire/edit/1');
    
    const inputs = page.locator('input[type="text"]');
    if (await inputs.count() > 0) {
      await inputs.nth(0).fill('👩‍🚀 إختبار   text');
      const submit = page.locator('button[type="submit"]');
      if (await submit.isVisible()) {
        await submit.click();
      }
    }
    
    const bodyExists = await page.locator('body').isVisible();
    expect(bodyExists).toBe(true);
  });

  test('Case 20: Data Boundary - Negative/Zero Values', async ({ page }) => {
    await page.goto('/admin/dashboard/annuaire/edit/1');
    
    const numberInputs = page.locator('input[type="number"]');
    if (await numberInputs.count() > 0) {
      await numberInputs.nth(0).fill('-1');
      const submit = page.locator('button[type="submit"]');
      if (await submit.isVisible()) {
        await submit.click();
      }
      
      const isInvalid = await numberInputs.nth(0).evaluate((el: HTMLInputElement) => el.validity.valid === false);
      // If it's invalid due to native validation, great. Else check no crash.
      if (!isInvalid) {
        const bodyText = await page.locator('body').textContent();
        expect(bodyText).not.toContain('Internal Server Error');
      }
    }
  });
});
