// Inicializar el mapa con estilo similar a Google Maps
const map = L.map('map').setView([19.4326, -99.1332], 12);

// Capa base estilo Google Maps
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

let selectedLayer = null;

// Función para normalizar nombres
function normalizeText(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

// Datos de zonas turísticas con imágenes (ejemplo)
const zonasTuristicasData = {
  "alvaro obregon": [
    { 
      name: "San Ángel", 
      image: "https://cdn2.civitatis.com/mexico/ciudad-mexico/guia/san-angel.jpg",
      description: "Barrio colonial con arquitectura virreinal y famoso mercado de artesanías los sábados"
    },
    { 
      name: "Jardines del Pedregal", 
      image: "https://mxcity.mx/wp-content/uploads/2018/09/jardines-pedregal-cdmx.jpg",
      description: "Exclusiva zona residencial diseñada por Luis Barragán con impresionantes mansiones"
    }
  ],
  "azcapotzalco": [
    {
      name: "Parque Tezozómoc",
      image: "https://parquesalegres.org/wp-content/uploads/2021/04/Parque-Tezozomoc-1.jpg",
      description: "Parque con réplica a escala del Valle de México en la época prehispánica"
    },
    {
      name: "Alameda Norte",
      image: "https://cdn10.cdmx.gob.mx/wp-content/uploads/2021/01/Alameda-Norte-1.jpg",
      description: "Gran área verde con fuentes danzantes y pista de patinaje"
    }
  ],
  "benito juarez": [
    {
      name: "Parque Hundido",
      image: "https://www.mexicodesconocido.com.mx/wp-content/uploads/2022/03/parque-hundido-cdmx.jpg",
      description: "Famoso por su reloj floral y las reproducciones de piezas arqueológicas"
    },
    {
      name: "World Trade Center",
      image: "https://www.wtcmexico.com/wp-content/uploads/2021/03/WTC-Ciudad-de-Mexico.jpg",
      description: "Complejo con mirador panorámico a 50 pisos de altura"
    }
  ],
  "coyoacan": [
    {
      name: "Museo Frida Kahlo (Casa Azul)",
      image: "https://www.mexicodesconocido.com.mx/wp-content/uploads/2020/03/museo-frida-kahlo-casa-azul.jpg",
      description: "Hogar de la famosa pintora, con obras personales y jardines"
    },
    {
      name: "Viveros de Coyoacán",
      image: "https://www.mexicodesconocido.com.mx/wp-content/uploads/2020/03/viveros-de-coyoacan.jpg",
      description: "Vivero convertido en parque con senderos arbolados ideales para correr"
    }
  ],
  "cuajimalpa": [
    {
      name: "Desierto de los Leones",
      image: "https://www.mexicodesconocido.com.mx/wp-content/uploads/2020/03/desierto-de-los-leones.jpg",
      description: "Parque nacional con exconvento carmelita del siglo XVII y bosques de oyamel"
    },
    {
      name: "Centro de Cuajimalpa",
      image: "https://cdn10.cdmx.gob.mx/wp-content/uploads/2021/02/Cuajimalpa-1.jpg",
      description: "Zona con arquitectura tradicional y el Templo de San Pedro Cuajimalpa"
    }
  ],
  "cuauhtemoc": [
    {
      name: "Zócalo Capitalino",
      image: "https://www.mexicodesconocido.com.mx/wp-content/uploads/2020/03/zocalo-cdmx.jpg",
      description: "Plaza principal flanqueada por la Catedral y el Palacio Nacional"
    },
    {
      name: "Palacio de Bellas Artes",
      image: "https://www.mexicodesconocido.com.mx/wp-content/uploads/2020/03/palacio-de-bellas-artes.jpg",
      description: "Emblemático recinto cultural con murales de Rivera y Siqueiros"
    }
  ],
  "gustavo a madero": [
    {
      name: "Basílica de Guadalupe",
      image: "https://www.mexicodesconocido.com.mx/wp-content/uploads/2020/03/basilica-guadalupe.jpg",
      description: "Santuario mariano más visitado de América, con la tilma de Juan Diego"
    },
    {
      name: "La Villa",
      image: "https://cdn10.cdmx.gob.mx/wp-content/uploads/2021/02/Gustavo-A-Madero-1.jpg",
      description: "Complejo religioso con múltiples templos y museos"
    }
  ],
  "iztacalco": [
    {
      name: "Parque Deportivo Oceanía",
      image: "https://cdn10.cdmx.gob.mx/wp-content/uploads/2021/02/Iztacalco-1.jpg",
      description: "Complejo deportivo con alberca olímpica y estadio de béisbol"
    },
    {
      name: "Pista de Hielo",
      image: "https://www.mexicodesconocido.com.mx/wp-content/uploads/2020/03/pista-de-hielo-iztacalco.jpg",
      description: "Pista de patinaje sobre hielo abierta todo el año"
    }
  ],
  "iztapalapa": [
    {
      name: "Cerro de la Estrella",
      image: "https://www.mexicodesconocido.com.mx/wp-content/uploads/2020/03/cerro-de-la-estrella.jpg",
      description: "Sitio arqueológico donde se celebra la Pasión de Cristo cada Semana Santa"
    },
    {
      name: "Parque Cuitláhuac",
      image: "https://cdn10.cdmx.gob.mx/wp-content/uploads/2021/02/Iztapalapa-1.jpg",
      description: "Parque ecológico con lago artificial y áreas recreativas"
    }
  ],
  "la magdalena contreras": [
    {
      name: "Los Dinamos",
      image: "https://www.mexicodesconocido.com.mx/wp-content/uploads/2020/03/los-dinamos.jpg",
      description: "Área natural con senderos para caminata junto al río Magdalena"
    },
    {
      name: "Parque Ecológico",
      image: "https://cdn10.cdmx.gob.mx/wp-content/uploads/2021/02/Magdalena-Contreras-1.jpg",
      description: "Zona boscosa ideal para días de campo y actividades al aire libre"
    }
  ],
  "miguel hidalgo": [
    {
      name: "Bosque de Chapultepec",
      image: "https://www.mexicodesconocido.com.mx/wp-content/uploads/2020/03/bosque-de-chapultepec.jpg",
      description: "Uno de los parques urbanos más grandes de Latinoamérica con museos y zoológico"
    },
    {
      name: "Polanco",
      image: "https://www.mexicodesconocido.com.mx/wp-content/uploads/2020/03/polanco.jpg",
      description: "Exclusiva zona con restaurantes de lujo, boutiques y galerías de arte"
    }
  ],
  "milpa alta": [
    {
      name: "Volcán Teuhtli",
      image: "https://www.mexicodesconocido.com.mx/wp-content/uploads/2020/03/volcan-teuhtli.jpg",
      description: "Volcán extinto con senderos para caminata y vistas panorámicas"
    },
    {
      name: "Mercado de Milpa Alta",
      image: "https://cdn10.cdmx.gob.mx/wp-content/uploads/2021/02/Milpa-Alta-1.jpg",
      description: "Mercado tradicional famoso por su mole y productos agrícolas locales"
    }
  ],
  "tlahuac": [
    {
      name: "Lago de los Reyes Aztecas",
      image: "https://www.mexicodesconocido.com.mx/wp-content/uploads/2020/03/lago-reyes-aztecas.jpg",
      description: "Cuerpo de agua rodeado de naturaleza ideal para paseos en trajinera"
    },
    {
      name: "Pueblo de Tláhuac",
      image: "https://cdn10.cdmx.gob.mx/wp-content/uploads/2021/02/Tlahuac-1.jpg",
      description: "Pueblo originario que conserva tradiciones y arquitectura colonial"
    }
  ],
  "tlalpan": [
    {
      name: "Casa de Tlalpan",
      image: "https://www.mexicodesconocido.com.mx/wp-content/uploads/2020/03/casa-tlalpan.jpg",
      description: "Centro cultural en casona porfiriana con talleres y exposiciones"
    },
    {
      name: "Ajusco",
      image: "https://www.mexicodesconocido.com.mx/wp-content/uploads/2020/03/ajusco.jpg",
      description: "Volcán con áreas para excursionismo y restaurantes de comida tradicional"
    }
  ],
  "venustiano carranza": [
    {
      name: "Aeropuerto Internacional (Terminal 1)",
      image: "https://www.mexicodesconocido.com.mx/wp-content/uploads/2020/03/aeropuerto-ciudad-mexico.jpg",
      description: "Edificio icónico con murales de Juan O'Gorman y arquitectura funcionalista"
    },
    {
      name: "Alameda Oriente",
      image: "https://cdn10.cdmx.gob.mx/wp-content/uploads/2021/02/Venustiano-Carranza-1.jpg",
      description: "Parque urbano con fuentes y áreas deportivas"
    }
  ],
  "xochimilco": [
    {
      name: "Canales de Xochimilco",
      image: "https://www.mexicodesconocido.com.mx/wp-content/uploads/2020/03/xochimilco-trajineras.jpg",
      description: "Red de canales prehispánicos donde navegar en coloridas trajineras"
    },
    {
      name: "Mercado de Xochimilco",
      image: "https://cdn10.cdmx.gob.mx/wp-content/uploads/2021/02/Xochimilco-1.jpg",
      description: "Mercado tradicional con productos agrícolas y artesanías locales"
    }
  ]
};

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
        layer.bindTooltip(feature.properties.NOMGEO);
        
        layer.on('click', () => {
          // Restablecer estilo de la capa anterior
          if (selectedLayer) {
            selectedLayer.setStyle({
              color: '#333',
              weight: 2,
              fillOpacity: 0.1,
            });
          }
          
          // Estilo para la capa seleccionada
          layer.setStyle({
            color: '#e74c3c',
            weight: 3,
            fillOpacity: 0.3,
          });
          
          selectedLayer = layer;
          const alcaldiaName = feature.properties.NOMGEO;
          const alcaldiaNormalizada = normalizeText(alcaldiaName);
          
          // Actualizar UI
          document.getElementById('alcaldia-name').textContent = alcaldiaName;
          document.getElementById('alcaldia-current').textContent = alcaldiaName;
          
          // Cargar datos
          loadLugares(alcaldiaNormalizada);
          loadZonasTuristicas(alcaldiaNormalizada);
        });
      },
    }).addTo(map);
  })
  .catch(error => console.error('Error cargando GeoJSON:', error));

