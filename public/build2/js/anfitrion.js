function logout() {
    fetch("/anfitrion/logout", {
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

function refReuniones() {
    window.location.href = "/anfitrion/reuniones.html";
}
function refSalas() {
    window.location.href = "/anfitrion/salas.html";
}
function refCuenta() {
    window.location.href = "/anfitrion/cuenta.html";
}
function reuniones2() {
    window.location.href = '/anfitrion/crearReunion';
}



