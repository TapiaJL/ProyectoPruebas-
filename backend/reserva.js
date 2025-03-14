// Obtener el ID del lugar desde la URL
const urlParams = new URLSearchParams(window.location.search);
const lugarId = urlParams.get('id');

// Cargar los detalles del lugar
if (lugarId) {
  fetch(`http://localhost:3000/api/lugares/detalle/${lugarId}`)
    .then(response => response.json())
    .then(lugar => {
      const lugarDetails = document.getElementById('lugar-details');
      lugarDetails.innerHTML = `
        <img src="${lugar.image}" alt="${lugar.name}" width="200">
        <h2>${lugar.name}</h2>
        <p>Precio: $${lugar.price}/noche</p>
        <p>${lugar.description || 'Descripción no disponible.'}</p>
      `;
    })
    .catch(error => {
      console.error('Error cargando detalles del lugar:', error);
      const lugarDetails = document.getElementById('lugar-details');
      lugarDetails.innerHTML = `<p>Error cargando detalles del lugar.</p>`;
    });
} else {
  console.error('No se proporcionó un ID de lugar.');
}

// Manejar el formulario de reserva
const reservaForm = document.getElementById('reserva-form');
reservaForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const email = document.getElementById('email').value;
  const fecha = document.getElementById('fecha').value;

  // Aquí puedes enviar los datos de la reserva al servidor
  console.log('Datos de la reserva:', { nombre, email, fecha, lugarId });

  alert('Reserva realizada con éxito. ¡Gracias!');
  window.location.href = 'index.html'; // Redirigir a la página principal
});