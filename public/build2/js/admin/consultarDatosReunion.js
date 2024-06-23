document.addEventListener('DOMContentLoaded',async function() {
  cargarDatos();
});


function cargarDatos() {
  console.log("Cargando datos");

  let url = window.location.href;
  let urlParams = new URLSearchParams(window.location.search);
  const idReunion = urlParams.get('idReunion');
  console.log('idReunion: ' + idReunion);

  fetch(`/admin/catalogo/reuniones/${idReunion}`)
      .then(response => response.json())
      .then(data => {
          console.log(data); 
          
          //rellenar los campos del formulario con los datos de la reunion
          document.getElementById('idReunion').value = data.id_reunion;
          document.getElementById('nombreReunion').value = data.titulo_reunion;
          // Parse and set the date
          let fecha = new Date(data.fechasRepeticion[0].fecha_repeticion);
          if (!isNaN(fecha.getTime())) {
              let formattedDate = fecha.toISOString().split('T')[0];
              document.getElementById('fechaInicio').value = formattedDate;
          } else {
              console.error('Invalid date format:', data.fechasRepeticion[0].fecha_repeticion);
          }
          document.getElementById('horaInicio').value = data.fechasRepeticion[0].hora_inicio_repeticion;
          document.getElementById('horaFin').value = data.fechasRepeticion[0].hora_fin_repeticion;
          document.getElementById('nombreSala').value = data.nombreSala;
          document.getElementById('numeroSala').value = data.id_sala;
          //document.getElementById('pisoSala').value = data.piso_sala;
          document.getElementById('descripcionReunion').value = data.descripcion_reunion;
          renderTable(data.infoInvitados);
      })
      .catch(error => {
          console.log(error);
      });
}

let dataTable;
function renderTable(data){
let info = [];
info.length = 0;

data.forEach(invitado => {
  info.push({
    nombre: invitado.nombre_invitado,
    correo: invitado.correo_invitado
  })
});

const tbody = document.querySelector('tbody');
tbody.innerHTML = '';

info.forEach(invitado => {
  const row = document.createElement('tr');
  row.innerHTML = `<td class="nombre">${invitado.nombre}</td>
                  <td class="email">${invitado.correo}</td>`;
  tbody.appendChild(row);
});
cargarFiltros();
}

function cargarFiltros() {
// Destruir y volver a inicializar DataTable
if (!$.fn.DataTable.isDataTable('#Tabla')) {
  //$('#Tabla').DataTable().destroy();
  dataTable = $('#Tabla').DataTable({
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
} else {
  dataTable.draw()
}
}