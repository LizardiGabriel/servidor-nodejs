var salita = 1;

window.onload = function () {
    cargarDatos();
}

function cargarDatos() {
    console.log("Cargando datos");

    let url = window.location.href;
    let urlParams = new URLSearchParams(window.location.search);
    const idSala = urlParams.get('idSala');
    salita = idSala;

    console.log('idSala: ' + idSala);



    fetch(`/admin/catalogo/salas/${idSala}`)
        .then(response => response.json())
        .then(data => {
            
            document.getElementById('nombreSala').value = data.nombre_sala;
            document.getElementById('numero').value = data.numero_sala;
            document.getElementById('piso').value = data.piso_sala;
            document.getElementById('cupoMax').value = data.capacidad_sala;
            document.getElementById('estadoSala').value = data.estatus_sala ;

        })
        .catch(error => {
            console.log(error);
        });

}

function enviarForm() {


    event.preventDefault();
    const nombreSala = document.getElementById("nombreSala").value;
    const cupoMaximo = document.getElementById("cupoMax").value;
    const piso = document.getElementById("piso").value;
    const numerito = document.getElementById("numero").value;

    const selectElement = document.getElementById("estadoSala");
    const estado = selectElement.options[selectElement.selectedIndex].value;

    //alert("nombreSala: " + nombreSala + "\ncupoMaximo: " + cupoMaximo + "\npiso: " + piso + "\nnumerito: " + numerito + "\nselectedOption: " + selectedOption);

    fetch(`/admin/catalogo/salas/${salita}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombreSala,
            cupoMaximo,
            piso,
            numerito,
            estado
        })
    })
    .then(response => {
        if (response.ok) {
            // redirigir a salas
            window.location.href = '/admin/catalogo/GestionarSalas.html';
        } else {
            alert('Error al modificar sala: ' + response.statusText);
            console.error('Error al modificar sala:', response.statusText);
        }
    })
    .catch(error => console.error('Error al modificar sala:', error));

}

function cancelar() {
    event.preventDefault();
    window.location.href = '/admin/catalogo/GestionarSalas.html';
}