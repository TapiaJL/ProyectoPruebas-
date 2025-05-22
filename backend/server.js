const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, '../frontend')));

// Ruta para servir el GeoJSON de las alcaldías
app.get('/api/alcaldias-geojson', (req, res) => {
  const geojsonPath = path.join(__dirname, 'data', 'alcaldias.geojson');
  fs.readFile(geojsonPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error al leer el archivo GeoJSON' });
    }
    res.json(JSON.parse(data));
  });
});

// Ruta para buscar lugares por nombre de alcaldía
app.get('/api/lugares/:alcaldiaName', (req, res) => {
  const alcaldiaName = req.params.alcaldiaName.toLowerCase(); // Convertir el nombre a minúsculas

  // Buscar la alcaldía por nombre
  const alcaldia = alcaldias.find((a) => a.name.toLowerCase() === alcaldiaName);

  if (!alcaldia) {
    return res.status(404).json({ mensaje: "Alcaldía no encontrada" });
  }

  // Filtrar los lugares que pertenecen a esta alcaldía
  const lugaresEnAlcaldia = lugares.filter((lugar) => lugar.alcaldiaId === alcaldia.id);

  // Verificar si hay lugares disponibles en esta alcaldía
  if (lugaresEnAlcaldia.length > 0) {
    res.json(lugaresEnAlcaldia);
  } else {
    res.status(404).json({ mensaje: "No se encontraron lugares en esta alcaldía" });
  }
});

// Ruta para buscar zonas turísticas por nombre de alcaldía
app.get('/api/zonas-turisticas/:alcaldiaName', (req, res) => {
  const alcaldiaName = req.params.alcaldiaName.toLowerCase(); // Convertir el nombre a minúsculas

  // Buscar la alcaldía por nombre
  const alcaldia = alcaldias.find((a) => a.name.toLowerCase() === alcaldiaName);

  if (!alcaldia) {
    return res.status(404).json({ mensaje: "Alcaldía no encontrada" });
  }

  // Filtrar las zonas turísticas que pertenecen a esta alcaldía
  const zonasEnAlcaldia = zonasTuristicas.filter((zona) => zona.alcaldiaId === alcaldia.id);

  // Verificar si hay zonas turísticas disponibles
  if (zonasEnAlcaldia.length > 0) {
    res.json(zonasEnAlcaldia);
  } else {
    res.status(404).json({ mensaje: "No se encontraron zonas turísticas en esta alcaldía" });
  }
});

// Ruta para servir el archivo index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname,'../index.html'));
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
