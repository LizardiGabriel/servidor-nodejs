async function obtenerInvitaciones() {
    var info = [];
    console.log('Cargando salas...');
    try {
        const response = await fetch('/admin/catalogo/invitaciones');
        const invitaciones = await response.json();

        // Limpiar el arreglo 'info'
        info.length = 0;

        /*
            id_invitacion: invitacion.id_invitacion,
            id_usuario: invitacion.reunion.usuario.id_usuario,
            correo_invitado: invitacion.invitado.email_invitado,
            colados_invitacion: invitacion.numero_colados,
            id_sala: invitacion.reunion.sala.id_sala,
            qr_invitacion: invitacion.qr_acceso,
            hora_inicio: invitacion.reunion.Repeticion[0]?.hora_inicio_repeticion || null,
            hora_fin: invitacion.reunion.Repeticion[0]?.hora_fin_repeticion || null,
        * */

        // Agregar cada sala al arreglo 'info'
        invitaciones.forEach(invitacion => {
            info.push({
                id_invitacion: invitacion.id_invitacion,
                id_usuario: invitacion.id_usuario,
                correo: invitacion.correo_invitado,
                colados: invitacion.colados_invitacion,
                id_sala: invitacion.id_sala,
                qr: invitacion.qr_invitacion,
                horaInicio: invitacion.hora_inicio,
                horaFin: invitacion.hora_fin

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
function loadTableData() {
    const tbody = document.querySelector('tbody');
    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `<td class="id">${item.id}</td>
                    <td class="nombreAnfi">${item.nombreAnfi}</td>
                    <td class="fecha">${item.fecha}</td>
                    <td class="horaInicio">${item.horaInicio}</td>
                    <td class="horaFin">${item.horaFin}</td>
                    <td class="sala">${item.sala}</td>
                    <td class="numInvi">${item.numInvi}</td>
                    <td class="numAcompa">${item.numAcompa}</td>`;
        tbody.appendChild(row);
    });
}

// Cargar datos en la tabla al iniciar la página
loadTableData();

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
