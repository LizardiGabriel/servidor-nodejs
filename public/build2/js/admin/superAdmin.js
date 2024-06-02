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
    fetch("/admin/logout", {
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

//funciones de redireccionamiento
function editarDatosPersonales() {
    window.location.href = "/admin/catalogo/EditarDatosPersonales.html";
}

function salas() {
    window.location.href = "/admin/catalogo/catalogo.html";
}
function usuarios() {
    window.location.href = "/admin/catalogo/usuarios.html";
}
function crearCuenta() {
    window.location.href = "/admin/catalogo/crearCuenta.html";
}

function crearSala() {
    window.location.href = "/admin/catalogo/CrearSala.html";
}

function gestionDeUsuarios() {
    window.location.href = "/admin/catalogo/GestionDeUsuarios.html";
}

function gestionDeInvitados() {
    window.location.href = "/admin/catalogo/invitados.html";
}

function gestionarSalas() {
    window.location.href = "/admin/catalogo/GestionarSalas.html";
}

function gestionarReuniones() {
    window.location.href = "/admin/catalogo/GestionarReuniones.html";
}
//funcion para ir a ConsultarDatosReunion
function consultarDatosReunion(id) {
    window.location.href = "/admin/ConsultarReunion.html?idReunion=" + id;
}

function gestionarInvitaciones() {
    window.location.href = "/admin/catalogo/GestionDeInvitaciones.html";
}

function gestionarUsuarios(){
    window.location.href = "/admin/catalogo/gestionarusuarios.html";
}





