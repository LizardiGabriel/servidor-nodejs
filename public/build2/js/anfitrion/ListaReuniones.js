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
    obtenerReuniones();
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
            modal.fire({
                title: "Error",
                icon: "error",
                text: error,
            });
            console.error('Error:', error);
        });
}
function mostrarFormulario(idReunion) {
    const formulario = document.getElementById(`formulario-${idReunion}`);
    formulario.style.display = 'block';
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

    console.log(envJson);
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
            modal.fire({
                title: "Error",
                icon: "error",
                text: error,
            });
            console.error('Error:', error);
        });
}
function detallesReunion(idReunion) {
    console.log('Detalles de la reunion:', idReunion);
    window.location.href = `reuniones/ConsultarDatos.html?idReunion=${idReunion}`;

}
function eliminarReunion(idReunion) {
    console.log('Eliminar reunion:', idReunion);
}