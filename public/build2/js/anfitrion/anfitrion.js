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

window.onload = function () {
    obtenerDatos();
}
function obtenerDatos() {

    console.log('obtenerDatos');
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