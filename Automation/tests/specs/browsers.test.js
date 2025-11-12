describe('Тестирование адаптивности iPhone 16 на разных устройствах', () => {
    
    const testResolutions = [
        { width: 1920, height: 1080, name: 'Десктоп' },
        { width: 768, height: 1024, name: 'Планшет' },
        { width: 375, height: 667, name: 'Мобильный' }
    ];

    it('Проверяем отображение на разных размерах экрана и определяем тип устройства', async () => {
        // Переходим на страницу iPhone
        await browser.url('https://www.wildberries.ru/catalog/491584874/detail.aspx');
        await browser.pause(3000); // Ждем загрузки страницы
        
        // ПОЛУЧАЕМ ИНФОРМАЦИЮ О ТЕКУЩЕМ УСТРОЙСТВЕ ИЗ КОНФИГА
        const caps = browser.capabilities; // Достаем настройки браузера из wdio.conf.js
        const deviceName = caps['goog:chromeOptions']?.mobileEmulation?.deviceName || 'Desktop';
        console.log('Устройство из конфига:', deviceName);
        
        // ОПРЕДЕЛЯЕМ ТИП УСТРОЙСТВА
        if (caps['goog:chromeOptions']?.mobileEmulation) {
            console.log('Это мобильное устройство - применить мобильные проверки');
            // при необходимости добавить проверка мобильного меню, тач-элементов и т.д.
        } else {
            console.log('Это десктоп - применяем десктоп проверки');
        }
        
        //ТЕСТИРУЕМ НА РАЗНЫХ РАЗРЕШЕНИЯХ
        for (const resolution of testResolutions) {
            console.log(`\n Тестируем разрешение: ${resolution.name} (${resolution.width}x${resolution.height})`);
            
            // УСТАНАВЛИВАЕМ РАЗМЕР ОКНА БРАУЗЕРА
            await browser.setWindowSize(resolution.width, resolution.height);
            await browser.pause(2000); // Ждем применения размера 2000 сек
            
            //ПРОВЕРЯЕМ КЛЮЧЕВЫЕ ЭЛЕМЕНТЫ СТРАНИЦЫ
            try {
                // Ищем элемент с ценой (рублями)
                const price = await $('//*[contains(text(), "₽")]').isDisplayed();
                // Ищем заголовок h1
                const title = await $('h1').isDisplayed();
                
                console.log(`Элементы на ${resolution.name}: Цена - ${price}, Заголовок - ${title}`);
                
                //МОЖНО ДОБАВИТЬ СКРИНШОТЫ ДЛЯ ОТЧЕТА здесь, но я не буду. 
                // await browser.saveScreenshot(`./screenshots/iphone_${resolution.name}.png`);
                
            } catch (error) {
                //ЕСЛИ ЭЛЕМЕНТЫ НЕ НАЙДЕНЫ - ЛОГИРУЕМ ОШИБКУ
                console.log(`Ошибка на ${resolution.name}: ${error.message}`);
            }
        }
        
        //ФИНАЛЬНЫЙ ОТЧЕТ
        console.log('\n Тестирование адаптивности завершено!');
        console.log(` Протестировано разрешений: ${testResolutions.length}`);
        console.log(` Тип устройства: ${deviceName}`);
    });
});
