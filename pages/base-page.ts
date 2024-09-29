import { type Page, expect } from '@playwright/test';

export class BasePage {
  protected page: Page;
  protected URL = '';

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(
    loadState: 'load' | 'domcontentloaded' | 'networkidle' = 'networkidle',
  ): Promise<void> {
    await this.page.goto(this.URL);
    await this.page.waitForLoadState(loadState);
  }

  // TODO: login through api instead of UI
  async login(
    login = process.env.USER_NAME,
    password = process.env.PASSWORD,
  ): Promise<void> {
    await this.page.goto('');
    await this.page.waitForLoadState();
    await expect(this.page.getByTestId('login-button')).toBeVisible();

    // Allow the cookies
    const token = JSON.stringify({
      purposes: {
        SaleOfInfo: true,
        Analytics: true,
        Advertising: true,
        Functional: true,
      },
      timestamp: new Date().toISOString(),
      confirmed: true,
      prompted: true,
      updated: true,
    });
    await this.page.evaluate(
      (token) => localStorage.setItem('tcmConsent', token),
      token,
    );
    await this.page.reload();
    await this.page.getByTestId('login-button').click();

    if (!login || !password) {
      throw new Error(
        'User credentials are missing. Provided login: <' +
          login +
          '> and password: <' +
          password +
          '>',
      );
    }

    // Login
    await this.page
      .locator('[data-se="o-form-input-identifier"] input')
      .fill(login);
    await this.page.locator('.button').getByText('Next').click();
    await this.page
      .locator('[data-se="o-form-input-credentials.passcode"] input')
      .fill(password);
    await this.page.locator('.button').getByText('Verify').click();
    await this.page.waitForURL('**/search');
  }
}
