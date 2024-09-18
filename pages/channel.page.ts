import { Locator, Page } from '@playwright/test';

export default class ChannelPage {
    readonly page: Page;
    readonly messageComposer: Locator;
    readonly sendButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.messageComposer = page.locator('textarea[name="msg"]');
        this.sendButton = page.locator('button[aria-label="Send"]');
    }

    // Create channel
    // await page.locator('button[title="Create new"]').click();
    // await page.locator('label[data-key="channel"]').click();
    // await page.locator('input[data-qa-type="channel-name-input"]').fill('DefaultChat');
    // await page.locator('button[data-qa-type="create-channel-confirm-button"]').click();

    async enterText(text: string) {
        await this.messageComposer.fill(text);
    }

    async uploadFile(file: string) {
        // TDB
    }

    async clickLoginButton() {
        await this.sendButton.click();
    }

    async sendMessage(text: string, attachment?: string) {
        await this.enterText(text);

        if (attachment) {
            await this.uploadFile(attachment);
        }

        await this.clickLoginButton();
    }
}