// Cargar plataformas de reservación
function loadLugares(alcaldiaName) {
  const alcaldiaNormalizada = alcaldiaName.toLowerCase().replace(/\s+/g, '-');
  const alcaldiaParaURL = encodeURIComponent(alcaldiaName);
  
  const plataformas = [
    {
      name: "Airbnb",
      url: `https://www.airbnb.com/s/${alcaldiaNormalizada}--Ciudad-de-M%C3%A9xico--Mexico/homes`,
      icon: "fab fa-airbnb",
      color: "#FF5A5F"
    },
    {
      name: "Booking.com",
      url: `https://www.booking.com/searchresults.es.html?ss=${alcaldiaParaURL}%2C+Ciudad+de+M%C3%A9xico`,
      icon: "fas fa-hotel",
      color: "#003580"
    },
    {
      name: "Vrbo",
      url: `https://www.vrbo.com/search/keywords:${alcaldiaNormalizada}-ciudad-de-mexico-mexico`,
      icon: "fas fa-home",
      color: "#00A699"
    }
  ];

  const list = document.getElementById('lugares-list');
  list.innerHTML = `
    <li class="platform-header">
      <p>Busca alojamiento en estas plataformas:</p>
    </li>
    ${plataformas.map(plataforma => `
      <li class="platform-item">
        <a href="${plataforma.url}" target="_blank" rel="noopener noreferrer" 
           style="background-color: ${plataforma.color}">
          <i class="${plataforma.icon}"></i>
          ${plataforma.name}
          <i class="fas fa-external-link-alt"></i>
        </a>
      </li>
    `).join('')}
  `;
}

