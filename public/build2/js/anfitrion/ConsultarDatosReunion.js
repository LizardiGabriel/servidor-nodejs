window.onload = function () {
    cargarDatos();
}

function addminutes(initialT, minAdd) {
    const today = new Date();
    console.log(today);
    const timeParts = initialT.split(':');
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate(), parseInt(timeParts[0]), parseInt(timeParts[1]));
    date.setMinutes(date.getMinutes() + parseInt(minAdd));

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const isAM = hours < 12;
    if (hours > 12) {
        hours -= 12;
    } else if (hours === 0) {
        hours = 12;  // Trata la medianoche como 12 AM
    }
    const formattedTime = hours.toString().padStart(2, "0") + ":" + minutes + (isAM ? " AM" : " PM");
    console.log(formattedTime);
    return formattedTime;
}


let url = window.location.href;
let urlParams = new URLSearchParams(window.location.search);
console.log(urlParams);
const idRepeticion= urlParams.get('idRepeticion');
const idReunion = parseInt(urlParams.get('idReunion'));
const fecha = urlParams.get('fecha_i');
const hora_i=urlParams.get('hora_i');
const hora_f=urlParams.get('hora_f');
function cargarDatos() {
    console.log("Cargando datos");
    fetch(`/anfitrion/reuniones/detalles/${idReunion}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);    
            document.getElementById('reunionId').value = data.id_reunion;
            document.getElementById('reunionTitulo').value = data.titulo_reunion;
            document.getElementById('sala').value = data.nombreSala;
            document.getElementById('reunionFecha').value=fecha;
            document.getElementById('horarioInicio').value=hora_i;
            document.getElementById('horarioFin').value=hora_f;

            for (const invitado of data.infoInvitados) {
                fetchInvitadoByEmail(invitado.correo_invitado);

            }
        })
        .catch(error => {
            console.log(error);
        });

        async function fetchInvitadoByEmail(email) {
            try {
                const url = new URL('/anfitrion/obtenerInfoInvitado','http://localhost:3000');
                url.searchParams.append('email', email);  // Añadir el email como parámetro de consulta
                const response = await fetch(url);
                const data = await response.json();
                console.log(data);
                agregarFila(data.nombre_invitado,data.email_invitado,data.id_invitado);
                return data;
            } catch (error) {
                console.error('Error:', error);
                return [];  // Retorna un arreglo vacío en caso de error
            }
        }

        function agregarFila(nombreInvitado, correoElectronico,id_invitado) {
            // Obtener el elemento tbody de la tabla
            const tbody = document.querySelector('.tabla__cuerpo');
        
            // Crear una nueva fila <tr>
            const fila = document.createElement('tr');
        
            // Agregar columnas <td> para nombre, correo y acciones
            fila.innerHTML = `
                <td>${nombreInvitado}</td>
                <td>${correoElectronico}</td>
                <td style="text-align: center">
                    <button style="            
                    background-color: #89b6b1;
                    color: #000000;
                    border: none;
                    padding: 10px 20px;
                    text-align: center;
                    text-decoration: none;
                    font-size: 16px;
                    border-radius: 10px;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                    " onclick="eliminarInvitado(${id_invitado})">Eliminar</button>
                </td>
            `;
        
            // Añadir la fila al cuerpo de la tabla
            tbody.appendChild(fila);
        }
}
document.getElementById("aumentar30").addEventListener('click', function() {
    let datos={
        id_reunion:idRepeticion,
        hora_fin_repeticion:addminutes(hora_f,30)
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
        console.log('Success:', data);  // Manipulamos los datos recibidos
    })
    .catch(error => {
        console.error('Error:', error);  // Manejamos cualquier error
    });
});

document.getElementById("aumentar60").addEventListener('click', function() {
    let datos={
        id_reunion:idRepeticion,
        hora_fin_repeticion:addminutes(hora_f,60)
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
        console.log('Success:', data);  // Manipulamos los datos recibidos
    })
    .catch(error => {
        console.error('Error:', error);  // Manejamos cualquier error
    });
});


document.getElementById("agregarInv").addEventListener('click', function(){
    document.getElementById("formularioinv").style.display="block";
});

document.getElementById("botonAgregar").addEventListener('click', function(){
    console.log("Se agregan datos");
    enviarInvitacion(idReunion)
});

document.getElementById("reagendar").addEventListener('click', function(){
    window.location.href="/anfitrion/crearReunion?idReunion="+idReunion;
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
    fetch(`/anfitrion/reuniones/invitacion`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(envJson)
    })
        .then(response => response.json())
        .then(data => {
            console.log('data:', data);
        })
        .catch(error => {
            console.error('Error:', error); 
        });
}

function eliminarInvitado(id_invitado){
    console.log("Se borrara al invitado: "+id_invitado);
    let datos={
        id_invitado:id_invitado
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
        console.log('Success:', data);  // Manipulamos los datos recibidos
    })
    .catch(error => {
        console.error('Error:', error);  // Manejamos cualquier error
    });
}
