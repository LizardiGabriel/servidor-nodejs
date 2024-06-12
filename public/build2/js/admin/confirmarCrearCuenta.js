var url = 'a';
var urlParams = 'a';
var rolSeguridad = 'a';
var rolAnfitrion = 'a';
var idRol = 'a';
var email = 'a';
var nombre = 'a';
var apellidoPaterno = 'a';
var apellidoMaterno = 'a';
var foto_usuario = 'a';
var telefono = 'a';


window.onload = function () {
    cargarInfoDelUrl();
}
async function cargarInfoDelUrl() {
    url = window.location.href;
      urlParams = new URLSearchParams(window.location.search);

      rolSeguridad = urlParams.get('rolSeguridad');
      rolAnfitrion = urlParams.get('rolAnfitrion');

      idRol = 'a';

    if (rolSeguridad == 'on') {
        idRol = 'Seguridad';
    } else {
        idRol = 'Anfitrion';
    }

      email = urlParams.get('email');
      nombre = urlParams.get('nombre');
      apellidoPaterno = urlParams.get('apellidoPaterno');
      apellidoMaterno = urlParams.get('apellidoMaterno');


      foto_usuario = 'prueba.jpg';
      telefono = '1234567890';

    document.getElementById('puesto').value = idRol;
    document.getElementById('email').value = email;
    document.getElementById('name').value = nombre + ' ' + apellidoPaterno + ' ' + apellidoMaterno;
    
}

async function enviarDatos() {
    fetch('/admin/catalogo/usuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            nombre,
            apellidoPaterno,
            apellidoMaterno,
            telefono,
            idRol,
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
                });
                
                finishRedirect()
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
}

/* Función para esperar a que se muestre el modal */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function finishRedirect() {
  await sleep(3000); 
  window.location.href = '/admin/catalogo/GestionDeUsuarios.html';
}