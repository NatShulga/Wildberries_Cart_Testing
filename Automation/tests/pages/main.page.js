import BasePage from './base.page.js';

export default class MainPage extends BasePage {
    
    // Селекторы для главной страницы Wildberries
    get searchInput() { return $('input#searchInput'); }
    get searchButton() { return $('button#applySearchBtn'); }
    get catalogButton() { return $('button#catalogButton'); }
    get cartIcon() { return $('a[href*="/lk/basket"]'); }
    get cartCounter() { return $('.j-item-count'); }

    async searchForProduct(productName) {
        try {
            await this.setValue(this.searchInput, productName);
            await browser.keys('Enter');
            await browser.pause(3000); // Ждем загрузки результатов
            return true;
        } catch (error) {
            console.log('Search error:', error);
            return false;
        }
    }

    async getCartItemsCount() {
        try {
            await this.waitForElement(this.cartCounter);
            const count = await this.cartCounter.getText();
            return parseInt(count) || 0;
        } catch (error) {
            return 0;
        }
    }
}
