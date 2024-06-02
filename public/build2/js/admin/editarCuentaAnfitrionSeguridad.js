window.onload = function () {
  cargarDatos();
}

function cargarDatos() {
  console.log("Cargando datos");

  let url = window.location.href;
  let urlParams = new URLSearchParams(window.location.search);
  const idUsuario = urlParams.get('idUsuario');
  usuarito = idUsuario;
  console.log('idUsuario:' + idUsuario);



  fetch(`/admin/catalogo/usuarios/${idUsuario}`)
      .then(response => response.json())
      .then(data => {
          console.log(data);
          // Rellenar los campos del formulario con los datos obtenidos
          document.getElementById('nombre').value = data.nombre_usuario;
          document.getElementById('apellidoPaterno').value = data.apellido_paterno_usuario;
          document.getElementById('apellidoMaterno').value = data.apellido_materno_usuario;
          document.getElementById('email').value = data.email_usuario;
          document.getElementById('telefono').value = data.telefono_usuario;

          // Seleccionar el radio button correspondiente
          if (data.rol_usuario === "Seguridad") {
              document.getElementById('seguridadEdificio').checked = true;
          } else if (data.rol_usuario === "Anfitrion") {
              document.getElementById('anfitrion').checked = true;
          }
      })
      .catch(error => {
          console.log(error);
      });
}


function enviarForm() {
  const nombre = document.getElementById('nombre').value;
  const apellidoPaterno = document.getElementById('apellidoPaterno').value;
  const apellidoMaterno = document.getElementById('apellidoMaterno').value;
  const email = document.getElementById('email').value;
  const telefono = document.getElementById('telefono').value;
  const rol = document.querySelector('input[name="puesto"]:checked').value;

  alert('Se modificará el usuario con los siguientes datos:\n' +
      'Nombre: ' + nombre + '\n' +
      'Apellido Paterno: ' + apellidoPaterno + '\n' +
      'Apellido Materno: ' + apellidoMaterno + '\n' +
      'Email: ' + email + '\n' +
      'Teléfono: ' + telefono + '\n' +
      'Rol: ' + rol + '\n' +
      '¿Desea continuar?');


  fetch(`/admin/catalogo/usuarios/${usuarito}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          nombre,
          apellidoPaterno,
          apellidoMaterno,
          email,
          telefono,
          idRol: rol,
          fotoUsuario: 'prueba.ico'
      })
  })
  .then(response => {
      if (response.ok) {
          alert('Usuario modificado correctamente');
          window.location.href = '/admin/catalogo/GestionDeUsuarios.html';
      } else {
          alert('error al modificar el usuario:' + response.statusText);
          console.error('Error al modificar el usuario:', response.statusText);
      }
  })
  .catch(error => console.error('Error al modificar el usuario:', error));

}

function cancelarForm() {
  window.location.href = '/admin/catalogo/GestionDeUsuarios.html';
}
