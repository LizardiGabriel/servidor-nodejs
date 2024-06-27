let url = window.location.href;
let urlParams = new URLSearchParams(window.location.search);
console.log(urlParams);
const idReunion = parseInt(urlParams.get('idReunion'));
const horaInicio = urlParams.get('hora_i');
const horaFin = urlParams.get('hora_f');
const idRep = parseInt(urlParams.get('idRep'));

window.onload = async function () {
    await obtenerSalas();
    if (!isNaN(idReunion)) {
        console.log("Se requieren cargar los datos");
        cargarDatosReunion(idReunion)
    }
}

function cargarDatosReunion(idReunion) {
    fetch(`/anfitrion/reuniones/detalles/${idReunion}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            document.getElementById("titleID").value = data.titulo_reunion;
            document.getElementById("titleID").disabled = true;
            document.getElementById("descID").value = data.descripcion_reunion;
            document.getElementById("descID").disabled = true;
            document.getElementById("time1ID").value = horaInicio;
            document.getElementById("time1ID").disabled = true;
            document.getElementById("time2ID").value = horaFin;
            document.getElementById("time2ID").disabled = true;
            document.getElementById("conatinerRepetible").style.display = "none";
            document.getElementById("buttonCrear").style.display = "none";
            document.getElementById("buttonReagendar").style.display = "block";
            var select = document.getElementById('nombreSala');
            var opciones = select.options;

            for (var i = 0; i < opciones.length; i++) {
                if (opciones[i].text === data.nombreSala) {
                    select.selectedIndex = i;
                    break;
                }
            }
            select.disabled = true;

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
        <td><input type="date" class="form-control form-control-lg Formulario__inputGroup__input" name="fechaRepetir" id="dateID" style="position: relative;" required></td>
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

    if (validarNewReunion(titulo_reunion, descripcion_reunion, fecha_reunion, hora_inicio_reunion, hora_fin_reunion, nombreSala)) {

        modal.fire({
            timer: undefined,
            icon: 'question',
            title: "¿Desea continuar?",
            html: `Se agendará una reunión con los siguientes datos: <br>
            Título: ${titulo_reunion}<br>
            Descripción: ${descripcion_reunion}<br>
            Fecha: ${fecha_reunion}<br>
            Hora de inicio: ${hora_inicio_reunion}<br>
            Hora de fin: ${hora_fin_reunion}<br>
            Nombre de sala: ${nombreSala}<br>`,
            showDenyButton: true,
            confirmButtonText: "Agendar",
            denyButtonText: `Cancelar`
        }).then((result) => {
            if (result.isConfirmed) {
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
            };
        });
    };

}

function ReagendarReunion() {
    const fecha_reunion = document.getElementById('dateID').value;
    event.preventDefault();
    const envJson = {
        idReunion: idReunion,
        idRep: idRep,
        fecha_reunion: fecha_reunion
    };
    console.log(envJson);

    if (validarFechaReagendar(fecha_reunion)) {

        modal.fire({
            timer: undefined,
            icon: 'question',
            title: "¿Desea continuar?",
            html: `Se reagendara la reunión a la fecha: ${fecha_reunion}<br>`,
            showDenyButton: true,
            confirmButtonText: "Aceptar",
            denyButtonText: `Cancelar`
        }).then((result) => {
            if (result.isConfirmed) {

                fetch('reunionesReagendar', {
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
                                title: "Reunión reagendada",
                                icon: "success",
                                text: "La reunión se ha actualizado exitosamente",
                            }).then(() => {
                                window.location.href = '/anfitrion/reuniones.html';
                            });
                        } else {
                            modal.fire({
                                title: "Reunión reagendada",
                                icon: "success",
                                text: "La reunión se ha actualizado exitosamente",
                            }).then(() => {
                                window.location.href = '/anfitrion/reuniones.html';
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
        });
    }
}


async function obtenerSalas() {
    fetch('salas')
        .then(response => response.json())
        .then(salas => {
            console.log('salas:', salas);
            const selectSala = document.getElementById('nombreSala');
            selectSala.innerHTML = '';
            salas.forEach(sala => {
                if (sala.estatus_sala === "Disponible") {
                    const option = document.createElement('option');
                    option.value = sala.id_sala;
                    option.textContent = sala.nombre_sala;
                    selectSala.appendChild(option);
                }

            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}



const botonAddFecha = document.getElementById("btnAgregarFecha");

botonAddFecha.addEventListener("click", (evt) => {
    evt.preventDefault();
})

//Funciones auxiliares 
function convertirHora12a24(hora12) {
    const hora = hora12.slice(0, -2);
    const modificador = hora12.slice(-2);

    let [horas, minutos] = hora.split(':');

    horas = parseInt(horas, 10);

    if (modificador === 'PM' && horas !== 12) {
        horas += 12;
    } else if (modificador === 'AM' && horas === 12) {
        horas = 0;
    }

    const hora24 = `${horas.toString().padStart(2, '0')}:${minutos}`;
    return hora24;
}

function validarFechaReagendar(fecha) {
    let flag = true

    if (fecha) {
    } else {
        flag = false;
        document.getElementById("dateFormID").innerHTML = `<p class="msg-error-form">Ingrese una fecha</p>`;
    }

    return flag;
}

function validarNewReunion(titulo, descripcion, fecha, horaInicio, horaFin, nombreSala) {

    let flag = true

    if (titulo) {
        if (!validateTextWithSpacesNumber(titulo)) {
            flag = false;
        }
    } else {
        flag = false;
        document.getElementById("titleFormID").innerHTML = `<p class="msg-error-form">Ingrese el título de la reunión</p>`;
    }

    if (descripcion) {
        if (!validateTextWithSpacesNumber(descripcion)) {
            flag = false;
        }
    } else {
        flag = false;
        document.getElementById("descFormID").innerHTML = `<p class="msg-error-form">Ingrese una descripción</p>`;
  }

    if (!horaInicio || !horaFin || horaInicio >= horaFin) {
        flag = false;
        document.getElementById("timeFormID").innerHTML = `<p class="msg-error-form">Ingrese un horario correcto</p>`;
    } else {
        document.getElementById("timeFormID").innerHTML = ``;
    }

    if (fecha) {
    } else {
        flag = false;
        document.getElementById("dateFormID").innerHTML = `<p class="msg-error-form">Ingrese una fecha</p>`;
    }

    if (nombreSala) {
        if (!validateTextWithSpacesNumber(nombreSala)) {
            flag = false;
        }
    } else {
        flag = false;
        document.getElementById("nombreSalaForm").innerHTML = `<p class="msg-error-form">Favor de especificar un nombre de sala</p>`
    }

    return flag;
}
