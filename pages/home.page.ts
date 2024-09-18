import { Page } from '@playwright/test';

export default class HomePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('localhost/dashboard');
  }

  async openChannel(channelName) {
    await this.page.getByText(channelName).click();
  }
}
