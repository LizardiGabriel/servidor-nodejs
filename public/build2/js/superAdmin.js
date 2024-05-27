function logout() {
    fetch("/admin/logout", {
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

function salas() {
    window.location.href = "/admin/catalogo/catalogo.html";
}
function usuarios() {
    window.location.href = "/admin/catalogo/usuarios.html";
}
function crearCuenta() {
    window.location.href = "/admin/catalogo/crearCuenta.html";
}

function crearSala() {
    window.location.href = "/admin/catalogo/CrearSala.html";
}

function gestionDeUsuarios() {
    window.location.href = "/admin/catalogo/GestionDeUsuarios.html";
}

function gestionDeInvitados() {
    window.location.href = "/admin/catalogo/invitados.html";
}

function gestionarSalas() {
    window.location.href = "/admin/catalogo/GestionarSalas.html";
}

function gestionarReuniones() {
    window.location.href = "/admin/catalogo/GestionarReuniones.html";
}

function gestionarInvitaciones() {
    window.location.href = "/admin/catalogo/GestionDeInvitaciones.html";
}


//====================> GESTIONAR USUARIOS <================//
window.onload = function () {
    obtenerSalas();
}

function mostrarFormularioCrearSala() {
    document.getElementById('formularioCrearSala').style.display = 'block';
}
function hideFormCrearSala() {
    document.getElementById('formularioCrearSala').style.display = 'none';
}
function crearSala() {
    const nombreSala = document.getElementById('nombreSala').value;
    const cupoMaximo = document.getElementById('cupoMaximo').value;
    const piso = document.getElementById('Piso').value;
    const numerito = document.getElementById('numerito').value;
    const estado = document.getElementById('estado').value;

    fetch('/admin/catalogo/salas', {
        method: 'POST',
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
                obtenerSalas();
                hideFormCrearSala();
            } else {
                console.error('Error al crear sala:', response.statusText);
            }
        })
        .catch(error => console.error('Error al crear sala:', error));
}

function obtenerSalas() {
    fetch('/admin/catalogo/salas')
        .then(response => response.json())
        .then(salas => {
            const tablaBody = document.getElementById('tablaSalas');
            tablaBody.innerHTML = '';
            salas.forEach(sala => {
                const fila = document.createElement('tr');
                fila.innerHTML = `
      <td>${sala.id_sala}</td>
      <td>${sala.nombre_sala}</td>
      <td>${sala.capacidad_sala}</td>
      <td>${sala.piso_sala}</td>
      <td>${sala.numero_sala}</td>
      <td>${sala.estatus_sala}</td>
      <td>
        <button onclick="mostrarFormularioModificarSala(${sala.id_sala})">Modificar</button>
        <button onclick="eliminarSala(${sala.id_sala})">Eliminar</button>
      </td>
    `;
                tablaBody.appendChild(fila);
            });
        })
        .catch(error => console.error('Error al obtener salas:', error));
}
function eliminarSala(idSala) {
    fetch(`/admin/catalogo/salas/${idSala}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
                obtenerSalas();
            } else {
                console.error('Error al eliminar sala:', response.statusText);
            }
        })
        .catch(error => console.error('Error al eliminar sala:', error));
}

// ? ?
function mostrarFormularioModificarSala(idSala) {
    document.getElementById('formModificar').style.display = 'block';
    document.getElementById('idSalaM').value = idSala;
    fetch(`/admin/catalogo/salas/${idSala}`)
   
        .then(response => response.json())
        .then(sala => {
            document.getElementById('nombreSalaM').value = sala.nombre_sala;
            document.getElementById('cupoMaximoM').value = sala.capacidad_sala;
            document.getElementById('PisoM').value = sala.piso_sala;
            document.getElementById('numeritoM').value = sala.numero_sala;
            document.getElementById('estadoM').value = sala.estatus_sala;
        })
        .catch(error => console.error('Error al obtener sala:', error));
        
}

function hideFormModificar() {
    document.getElementById('formModificar').style.display = 'none';
}
function modifSala() {
    const idSala = document.getElementById('idSalaM').value;
    const nombreSala = document.getElementById('nombreSalaM').value;
    const cupoMaximo = document.getElementById('cupoMaximoM').value;
    const piso = document.getElementById('PisoM').value;
    const numerito = document.getElementById('numeritoM').value;
    const estado = document.getElementById('estadoM').value;

    fetch(`/admin/catalogo/salas/${idSala}`, {
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
                obtenerSalas();
                hideFormModificar();
            } else {
                console.error('Error al modificar sala:', response.statusText);
            }
        })
        .catch(error => console.error('Error al modificar sala:', error));
}