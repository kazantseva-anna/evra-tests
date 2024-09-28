import { type Page, expect } from '@playwright/test'

export class BasePage {
  protected page: Page
  protected URL = ''
  
  constructor(page: Page) {
    this.page = page
  }

  async navigate(loadState: 'load' | 'domcontentloaded' | 'networkidle' = 'networkidle'): Promise<void> {
    await this.page.goto(this.URL)
    await this.page.waitForLoadState(loadState)
  }

  // TODO: login through api instead of UI
  async login (): Promise<void> {
    await this.page.goto('');
    await this.page.waitForLoadState();
    await expect(this.page.getByTestId('login-button')).toBeVisible();

    // Allow the cookies
    const token = JSON.stringify({ purposes: { SaleOfInfo: true, Analytics: true, Advertising: true, Functional: true }, timestamp: new Date().toISOString(), confirmed: true, prompted: true, updated: true });
    await this.page.evaluate(token => localStorage.setItem('tcmConsent', token), token)
    await this.page.reload();
    await this.page.getByTestId('login-button').click();
  
    // Login
    if (!process.env.USER_NAME) { process.env.USER_NAME = 'evraqamanual@test.wd.com' }
    if (!process.env.PASSWORD) { process.env.PASSWORD = 'Zxcvbn@123' }

    await this.page.locator('[data-se="o-form-input-identifier"] input').fill(process.env.USER_NAME);
    await this.page.locator('.button').getByText('Next').click();
    await this.page.locator('[data-se="o-form-input-credentials.passcode"] input').fill(process.env.PASSWORD);
    await this.page.locator('.button').getByText('Verify').click();
    await this.page.waitForURL('**/search')
  }
}
