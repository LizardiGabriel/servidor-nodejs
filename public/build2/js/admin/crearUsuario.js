/* Función para añadir un nuevo usuario */
function addUser() {
  let email = document.getElementById("loginEmail").value;
  let nombre = document.getElementById("nombre").value;
  let app = document.getElementById("app").value;
  let apm = document.getElementById("apm").value;
  let rolSeguridad = document.getElementById("rolSeguridad").checked;
  let rolAnfitrion = document.getElementById("rolAnfitrion").checked;
  let rol;
  let foto_usuario = 'prueba.jpg';
  let telefono = '1234567890';
  //Si esta bien la validación, hacemos la petición
  if (validarAddUser(email, nombre, app, apm, rolSeguridad, rolAnfitrion)) {
    if (rolSeguridad) {
      rol = document.getElementById('rolSeguridad').value;
    } else if (rolAnfitrion) {
      rol = document.getElementById('rolAnfitrion').value;
    }
      
    modal.fire({
      timer: undefined,
      icon: 'question',
      title: "¿Desea continuar?",
      html: `Se creará cuenta de usuario con los siguientes datos: <br>
      Nombre: ${nombre}<br>
      Apellido Paterno: ${app}<br>
      Apellido Materno: ${apm}<br>
      Email: ${email}<br>
      Rol: ${rol}`,
      showDenyButton: true,
      confirmButtonText: "Crear cuenta de usuario",
      denyButtonText: `Cancelar`
    }).then((result) => {
      if (result.isConfirmed) {
        fetch('/admin/catalogo/usuarios', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              email,
              nombre,
              apellidoPaterno:app,
              apellidoMaterno:apm,
              telefono,
              idRol:rol,
              foto_usuario
          })
      })
      .then(response => {
          console.log('Respuesta:');
          console.log(response);
          if (response.ok) {
              response.json().then(data => {
                console.log('Usuario creado con éxito:', data.message);
                if (data.message === 'true') {
                  modal.fire({
                    title: "Operación exitosa",
                    icon: "success",
                    text: "Usuario creado con éxito",
                  }).then(() => {
                    window.location.href = '/admin/catalogo/GestionDeUsuarios.html';
                  });
                  
                  /* finishRedirect() */
                } else {
                  modal.fire({
                    title: "Error",
                    icon: "error",
                    text: "Error al crear cuenta",
                  });
                }
              });
          } else {
            modal.fire({
              title: "Error",
              icon: "error",
              text: "Error al crear usuario:" + response.statusText,
            });
            console.log('Error al crear usuario:', response.statusText);
          }
      })
        .catch(error => {
          modal.fire({
            title: "Error",
            icon: "error",
            text: "Error al crear usuario:" + error,
          });
          console.error('Error al crear usuario:', error);
        })
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

function validarAddUser(email, nombre, app, apm, rolSeguridad, rolAnfitrion) {
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

  //Validación de selección de roles
  if (rolAnfitrion || rolSeguridad) {
  } else {
    flag = false;
    document.getElementById("rolForm").innerHTML = `<p class="msg-error-form">Favor de especificar un rol de usuario</p>`
  }
  
  return flag
}