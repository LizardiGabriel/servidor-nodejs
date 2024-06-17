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