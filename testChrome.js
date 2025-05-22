// testChrome.js - Script básico para probar ChromeDriver
const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async () => {
  try {
    console.log('Iniciando prueba básica de Chrome...');
    const driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(new chrome.Options()
        .addArguments('--no-sandbox')
        .addArguments('--disable-dev-shm-usage')
      )
      .build();

    await driver.get('https://www.google.com');
    console.log('Título de la página:', await driver.getTitle());
    await driver.quit();
    console.log('Prueba exitosa!');
  } catch (error) {
    console.error('Error en prueba básica:', error);
  }
})();