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
//funcion editar datos personales
function editarDatosPersonales() {
    window.location.href = "/admin/catalogo/EditarDatosPersonales.html";
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
//funcion para ir a ConsultarDatosReunion
function consultarDatosReunion() {
    window.location.href = "/admin/catalogo/ConsultarDatosReunion.html";
}

function gestionarInvitaciones() {
    window.location.href = "/admin/catalogo/GestionDeInvitaciones.html";
}

function gestionarUsuarios(){
    window.location.href = "/admin/catalogo/gestionarusuarios.html";
}

//====================> GESTIONAR SALAS <================//
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



//====================> GESTIONAR USUARIOS <================//


window.onload = function () {
    cargarUsuarios();
}
function mostrarFormularioCrearUsuario() {
    document.getElementById('formularioCrearUsuario').style.display = 'block';
}

function hideFormCrearUsuario() {
    document.getElementById('formularioCrearUsuario').style.display = 'none';
}


async function crearUsuario() {
    const email = document.getElementById('email').value;
    const contrasena = document.getElementById('contrasena').value;
    const nombre = document.getElementById('nombre').value;
    const apellidoPaterno = document.getElementById('apellidoPaterno').value;
    const apellidoMaterno = document.getElementById('apellidoMaterno').value;
    const telefono = document.getElementById('telefono').value;
    const idRol = document.getElementById('idRol').value;
    const foto_usuario = document.getElementById('foto_usuario').value;
    console.log('creando usuario...')
    fetch('/admin/catalogo/usuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            contrasena,
            nombre,
            apellidoPaterno,
            apellidoMaterno,
            telefono,
            idRol,
            foto_usuario
        })
    })

        .then(response => {
            if (response.ok) {
                cargarUsuarios();
                hideFormCrearUsuario();
            } else {
                console.error('Error al crear usuario:', response.statusText);
            }
        })
        .catch(error => console.error('Error al crear usuario:', error));
}


function cargarUsuarios() {
    console.log('Cargando usuarios...');
    fetch('/admin/catalogo/usuarios')
        .then(response => response.json())
        .then(usuarios => {
            const tablaBody = document.getElementById('tablaUsuarios');
            // Limpiar el contenido de la tabla excepto la fila de encabezado
            tablaBody.innerHTML = '';
            usuarios.forEach(usuario => {
                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td>${usuario.id_usuario}</td>
                    <td>${usuario.nombre_usuario}</td>
                    <td>${usuario.email_usuario}</td>
                    <td>${usuario.rol_usuario}</td>
                    <td>${usuario.foto_usuario}
                    <td>
                        <button onclick="mostrarFormularioModificarU(${usuario.id_usuario})" >Editar</button>
                        <button onclick="eliminarUsuario(${usuario.id_usuario})">Eliminar</button>
                    </td>
                `;
                tablaBody.appendChild(fila);
            });

            // cargar las cards
        })
        .catch(error => console.error('Error al obtener usuarios:', error));
}


function mostrarFormularioModificarU(idUsuario) {
    document.getElementById('formularioEditarU').style.display = 'block';
    document.getElementById('editUserId').value = idUsuario;
    fetch(`/admin/catalogo/usuarios/${idUsuario}`)

        .then(response => response.json())
        .then(usuario => {
            document.getElementById('editEmail').value = usuario.email_usuario;
            document.getElementById('editContrasena').value = usuario.password_usuario;
            document.getElementById('editNombre').value = usuario.nombre_usuario;
            document.getElementById('editApellidoPaterno').value = usuario.apellido_paterno_usuario;
            document.getElementById('editApellidoMaterno').value = usuario.apellido_materno_usuario;
            document.getElementById('editTelefono').value = usuario.telefono_usuario;
            document.getElementById('editIdRol').value = usuario.rol_usuario;
            document.getElementById('editFoto').value = usuario.foto_usuario;
        })
        .catch(error => console.error('Error al obtener usuario:', error));
}



function hideFormModificarU() {
    document.getElementById('formularioEditarU').style.display = 'none';
}


async function modifUsuario() {
    const userId = document.getElementById('editUserId').value;
    const email = document.getElementById('editEmail').value;
    const contrasena = document.getElementById('editContrasena').value;
    const nombre = document.getElementById('editNombre').value;
    const apellidoPaterno = document.getElementById('editApellidoPaterno').value;
    const apellidoMaterno = document.getElementById('editApellidoMaterno').value;
    const telefono = document.getElementById('editTelefono').value;
    const idRol = document.getElementById('editIdRol').value;
    const foto_usuario = document.getElementById('editFoto').value;
    
    fetch(`/admin/catalogo/usuarios/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            contrasena,
            nombre,
            apellidoPaterno,
            apellidoMaterno,
            telefono,
            idRol,
            foto_usuario
        })
    })

        .then(response => {
            if (response.ok) {
                cargarUsuarios();
                hideFormModificarU();

            } else {
                console.error('Error al modificar usuario:', response.statusText);
            }
        })
        .catch(error => console.error('Error al modificar usuario:', error));
}


async function eliminarUsuario(userId) {
    fetch(`/admin/catalogo/usuarios/${userId}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
                cargarUsuarios();
            } else {
                console.error('Error al eliminar usuario:', response.statusText);
            }
        })
        .catch(error => console.error('Error al eliminar usuario:', error));
}