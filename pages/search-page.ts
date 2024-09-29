import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './base-page';

export class SearchPage extends BasePage {
  protected page: Page;
  protected URL = '/search';
  public searchField: Locator;
  public addressItem: Locator;
  public searchError: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.searchField = page.locator('.search-input');
    this.addressItem = page.locator('.pac-item');
    this.searchError = page.getByTestId('span-search-error');
  }
}
