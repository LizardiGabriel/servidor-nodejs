window.onload = function () {
  cargarDatos();
}
var usuarito = 'a'
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
          document.getElementById('app').value = data.apellido_paterno_usuario;
          document.getElementById('apm').value = data.apellido_materno_usuario;
          document.getElementById('loginEmail').value = data.email_usuario;
          document.getElementById('telefono').value = data.telefono_usuario;

          // Seleccionar el radio button correspondiente
          if (data.rol_usuario === "Seguridad") {
              document.getElementById('rolSeguridad').checked = true;
          } else if (data.rol_usuario === "Anfitrion") {
              document.getElementById('rolAnfitrion').checked = true;
          }
          document.getElementById('rolSeguridad').disabled = true;
          document.getElementById('rolAnfitrion').disabled = true;
      })
      .catch(error => {
          console.log(error);
      });
}


function enviarForm() {
  let nombre = document.getElementById('nombre').value;
  let apellidoPaterno = document.getElementById('app').value;
  let apellidoMaterno = document.getElementById('apm').value;
  let email = document.getElementById('loginEmail').value;
  let telefono = document.getElementById('telefono').value;
  let rolSeguridad = document.getElementById('rolSeguridad').checked;
  let rolAnfitrion = document.getElementById("rolAnfitrion").checked;
  let rol;

  //Si esta bien la validación hacemos la pregunta de confirmación
  if (validarEditUser(email, nombre, apellidoPaterno, apellidoMaterno, rolSeguridad, rolAnfitrion, telefono)) {
    if (rolSeguridad) {
      rol = document.getElementById('rolSeguridad').value;
    } else if (rolAnfitrion) {
      rol = document.getElementById('rolAnfitrion').value;
    }

    modal.fire({
      timer: undefined,
      icon: 'question',
      title: "¿Desea continuar?",
      html: `Se modificará el usuario con los siguientes datos: <br>
      Nombre: ${nombre}<br>
      Apellido Paterno: ${apellidoPaterno}<br>
      Apellido Materno: ${apellidoMaterno}<br>
      Email: ${email}<br>
      Teléfono: ${telefono}<br>
      Rol: ${rol}`,
      showDenyButton: true,
      confirmButtonText: "Modificar cuenta de usuario",
      denyButtonText: `Cancelar`
    }).then((result) => {
      if (result.isConfirmed) {
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
          modal.fire({
            title: "Operación exitosa",
            icon: "success",
            text: "Cuenta de usuario modificado correctamente",
          }).then(() => {
            window.location.href = '/admin/catalogo/GestionDeUsuarios.html';
          });/* 
          finishRedirect(); */
        } else {
            modal.fire({
              title: "Error",
              icon: "error",
              text: "Error al modificar cuenta de usuario:" + response.statusText,
            });
            console.error('Error al modificar el usuario:', response.statusText);
        }
      })
      .catch(error => {
        modal.fire({
          title: "Error",
          icon: "error",
          text: "Error al editar cuenta de usuario:" + error,
        });
        console.error('Error al editar cuenta de usuario:', error);
      });
      } else if (result.isDenied) {
        
      }
    });
  }
}

/* Función para esperar a que se muestre el modal */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function finishRedirect() {
  await sleep(3000); 
  window.location.href = '/admin/catalogo/GestionDeUsuarios.html';
}

function validarEditUser(email, nombre, app, apm, rolSeguridad, rolAnfitrion, telefono) {
  //Validación del correo
  let flag = true
  if (email) {
    if (!validateEmail(email)) {
      flag = false;
    }
  } else {
    flag = false;
    document.getElementById("emailForm").innerHTML = `<p class="msg-error-form">Favor de especificar un correo</p>`;
  }
  
  //Validación de nombre
  if (nombre) {
    if (!validateTextWithSpacesWithoutNumber(nombre)) {
      flag = false;
    }
  } else {
    flag = false;
    document.getElementById("nombreForm").innerHTML = `<p class="msg-error-form">Favor de especificar un nombre</p>`
  }

  //Validación de apellido paterno
  if (app) {
    if (!validateTextWithoutSpacesNumber(app)) {
      flag = false;
    }
  } else {
    flag = false;
    document.getElementById("appForm").innerHTML = `<p class="msg-error-form">Favor de especificar un apellido paterno</p>`
  }

  //Validación de apellido materno
  if (apm) {
    if (!validateTextWithoutSpacesNumber(apm)) {
      flag = false;
    }
  } else {
    flag = false;
    document.getElementById("apmForm").innerHTML = `<p class="msg-error-form">Favor de especificar un apellido materno</p>`
  }

  //Validación de telefono
  if (telefono) {
    if (!validatePhoneNumber(telefono)) { 
      flag = false;
    }
  } else {
    flag = false;
    document.getElementById("telefonoForm").innerHTML = `<p class="msg-error-form">Favor de especificar un número teléfonico</p>`
  }

  //Validación de selección de roles
  if (rolAnfitrion || rolSeguridad) {
  } else {
    flag = false;
    document.getElementById("rolForm").innerHTML = `<p class="msg-error-form">Favor de especificar un rol de usuario</p>`
  }

  return flag
}

function cancelarForm() {
  window.location.href = '/admin/catalogo/GestionDeUsuarios.html';
}
