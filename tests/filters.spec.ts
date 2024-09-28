import { test, expect } from '@playwright/test';
import { BasePage } from '../base-page';

test.describe('Filters Tests', () => {
  test.beforeEach(async ({ page }) => {
    const basePage = new BasePage(page);
    await basePage.login();
    await basePage.navigate('/properties', 'load');
  });

  test('applying filters updates list of properties', async ({ page }) => {  
    // TODO: implement Page Object Model and move locators to PropertiesPage object
    const totalResultsLocator = page.getByTestId('panel-2').locator('.text-sm');
    const firstAddressLocator = page.getByTestId('is-highlight-false').locator('.cursor-pointer').first();

    await expect(totalResultsLocator).toContainText('(500+ Properties)');
    const firstAddress = await firstAddressLocator.textContent();

    // apply filters
    await page.getByTestId('YearBuilt-minimum').fill('2022');
    await page.getByTestId('YearBuilt-maximum').fill('2024');
    await page.getByTestId('YearBuilt-include-unknown').check();
    await page.getByTestId('A+').click();
    
    // the search results are changed 
    await expect(totalResultsLocator).not.toContainText('500+');
    await expect(firstAddressLocator).not.toContainText(firstAddress); 
  });  

});

