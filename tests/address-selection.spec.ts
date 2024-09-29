import { test, expect } from '@playwright/test';
import { SearchPage } from '../pages/search-page';

test.describe('Address Selection Tests', () => {
  test.beforeEach(async ({ page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.login();
    await searchPage.navigate('networkidle');
  });

  test('user can select an address from dropdown and go to report page', async ({
    page,
  }) => {
    const searchPage = new SearchPage(page);
    await expect(page).toHaveScreenshot('searchPage.png');

    // select an address without street
    await searchPage.searchField.fill('e');
    await searchPage.addressItem.nth(1).click();
    await expect(searchPage.addressItem).not.toBeVisible();

    // edit selected address should show dropdown
    await searchPage.searchField.click();
    await page.waitForLoadState('networkidle');
    await searchPage.searchField.pressSequentially('ee');
    await expect(searchPage.addressItem.first()).toBeVisible();
    await expect(searchPage.searchError).toContainText(
      'Please input an address with a valid street number.',
    );
  });
});
