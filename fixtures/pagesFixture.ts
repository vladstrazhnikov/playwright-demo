import { test as base, Page } from "@playwright/test";
import LoginPage from "../pages/login.page";
import HomePage from "../pages/home.page";


type pages = {
    loginPage: LoginPage;
    homePage: HomePage;
};

const test = base.extend<pages>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
});

export { test };