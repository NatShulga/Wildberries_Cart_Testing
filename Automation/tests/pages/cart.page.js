import BasePage from './base.page.js';

export default class CartPage extends BasePage {
    
    // Селекторы для страницы корзины
    get cartItems() { return $$('.basket-section__list .list-item'); }
    get emptyCartMessage() { return $('.basket-empty__title'); }
    get totalPrice() { return $('.basket-order__price-total'); }
    get deleteButtons() { return $$('.btn-remove'); }

    async getCartItemsCount() {
        const items = await this.cartItems;
        return items.length;
    }

    async removeFirstItem() {
        const deleteBtns = await this.deleteButtons;
        if (deleteBtns.length > 0) {
            await this.click(deleteBtns[0]);
            await browser.pause(2000); // Ждем обновления корзины
            return true;
        }
        return false;
    }

    async isCartEmpty() {
        try {
            await this.waitForElement(this.emptyCartMessage, 5000);
            return await this.emptyCartMessage.isDisplayed();
        } catch {
            return false;
        }
    }
}
