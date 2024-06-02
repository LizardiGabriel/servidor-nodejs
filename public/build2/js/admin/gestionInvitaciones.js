async function obtenerInvitaciones() {
    var info = [];
    console.log('Cargando invitaciones...');
    try {
        const response = await fetch('/admin/catalogo/invitaciones');
        const invitaciones = await response.json();

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

        console.log('reuniones cargadas:', info);
        return info;
    } catch (error) {
        console.error('Error al obtener salas:', error);
        return [];
    }
}

// Función para llenar la tabla con datos iniciales
async function loadTableData() {
    const data = await obtenerInvitaciones();
    const tbody = document.querySelector('tbody');
    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="id">${item.id_inv}</td>
            <td class="nombreAnfi">${item.nombre_usu}</td>
            <td class="fecha">${item.fecha_rep}</td>
            <td class="horaInicio">${item.hora_ini}</td>
            <td class="horaFin">${item.hora_fin}</td>
            <td class="sala">${item.nombre_sala}</td>
            <td class="numInvi">${item.num_inv}</td>
            <td class="numAcompa">${item.correo_invitado}</td>
        `;
        tbody.appendChild(row);
    });
}

// Cargar datos en la tabla al iniciar la página
loadTableData();

new DataTable('#Tabla', {
    pagingType: 'full_numbers', //Tipo de paginación
    info: false, //Desactiva la información de los registros totales
    language: {
        lengthMenu: ' Mostrar  _MENU_  registros', //Para cambiar el texto de los registros que se muestran
        search: 'Buscar',
        zeroRecords: 'No se encontró ninguna coincidencia ):' //Mensaje que se muestra cuando no se encuentran registros
    },
    columnDefs: [
        { type: 'date', targets: [2] }, // Indica la columna que contiene la fecha
        { type: 'time', targets: [3] }, // Indica la columna que contiene la hora 
        { type: 'time', targets: [4] } // Indica la columna que contiene la hora
    ],
    autoWidth: true
});
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
