import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './base-page';

export class ReportPage extends BasePage {
  protected page: Page;
  protected URL = '/report/2281af07-7ab5-40f3-8bea-360bf5db1836/overview'; // TODO: make URL dynamic based on the environment
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
