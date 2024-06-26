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
  if (window.location.pathname == "/invitado/home/invitado.html")
    obtenerDatos();
}

async function obtenerDatos() {
  console.log('ObtenerDatos');
  const response = await fetch('/invitado/getemail');
  const data = await response.json();
  var datosUsuario = await getData(data.email);
  console.log('Datos de la sesión:', data);
  let nombrehtml = document.getElementById('nameGet');
  nombrehtml.innerHTML = datosUsuario.nombre_invitado+" "+datosUsuario.apellido_paterno_invitado;
 
}

async function getData(correo) {
  try {
      // Remover el ':' adicional del inicio de la URL si no es necesario
      const response = await fetch('/invitado/catalogo/usuarioEmail/:'+correo);
      const data = await response.json();
      console.log(data);
      return data;  // Asegura que data sea devuelta de la función
  } catch (error) {
    modal.fire({
      title: "Error",
      icon: "error",
      text: "Error fetching data:" + error,
    });
      console.error('Error fetching data:', error);
      return null;  // Devolver null o algún indicativo de error
  }
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
      fetch("/invitado/logout", {
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
function reunionesPendientes() {
  window.location.href = `/invitado/home/pendientes.html`
}

function reunionesAgendadas() {
  window.location.href = `/invitado/home/agendadas.html`
}

function homeInvitado(){
  window.location.href = `/invitado/home/invitado.html`
}