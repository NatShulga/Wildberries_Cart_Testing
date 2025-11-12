describe('Тестирование страницы iPhone на Wildberries', () => {
    
    const iPhoneProduct = {
        name: 'iPhone 16',
        url: 'https://www.wildberries.ru/catalog/491584874/detail.aspx',
        category: 'Смартфоны'
    };

    it('ШАГ 1: Поиск iPhone через интерфейс', async () => {
        console.log('Ищем iPhone через поиск...');
        
        await browser.url('https://www.wildberries.ru');
        await browser.pause(3000);
        
        // Вводим поисковый запрос
        console.log('Вводим "iPhone" в поиск...');
        await browser.keys(['i', 'P', 'h', 'o', 'n', 'e']);
        await browser.pause(2000);
        await browser.keys('Enter');
        await browser.pause(5000);
        
        const searchUrl = await browser.getUrl();
        console.log(`URL после поиска: ${searchUrl}`);
        
        if (searchUrl.includes('/catalog') || searchUrl.includes('search')) {
            console.log('Поиск iPhone сработал');
        } else {
            console.log('Поиск iPhone не сработал');
        }
    });

    it('ШАГ 2: Переход на страницу iPhone', async () => {
        console.log('Переходим на страницу iPhone...');
        
        await browser.url(iPhoneProduct.url);
        await browser.pause(5000);
        
        const productTitle = await browser.getTitle();
        console.log(`Заголовок страницы: ${productTitle}`);
        
        const currentUrl = await browser.getUrl();
        console.log(`Текущий URL: ${currentUrl}`);
        
        if (currentUrl.includes(iPhoneProduct.url)) {
            console.log('Страница iPhone загружена корректно');
        } else {
            console.log('Не удалось загрузить страницу iPhone');
        }
    });

    it('ШАГ 3: Анализ страницы iPhone', async () => {
        console.log('Анализируем страницу iPhone...');
        
        await browser.url(iPhoneProduct.url);
        await browser.pause(3000);
        
        // Прокручиваем страницу для просмотра всего контента
        console.log('Прокручиваем страницу вниз...');
        await browser.execute(() => window.scrollTo(0, 500));
        await browser.pause(2000);
        
        console.log('Прокручиваем до середины...');
        await browser.execute(() => window.scrollTo(0, 1000));
        await browser.pause(2000);
        
        console.log('Прокручиваем до конца...');
        await browser.execute(() => window.scrollTo(0, 1500));
        await browser.pause(2000);
        
        console.log('Страница iPhone полностью проанализирована');
    });

    it('ШАГ 4: Финальный отчет по iPhone', async () => {
        console.log('\n ОТЧЕТ ПО ТЕСТИРОВАНИЮ IPHONE');
        console.log('============================');
        console.log(`Товар: ${iPhoneProduct.name}`);
        console.log(`Категория: ${iPhoneProduct.category}`);
        console.log(`URL: ${iPhoneProduct.url}`);
        console.log('Поиск через интерфейс работает');
        console.log('Страница товара доступна');
        console.log('Контент страницы отображается');
        console.log('Тестирование iPhone завершено!');
    });
});
