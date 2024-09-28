import { type Page, type Locator } from '@playwright/test'
import { BasePage } from './base-page'

export class SearchPage extends BasePage {
  protected page: Page
  protected URL = '/search'
  
  constructor(page: Page) {
    super(page)
    this.page = page
  
  }

  async searchAddress(address: string) {
    await this.page.locator('.search-input').fill(address);
    await this.page.locator('.pac-item').nth(1).click();
    await this.page.locator('.search-input').click();
    await this.page.waitForURL('**/overview')
  }
}
