import { test, expect } from '@playwright/test';
import { BasePage } from '../base-page';

test.describe('Address Selection Tests', () => {
  test.beforeEach(async ({ page }) => {
    const basePage = new BasePage(page);
    await basePage.login();
  });

  test('user can select an address from dropdown', async ({ page }) => {  
    await page.locator('.search-input').fill('Amster');
    await page.locator('.pac-item').nth(1).click();
    await page.locator('.search-input').click();
    await page.waitForURL('**/overview')
    await expect(page.locator('[aria-label="Map marker"]')).toBeVisible();
  });  

  // TODO: add tests for error messages
});

