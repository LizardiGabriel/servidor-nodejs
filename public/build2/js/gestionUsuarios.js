async function cargarUsuarios() {
  var info = [];
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
}

function editarUsuario(idUsuario) {
  alert('editar usuario id: ' + idUsuario);
  window.location.href = `/admin/EditarCuentaAnfitrionSeguridad.html?idUsuarioa=${idUsuario}`;

}

function eliminarUsuario(idUsuario) {
  alert('eliminar usuario, id: ' + idUsuario);
  fetch(`/admin/catalogo/usuarios/${idUsuario}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (response.ok) {
        loadTableData();
      } else {
        console.error('Error al eliminar usuario:', response.statusText);
      }
    })
    .catch(error => console.error('Error al eliminar usuario:', error));
}

// Cargar datos en la tabla al iniciar la página
loadTableData();

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
    { "orderable": false, "targets": -1 } // Desactiva el ordenamiento en la última columna (Acciones)
  ],
  autoWidth: true
});

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

