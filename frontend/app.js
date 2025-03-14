// Inicializar el mapa
const map = L.map('map').setView([19.4326, -99.1332], 11);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
}).addTo(map);

let selectedLayer = null; // Variable para almacenar la capa seleccionada

// Función para normalizar nombres (eliminar acentos, espacios extra, etc.)
function normalizeText(text) {
  return text
    .normalize("NFD") // Separa letras y acentos
    .replace(/[\u0300-\u036f]/g, "") // Elimina acentos
   // .toLowerCase() // Convierte a minúsculas
    .trim(); // Elimina espacios extra
}

// Cargar el GeoJSON de las alcaldías
fetch('http://localhost:3000/api/alcaldias-geojson')
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data, {
      style: {
        color: '#333',
        weight: 2,
        fillOpacity: 0.1,
      },
      onEachFeature: (feature, layer) => {
        // Mostrar el nombre de la alcaldía al hacer hover
        layer.bindTooltip(feature.properties.NOMGEO);

        // Cambiar el estilo al hacer clic
        layer.on('click', () => {
          // Restablecer el estilo de la alcaldía previamente seleccionada
          if (selectedLayer) {
            selectedLayer.setStyle({
              color: '#333',
              weight: 2,
              fillOpacity: 0.1,
            });
          }

          // Cambiar el estilo de la alcaldía seleccionada
          layer.setStyle({
            color: '#ff0000',
            weight: 3,
            fillOpacity: 0.3,
          });

          // Guardar la capa seleccionada
          selectedLayer = layer;

          // Obtener y normalizar el nombre de la alcaldía
          const alcaldiaName = feature.properties.NOMGEO;
          const alcaldiaNormalizada = normalizeText(alcaldiaName);

          // Mostrar el nombre en la interfaz
          document.getElementById('alcaldia-name').textContent = alcaldiaName;

          // Cargar lugares y zonas turísticas usando el nombre de la alcaldía normalizado
          loadLugares(alcaldiaNormalizada);
          loadZonasTuristicas(alcaldiaNormalizada);
        });
      },
    }).addTo(map);
  });

// Cargar lugares por nombre de alcaldía
/*function loadLugares(alcaldiaName) {
  const alcaldiaNormalizada = normalizeText(alcaldiaName); // Normalizar nombre
  console.log(`Buscando lugares para: ${alcaldiaNormalizada}`);

  fetch(`http://localhost:3000/api/lugares/${encodeURIComponent(alcaldiaNormalizada)}`)
    .then(response => response.json())
    .then(lugares => {
      console.log("Lugares encontrados:", lugares);
      const list = document.getElementById('lugares-list');
      list.innerHTML = lugares.map(lugar => `
        <li>
          <img src="${lugar.image}" alt="${lugar.name}" width="100">
          <p>${lugar.name} - $${lugar.price}/noche</p>
        </li>
      `).join('');
    })
    .catch(error => console.error('Error cargando lugares:', error));
}
*/
// Cargar lugares por nombre de alcaldía
function loadLugares(alcaldiaName) {
  const alcaldiaNormalizada = normalizeText(alcaldiaName); // Normalizar nombre
  console.log(`Buscando lugares para: ${alcaldiaNormalizada}`);

  fetch(`http://localhost:3000/api/lugares/${encodeURIComponent(alcaldiaNormalizada)}`)
    .then(response => response.json())
    .then(lugares => {
      console.log("Lugares encontrados:", lugares);
      const list = document.getElementById('lugares-list');
      list.innerHTML = lugares.map(lugar => `
        <li>
          <a href="reserva.html?id=${lugar.id}" class="lugar-link">
            <img src="${lugar.image}" alt="${lugar.name}" width="100">
            <p>${lugar.name} - $${lugar.price}/noche</p>
          </a>
        </li>
      `).join('');
    })
    .catch(error => console.error('Error cargando lugares:', error));
}

// Cargar zonas turísticas por nombre de alcaldía
function loadZonasTuristicas(alcaldiaName) {
  const alcaldiaNormalizada = normalizeText(alcaldiaName); // Normalizar el nombre de la alcaldía
  console.log(`Buscando zonas turísticas para: ${alcaldiaNormalizada}`);

  fetch(`http://localhost:3000/api/zonas-turisticas/${encodeURIComponent(alcaldiaNormalizada)}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      return response.json();
    })
    .then(zonas => {
      const list = document.getElementById('zonas-list');
      if (!zonas || zonas.length === 0) {
        list.innerHTML = `<li>No se encontraron zonas turísticas para ${alcaldiaName}.</li>`;
      } else {
        list.innerHTML = zonas.map(zona => `<li>${zona.name}</li>`).join('');
      }
    })
    .catch(error => {
      console.error('Error cargando zonas turísticas:', error);
      const list = document.getElementById('zonas-list');
      list.innerHTML = `<li>Error cargando zonas turísticas: ${error.message}</li>`;
    });
}