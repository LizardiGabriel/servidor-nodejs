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

  fetch('/home/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: "anfitrion@test.com",
      password: "password",
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
        Swal.fire({
          icon: "error",
          text: data.error,
        });
        break;
      default:
          break;
    }
  })
}