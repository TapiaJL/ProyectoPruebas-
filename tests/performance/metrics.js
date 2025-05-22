const lighthouse = require('lighthouse/core/index.cjs');
const chromeLauncher = require('chrome-launcher');

async function runLighthouse() {
    console.log('\nIniciando análisis con Lighthouse...');
    
    try {
        // Inicia Chrome
        const chrome = await chromeLauncher.launch({ 
            chromeFlags: ['--headless', '--no-sandbox'] 
        });
        
        // Configuración de Lighthouse
        const options = {
            logLevel: 'info',
            onlyCategories: ['performance'],
            port: chrome.port
        };

        // Ejecuta Lighthouse (nueva sintaxis para v12+)
        const runnerResult = await lighthouse('http://localhost:3001', options, null);
        
        console.log('\n=== Resultados de Rendimiento ===');
        console.log(`First Contentful Paint: ${runnerResult.lhr.audits['first-contentful-paint'].displayValue}`);
        console.log(`Speed Index: ${runnerResult.lhr.audits['speed-index'].displayValue}`);
        console.log(`Time to Interactive: ${runnerResult.lhr.audits['interactive'].displayValue}`);
        console.log(`Total Blocking Time: ${runnerResult.lhr.audits['total-blocking-time'].displayValue}`);
        
    } catch (error) {
        console.error('Error en Lighthouse:', error);
    }
}

runLighthouse();