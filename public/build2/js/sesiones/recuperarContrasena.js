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
            alert('Error user not found: ' + data.error);
          } else {
            console.log(data.message);
            console.log(data.id);

            window.location.href = '/home/recuperar2.html?id=' + data.id + '&email=' + email;

          }
        })
        .catch(error => {
          alert('Error al procesar la solicitud: ' + error);
        });
    }
  } else
    emailForm.innerHTML = `<p class="msg-error-form">Favor de especificar un correo</p>`;
}

/* Función para redirigir al login */
function cancelar() {
  window.location.href = "/home/login.html";
}