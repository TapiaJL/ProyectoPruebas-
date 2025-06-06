const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

describe('Simular clic en alcaldía en el mapa (Leaflet)', function () {
  this.timeout(10000); // Aumentar timeout porque puede tardar

  let driver;

  before(async () => {
    const options = new chrome.Options();
    options.addArguments('--disable-gpu');
    options.addArguments('--no-sandbox');

    // 🔧 Conexión directa al servidor de ChromeDriver
    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .usingServer('http://localhost:4444') // ¡Esta línea es crucial si corres ChromeDriver manual!
      .build();

    console.log('🌐 Cargando página...');
    await driver.get('http://localhost:3000');
  });

  it('Debe simular clic en Coyoacán y mostrar zonas turísticas', async () => {
    await driver.wait(until.elementLocated(By.id('map')), 600);
    await driver.sleep(3000); // Espera a que se renderice el GeoJSON

    console.log('🖱️ Simulando clic en la capa de Coyoacán...');

    await driver.executeScript(`
      const targetName = 'Coyoacán'.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase();
      let found = false;

      map.eachLayer(function(layer) {
        if (layer.feature && layer.feature.properties) {
          const name = layer.feature.properties.NOMGEO;
          const normalized = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase();
          if (normalized === targetName) {
            layer.fire('click');
            found = true;
          }
        }
      });

      if (!found) {
        throw new Error('No se encontró la alcaldía: Coyoacán');
      }
    `);

    // Esperar a que aparezca al menos una zona turística
    await driver.wait(until.elementLocated(By.css('#zonas-list .zona-item')), 5000);

    const zonas = await driver.findElements(By.css('#zonas-list .zona-item'));
    const nombresZonas = [];

    for (const zona of zonas) {
      const h4 = await zona.findElement(By.css('h4'));
      const texto = await h4.getText();
      nombresZonas.push(texto);
    }

    console.log('📌 Zonas mostradas:', nombresZonas);

    if (nombresZonas.length === 0) {
      throw new Error('❌ No se mostraron zonas turísticas para Coyoacán.');
    }
  });

  after(async () => {
    console.log('🧹 Cerrando navegador...');
    await driver.quit();
  });
});
