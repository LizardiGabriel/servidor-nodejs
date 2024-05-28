function logout() {
    fetch("/anfitrion/reuniones", {
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
    window.location.href = "/anfitrion/reuniones2.html";
}


//=================> COONSULTAR REUNIONES <=================
document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    events: function(info,sucessCallback,failureCallback){
        fetch('reuniones')
            .then(function(response){
                return response.json();
            })
            .then(function(data){
                let reunionesmap=[];
                for(const reunion of data){
                    for(const fecha of reunion.fechasRepeticion){ 
                        const evento={
                            title:reunion.titulo_reunion,
                            start: new Date(formatearFecha(fecha.fecha_repeticion)),
                            end: new Date(formatearFecha(fecha.fecha_repeticion)),
                            location: "Num sala "+reunion.id_sala,
                            url: "anfitrion/detallesreunion/${reunion.id_reunion}",
                            timeStart: fecha.hora_inicio_repeticion,
                            timeEnd: fecha.hora_fin_repeticion
                        } 
                        reunionesmap.push(evento);                     
                    }
                }
                console.log(reunionesmap);
                sucessCallback(reunionesmap);
            })
            .catch(function(error){
                failureCallback(error)
            })
    },
    eventContent: function(info){
        return {
            html: `
            <div style="overflow: hidden; font-size: 12px; positon: relative;  cursor: pointer; font-family: 'Inter', sans-serif;">
                <div><strong>${info.event.title}</strong></div>
                <div>Location: ${info.event.extendedProps.location}</div>
                <div>Date: ${info.event.start.toLocaleDateString(
                    "es-US",
                    {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                    }
                )}</div>
                <div>Time: ${info.event.extendedProps.timeStart} - ${info.event.extendedProps.timeEnd}</div>
            </div>
            `
        }
    },
    eventMouseEnter: function(mouseEnterInfo){
        console.log(mouseEnterInfo)
        let el = mouseEnterInfo.el
        el.classList.add("relative")

        let newEl = document.createElement("div")
        let newElTitle = mouseEnterInfo.event.title
        let newElLocation = mouseEnterInfo.event.extendedProps.location
        newEl.innerHTML = `
            <div
                class="fc-hoverable-event"
                style="position: absolute; bottom: 100%; left: 0; width: 300px; height: auto; background-color: white; z-index: 50; border: 1px solid #e2e8f0; border-radius: 0.375rem; padding: 0.75rem; font-size: 14px; font-family: 'Inter', sans-serif; cursor: pointer;"
            >
                <strong>${newElTitle}</strong>
                <div>Location: ${newElLocation}</div>

            </div>
        `
        el.after(newEl)
    },
    eventMouseLeave: function(){
        document.querySelector(".fc-hoverable-event").remove()
    }
    });
    calendar.render();
    });

    function formatearFecha(fechaString) {
        const fecha = new Date(fechaString);

        // Extraer los componentes de la fecha
        let mes = fecha.getMonth() + 1; // getMonth() devuelve un índice basado en 0
        let dia = fecha.getDate()+1; //Considerando indice en 0
        let año = fecha.getFullYear();

        // Asegurar que el día y mes tengan dos dígitos
        mes = mes < 10 ? '0' + mes : mes;
        dia = dia < 10 ? '0' + dia : dia;

        // Formatear la fecha en el formato deseado
        return `${mes}/${dia}/${año}`;
    }

    //================> REUNIONES <================//
    window.onload = function () {
        obtenerReuniones();
        obtenerSalas();
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

    function eliminarFila(boton) {
        const fila = boton.parentNode.parentNode;
        fila.parentNode.removeChild(fila);
    }

    function agregarFecha() {
        const tablaFechasRepetir = document.getElementById('tablaFechasRepetir');
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td><input type="date" name="fechaRepetir" required></td>
            <td><button onclick="eliminarFila(this)">Eliminar</button></td>
        `;
        tablaFechasRepetir.appendChild(fila);
    }

    function obtenerReuniones() {
        fetch('reuniones')
            .then(response => response.json())
            .then(reuniones => {
                console.log('reuniones xd:', reuniones);

                const divReunion = document.getElementById('divReuniones');
                divReunion.innerHTML = '';

                reuniones.forEach(reunion => {
                    const card = document.createElement('div');
                    card.classList.add('card');

                    const emailDiv = 'correoInv-' + reunion.id_reunion;
                    const acompanantesDiv = 'acompanantesInv-' + reunion.id_reunion;

                    card.innerHTML = `
                    
                        <h4><b>Reunion id: </b>${reunion.id_reunion}</h4>

                        <div class="asunto">
                        <h4><b>Asunto: </b></h4>
                        <p>${reunion.titulo_reunion}</p>
                        </div>


                        <h4><b>Fechas: </b>${reunion.numRepeticion}</h4>
                        <ul class="fechas">${reunion.fechasRepeticion.map(fecha =>
                        `<li>${fecha.id_repeticion} , 
                            ${fecha.fecha_repeticion}, ${fecha.hora_inicio_repeticion} - ${fecha.hora_fin_repeticion},
                            ${fecha.estatus_repeticion}</li>
                                
                        `).join('')}
                        </ul>


                        <h4><b>Descripción</b></h4>
                        <br/>
                        <p>${reunion.descripcion_reunion}</p>
                        <br/>
                        <h4><b>id Sala: </b>${reunion.id_sala}</h4>
                        <br/>

                        <h4><b>Lista de los correos de los invitados: - acompañantes disponibles</b></h4>
                        
                        <ul>${reunion.infoInvitados.map(info =>
                        `<li>${info.correo_invitado} - ${info.numero_colados}</li>
                        `).join('')}
                        </ul>
                        

                        <button onclick="detallesReunion(${reunion.id_reunion})">Detalles</button>
                        <button onclick="mostrarFormulario(${reunion.id_reunion})">Crear Invitación</button>
                        <button onclick="eliminarReunion(${reunion.id_reunion})">Eliminar</button>

                        <div id="formulario-${reunion.id_reunion}" style="display: none;">
                            <h4><b>Formulario de Invitación</b></h4>
                            <form id="form-${reunion.id_reunion}">
                                <label for="correos">Correo de invitación:</label><br>
                                <input type="text" id="${emailDiv}" name="correos" rows="4" cols="50"><br>

                                <label for="acompanantes">numero de acompañantes:</label><br>
                                <input type="number" id="${acompanantesDiv}" name="acompanantes" required><br>

                                <button type="button" onclick="enviarInvitacion(${reunion.id_reunion})">añadir</button>
                            </form>
                        </div>

                        `;
                    divReuniones.appendChild(card);
                });

            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    function mostrarFormulario(idReunion) {
        const formulario = document.getElementById(`formulario-${idReunion}`);
        formulario.style.display = 'block';
    }




    function crearReunion() {


        const titulo_reunion = document.getElementById('titulo_reunion').value;
        const descripcion_reunion = document.getElementById('descripcion_reunion').value;
        const fecha_reunion = document.getElementById('fecha_reunion').value;
        const hora_inicio_reunion = document.getElementById('hora_inicio_reunion').value;
        const hora_fin_reunion = document.getElementById('hora_fin_reunion').value;
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
                obtenerReuniones();
            })
            .catch(error => {
                console.error('Error:', error);
            });



    }
    function enviarInvitacion(idReunion) {
        const emailDiv = 'correoInv-' + idReunion;
        const correoInv = document.getElementById(emailDiv).value;
        const acompanantesInv = document.getElementById(`acompanantesInv-`+idReunion).value;

        const envJson = {
            idReunion,
            correoInv,
            acompanantesInv
            
        };

        fetch(`reuniones/invitacion`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(envJson)
        })
            .then(response => response.json())
            .then(data => {
                console.log('data:', data);
                obtenerReuniones();
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    function detallesReunion(idReunion) {
        console.log('Detalles de la reunion:', idReunion);

    }
    function eliminarReunion(idReunion) {

    }