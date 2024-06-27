window.onload = function () {
    cargarDatos();
}

function addminutes(initialT, minAdd) {
    const today = new Date();
    console.log('Fecha actual:', today);

    // Descomponer la hora inicial en componentes y crear un objeto de fecha
    const timeParts = initialT.split(':');
    const minutesPart = parseInt(timeParts[1].slice(0, -2));
    const amPm = timeParts[1].slice(-2);
    const hourPart = parseInt(timeParts[0]) % 12; // Convertir 12 a 0 para las horas
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hourPart, minutesPart);

    // Ajustar correctamente las horas si es PM
    if (amPm === "PM") {
        date.setHours(date.getHours() + 12);
    }

    console.log('Fecha con hora inicial:', date);

    // Añadir los minutos
    date.setMinutes(date.getMinutes() + parseInt(minAdd));
    console.log('Fecha después de añadir minutos:', date);

    // Formatear la fecha de vuelta a formato 12 horas con AM/PM
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const isAM = hours < 12;
    if (hours >= 12) hours -= 12;
    if (hours === 0) hours = 12; // Tratar medianoche como 12 AM

    const formattedTime = hours.toString().padStart(2, '0') + ":" + minutes + (isAM ? "AM" : "PM");
    console.log('Hora formateada:', formattedTime);
    return formattedTime;
}



let url = window.location.href;
let urlParams = new URLSearchParams(window.location.search);
console.log(urlParams);
const idReunion = parseInt(urlParams.get('idReunion'));
const idRepeticion = urlParams.get('idRepeticion');
console.log(idRepeticion);

