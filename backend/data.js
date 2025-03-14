// Datos de ejemplo para las 16 alcaldías de la CDMX
const alcaldias = [
  { id: 9001, name: "Álvaro Obregón", coordinates: [19.3585, -99.2033] },
  { id: 9002, name: "Azcapotzalco", coordinates: [19.4872, -99.1854] },
  { id: 9003, name: "Benito Juárez", coordinates: [19.3723, -99.1564] },
  { id: 9004, name: "Coyoacán", coordinates: [19.3467, -99.1613] },
  { id: 9005, name: "Cuajimalpa de Morelos", coordinates: [19.3556, -99.3008] },
  { id: 9006, name: "Cuauhtémoc", coordinates: [19.4326, -99.1332] },
  { id: 9007, name: "Gustavo A. Madero", coordinates: [19.4841, -99.1088] },
  { id: 9008, name: "Iztacalco", coordinates: [19.3957, -99.0977] },
  { id: 9009, name: "Iztapalapa", coordinates: [19.3574, -99.0671] },
  { id: 9010, name: "La Magdalena Contreras", coordinates: [19.3321, -99.2118] },
  { id: 9011, name: "Miguel Hidalgo", coordinates: [19.4342, -99.2006] },
  { id: 9012, name: "Milpa Alta", coordinates: [19.1925, -99.0231] },
  { id: 9013, name: "Tláhuac", coordinates: [19.2869, -99.0057] },
  { id: 9014, name: "Tlalpan", coordinates: [19.2979, -99.1623] },
  { id: 9015, name: "Venustiano Carranza", coordinates: [19.4326, -99.0992] },
  { id: 9016, name: "Xochimilco", coordinates: [19.2578, -99.1056] },
];

const lugares = [
  // Álvaro Obregón
  { id: 1, alcaldiaId: 9001, name: "Departamento en Jardines del Pedregal", price: 2500, image: "https://via.placeholder.com/300" },
  { id: 2, alcaldiaId: 9001, name: "Casa en San Ángel", price: 3000, image: "https://via.placeholder.com/300" },

  // Azcapotzalco
  { id: 3, alcaldiaId: 9002, name: "Departamento en Azcapotzalco Centro", price: 1800, image: "https://via.placeholder.com/300" },
  { id: 4, alcaldiaId: 9002, name: "Casa en Nueva Santa María", price: 2200, image: "https://via.placeholder.com/300" },

  // Benito Juárez
  { id: 5, alcaldiaId: 9003, name: "Departamento en Nápoles", price: 2000, image: "https://via.placeholder.com/300" },
  { id: 6, alcaldiaId: 9003, name: "Casa en Del Valle", price: 2800, image: "https://via.placeholder.com/300" },

  // Coyoacán
  { id: 7, alcaldiaId: 9004, name: "Departamento en Coyoacán Centro", price: 1500, image: "https://via.placeholder.com/300" },
  { id: 8, alcaldiaId: 9004, name: "Casa en Santa Catarina", price: 3200, image: "https://via.placeholder.com/300" },

  // Cuajimalpa
  { id: 9, alcaldiaId: 9005, name: "Casa en Cuajimalpa Centro", price: 3500, image: "https://via.placeholder.com/300" },
  { id: 10, alcaldiaId: 9005, name: "Departamento en San Lorenzo Acopilco", price: 2800, image: "https://via.placeholder.com/300" },

  // Cuauhtémoc
  { id: 11, alcaldiaId: 9006, name: "Departamento en Roma Norte", price: 2200, image: "https://via.placeholder.com/300" },
  { id: 12, alcaldiaId: 9006, name: "Loft en Condesa", price: 2500, image: "https://via.placeholder.com/300" },

  // Gustavo A. Madero
  { id: 13, alcaldiaId: 9007, name: "Casa en Lindavista", price: 2000, image: "https://via.placeholder.com/300" },
  { id: 14, alcaldiaId: 9007, name: "Departamento en Villa Gustavo A. Madero", price: 1800, image: "https://via.placeholder.com/300" },

  // Iztacalco
  { id: 15, alcaldiaId: 9008, name: "Departamento en Iztacalco Centro", price: 1500, image: "https://via.placeholder.com/300" },
  { id: 16, alcaldiaId: 9008, name: "Casa en Pantitlán", price: 1700, image: "https://via.placeholder.com/300" },

  // Iztapalapa
  { id: 17, alcaldiaId: 9009, name: "Casa en Santa Martha Acatitla", price: 1200, image: "https://via.placeholder.com/300" },
  { id: 18, alcaldiaId: 9009, name: "Departamento en San Miguel Teotongo", price: 1300, image: "https://via.placeholder.com/300" },

  // La Magdalena Contreras
  { id: 19, alcaldiaId: 9010, name: "Casa en San Jerónimo Lídice", price: 3000, image: "https://via.placeholder.com/300" },
  { id: 20, alcaldiaId: 9010, name: "Departamento en La Magdalena Contreras Centro", price: 2500, image: "https://via.placeholder.com/300" },

  // Miguel Hidalgo
  { id: 21, alcaldiaId: 9011, name: "Casa en Polanco", price: 4000, image: "https://via.placeholder.com/300" },
  { id: 22, alcaldiaId: 9011, name: "Departamento en Lomas de Chapultepec", price: 3800, image: "https://via.placeholder.com/300" },

  // Milpa Alta
  { id: 23, alcaldiaId: 9012, name: "Casa en Milpa Alta Centro", price: 1000, image: "https://via.placeholder.com/300" },
  { id: 24, alcaldiaId: 9012, name: "Departamento en San Pedro Atocpan", price: 1200, image: "https://via.placeholder.com/300" },

  // Tláhuac
  { id: 25, alcaldiaId: 9013, name: "Casa en Tláhuac Centro", price: 1100, image: "https://via.placeholder.com/300" },
  { id: 26, alcaldiaId: 9013, name: "Departamento en San Francisco Tlaltenco", price: 1300, image: "https://via.placeholder.com/300" },

  // Tlalpan
  { id: 27, alcaldiaId: 9014, name: "Casa en Tlalpan Centro", price: 2800, image: "https://via.placeholder.com/300" },
  { id: 28, alcaldiaId: 9014, name: "Departamento en Ajusco", price: 3200, image: "https://via.placeholder.com/300" },

  // Venustiano Carranza
  { id: 29, alcaldiaId: 9015, name: "Departamento en Moctezuma", price: 1500, image: "https://via.placeholder.com/300" },
  { id: 30, alcaldiaId: 9015, name: "Casa en Jardín Balbuena", price: 2000, image: "https://via.placeholder.com/300" },

  // Xochimilco
  { id: 31, alcaldiaId: 9016, name: "Casa en Xochimilco Centro", price: 1800, image: "https://via.placeholder.com/300" },
  { id: 32, alcaldiaId: 9016, name: "Departamento en Santa Cruz Acalpixca", price: 1600, image: "https://via.placeholder.com/300" },
];

