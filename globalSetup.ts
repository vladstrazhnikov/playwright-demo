import { chromium, expect } from '@playwright/test';
import LoginPage from './pages/login.page';
import { defaultUser, supportUser } from './fixtures/user';

async function globalSetup() {
    const browser = await chromium.launch();

    const page = await browser.newPage();
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(defaultUser.username, defaultUser.password);
    await expect(page.locator('#sidebar-region')).toBeVisible();
    await page.context().storageState({ path: 'storage/defaultUserState.json' });

    const page2 = await browser.newPage();
    const loginPage2 = new LoginPage(page2);
    await loginPage2.navigate();
    await loginPage2.login(supportUser.username, supportUser.password);
    await expect(page2.locator('#sidebar-region')).toBeVisible();
    await page2.context().storageState({ path: 'storage/supportUserState.json' });

    await browser.close();
}

export default globalSetup;