function cargarDatos() {
    console.log("Cargando datos"); url
    fetch(`/anfitrion/reuniones/detalles/${idReunion}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            document.getElementById('reunionId').value = data.id_reunion;
            document.getElementById('reunionTitulo').value = data.titulo_reunion;
            document.getElementById('sala').value = data.nombreSala;
            document.getElementById('reunionFecha').value =data.fechasRepeticion.find(repeticion =>repeticion.id_repeticion == idRepeticion).fecha_repeticion;
            document.getElementById('horarioInicio').value = data.fechasRepeticion.find(repeticion =>repeticion.id_repeticion == idRepeticion).hora_inicio_repeticion;
            document.getElementById('horarioFin').value = data.fechasRepeticion.find(repeticion =>repeticion.id_repeticion == idRepeticion).hora_fin_repeticion;
            for (const invitado of data.infoInvitados) {
                if (invitado.es_colado_invitado === 1)
                    fetchInvitadoByEmail(invitado, data.id_reunion);

            }
        })
        .catch(error => {
            console.log(error);
        });

    async function fetchInvitadoByEmail(infoInvitados, id_reunion) {
        try {
            let isConfirmed = infoInvitados.isConfirmed === 1 ? 'Confirmado' : 'Pendiente';
            agregarFila(infoInvitados.nombre_invitado, infoInvitados.correo_invitado, infoInvitados.id_invitado, isConfirmed, id_reunion);
        } catch (error) {
            console.error('Error:', error);
            return [];  // Retorna un arreglo vacío en caso de error
        }
    }

    function agregarFila(nombreInvitado, correoElectronico, id_invitado, isConfirmed, id_reunion) {
        // Obtener el elemento tbody de la tabla
        const tbody = document.querySelector('.tabla__cuerpo');

        // Crear una nueva fila <tr>
        const fila = document.createElement('tr');

        // Agregar columnas <td> para nombre, correo y acciones
        fila.innerHTML = `
                <td>${nombreInvitado}</td>
                <td><a href="ConsultarDatosInvitado.html?idReunion=${id_reunion}&idInvitado=${id_invitado}">${correoElectronico}</a></td>
                <td>${isConfirmed}</td>
                <td class="acciones">
                    <button class="btn btn-sm eliminar" onclick="eliminarInvitado(${id_invitado})"><img src="../../img/icons/ico-trash.svg" alt="Eliminar"></button>
                </td>
            `;

        // Añadir la fila al cuerpo de la tabla
        tbody.appendChild(fila);
    }
}

document.getElementById("aumentar30").addEventListener('click', function () {
    let datos = {
        id_reunion: idRepeticion,
        hora_fin_repeticion: addminutes(document.getElementById('horarioFin').value, 30)
    }
    console.log(datos);
    fetch("/anfitrion/reuniones/hora", {
        method: 'PUT',  // Cambiamos el método a PUT
        headers: {
            'Content-Type': 'application/json',  // Indicamos que el contenido será JSON
        },
        body: JSON.stringify(datos)  // Convertimos los datos a un string JSON
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();  // Convertimos la respuesta a JSON
        })
        .then(data => {
            
            modal.fire({
                title: "Tiempo aumentado",
                icon: "success",
                text: "Se han agregado 30 minutos a la reunión",
            })
            cargarDatos();
            console.log('Success:', data);  // Manipulamos los datos recibidos
        })
        .catch(error => {
            console.error('Error:', error);  // Manejamos cualquier error
        });
});

document.getElementById("aumentar60").addEventListener('click', function () {
    let datos = {
        id_reunion: idRepeticion,
        hora_fin_repeticion: addminutes(document.getElementById('horarioFin').value, 60)
    }
    console.log(datos);
    fetch("/anfitrion/reuniones/hora", {
        method: 'PUT',  // Cambiamos el método a PUT
        headers: {
            'Content-Type': 'application/json',  // Indicamos que el contenido será JSON
        },
        body: JSON.stringify(datos)  // Convertimos los datos a un string JSON
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();  // Convertimos la respuesta a JSON
        })
        .then(data => {
            modal.fire({
                title: "Tiempo aumentado",
                icon: "success",
                text: "Se han agregado 60 minutos a la reunión",
            })
            cargarDatos();
            console.log('Success:', data);  // Manipulamos los datos recibidos
        })
        .catch(error => {
            console.error('Error:', error);  // Manejamos cualquier error
        });
});

document.getElementById("agregarInv").addEventListener('click', function () {
    document.getElementById("formularioinv").style.display = "block";
});

document.getElementById("botonAgregar").addEventListener('click', function () {
    console.log("Se agregan datos");
    enviarInvitacion(idReunion)
});

document.getElementById("reagendar").addEventListener('click', function () {
    window.location.href = "/anfitrion/crearReunion?idReunion=" + idReunion + "&" + "hora_i=" + document.getElementById('horarioInicio').value + "&" + "hora_f=" + document.getElementById('horarioFin').value + "&" + "idRep=" + idRepeticion;
});

function enviarInvitacion() {
    const correoInv = document.getElementById("correoInv").value;
    const acompanantesInv = parseInt(document.getElementById("acompanantesInv").value) ;

    const envJson = {
        idReunion,
        correoInv,
        acompanantesInv
    };
    console.log(envJson);

    if (correoInv) {
        if (validateEmail(correoInv)) {
            modal.fire({
                timer: undefined,
                icon: 'question',
                title: "¿Desea continuar?",
                html: `Se enviara la invitación al correo: <br>
                Invitado: ${correoInv}<br>`,
                showDenyButton: true,
                confirmButtonText: "Invitar",
                denyButtonText: `Cancelar`
            }).then((result) => {
                if (result.isConfirmed) {
    
                    fetch(`/anfitrion/reuniones/invitacion`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(envJson)
                    })
                        .then(response => response.json())
                        .then(data => {
                            modal.fire({
                                title: "Invitación creada",
                                icon: "success",
                                text: "La invitación se ha enviado exitosamente",
                            })
    
                            document.querySelector('.tabla__cuerpo').innerHTML = "";
                            cargarDatos();
    
                            //Desaparecemos el formulario y reestablecemos los campos
                            document.getElementById("correoInv").value = "";
                            document.getElementById("acompanantesInv").value = "";
                            document.getElementById("formularioinv").style.display = "none";
                            console.log('data:', data);
                        })
                        .catch(error => {
                            modal.fire({
                                title: "Error",
                                icon: "error",
                                text: "Error: " + error,
                            });
                            console.error('Error:', error)
                        });
                };
            });
        }
    }else{
        emailForm.innerHTML = `<p class="msg-error-form">Favor de especificar un correo</p>`;
    }
}


function eliminarInvitado(id_invitado) {
    console.log("Se borrara al invitado: " + id_invitado);
    let datos = {
        id_invitado: id_invitado
    }
    fetch("/anfitrion/reuniones/delInvitado", {
        method: 'POST',  // Cambiamos el método a PUT
        headers: {
            'Content-Type': 'application/json',  // Indicamos que el contenido será JSON
        },
        body: JSON.stringify(datos)  // Convertimos los datos a un string JSON
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();  // Convertimos la respuesta a JSON
        })
        .then(data => {
            modal.fire({
                title: "Invitación cancelada",
                icon: "success",
                text: "La invitación se ha eliminado exitosamente",
            })

            document.querySelector('.tabla__cuerpo').innerHTML = "";
            cargarDatos();
            console.log('Success:', data);  // Manipulamos los datos recibidos
        })
        .catch(error => {
            modal.fire({
                title: "Error",
                icon: "error",
                text: "Error: " + error,
            })
            console.error('Error:', error);  // Manejamos cualquier error
        });
};

document.getElementById("cancelarReu").addEventListener('click', function () {
    console.log("Cancelar reunion");
    cancelarReunion(idReunion);
});

function cancelarReunion(id_reunion) {
    console.log("Se cancelara la reunion: " + id_reunion);
    let datos = {
        id_reunion: id_reunion
    }
    fetch("/anfitrion/reuniones/cancelarReu", {
        method: 'POST',  // Cambiamos el método a PUT
        headers: {
            'Content-Type': 'application/json',  // Indicamos que el contenido será JSON
        },
        body: JSON.stringify(datos)  // Convertimos los datos a un string JSON
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();  // Convertimos la respuesta a JSON
        })
        .then(data => {
            modal.fire({
                title: "Reunion cancelada",
                icon: "success",
                text: "La reunion se ha cancelada exitosamente",
                willClose: () => {
                    // Redireccionar al usuario después de que el modal se cierre
                    window.location.href = '/anfitrion/anfitrion.html';
                }
            })
        })
        .catch(error => {
            modal.fire({
                title: "Error",
                icon: "error",
                text: "Error: " + error,
                willClose: () => {
                    // Redireccionar al usuario después de que el modal se cierre
                    window.location.href = '/anfitrion/anfitrion.html';
                }
            })
            console.error('Error:', error);  // Manejamos cualquier error
        });
};
