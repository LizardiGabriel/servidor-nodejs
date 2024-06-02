/* Función para los modales */
const modal = Swal.mixin({
  timer: 3000,
  timerProgressBar: true,
  background: "#fbfff1",
  showConfirmButton: true,
  confirmButtonColor: "#89b6b1",
  cancelButtonColor: "#305272",
  denyButtonColor: "#305272",
  width: "50%",
  customClass: {
    title: "titleSize",
    htmlContainer: "contentSize",
    confirmButton: "buttonSize",
    cancelButton: "buttonSize",
    denyButton: "buttonSize",
    icon: "iconSize",
  }
})

var id = 'a';
var email = 'a';
/* Al cargar la página se le asigna la información necesaria como el id y el email */
window.onload = function () {
  cargarInfoDelUrl();
}

/* Se le asigna los datos de id e email */
async function cargarInfoDelUrl() {
  url = window.location.href;
  urlParams = new URLSearchParams(window.location.search);

  id = urlParams.get('id');
  email = urlParams.get('email');
}


function cambiarCon(){
  let password = document.getElementById('loginPassword').value;
  let passwordR = document.getElementById('loginPasswordR').value;
  //Verificamos si tiene valor
  if (password) {
    if (passwordR) {
      if (validatePassword(password) == "OK") {
        modal.fire({
          timer: undefined,
          icon: 'question',
          title: "¿Estas seguro de actualizar su contraseña?",
          showDenyButton: true,
          confirmButtonText: "Actualizar contraseña",
          denyButtonText: `Cancelar`
        }).then((result) => {
          if (result.isConfirmed) {
            fetch('/home/cambiar', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                id,
                email,
                password,
              })
            })
              .then(response => response.json())
              .then(data => {
                if (data.error) {
                  modal.fire({
                    title: "Error",
                    icon: "error",
                    text: data.error,
                  });
                } else {
                  console.log(data.message);
                  console.log(data.id);
                  window.location.href = '/home/login.html';
                }
              })
              .catch(error => {
                modal.fire({
                  title: "Error",
                  icon: "error",
                  text: 'Error al procesar la solicitud: ' + error,
                });
              });
          } else if (result.isDenied) {
            
          }
        });
      }
    } else {
      passwordFormR.innerHTML = '<p class="msg-error-form">La contraseña no coincide</p>';
    }
  } else {
    passwordForm.innerHTML = '<p class="msg-error-form">Favor de introducir una contraseña</p>'
  }
}