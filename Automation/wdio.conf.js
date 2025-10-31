exports.config = {
    runner: 'local',
    specs: ['./tests/specs/**/*.js'],
    maxInstances: 1,
    capabilities: [{
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
    }],
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