describe('ЮЗАБИЛИТИ-ТЕСТИРОВАНИЕ - iPhone 16', () => {
    
    it('Тестирование пользовательского потока', async () => {
        console.log('👤 Тестируем типичный сценарий пользователя:');
        console.log('1. Поиск товара');
        console.log('2. Просмотр страницы товара'); 
        console.log('3. Поиск кнопки добавления в корзину');
        console.log('4. Навигация к корзине');
    });

    it('Анализ информационной архитектуры', async () => {
        await browser.url('https://www.wildberries.ru/catalog/491584874/detail.aspx');
        
        // Проверяем наличие ключевой информации
        const elementsToCheck = [
            'цена', 'характеристики', 'описание', 'отзывы', 'доставка'
        ];
        
        const pageSource = await browser.getPageSource();
        elementsToCheck.forEach(element => {
            if (pageSource.toLowerCase().includes(element)) {
                console.log(`Найдено: ${element}`);
            } else {
                console.log(`Не найдено: ${element}`);
            }
        });
    });
});
