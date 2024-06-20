/* Función para los modales */
const modal = Swal.mixin({
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


document.getElementById("myForm").addEventListener("submit", function (event) {
  event.preventDefault();
});

/* Función para enviar la solicitud de recuperar contraseña */
function enviar() {
  let email = document.getElementById('loginEmail').value;
  //Verificar si tiene valor
  if (email) {
    //Verificar si va acorde a la validación
    if (validateEmail(email)) {
      fetch('/home/recuperar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
        })
      })
        .then(response => response.json())
        .then(data => {
          if (data.status == 404) {
            modal.fire({
              title: "Error",
              icon: "error",
              text: 'Usuario no encontrado: ' + data.error,
            });
          } else {
            console.log(data.message);
            console.log(data.id);
            modal.fire({
              title: "Éxito",
              icon: "success",
              text: 'Operación realizada con éxito: Correo enviado',
            }).then((result) => {
              if (result.isConfirmed || result.isDismissed) {
                window.location.href = '/home/login.html';
              }
            });
          }
        })
        .catch(error => {
          modal.fire({
            title: "Error",
            icon: "error",
            text: error,
          });
        });
    }
  } else
    emailForm.innerHTML = `<p class="msg-error-form">Favor de especificar un correo</p>`;
}

/* Función para redirigir al login */
function cancelar() {
  window.location.href = "/home/login.html";
}