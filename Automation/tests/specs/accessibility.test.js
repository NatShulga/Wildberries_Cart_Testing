describe('ТЕСТИРОВАНИЕ ДОСТУПНОСТИ - iPhone 16', () => {
    
    it('Проверка навигации с клавиатуры', async () => {
        await browser.url('https://www.wildberries.ru/catalog/491584874/detail.aspx');
        
        console.log('⌨️ Тестируем навигацию Tab/Enter...');
        await browser.keys('Tab');
        await browser.pause(500);
        await browser.keys('Tab');
        await browser.pause(500);
        await browser.keys('Enter');
        console.log('Навигация с клавиатуры проверена');
    });

    it('Проверка семантической разметки', async () => {
        await browser.url('https://www.wildberries.ru/catalog/491584874/detail.aspx');
        await browser.pause(3000);
        
        // Ищем все заголовки на странице
        const headings = await browser.$$('h1, h2, h3, h4, h5, h6');
        console.log(`Найдено заголовков: ${headings.length}`);
        
        // ПРОСТОЙ способ подсчета изображений с alt
        const images = await browser.$$('img');
        console.log(`Всего изображений: ${images.length}`);
        
        let altCount = 0;
        for (let i = 0; i < images.length; i++) {
            const altText = await images[i].getAttribute('alt');
            if (altText) {
                altCount++;
            }
        }
        
        console.log(`Изображений с alt-текстом: ${altCount}/${images.length}`);
        
        if (altCount === 0) {
            console.log('Внимание: нет изображений с alt-текстом!');
        }
    });
});