// Cargar zonas turísticas con imágenes
function loadZonasTuristicas(alcaldiaName) {
  const alcaldiaNormalizada = normalizeText(alcaldiaName).toLowerCase();
  const zonas = zonasTuristicasData[alcaldiaNormalizada] || [];
  
  const list = document.getElementById('zonas-list');
  list.classList.remove('empty');
  
  if (zonas.length === 0) {
    list.innerHTML = '<li class="empty">No se encontraron zonas turísticas</li>';
    return;
  }

  list.innerHTML = zonas.map(zona => `
    <li class="zona-item">
      <div class="zona-info">
        <h4>${zona.name}</h4>
        <p class="zona-desc">${zona.description}</p>
      </div>
      <div class="zona-image-container">
        <img src="${zona.image}" 
             alt="${zona.name}" 
             class="zona-image"
             onerror="this.src='./assets/imagen-fallback.jpg';this.onerror=null;">
      </div>
    </li>
  `).join('');
}

// Botón de reinicio
document.getElementById('reset-map')?.addEventListener('click', () => {
  map.setView([19.4326, -99.1332], 12);
  document.getElementById('alcaldia-name').textContent = 'Selecciona una alcaldía en el mapa';
  document.getElementById('alcaldia-current').textContent = '...';
  document.getElementById('lugares-list').innerHTML = '<li class="empty-state">Selecciona una alcaldía para ver opciones</li>';
  document.getElementById('zonas-list').innerHTML = '<li class="empty-state">Selecciona una alcaldía para ver puntos de interés</li>';
  document.getElementById('zonas-list').classList.add('empty');
  
  if (selectedLayer) {
    selectedLayer.setStyle({
      color: '#333',
      weight: 2,
      fillOpacity: 0.1
    });
    selectedLayer = null;
  }
});