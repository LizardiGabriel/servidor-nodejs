const { getSalasBD, setNewSalaBD, getSalaByIdBD, updateSalaBD, deleteSalaBD } = require('../tools/peticiones');
const { getUsuariosBD, setNewUsuarioBD, getUsuarioByIdBD, getUsuarioByEmailBD, updateUsuarioBD, deleteUsuarioBD} = require('../tools/peticiones');
const { getInvitadosBD, getInvitadoByIdBD, updateInvitadoBD, getReunionesAdminBD, getInvitacionesAdminBD } = require('../tools/peticiones');
const { getReunionAdminByIdBD } = require('../tools/petiAdmin');
const jwt = require('jsonwebtoken');


function getemail(jsonToken){
    let email = "";
    jwt.verify(jsonToken, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return -1;
        } else {
            email= decoded.email;
        }
    });
    return email;
}

async function logout(req, res) {
    console.log('mensaje --> logout');
    req.session.destroy();
    res.redirect('/');
}

// salas

async function getSalas(req, res) {

    const salas = await getSalasBD();
    res.json(salas);
}

async function getUserEmail(req,res){
    console.log('=============================mensaje -->Se intento obtener del correo');
    if(req.session){
        res.json({ email: getemail(req.session.jwt) }); 
    }
    else {
        res.status(403).send('No autorizado');
    }
}
async function setNewSala(req, res) {
    const { nombreSala, cupoMaximo, piso, numerito, estado } = req.body;
    console.log('nombreSala: ', nombreSala, 'cupoMaximo: ', cupoMaximo, 'piso: ', piso, 'numerito:', numerito, 'estado: ', estado);
    const nuevaSala = await setNewSalaBD(nombreSala, cupoMaximo, piso, numerito, estado);
    res.json(nuevaSala);
}

async function getSalaById(req, res) {
    const { id } = req.params;

    const sala = await getSalaByIdBD(id);
    //// console.log(sala);
    res.json(sala);
}


async function updateSala(req, res) {
    const { id } = req.params;
    const { nombreSala, cupoMaximo, piso, numerito, estado } = req.body;
    console.log('nombreSala: ', nombreSala, 'cupoMaximo: ', cupoMaximo, 'piso: ', piso, 'numerito:', numerito, 'estado: ', estado);
    const salaActualizada = await updateSalaBD(id, nombreSala, cupoMaximo, piso, numerito, estado);
    res.json(salaActualizada);
}

async function deleteSala(req, res) {
    const { id } = req.params;
    const salaEliminada = await deleteSalaBD(id);
    res.json(salaEliminada);
}



// gestion de usuarios

async function getUsuarios(req, res) {
    const usuarios = await getUsuariosBD();
    //console.log('usuarios en json: ', usuarios);
    res.json(usuarios);
}

async function getInvitados(req, res) {
    const invitados = await getInvitadosBD();
    res.json(invitados);
}

async function getInvitadoById(req, res) {
    const { id } = req.params;
    const invitado = await getInvitadoByIdBD(id);
    res.json(invitado);
}

async function updateInvitado(req, res) {
    const { id, email, nombre, apellidoPaterno, apellidoMaterno, telefono  } = req.body;
    const invitadoActualizado = await updateInvitadoBD(id, email, nombre, apellidoPaterno, apellidoMaterno, telefono);
    res.json(invitadoActualizado);

}

async function setNewUsuario(req, res) {
    console.log('=============================mensaje --> setNewUsuario');
    const { email, nombre, apellidoPaterno, apellidoMaterno, telefono, idRol, foto_usuario } = req.body;
    const contrasena = '123456';

    const isEmailAlreadyRegistered = await getUsuarioByEmailBD(email);
    if (isEmailAlreadyRegistered) {
        console.log('El email yaaaa esta registrado');
        res.status(200).json({ message: 'false' });
    } else {
        console.log('El email noo esta registrado');
        console.log('email: ', email, 'contrasena: ', contrasena, 'nombre: ', nombre, 'apellidoPaterno:', apellidoPaterno, 'apellidoMaterno: ', apellidoMaterno, 'telefono: ', telefono, 'idRol: ', idRol, 'foto_usuario: ', foto_usuario);
        const nuevoUsuario = await setNewUsuarioBD(email, contrasena, nombre, apellidoPaterno, apellidoMaterno, telefono, idRol, foto_usuario);
        console.log('respuesta de la bd xd: ', nuevoUsuario);
        res.status(200).json({ message: nuevoUsuario });
    }


}

async function getUsuarioById(req, res) {
    console.log('========================= get Usuario By id: ', req.params)
    const { id } = req.params;
    const usuario = await getUsuarioByIdBD(id);
    res.json(usuario);
}

async function getUsuarioByEmail(req, res) {
    console.log('========================= get Usuario By email: ', req.params)
    const { email } = req.params;
    const usuario = await getUsuarioByEmailBD(email.replace(/^:/, ''));
    res.json(usuario);
}

async function updateUsuario(req, res) {
    const { id } = req.params;
    const { email, nombre, apellidoPaterno, apellidoMaterno, telefono, idRol, fotoUsuario } = req.body;

    console.log('id: ', id, 'email: ', email, 'nombre: ', nombre, 'apellidoPaterno: ', apellidoPaterno);
    console.log('apellidoMaterno: ', apellidoMaterno, 'telefono: ', telefono, 'idRol nuevo: ', idRol, 'foto_usuario: ', fotoUsuario);

    const usuarioActualizado = await updateUsuarioBD(id, email, nombre, apellidoPaterno, apellidoMaterno, telefono, idRol, fotoUsuario);

    console.log('usuarioActualizado: ', usuarioActualizado);


    res.json(usuarioActualizado);
}

async function deleteUsuario(req, res) {
    const { id } = req.params;
    const usuarioEliminado = await deleteUsuarioBD(id);
    res.json(usuarioEliminado);
}

async function getReuniones(req, res) {
    const reuniones = await getReunionesAdminBD();
    console.log(' ===========> =======> ===> => obtener reuniones admin.js');
    res.json(reuniones);

}

async function getReunionById(req, res) {
    console.log('mensaje --> getReunionById');
    const { id } = req.params;
    console.log('id de la reunion a consultar: ', id);
    const reunion = await getReunionAdminByIdBD(id);
    res.json(reunion);
}

async function getInvitaciones(req, res) {
    const invitaciones = await getInvitacionesAdminBD();
    res.json(invitaciones);
}

module.exports = {
    logout,
    getSalas,
    setNewSala,
    getSalaById,
    updateSala,
    deleteSala,

    getUsuarios,
    setNewUsuario,
    getUsuarioById,
    updateUsuario,
    deleteUsuario,

    getInvitados,
    getInvitadoById,
    updateInvitado,
    getUsuarioByEmail,
    
    getReuniones,
    getInvitaciones,
    getUserEmail,

    getReunionById
};