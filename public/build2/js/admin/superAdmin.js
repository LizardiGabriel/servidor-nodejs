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
  modal.fire({
    timer: undefined,
    icon: 'question',
    title: "¿Desea cerrar sesión?",
    showDenyButton: true,
    confirmButtonText: "Cerrar sesión",
    denyButtonText: `Cancelar`
  }).then((result) => {
    if (result.isConfirmed) {
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
    } else if (result.isDenied) {
      
    }
  });
    
}

window.onload = function () { 
  if(window.location.pathname == "/admin/admin.html")
    obtenerDatos();
}

function obtenerDatos() { 
  console.log('ObtenerDatos');
  fetch('/get-nombre')
        .then(response => response.json())
        .then(data => {
            console.log('Datos de la sesión:', data);
            let nombrehtml = document.getElementById('nameGet');
            nombrehtml.innerHTML = data.nombre;
        })
        .catch((error) => {
            console.error('Error al obtener los datos de la sesión:', error);
            modal.fire({
                title: "Error",
                icon: "error",
                text: error,
            });
        }
        );
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

function homeAdmin() {
    window.location.href = "/admin/admin.html";
}


