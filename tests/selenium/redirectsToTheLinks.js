const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { expect } = require('chai');

describe('Redirección al presionar enlaces de hospedaje', function () {
  this.timeout(30000);

  let driver;

  before(async () => {
    const options = new chrome.Options();
    options.addArguments('--disable-gpu');
    options.addArguments('--no-sandbox');

    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .usingServer('http://localhost:4444')
      .build();

    await driver.get('http://localhost:3000');
  });

  it('Debe redirigir a Airbnb al presionar el enlace', async () => {
    await driver.wait(until.elementLocated(By.id('map')), 10000);
    await driver.sleep(3000);

    // Simula clic en la alcaldía Coyoacán
    await driver.executeScript(`
      const targetName = 'Coyoacán'.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

      let clicked = false;
      map.eachLayer(layer => {
        if (layer.feature && layer.feature.properties && !clicked) {
          const name = layer.feature.properties.NOMGEO;
          const normalized = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
          if (normalized === targetName) {
            layer.fire('click');
            clicked = true;
          }
        }
      });

      if (!clicked) throw new Error('No se encontró Coyoacán en el mapa');
    `);

    // Espera que aparezca el enlace de Airbnb
    const airbnbLink = await driver.wait(
      until.elementLocated(By.css('#lugares-list a[href*="airbnb.com"]')),
      10000
    );

    const originalWindow = await driver.getWindowHandle();

    // Hacer clic en el enlace y esperar la nueva pestaña
    await airbnbLink.click();

    await driver.wait(async () => {
      const handles = await driver.getAllWindowHandles();
      return handles.length > 1;
    }, 10000);

    const windows = await driver.getAllWindowHandles();
    const newWindow = windows.find(w => w !== originalWindow);

    await driver.switchTo().window(newWindow);

    // Esperar que cargue una URL que contenga airbnb.com
    await driver.wait(until.urlMatches(/^https:\/\/www\.airbnb\./), 10000);
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.include('airbnb.mx');

    console.log(`✅ Redirigido correctamente a: ${currentUrl}`);

    await driver.close(); // cerrar pestaña externa
    await driver.switchTo().window(originalWindow);
  });

  after(async () => {
    await driver.quit();
  });
});
