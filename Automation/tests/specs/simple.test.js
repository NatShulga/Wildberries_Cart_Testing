describe('Проверка окружения', () => {
    it('должен открыть Wildberries', async () => {
        await browser.url('https://www.wildberries.ru');
        await browser.pause(3000);
        
        const title = await browser.getTitle();
        console.log('✅ Заголовок страницы:', title);
        
        // Простая проверка
        expect(title).toContain('Wildberries');
    });
});
