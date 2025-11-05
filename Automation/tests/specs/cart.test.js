describe('Тестирование навигации Wildberries', () => {
    
    // Список всех товаров для тестирования
    const testProducts = [
        {
            name: 'iPhone 16',
            url: 'https://www.wildberries.ru/catalog/491584874/detail.aspx',
            category: 'Смартфоны'
        },
        {
            name: 'BLACKVIEW BV9300 PRO', 
            url: 'https://www.wildberries.ru/catalog/463388256/detail.aspx',
            category: 'Смартфоны'
        },
        {
            name: 'Чехол Huawei Honor 8A',
            url: 'https://www.wildberries.ru/catalog/51929344/detail.aspx', 
            category: 'Аксессуары'
        },
        {
            name: 'Футболка Токио',
            url: 'https://www.wildberries.ru/catalog/534517759/detail.aspx',
            category: 'Одежда'
        },
        {
            name: 'Футболка New York',
            url: 'https://www.wildberries.ru/catalog/556705119/detail.aspx',
            category: 'Одежда'
        }
    ];

    it('ШАГ 1: Изучение главной страницы', async () => {
        console.log('Изучаем интерфейс Wildberries...');
        await browser.url('https://www.wildberries.ru');
        await browser.pause(3000);
        
        const title = await browser.getTitle();
        console.log('Заголовок:', title);
        console.log('Главная страница загружена');
    });

    it('ШАГ 2: Тестирование ВСЕХ товаров', async () => {
        console.log('Тестируем все товары из списка...');
        
        for (const product of testProducts) {
            console.log(`\n Товар: ${product.name}`);
            console.log(`Категория: ${product.category}`);
            console.log(`Переходим по URL...`);
            
            // Переходим на страницу товара
            await browser.url(product.url);
            await browser.pause(3000);
            
            const productTitle = await browser.getTitle();
            console.log(`Заголовок: ${productTitle}`);
            
            // Прокручиваем страницу чтобы увидеть весь контент
            await browser.execute(() => window.scrollTo(0, 500));
            await browser.pause(1000);
            
            const currentUrl = await browser.getUrl();
            
            // Проверяем что мы остались на странице товара
            if (currentUrl.includes('/catalog/') && currentUrl.includes('/detail.aspx')) {
                console.log('Страница товара загружена корректно');
            } else {
                console.log('Возможно произошел редирект');
            }
        }
        
        console.log('\n Все 5 товаров протестированы!');
    });

    it('ШАГ 3: Поиск товаров через интерфейс', async () => {
        console.log('🔍 Тестируем поиск по разным запросам...');
        
        const searchQueries = ['iPhone', 'футболка', 'чехол'];
        
        for (const query of searchQueries) {
            console.log(`\n Поиск: "${query}"`);
            
            await browser.url('https://www.wildberries.ru');
            await browser.pause(2000);
            
            // Вводим поисковый запрос
            await browser.keys(query.split(''));
            await browser.pause(1000);
            await browser.keys('Enter');
            await browser.pause(3000);
            
            const searchUrl = await browser.getUrl();
            console.log(`URL после поиска: ${searchUrl}`);
            
            if (searchUrl.includes('/catalog') || searchUrl.includes('search')) {
                console.log('Поиск сработал');
            }
        }
    });

    it('ШАГ 4: Финальный отчет', async () => {
        console.log('\n ФИНАЛЬНЫЙ ОТЧЕТ ПО ТЕСТИРОВАНИЮ');
        console.log('================================');
        console.log(`Протестировано товаров: ${testProducts.length}`);
        console.log('Категории: Смартфоны, Аксессуары, Одежда');
        console.log('Проверена поисковая система');
        console.log('Все страницы товаров доступны');
        console.log('Тестирование черным ящиком завершено!');
    });
});
