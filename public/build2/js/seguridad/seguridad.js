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

function logout() {
  fetch("/seguridad/logout", {
    method: "GET"
  })
  .then(response => {
    if (response.ok) {
      window.location.href = "/home/login.html";
    } else {
      modal.fire({
        icon: "error",
        text: "Error al cerrar sesión: " + response.statusText,
      });
      console.error("Error al cerrar sesión:", response.statusText);
    }
  })
.catch(error => {
  modal.fire({
    icon: "error",
    text: error,
  });
  console.error("Error al cerrar sesión:", error)
});
}

//Funciones de redireccionamiento
function editarDatosPersonales() {
  window.location.href = `/seguridad/EditarDatosPersonales.html`;
}

function scannerQR() {
  window.location.href = `/seguridad/escanearQR.html`
}

function agendaDelDia() {
  window.location.href = `/seguridad/visualizarAgenda.html`
}
