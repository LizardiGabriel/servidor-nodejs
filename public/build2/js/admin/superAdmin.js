function logout() {
    fetch("/admin/logout", {
        method: "GET"
    })
        .then(response => {
            if (response.ok) {
                window.location.href = "/";
            } else {
                console.error("Error al cerrar sesión:", response.statusText);
            }
        })
        .catch(error => console.error("Error al cerrar sesión:", error));

}
//funcion editar datos personales
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





