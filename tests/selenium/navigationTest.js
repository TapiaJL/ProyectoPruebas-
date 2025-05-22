const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { expect } = require('chai');
const fs = require('fs');

describe('Prueba del Mapa CDMX con ChromeDriver manual', function() {
  this.timeout(60000); // 60 segundos de timeout
  let driver;

  before(async function() {
    try {
      console.log('🔌 Conectando a ChromeDriver en puerto 4444...');
      
      const options = new chrome.Options()
        .addArguments('--no-sandbox')
        .addArguments('--disable-dev-shm-usage')
        .windowSize({ width: 1280, height: 720 });

      // Conexión directa al ChromeDriver manual
      driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .usingServer('http://localhost:4444') // ¡Esta línea es crucial!
        .build();

      console.log('🌐 Cargando página...');
      await driver.get('http://localhost:3000');

    } catch (error) {
      console.error('❌ Error en before:', error);
      if (driver) {
        await driver.takeScreenshot().then(img => {
          fs.writeFileSync('error-init.png', img, 'base64');
          console.log('📸 Captura guardada: error-init.png');
        });
      }
      throw error;
    }
  });

  it('Debe cargar el mapa correctamente', async function() {
    console.log('🔍 Buscando elemento del mapa...');
    const map = await driver.wait(
      until.elementLocated(By.id('map')),
      15000,
      'El mapa no apareció en 15 segundos'
    );
    
    const isVisible = await map.isDisplayed();
    expect(isVisible).to.be.true;
    console.log('✅ Mapa cargado correctamente');
  });

  after(async function() {
    if (driver) {
      await driver.quit().then(() => console.log('🛑 Sesión terminada'));
    }
  });
});