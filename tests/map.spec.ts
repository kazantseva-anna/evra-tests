import { test, expect } from '@playwright/test';
import { ReportPage } from '../pages/report-page';

test.describe('Map Tests', () => {
  test.beforeEach(async ({ page }) => {
    const reportPage = new ReportPage(page);
    await reportPage.login();
    await reportPage.navigate('networkidle');
  });

  // TODO: Check with stakeholders the most common user scenarion on the map
  test('user can interact with a map', async ({ page }) => {  
    await expect(page.locator('[aria-label="Map marker"]')).toBeVisible();
    
    await page.locator('[aria-label="Map marker"]').click();
    await expect(page.getByTestId('neighborhood-popup-ratings')).toBeVisible();

    await page.getByTestId('Housing').click();
    await expect(page.getByTestId('neighborhood-popup-ratings')).not.toBeVisible();
    await expect(page.getByTestId('sublayer-HousingScore')).not.toBeVisible();
    await page.getByTestId('map-layer-categories').locator('.cursor-pointer').nth(2).click(); // TODO: add a proper data-test attribute to droprdown buttons

    await page.locator('[aria-label="Map marker"]').click();
    await expect(page.getByTestId('sublayer-HousingScore')).toBeVisible();
    await page.locator('[aria-label="Close popup"]').first().click();
    await expect(page.getByTestId('neighborhood-popup-ratings')).not.toBeVisible();
  });  

});

