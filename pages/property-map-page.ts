import { type Page, type Locator } from '@playwright/test'
import { BasePage } from './base-page'

export class PropertyMapPage extends BasePage {
  protected page: Page
  protected URL = '/properties'
  public totalResultsStr: Locator
  public firstAddressStr: Locator
  public mapZoomInBtn: Locator
  
  constructor(page: Page) {
    super(page)
    this.page = page
    this.totalResultsStr = page.getByTestId('panel-2').locator('.text-sm')
    this.firstAddressStr = page.getByTestId('is-highlight-false').locator('.cursor-pointer').first()
    this.mapZoomInBtn = page.locator('[aria-label="Zoom in"]')
  }
}
