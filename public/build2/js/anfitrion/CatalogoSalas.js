/* Función para los modales */
/*const modal = Swal.mixin({
    timer: 3000,
    timerProgressBar: true,
    background: "#fbfff1",
    showConfirmButton: true,
    confirmButtonColor: "#89b6b1",
    cancelButtonColor: "#305272",
    width: "50%",
    customClass: {
        title: "titleSize",
        htmlContainer: "contentSize",
        confirmButton: "buttonSize",
        icon: "iconSize",
    }
})

 */

window.onload = function(){
    loadTableData();
}
async function obtenerSalas() {
    var info = [];
    console.log('Cargando salas...');
    try {
      const response = await fetch('/anfitrion/catalogo/salas');
      const salas = await response.json();

      switch (response.status) {
        case 200:
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
      console.error('Error al obtener salas:', error);
      modal.fire({
        title: "Error",
        icon: "error",
        text: ":(",
    });
      return [];
    }
  }

  async function loadTableData() {

    console.log('>>>>>>> Cargando datos...');
    const data = await obtenerSalas(); // Esperar a que las salas se carguen
    const tbody = document.getElementById('tablaSalas');
  
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
                    `;
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