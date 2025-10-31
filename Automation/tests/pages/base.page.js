export default class BasePage {
    async open(path = '') {
        await browser.url(`https://www.wildberries.ru/${path}`);
        await browser.pause(2000);
    }

    async click(element) {
        await element.waitForClickable({ timeout: 10000 });
        await element.click();
    }

    async setValue(element, value) {
        await element.waitForDisplayed({ timeout: 10000 });
        await element.setValue(value);
    }

    async waitForElement(element, timeout = 10000) {
        await element.waitForDisplayed({ timeout });
    }
}
