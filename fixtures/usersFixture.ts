import { test as base, Page } from "@playwright/test";
import LoginPage from "../pages/login.page";
import ChannelPage from "../pages/channel.page";
import HomePage from "../pages/home.page";

type usersFixutre = {
    user1: { loginPage: LoginPage, channelPage: ChannelPage, homePage: HomePage, page: Page };
    user2: { loginPage: LoginPage, channelPage: ChannelPage, homePage: HomePage, page: Page };
};

const test = base.extend<usersFixutre>({
    user1: async ({ browser }, use) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        const loginPage = new LoginPage(page);
        const channelPage = new ChannelPage(page);
        const homePage = new HomePage(page);
        await use({ loginPage, channelPage, homePage, page });
    },
    user2: async ({ browser }, use) => {
        const context = await browser.newContext({ storageState: 'storage/supportUserState.json' });
        const page = await context.newPage();
        const loginPage = new LoginPage(page);
        const channelPage = new ChannelPage(page);
        const homePage = new HomePage(page);
        await use({ loginPage, channelPage, homePage, page });
    },
});

export { test };
export const expect = test.expect;