const zonasTuristicas = [
  // Álvaro Obregón
  { id: 1, alcaldiaId: 9001, name: "San Ángel" },
  { id: 2, alcaldiaId: 9001, name: "Jardines del Pedregal" },

  // Azcapotzalco
  { id: 3, alcaldiaId: 9002, name: "Parque Tezozómoc" },
  { id: 4, alcaldiaId: 9002, name: "Alameda Norte" },

  // Benito Juárez
  { id: 5, alcaldiaId: 9003, name: "Parque Hundido" },
  { id: 6, alcaldiaId: 9003, name: "World Trade Center" },

  // Coyoacán
  { id: 7, alcaldiaId: 9004, name: "Museo Frida Kahlo" },
  { id: 8, alcaldiaId: 9004, name: "Viveros de Coyoacán" },

  // Cuajimalpa
  { id: 9, alcaldiaId: 9005, name: "Desierto de los Leones" },
  { id: 10, alcaldiaId: 9005, name: "Centro de Cuajimalpa" },

  // Cuauhtémoc
  { id: 11, alcaldiaId: 9006, name: "Zócalo de la CDMX" },
  { id: 12, alcaldiaId: 9006, name: "Palacio de Bellas Artes" },

  // Gustavo A. Madero
  { id: 13, alcaldiaId: 9007, name: "Basílica de Guadalupe" },
  { id: 14, alcaldiaId: 9007, name: "La Villa" },

  // Iztacalco
  { id: 15, alcaldiaId: 9008, name: "Parque Deportivo Oceanía" },
  { id: 16, alcaldiaId: 9008, name: "Pista de Hielo" },

  // Iztapalapa
  { id: 17, alcaldiaId: 9009, name: "Cerro de la Estrella" },
  { id: 18, alcaldiaId: 9009, name: "Parque Cuitláhuac" },

  // La Magdalena Contreras
  { id: 19, alcaldiaId: 9010, name: "Los Dinamos" },
  { id: 20, alcaldiaId: 9010, name: "Parque Ecológico" },

  // Miguel Hidalgo
  { id: 21, alcaldiaId: 9011, name: "Chapultepec" },
  { id: 22, alcaldiaId: 9011, name: "Polanco" },

  // Milpa Alta
  { id: 23, alcaldiaId: 9012, name: "Volcán Teuhtli" },
  { id: 24, alcaldiaId: 9012, name: "Mercado de Milpa Alta" },

  // Tláhuac
  { id: 25, alcaldiaId: 9013, name: "Lago de los Reyes Aztecas" },
  { id: 26, alcaldiaId: 9013, name: "Pueblo de Tláhuac" },

  // Tlalpan
  { id: 27, alcaldiaId: 9014, name: "Casa de Tlalpan" },
  { id: 28, alcaldiaId: 9014, name: "Ajusco" },

  // Venustiano Carranza
  { id: 29, alcaldiaId: 9015, name: "Aeropuerto Internacional" },
  { id: 30, alcaldiaId: 9015, name: "Alameda Oriente" },

  // Xochimilco
  { id: 31, alcaldiaId: 9016, name: "Canales de Xochimilco" },
  { id: 32, alcaldiaId: 9016, name: "Mercado de Xochimilco" },
];

module.exports = { alcaldias, lugares, zonasTuristicas };