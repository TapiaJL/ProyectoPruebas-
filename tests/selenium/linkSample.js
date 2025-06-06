const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

describe('Validar enlaces de hospedaje al seleccionar una alcaldía', function () {
  this.timeout(20000);

  let driver;

  before(async () => {
    const options = new chrome.Options();
    options.addArguments('--disable-gpu');
    options.addArguments('--no-sandbox');

    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .usingServer('http://localhost:4444') // Asegúrate de tener ChromeDriver corriendo
      .build();

    await driver.get('http://localhost:3000');
  });

  it('Debe mostrar enlaces correctos al hacer clic en Coyoacán', async () => {
    await driver.wait(until.elementLocated(By.id('map')), 10000);
    await driver.sleep(3000); // Esperar a que el mapa esté listo

    // Ejecutar clic simulado en la capa de Coyoacán
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

    // Esperar que aparezca la lista de plataformas
    await driver.wait(until.elementLocated(By.css('#lugares-list .platform-item')), 5000);

    // Obtener los enlaces de la lista
    const links = await driver.findElements(By.css('#lugares-list .platform-item a'));
    const linkData = [];

    for (const link of links) {
      const href = await link.getAttribute('href');
      const text = await link.getText();
      linkData.push({ text, href });
    }

    // Verificar que los enlaces esperados estén presentes
    const esperado = [
      { text: 'Airbnb', contains: 'airbnb.com' },
      { text: 'Booking.com', contains: 'booking.com' },
      { text: 'Vrbo', contains: 'vrbo.com' }
    ];

    esperado.forEach(({ text, contains }) => {
      const match = linkData.find(link => link.text.includes(text) && link.href.includes(contains));
      if (!match) {
        throw new Error(`❌ Faltó el enlace de ${text} o su URL no es correcta.`);
      }
    });

    console.log('✅ Enlaces encontrados correctamente:', linkData.map(l => l.text).join(', '));
  });

  after(async () => {
    await driver.quit();
  });
});
