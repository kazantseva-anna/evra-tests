import { type Page, type Locator } from '@playwright/test'
import { BasePage } from './base-page'

export class ReportPage extends BasePage {
  protected page: Page
  protected URL = '/report/f75373c3-3a30-4d29-bdc6-278e4052984a/overview' // TODO: make it dynamic based on the environment
  
  constructor(page: Page) {
    super(page)
    this.page = page
  }

}
