// Función para redirigir a la creación de usuarios
function redirigeCrearUsu() {
  window.location.href = "/admin/catalogo/crearCuenta.html";
}

const info = [];
let dataTable;

async function cargarUsuarios() {
  console.log('Cargando usuarios...');
  try {
    const response = await fetch('/admin/catalogo/usuarios');
    const usuarios = await response.json();

    switch (response.status) {
      case 200:
        // Limpiar el arreglo 'info'
        info.length = 0;

        // Agregar cada usuario al arreglo 'info'
        usuarios.forEach(item => {
          info.push({
          id: item.id_usuario,
          nombre: item.nombre_usuario,
          email: item.email_usuario,
          tipoU: item.rol_usuario
          });
        });

    console.log('Usuarios cargados:', info);

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
    console.error('Error al obtener usuarios:', error);
    return [];
  }
}

async function loadTableData() {
  const data = await cargarUsuarios(); // Esperar a que los usuarios se carguen
  const tbody = document.querySelector('tbody');

  // Limpiar la tabla antes de agregar nuevos datos
  tbody.innerHTML = '';

  data.forEach(item => {
    if(item.tipoU !== "SuperAdmin"){
      const row = document.createElement('tr');
    row.innerHTML = `
        <td class="id">${item.id}</td>
        <td class="nombre">${item.nombre}</td>
        <td class="email">${item.email}</td>
        <td class="tipoU">${item.tipoU}</td>
        <td class="acciones">
        <button class="btn btn-sm editar" data-id="${item.id}" onclick="editarUsuario(${item.id})"><img src="../../img/icons/ico-editar.svg" alt="Editar"></button>
        <button class="btn btn-sm eliminar" data-id="${item.id}" onclick="eliminarUsuario(${item.id}, this)"><img src="../../img/icons/ico-trash.svg" alt="Eliminar"></button>
        </td>
    `;
    tbody.appendChild(row);
    }
  });

  cargarFiltros();
}

function cargarFiltros() {
  // Destruir y volver a inicializar DataTable
  if (!$.fn.DataTable.isDataTable('#Tabla')) {
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

function editarUsuario(idUsuario) {
  window.location.href = `/admin/editarPersonal.html?idUsuario=${idUsuario}`;
}

function eliminarUsuario(idUsuario, btn) {
  const row = btn.closest('tr')
  
  modal.fire({
    timer: undefined,
    icon: 'question',
    title: "¿Desea continuar?",
    html: `Se eliminará la cuenta de usuario con ID ${idUsuario}`,
    showDenyButton: true,
    confirmButtonText: "Eliminar cuenta de usuario",
    denyButtonText: `Cancelar`
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`/admin/catalogo/usuarios/${idUsuario}`, {
        method: 'DELETE'
      })
      .then(response => {
        if (response.ok) {
          modal.fire({
            title: "Operación exitosa",
            icon: "success",
            text: "Cuenta de usuario eliminada con éxito",
          });
          dataTable.row(row).remove().draw();
        } else {
          modal.fire({
            title: "Error",
            icon: "error",
            text: "Error al eliminar cuenta de usuario: " + response.statusText,
          });
          console.error('Error al eliminar usuario:', response.statusText);
        }
      })
      .catch(error => {
        modal.fire({
          title: "Error",
          icon: "error",
          text: "Error al eliminar cuenta de usuario:" + error,
        });
        console.error('Error al eliminar cuenta de usuario:', error);
      })
    } else if (result.isDenied) {
      
    }
  });
}

// Cargar datos en la tabla al iniciar la página
loadTableData();

// Botón de editar
document.querySelector('tbody').addEventListener('click', function (event) {
  if (event.target.closest('.editar')) {
    const id = event.target.closest('.editar').dataset.id;
    editarUsuario(id);
  }
});

// Botón de eliminar
document.querySelector('tbody').addEventListener('click', function (event) {
  if (event.target.closest('.eliminar')) {
    const id = event.target.closest('.eliminar').dataset.id;
    eliminarUsuario(id);
  }
});
