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

window.onload = function () { 
  if(window.location.pathname == "/seguridad/seguridad.html")
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
    } else if (result.isDenied) {
      
    }
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

function homeSeguridad() {
  window.location.href = `/seguridad/seguridad.html`
}