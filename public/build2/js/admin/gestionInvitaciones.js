let dataTable;

async function obtenerInvitaciones() {
    var info = [];
    console.log('Cargando invitaciones...');
    try {
        const response = await fetch('/admin/catalogo/invitaciones');
        const invitaciones = await response.json();

        switch (response.status) {
            case 200:
        // Limpiar el arreglo 'info'
        info.length = 0;

        // Agregar cada sala al arreglo 'info'
        invitaciones.forEach(invitacion => {
          info.push({
              id_inv: invitacion.id_invitacion,
              id_usu: invitacion.id_usuario,
              nombre_usu: invitacion.nombre_usuario,
              fecha_rep: invitacion.fecha_repeticion,
              hora_ini: invitacion.hora_inicio_repeticion,
              hora_fin: invitacion.hora_fin_repeticion,
              nombre_sala: invitacion.nombre_sala,
              num_inv: invitacion.numero_invitaciones,
              cap_sala: invitacion.capacidad_sala,
              correo_invitado: invitacion.correo_invitado
          });
        });

        console.log('Invitaciones cargadas:', info);
              break;
            case 401:
              modal.fire({
                icon: "error",
                text: data.error,
              });
              break;
            case 404:
              modal.fire({
                title: "Error",
                icon: "error",
                text: data.error,
              });
              break;
            case 500:
              modal.fire({
                title: "Error",
                icon: "error",
                text: "A ocurrido un error, favor de intentar más tarde",
              });
              break;
            default:
                break;
      }
      
      return (response.status == 200 ? info : []);
    } catch (error) {
        console.error('Error al obtener las invitaciones:', error);
        return [];
    }
}

// Función para llenar la tabla con datos iniciales
async function loadTableData() {
  const data = await obtenerInvitaciones();
  const tbody = document.querySelector('tbody');
  
  //Limpiar la tabla antes de agregar nuevos datos
  tbody.innerHTML = '';

    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="id">${item.id_inv}</td>
            <td class="nombreAnfi">${item.nombre_usu}</td>
            <td class="fecha">${item.fecha_rep}</td>
            <td class="horaInicio">${item.hora_ini} - ${item.hora_fin}</td>
            <td class="sala">${item.nombre_sala}</td>
            <td class="numInvi">${item.num_inv}</td>
            <td class="numAcompa">${item.correo_invitado}</td>
        `;
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

// Cargar datos en la tabla al iniciar la página
loadTableData();

/*
// Activación de DataTables
$(document).ready(function () {
    $('#Tabla').DataTable({
        pagingType: 'full_numbers', //Tipo de paginación 
        info: false, //Desactiva la información de los registros totales
        language: {
            lengthMenu: ' Mostrar  _MENU_  registros', //Para cambiar el texto de los registros que se muestran
            search: 'Buscar',
            zeroRecords: 'No se encontró ninguna coincidencia ):'
        },
        columnDefs: [
            { type: 'date', targets: [2] }, // Indica la columna que contiene la fecha
            { type: 'time', targets: [3] }, // Indica la columna que contiene la hora 
            { type: 'time', targets: [4] } // Indica la columna que contiene la hora
        ],
        autoWidth: true
    });

});


 */
