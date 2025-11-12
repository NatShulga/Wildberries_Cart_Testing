exports.config = {
    runner: 'local',
    specs: ['./tests/specs/**/*.js'],//автоматич-й запуск всех тестов
    maxInstances: 1,
    capabilities: [
        // Desktop - Chrome
        {
            maxInstances: 1,
            browserName: 'chrome',
            'goog:chromeOptions': {
                args: [
                    // '--headless',  // УБИРАЕМ на время отладки
                    '--disable-gpu',
                    '--no-sandbox',
                    '--window-size=1920,1080'
                ]
            }
        },
        // Tablet - iPad эмуляция
        {
            maxInstances: 1,
            browserName: 'chrome', 
            'goog:chromeOptions': {
                mobileEmulation: { deviceName: 'iPad' },
                args: [
                    '--disable-gpu',
                    '--no-sandbox',
                    '--window-size=768,1024'
                ]
            }
        },
        // Mobile - iPhone эмуляция
        {
            maxInstances: 1,
            browserName: 'chrome', 
            'goog:chromeOptions': {
                mobileEmulation: { deviceName: 'iPhone X' },
                args: [
                    '--disable-gpu',
                    '--no-sandbox'
                ]
            }
        }
    ],
    logLevel: 'info',
    bail: 0,
    baseUrl: 'https://www.wildberries.ru',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
    services: ['chromedriver']
}
