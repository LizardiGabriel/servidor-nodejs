const { getSalasBD, setNewSalaBD, getSalaByIdBD, updateSalaBD, deleteSalaBD } = require('../tools/peticiones');
const { getUsuariosBD, setNewUsuarioBD, getUsuarioByIdBD, getUsuarioByEmailBD, updateUsuarioBD, deleteUsuarioBD} = require('../tools/peticiones');
const { getInvitadosBD, getInvitadoByIdBD, updateInvitadoBD, getReunionesAdminBD, getInvitacionesAdminBD } = require('../tools/peticiones');
const { getReunionAdminByIdBD } = require('../tools/petiAdmin');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const { log } = require('console');


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

async function guardarImagenDesdeBase64(base64Data, nombreArchivo) {
    // Eliminar la cabecera de datos URL si existe (data:image/png;base64,)
    const base64Image = base64Data.split(';base64,').pop();

    // Especificar la ruta donde se guardará la imagen
    const filePath2 = path.join('uploads',nombreArchivo);
    const filePath = path.join('public/build2/uploads',nombreArchivo);
    // Decodificar la imagen y guardarla
    fs.writeFile(filePath, base64Image, {encoding: 'base64'}, (error) => {
        if (error) {
            console.error('Error al guardar la imagen:', error);
        } else {
            console.log('Imagen guardada correctamente:', filePath);
        }
    });
    return filePath2;
    
}

async function obtenerExtensionDeBase64(cadenaBase64) {
const resultado = cadenaBase64.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
if (resultado && resultado.length > 1) {
    const tipoMime = resultado[1];
    switch (tipoMime) {
        case 'image/jpeg':
            return 'jpg';
        case 'image/png':
            return 'png';
        case 'image/gif':
            return 'gif';
        default:
            return ''; 
    }
}
return '';
}

function esCadenaBase64Valida(str) {
    const base64Regex = /^data:image\/[a-zA-Z0-9]+;base64,[a-zA-Z0-9+/=]+$/;
    return base64Regex.test(str);
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
    const { id, email, nombre, apellidoPaterno, apellidoMaterno, telefono } = req.body;
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
    const { email, nombre, apellidoPaterno, apellidoMaterno, telefono, id_rol, fotoUsuario } = req.body;
    console.log(req.body);
    console.log('id: ', id, 'email: ', email, 'nombre: ', nombre, 'apellidoPaterno: ', apellidoPaterno);
    const id_final = id.replace(/^:/, '');

    if (fotoUsuario && esCadenaBase64Valida(fotoUsuario)) {
        const extensionfoto = await obtenerExtensionDeBase64(fotoUsuario);
        const rutafoto = await guardarImagenDesdeBase64(fotoUsuario, "fotografia_usuario" + id_final + "." + extensionfoto);
        console.log(rutafoto);
        const usuarioActualizado = await updateUsuarioBD(id_final, email, nombre, apellidoPaterno, apellidoMaterno, telefono, id_rol, rutafoto);
        console.log('usuarioActualizado: ', usuarioActualizado);
        res.status(200).json({ message: 'Usuario actualizado correctamente' });
    } else if (fotoUsuario) {
        console.error('Cadena base64 inválida para fotoUsuario.');
        res.status(400).json({ error: 'Cadena base64 inválida para fotoUsuario' });
    } else {
        console.error('fotoUsuario está undefined o es inválido.');
        const usuarioActualizadoNoFoto = await updateUsuarioBD(id_final, email, nombre, apellidoPaterno, apellidoMaterno, telefono, id_rol, '');
        res.status(201).json({ message: 'Usuario actualizado pero fotoUsuario inválido o ausente' });
    }
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