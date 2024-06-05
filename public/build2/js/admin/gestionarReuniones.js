async function obtenerSalas() {
    var info = [];
    console.log('Cargando salas...');

     try {
        const response = await fetch('/admin/catalogo/reuniones');
        const reuniones = await response.json();

        switch (response.status) {
              case 200:
                // Limpiar el arreglo 'info'
                info.length = 0;

                // Agregar cada sala al arreglo 'info'
                reuniones.forEach(reunion => {
                  info.push({
                  id: reunion.id_reunion,
                  titulo: reunion.titulo_reunion,
                  anfitrion: reunion.nombre_anfitrion,
                  fecha: reunion.fecha_repeticion,
                  horaInicio: reunion.hora_inicio_repeticion,
                  horaFin: reunion.hora_fin_repeticion,
                  sala: reunion.nombre_sala
                  });
                });

                console.log('reuniones cargadas:', info);
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
        console.error('Error al obtener las reuniones: ', error);
        return [];
    }
}

// Función para llenar la tabla con datos iniciales
async function loadTableData() {
    const data = await obtenerSalas();
    const tbody = document.querySelector('tbody');
    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `<td class="id">${item.id}</td>
                    <td class="nombreR">${item.titulo}</td>
                    <td class="nombreA">${item.anfitrion}</td>
                    <td class="fecha">${item.fecha}</td>
                    <td class="horario">${item.horaInicio} - ${item.horaFin}</td>
                    <td class="sala">${item.sala}</td>
                    <td class="accion">
                      <button class="btn btn-sm visualizar" data-id="${item.id}" onclick="consultarDatosReunion(${item.id})"><img src="../../img/icons/ico-view.svg"></button>
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


// Cargar datos en la tabla al iniciar la página
loadTableData();



/*
//Activación de DataTables
new DataTable('#Tabla', {
    pagingType: 'full_numbers', //Tipo de paginación 
    info: false, //Desactiva la información de los registros totales
    language: {
        lengthMenu: ' Mostrar  _MENU_  registros', //Para cambiar el texto de los registros que se muestran
        search: 'Buscar',
        zeroRecords: 'No se encontró ninguna coincidencia ):'
    },
    columnDefs: [
        { "orderable": false, "targets": -1 }, // Desactiva el ordenamiento en la última columna (Acciones)
        { type: 'date', targets: [3] }, // Indica la columna que contiene la fecha
        { type: 'time', targets: [4] } // Indica la columna que contiene la hora y aplica la función de ordenamiento personalizada
    ],
    autoWidth: true
});
*/
