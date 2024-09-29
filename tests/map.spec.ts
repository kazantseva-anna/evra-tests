import { test, expect } from '@playwright/test';
import { ReportPage } from '../pages/report-page';

test.describe('Map Tests', () => {
  test.beforeEach(async ({ page }) => {
    const reportPage = new ReportPage(page);
    await reportPage.login();
    await reportPage.navigate('networkidle');
    //await expect(page).toHaveScreenshot('reportPage.png');
  });

  // TODO: Check with stakeholders the most common user scenarion on the map
  test('user can interact with a map', async ({ page }) => {
    const reportPage = new ReportPage(page);
    await expect(reportPage.mapMarker).toBeVisible();
    await reportPage.mapMarker.click();
    await expect(reportPage.neighborhoodRatingsPopup).toBeVisible();

    // interact with categories section
    await reportPage.housingCategory.click();
    await expect(reportPage.neighborhoodRatingsPopup).not.toBeVisible();
    await expect(reportPage.housingScoreSublayer).not.toBeVisible();
    await reportPage.housingCategoriesPointer.click();
    await expect(reportPage.housingScoreSublayer).toBeVisible();

    // interact with statistics popup
    await reportPage.mapMarker.click();
    await expect(reportPage.neighborhoodStatisticsPopup).toContainText(
      'Housing',
    );
    await reportPage.closePopupBtn.click();
    await expect(reportPage.neighborhoodStatisticsPopup).not.toBeVisible();
  });
});
