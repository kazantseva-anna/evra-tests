import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './base-page';

export class ReportPage extends BasePage {
  protected page: Page;
  // TODO: I've noticed that property id may change sometime.
  // I would like to check with the team why it happens and if there is a way
  // to land on the report directly instead of searching for the property in UI
  protected URL = 'report/8ccccdc9-73e7-47d0-91be-79a71a6ef764/overview';
  public mapMarker: Locator;
  public neighborhoodRatingsPopup: Locator;
  public neighborhoodStatisticsPopup: Locator;
  public housingScoreSublayer: Locator;
  public housingCategory: Locator;
  public housingCategoriesPointer: Locator;
  public closePopupBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.mapMarker = page.locator('[aria-label="Map marker"]');
    this.neighborhoodRatingsPopup = page.getByTestId(
      'neighborhood-popup-ratings',
    );
    this.neighborhoodStatisticsPopup = page.getByTestId(
      'neighborhood-popup-statistics',
    );
    this.housingScoreSublayer = page.getByTestId('sublayer-HousingScore');
    this.housingCategory = page.getByTestId('Housing');
    // TODO: create and add a proper data-test attribute
    this.housingCategoriesPointer = page
      .getByTestId('map-layer-categories')
      .locator('.cursor-pointer')
      .nth(2);
    this.closePopupBtn = page.locator('[aria-label="Close popup"]').first();
  }
}
