let url = window.location.href;
let urlParams = new URLSearchParams(window.location.search);
console.log(urlParams);
const idReunion = parseInt(urlParams.get('idReunion'));


window.onload = function () {
    obtenerSalas();   
    if(!isNaN(idReunion)){
        console.log("Se requieren cargar los datos");
        cargarDatosReunion(idReunion)
    }
        
}

function cargarDatosReunion(idReunion){
    fetch(`/anfitrion/reuniones/detalles/${idReunion}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);    
    })
    .catch(error => {
        console.log(error);
    })
}

function agregarFecha() {
    console.log('agregarFecha');
    const tablaFechasRepetir = document.getElementById('tablaFechasRepetir');
    const fila = document.createElement('tr');
    fila.innerHTML = `
        <td><input type="date" class="form-control form-control-lg Formulario__inputGroup__input" name="fechaRepetir" style="position: relative;" required></td>

        <td><button class="addFecha__boton" onclick="eliminarFila(this)">Eliminar</button></td>
    `;
    tablaFechasRepetir.appendChild(fila);
}
function eliminarFila(boton) {
    const fila = boton.parentNode.parentNode;
    fila.parentNode.removeChild(fila);
}


function crearReunion() {
    console.log('crearReunion');
    event.preventDefault();
    const titulo_reunion = document.getElementById('titleID').value;
    const descripcion_reunion = document.getElementById('descID').value;
    const fecha_reunion = document.getElementById('dateID').value;
    const hora_inicio_reunion = document.getElementById('time1ID').value;
    const hora_fin_reunion = document.getElementById('time2ID').value;
    const isRepetible = document.getElementById('isRepetible').checked;
    const nombreSala = document.getElementById('nombreSala').value;

    const fechasRepetir = [];
    document.querySelectorAll('input[name="fechaRepetir"]').forEach(input => {
        fechasRepetir.push(input.value);
    });

    const envJson = {
        titulo_reunion,
        descripcion_reunion,
        fecha_reunion,
        hora_inicio_reunion,
        hora_fin_reunion,
        isRepetible,
        nombreSala,
        fechasRepetir
    };

    fetch('reuniones', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(envJson)
    })
        .then(response => response.json())
        .then(data => {
            console.log('data:', data);
            if (data.respuesta === 'true') {
                modal.fire({
                    title: "Reunión creada",
                    icon: "success",
                    text: "La reunión se ha creado exitosamente",
                }).then(() => {
                    window.location.href = '/anfitrion/reuniones.html';
                });
            } else {
                modal.fire({
                    title: "Error",
                    icon: "error",
                    text: data.error,
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            modal.fire({
                title: "Error",
                icon: "error",
                text: data.error,
            });
        });
}

function obtenerSalas() {
    fetch('salas')
        .then(response => response.json())
        .then(salas => {
            console.log('salas:', salas);
            const selectSala = document.getElementById('nombreSala');
            selectSala.innerHTML = '';
            salas.forEach(sala => {
                const option = document.createElement('option');
                option.value = sala.id_sala;
                option.textContent = sala.nombre_sala;
                selectSala.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

const botonAddFecha = document.getElementById("btnAgregarFecha");

botonAddFecha.addEventListener("click", (evt)=>{
        evt.preventDefault();
})