/* eslint-disable no-unused-vars */

import { type Page, expect } from '@playwright/test'

export class BasePage {
  protected page: Page
  protected URL: string
  
  constructor(page: Page) {
    this.page = page
    this.URL = ''
  }

  // TODO: login through api instead of UI
  async login (userCredentials = ['evraqamanual@test.wd.com', 'Zxcvbn@123']) {
    await this.page.goto('');
    await this.page.waitForLoadState();
  
    await expect(this.page.getByTestId('login-button')).toBeVisible();
    const token = JSON.stringify({ purposes: { SaleOfInfo: true, Analytics: true, Advertising: true, Functional: true }, timestamp: new Date().toISOString(), confirmed: true, prompted: true, updated: true });
    await this.page.evaluate(token => localStorage.setItem('tcmConsent', token), token)
    await this.page.reload();
    await this.page.getByTestId('login-button').click();
  
    // Login
    await this.page.locator('[data-se="o-form-input-identifier"] input').fill(userCredentials[0]);
    await this.page.locator('.button').getByText('Next').click();
  
    await this.page.locator('[data-se="o-form-input-credentials.passcode"] input').fill(userCredentials[1]);
    await this.page.locator('.button').getByText('Verify').click();
    await this.page.waitForLoadState('networkidle');
  }
}
