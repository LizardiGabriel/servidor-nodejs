const { getSalasBD, setNewSalaBD, getSalaByIdBD, updateSalaBD, deleteSalaBD } = require('../tools/peticiones');
const {getUsuariosBD, setNewUsuarioBD, getUsuarioByIdBD, updateUsuarioBD, deleteUsuarioBD } = require('../tools/peticiones');



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

async function setNewSala(req, res) {
    const { nombreSala, cupoMaximo, piso, numerito, estado } = req.body;
    console.log('nombreSala: ', nombreSala, 'cupoMaximo: ', cupoMaximo, 'piso: ', piso, 'numerito:', numerito, 'estado: ', estado);
    const nuevaSala = await setNewSalaBD( nombreSala, cupoMaximo, piso, numerito, estado);
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
    console.log('usuarios en json: ', usuarios);
    res.json(usuarios);
}

async function setNewUsuario(req, res) {
    const { email, contrasena, nombre, apellidoPaterno, apellidoMaterno, telefono, idRol, foto_usuario } = req.body;
    console.log('email: ', email, 'contrasena: ', contrasena, 'nombre: ', nombre, 'apellidoPaterno:', apellidoPaterno, 'apellidoMaterno: ', apellidoMaterno, 'telefono: ', telefono, 'idRol: ', idRol, 'foto_usuario: ', foto_usuario);
    const nuevoUsuario = await setNewUsuarioBD(email, contrasena, nombre, apellidoPaterno, apellidoMaterno, telefono, idRol, foto_usuario);
    res.json(nuevoUsuario);
}

async function getUsuarioById(req, res) {
    const { id } = req.params;
    const usuario = await getUsuarioByIdBD(id);
    res.json(usuario);
}

async function updateUsuario(req, res) {
    const { id } = req.params;
    const { email, contrasena, nombre, apellidoPaterno, apellidoMaterno, telefono, idRol, foto_usuario } = req.body;
    const usuarioActualizado = await updateUsuarioBD(id, email, contrasena, nombre, apellidoPaterno, apellidoMaterno, telefono, idRol, foto_usuario);
    res.json(usuarioActualizado);
}

async function deleteUsuario(req, res) {
    const { id } = req.params;
    const usuarioEliminado = await deleteUsuarioBD(id);
    res.json(usuarioEliminado);
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
    deleteUsuario
};