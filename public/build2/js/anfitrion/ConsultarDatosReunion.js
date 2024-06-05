window.onload = function () {
    cargarDatos();
}

function cargarDatos() {
    console.log("Cargando datos");

    let url = window.location.href;
    let urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams);
    const idReunion = urlParams.get('idReunion');
    const fecha = urlParams.get('fecha_i');
    const hora_i=urlParams.get('hora_i');
    const hora_f=urlParams.get('hora_f');


    console.log('idReunion: ' + idReunion);

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
                agregarFila(data.nombre_invitado,data.email_invitado);
                return data;
            } catch (error) {
                console.error('Error:', error);
                return [];  // Retorna un arreglo vacío en caso de error
            }
        }

        function agregarFila(nombreInvitado, correoElectronico) {
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
                    " onclick="eliminarInvitado()">Eliminar</button>
                </td>
            `;
        
            // Añadir la fila al cuerpo de la tabla
            tbody.appendChild(fila);
        }

}