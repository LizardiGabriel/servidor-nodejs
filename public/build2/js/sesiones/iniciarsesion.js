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

function checkCredenciales() {
  let email = document.getElementById('loginEmail').value;
  let password = document.getElementById('loginPassword').value;
  let Recuerdame = document.getElementById('recuerdame').value;

  //if(validatePassword(password) == "OK" && validateEmail(email)){
    fetch('/home/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
        Recuerdame: Recuerdame
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log('data: ', data);
      switch (data.status) {
        case 200:
          window.location.href = data.ruta;
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
            icon: "error",
            text: data.error,
          });
          break;
        default:
            break;
      }
    })
  //}
}

function validaLogin(email, password) {

  let flag = true

  if (titulo) {
      if (!validateTextWithSpacesNumber(titulo)) {
          flag = false;
      }
  } else {
      flag = false;
      document.getElementById("titleFormID").innerHTML = `<p class="msg-error-form">Ingrese el título de la reunión</p>`;
  }

  if (descripcion) {
      if (!validateTextWithSpacesNumber(descripcion)) {
          flag = false;
      }
  } else {
      flag = false;
      document.getElementById("descFormID").innerHTML = `<p class="msg-error-form">Ingrese una descripción</p>`;
  }

  if (!horaInicio || !horaFin || horaInicio >= horaFin) {
      flag = false;
      document.getElementById("timeFormID").innerHTML = `<p class="msg-error-form">Ingrese un horario correcto</p>`;
  } else {
      document.getElementById("timeFormID").innerHTML = ``;
  }

  if (fecha) {
  } else {
      flag = false;
      document.getElementById("dateFormID").innerHTML = `<p class="msg-error-form">Ingrese una fecha</p>`;
  }

  if (nombreSala) {
      if (!validateTextWithSpacesNumber(nombreSala)) {
          flag = false;
      }
  } else {
      flag = false;
      document.getElementById("nombreSalaForm").innerHTML = `<p class="msg-error-form">Favor de especificar un nombre de sala</p>`
  }

  return flag;
}