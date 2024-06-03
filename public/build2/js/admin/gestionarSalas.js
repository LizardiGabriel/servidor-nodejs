async function obtenerSalas() {
  var info = [];
  console.log('Cargando salas...');
  try {
    const response = await fetch('/admin/catalogo/salas');
    const salas = await response.json();

    // Limpiar el arreglo 'info'
    info.length = 0;

    // Agregar cada sala al arreglo 'info'
    salas.forEach(sala => {
      info.push({
        id: sala.id_sala,
        nombreSala: sala.nombre_sala,
        estado: sala.estatus_sala,
        cupoMax: sala.capacidad_sala,
        numeroS: sala.numero_sala,
        pisoS: sala.piso_sala
      });
    });

    console.log('Salas cargadas:', info);
    return info;
  } catch (error) {
    console.error('Error al obtener salas:', error);
    return [];
  }
}

// Función para llenar la tabla con datos iniciales
async function loadTableData() {
  const data = await obtenerSalas(); // Esperar a que las salas se carguen
  const tbody = document.querySelector('tbody');

  // Limpiar la tabla antes de agregar nuevos datos
  tbody.innerHTML = '';

  data.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `<td class="id">${item.id}</td>
                         <td class="nombreSala">${item.nombreSala}</td>
                         <td class="estado">${item.estado}</td>
                         <td class="cupoMax">${item.cupoMax}</td>
                         <td class="numeroS">${item.numeroS}</td>
                         <td class="pisoS">${item.pisoS}</td>
                         <td class="acciones">
                            <button class="btn btn-sm editar" data-id="${item.id}" onclick="editarSala(${item.id})">
                                <img src="../../img/icons/ico-editar.svg" alt="Editar">
                            </button>
                            <button class="btn btn-sm eliminar" data-id="${item.id}" onclick="eliminarSala(${item.id})">
                                <img src="../../img/icons/ico-trash.svg" alt="Eliminar">
                            </button>
                         </td>`;
    tbody.appendChild(row);
  });
  // Destruir y volver a inicializar DataTable
  if ($.fn.DataTable.isDataTable('#Tabla')) {
    $('#Tabla').DataTable().destroy();
  }
  $('#Tabla').DataTable({
    pagingType: 'full_numbers', //Tipo de paginación
    info: false, //Desactiva la información de los registros totales
    language: {
      lengthMenu: 'Mostrar _MENU_ registros', //Para cambiar el texto de los registros que se muestran
      search: 'Buscar',
      zeroRecords: 'No se encontró ninguna coincidencia ):'
    },
    columnDefs: [
      { "orderable": false, "targets": -1 } // Desactiva el ordenamiento en la última columna (Acciones)
    ],
    autoWidth: true
  });
}

function editarSala(idSala) {
  alert('editar sala id: ' + idSala);
  window.location.href = `/admin/EditarSala.html?idSala=${idSala}`;

}

function eliminarSala(idSala) {
  alert('eliminar sala, id: ' + idSala);


  fetch(`/admin/catalogo/salas/${idSala}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (response.ok) {
        loadTableData();
      } else {
        console.error('Error al eliminar sala:', response.statusText);
      }
    })
    .catch(error => console.error('Error al eliminar sala:', error));

}

// Cargar datos en la tabla al iniciar la página
loadTableData();

// Botón de editar
document.querySelector('tbody').addEventListener('click', function (event) {
  if (event.target.classList.contains('editar')) {
    const id = event.target.dataset.id;
    //Aqui va lo necesario para editar el registro
    console.log(`Editar`);
  }
});

// Botón de eliminar
document.querySelector('tbody').addEventListener('click', function (event) {
  if (event.target.classList.contains('eliminar')) {
    const id = event.target.dataset.id;
    //Aqui va lo necesario para eliminar el registro
    console.log(`Eliminar`);
  }
});

