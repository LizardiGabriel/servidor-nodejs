window.onload = function () {
    cargarDatos();
}

function cargarDatos() {
    console.log("Cargando datos");

    let url = window.location.href;
    let urlParams = new URLSearchParams(window.location.search);
    const idReunion = urlParams.get('idReunion');

    console.log('idReunion: ' + idReunion);

    fetch(`/anfitrion/reuniones/detalles/${idReunion}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);    
            /*document.getElementById('nombreSala').value = data.nombre_sala;
            document.getElementById('numero').value = data.numero_sala;
            document.getElementById('piso').value = data.piso_sala;
            document.getElementById('cupoMax').value = data.capacidad_sala;
            document.getElementById('estadoSala').value = data.estatus_sala;
            */

        })
        .catch(error => {
            console.log(error);
        });



}