exports.config = {
    runner: 'local',
    specs: ['./tests/specs/simple.test.js'],
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: ['--headless', '--window-size=1920,1080']
        }
    }],
    logLevel: 'info',
    waitforTimeout: 10000,
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        timeout: 60000
    },
    services: ['chromedriver']
}
