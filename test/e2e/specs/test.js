// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default e2e tests': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .assert.visible('#searchInput')
      .setValue('#searchInput', 'github')
      .click('button[name=searchButton]')
      .pause(1000)
      .assert.elementPresent('.card')
      .end()
  }
}
