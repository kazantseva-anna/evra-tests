import { test, expect } from '@playwright/test';
import { SearchPage } from '../pages/search-page';
import { PropertyMapPage } from '../pages/property-map-page';

test.describe('Address Selection Tests', () => {
  test.beforeEach(async ({ page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.login();
    await searchPage.navigate();
  });

  // TODO: add tests for error messages
  test('user can select an address from dropdown and go to report page', async ({ page }) => {  
    const searchPage = new SearchPage(page);
    await searchPage.searchAddress('Amster')

    const propertyMapPage = new PropertyMapPage(page);
    expect(propertyMapPage.overviewModules).toBeVisible();
    expect(propertyMapPage.interactiveMapPanel).toBeVisible();
  });  
});

