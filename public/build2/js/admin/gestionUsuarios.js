// Función para redirigir a la creación de usuarios
function redirigeCrearUsu() {
  window.location.href = "/admin/catalogo/crearCuenta.html";
}

const info = [];

async function cargarUsuarios() {
  console.log('Cargando usuarios...');
  try {
    const response = await fetch('/admin/catalogo/usuarios');
    const usuarios = await response.json();

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
    return info;
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
    const row = document.createElement('tr');
    row.innerHTML = `
        <td class="id">${item.id}</td>
        <td class="nombre">${item.nombre}</td>
        <td class="email">${item.email}</td>
        <td class="tipoU">${item.tipoU}</td>
        <td class="acciones">
        <button class="btn btn-sm editar" data-id="${item.id}" onclick="editarUsuario(${item.id})"><img src="../../img/icons/ico-editar.svg" alt="Editar"></button>
        <button class="btn btn-sm eliminar" data-id="${item.id}" onclick="eliminarUsuario(${item.id})"><img src="../../img/icons/ico-trash.svg" alt="Eliminar"></button>
        </td>
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

function editarUsuario(idUsuario) {
  window.location.href = `/admin/editarPersonal.html?idUsuario=${idUsuario}`;
}

function eliminarUsuario(idUsuario) {
  fetch(`/admin/catalogo/usuarios/${idUsuario}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (response.ok) {
        Swal.fire({
          title: "Success",
          icon: "success",
          text: "Cuenta de usuario eliminada con éxito",
        });
        loadTableData();
      } else {
        Swal.fire({
          title: "Error",
          icon: "error",
          text: "Error al eliminar cuenta de usuario: " + response.statusText,
        });
        console.error('Error al eliminar usuario:', response.statusText);
      }
    })
    .catch(error => {
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "Error al eliminar cuenta de usuario:" + error,
      });
      console.error('Error al eliminar cuenta de usuario:', error);
    })
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
