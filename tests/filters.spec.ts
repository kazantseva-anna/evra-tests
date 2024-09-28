import { test, expect } from '@playwright/test';
import { PropertyMapPage } from '../pages/property-map-page';

test.describe('Filters Tests', () => {
  test.beforeEach(async ({ page }) => {
    const propertyMapPage = new PropertyMapPage(page);
    await propertyMapPage.login();
    await propertyMapPage.navigate('load');
  });

  test('applying filters updates list of properties', async ({ page }) => {  
    // check initial state
    const propertyMapPage = new PropertyMapPage(page);  // FIXME: do not create it twice
    // FIXME: get amount of properties with
    // '(277 Properties)'.match(/\(([0-9]+)/)[1]
    await expect(propertyMapPage.totalResultsStr).toContainText('(500+ Properties)'); 
    const firstAddress = await propertyMapPage.firstAddressStr.textContent();

    // apply filters
    await page.getByTestId('YearBuilt-minimum').fill('2022');
    await page.getByTestId('YearBuilt-maximum').fill('2024');
    await page.getByTestId('YearBuilt-include-unknown').check();
    await page.getByTestId('A+').click();
    
    // the search results should change 
    await expect(propertyMapPage.totalResultsStr).not.toContainText('500+');
    await expect(propertyMapPage.firstAddressStr).not.toContainText(firstAddress); // FIXME: TS complains
  });  

});

