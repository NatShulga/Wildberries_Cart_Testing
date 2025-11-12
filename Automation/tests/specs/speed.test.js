describe('Тестирование скорости загрузки iPhone', () => {
    
    it('Измеряем сколько грузится страница', async () => {
        console.log('Засекаем время...');
        
        const startTime = Date.now();
        await browser.url('https://www.wildberries.ru/catalog/491584874/detail.aspx');
        await browser.pause(3000);
        const endTime = Date.now();
        const loadTime = endTime - startTime;
        
        console.log(`Страница загрузилась за: ${loadTime} миллисекунд`);
        
        if (loadTime < 4000) {
            console.log('✅ Быстро!');
        } else {
            console.log('⚠️ Медленно!');
        }
    });

    it('Проверяем 3 раза подряд', async () => {
        console.log('Проверяем 3 раза...');
        
        for (let i = 1; i <= 3; i++) {
            const startTime = Date.now();
            await browser.url('https://www.wildberries.ru/catalog/491584874/detail.aspx');
            await browser.pause(3000);
            const endTime = Date.now();
            const loadTime = endTime - startTime;
            
            console.log(`Попытка ${i}: Загрузилось за ${loadTime} мс`);
        }
        
        console.log('✅ Проверили 3 раза!');
    });
});
