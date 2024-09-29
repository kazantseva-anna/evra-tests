import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './base-page';

export class PropertyMapPage extends BasePage {
  protected page: Page;
  protected URL = '/properties';
  public totalResultsStr: Locator;
  public firstAddressStr: Locator;
  public minYearBuiltFilter: Locator;
  public maxYearBuiltFilter: Locator;
  public yearBuiltIncludeUnknownCheckbox: Locator;
  public ratingAPlusBtn: Locator;
  public overviewModules: Locator;
  public interactiveMapPanel: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.totalResultsStr = page.getByTestId('panel-2').locator('.text-sm');
    this.firstAddressStr = page
      .getByTestId('is-highlight-false')
      .locator('.cursor-pointer')
      .first();
    this.minYearBuiltFilter = page.getByTestId('YearBuilt-minimum');
    this.maxYearBuiltFilter = page.getByTestId('YearBuilt-maximum');
    this.yearBuiltIncludeUnknownCheckbox = page.getByTestId(
      'YearBuilt-include-unknown',
    );
    this.ratingAPlusBtn = page.getByTestId('A+');
    this.overviewModules = page.getByTestId('overview-module');
    this.interactiveMapPanel = page.locator('#neighborhood-map-report-panel');
  }

  // TODO: pass filters dynamically as params
  async applyFilters() {
    await this.minYearBuiltFilter.fill('2022');
    await this.maxYearBuiltFilter.fill('2024');
    await this.yearBuiltIncludeUnknownCheckbox.check();
    await this.ratingAPlusBtn.click();
  }
}
