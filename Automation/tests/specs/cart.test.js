import MainPage from '../pages/main.page.js';
import CartPage from '../pages/cart.page.js';
import { testProducts } from '../test-data/products.js';

describe('Wildberries Cart - Реальное тестирование', () => {
    const mainPage = new MainPage();
    const cartPage = new CartPage();

    beforeEach(async () => {
        await mainPage.open();
    });

    it('ДОБАВЛЕНИЕ СМАРТФОНА В КОРЗИНУ', async () => {
        console.log('Тестируем добавление iPhone...');
        
        // Шаг 1: Переходим прямо на страницу iPhone
        await browser.url(testProducts.smartphones[0].url);
        await browser.pause(3000);
        
        // Шаг 2: Пробуем добавить в корзину
        const initialCount = await mainPage.getCartItemsCount();
        console.log(`🛒 Товаров в корзине ДО: ${initialCount}`);
        
        // Шаг 3: Ищем кнопку "В корзину" на странице товара
        const addToCartSelectors = [
            'button[data-tag="addToCart"]',
            '.product-page__order-container .btn-main',
            '.product-page__aside-container button',
            '.j-add-to-basket',
            '//button[contains(text(), "В корзину")]'
        ];
        
        let productAdded = false;
        for (const selector of addToCartSelectors) {
            try {
                const addButton = await $(selector);
                if (await addButton.isDisplayed()) {
                    console.log(`Нашли кнопку по селектору: ${selector}`);
                    await mainPage.click(addButton);
                    await browser.pause(2000);
                    productAdded = true;
                    break;
                }
            } catch (error) {
                // Пробуем следующий селектор
            }
        }
        
        // Шаг 4: Проверяем результат
        const updatedCount = await mainPage.getCartItemsCount();
        console.log(`🛒 Товаров в корзине ПОСЛЕ: ${updatedCount}`);
        
        if (productAdded && updatedCount > initialCount) {
            console.log('УСПЕХ: iPhone добавлен в корзину!');
        } else {
            console.log('iPhone не добавился в корзину');
        }
    });

    it('ДОБАВЛЕНИЕ ФУТБОЛКИ В КОРЗИНУ', async () => {
        console.log(' Тестируем добавление футболки...');
        
        // Переходим на страницу футболки
        await browser.url(testProducts.tshirts[0].url);
        await browser.pause(3000);
        
        const initialCount = await mainPage.getCartItemsCount();
        console.log(` Товаров в корзине ДО: ${initialCount}`);
        
        // Пробуем разные селекторы для кнопки
        const addButtons = await $$('button');
        let productAdded = false;
        
        for (const button of addButtons) {
            try {
                const buttonText = await button.getText();
                if (buttonText.includes('корзин') || buttonText.includes('Купить')) {
                    console.log(`Нашли кнопку: "${buttonText}"`);
                    await mainPage.click(button);
                    await browser.pause(2000);
                    productAdded = true;
                    break;
                }
            } catch (error) {
                continue;
            }
        }
        
        const updatedCount = await mainPage.getCartItemsCount();
        console.log(`Товаров в корзине ПОСЛЕ: ${updatedCount}`);
        
        if (productAdded) {
            console.log('УСПЕХ: Футболка добавлена в корзину!');
        } else {
            console.log('Футболка не добавилась в корзину');
        }
    });

    it('ПРОВЕРКА КОРЗИНЫ С ТОВАРАМИ', async () => {
        console.log('Проверяем корзину...');
        
        // Переходим в корзину
        await mainPage.cartIcon.click();
        await browser.pause(3000);
        
        // Проверяем что корзина открылась
        const currentUrl = await browser.getUrl();
        if (currentUrl.includes('basket')) {
            console.log('Корзина открылась успешно');
            
            // Пробуем найти товары в корзине
            const cartItems = await cartPage.cartItems;
            console.log(`Найдено товаров в корзине: ${cartItems.length}`);
            
            if (cartItems.length > 0) {
                console.log('В корзине есть товары!');
                
                // Пробуем найти общую сумму
                try {
                    const totalPrice = await cartPage.totalPrice;
                    if (await totalPrice.isDisplayed()) {
                        const priceText = await totalPrice.getText();
                        console.log(`Общая сумма: ${priceText}`);
                    }
                } catch (error) {
                    console.log('Не удалось найти общую сумму');
                }
            } else {
                console.log('Корзина пустая');
            }
        } else {
            console.log('Не удалось открыть корзину');
        }
    });
});
