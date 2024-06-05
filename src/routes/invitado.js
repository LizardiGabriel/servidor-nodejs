const { log } = require('console');

const { Prisma } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const jwt = require("jsonwebtoken");
require('dotenv').config();


const { hashPassword, comparePassword } = require('../tools/cipher');
const { getInvitadoByIdBD, getInvitadoByIdEmailBD} = require('../tools/peticiones');
const {getInvitadoByEmailBD,updateInvitadoBDtoInvitacion, updatePassInvitadoBD} = require('../tools/peticiones');

async function logout(req, res) {
    console.log('mensaje --> logout');
    req.session.destroy();
    res.redirect('/');
}

function getIdInvitado(jsonToken){
    let idInvitado = '';
    jwt.verify(jsonToken, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return -1;
        } else {
            idInvitado = decoded.idInvitado;
        }
    });
    return idInvitado;
}


function generateTokenInvitado(email, idInvitado, rolNum, newCount, changeFirstPass) {
    return jwt.sign({ email: email, idInvitado: idInvitado, rol: rolNum, newCount: newCount, changeFirstPass: changeFirstPass }, process.env.SECRET_KEY, { expiresIn: '60m' });
}



async function guardarImagenDesdeBase64(base64Data, nombreArchivo) {
    // Eliminar la cabecera de datos URL si existe (data:image/png;base64,)
    const base64Image = base64Data.split(';base64,').pop();

    // Especificar la ruta donde se guardará la imagen
    const filePath = path.join('public/build2/uploads',nombreArchivo);
    // Decodificar la imagen y guardarla
    fs.writeFile(filePath, base64Image, {encoding: 'base64'}, (error) => {
        if (error) {
            console.error('Error al guardar la imagen:', error);
        } else {
            console.log('Imagen guardada correctamente:', filePath);
        }
    });
    return filePath;
    
}

async function getInvitadoByEmail(req,res){
    const email = req.query.email;
    console.log('mensaje --> getInvitadoByemail');
    const invitado = await (getInvitadoByEmail(email));
    if (invitado !== null) {
        res.json((invitado));
    } else {
        res.json([]);
    }
}


async function obtenerExtensionDeBase64(cadenaBase64) {
    // Usar una expresión regular para encontrar el tipo MIME en la cadena Base64
    const resultado = cadenaBase64.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
    if (resultado && resultado.length > 1) {
        // Extraer el tipo MIME
        const tipoMime = resultado[1];
        // Convertir tipo MIME a una extensión de archivo
        switch (tipoMime) {
            case 'image/jpeg':
                return 'jpg';
            case 'image/png':
                return 'png';
            case 'image/gif':
                return 'gif';
            default:
                return ''; // Devuelve una cadena vacía si el tipo MIME no es reconocido
        }
    }
    return ''; // Devuelve una cadena vacía si no se encuentra el tipo MIME
}



async function Pruebaguardar( req, res)  {
    const data = {
        nombre: req.body.nombre,
        apellidoPat: req.body.apellidoPaterno,
        apellidoMa: req.body.apellidoMaterno,
        correo: req.body.correo,
        tel: req.body.telefono,
        empresa: req.body.empresa,
        foto: req.file ? req.file.filename : null
    };

    console.log(data);

    res.json({ message: 'Información del invitado registrada exitosamente', data });
};

async function setDataInvitado(req, res) {
    console.log('mensaje --> setNDataInvitado');
    const idInvitado = getIdInvitado(req.session.jwt);
    console.log('idInvitado:', idInvitado);


    const { nombre, apellidoPat, apellidoMa, tel, empresa, identificacion, foto} = req.body;
    const extensionfoto= await obtenerExtensionDeBase64(foto);
    console.log(extensionfoto);

    const rutafoto= await guardarImagenDesdeBase64(foto,"fotografia_invitado"+idInvitado+"."+extensionfoto);
    const invitado= await updateInvitadoBDtoInvitacion(idInvitado, nombre, apellidoPat, apellidoMa, tel,empresa,identificacion,rutafoto);

    // if todo bien -> 200
    //return res.redirect('/invitado/cambiarContrasena.html');
    const rutita = '/invitado/cambiarContrasena.html';
    let mensaje = '';
    if(invitado === 200){
        mensaje = 'Información del invitado registrada exitosamente';
    }else if(invitado === 500){
        mensaje = 'error al actualizar la información del invitado';
    }
    return res.json({ message: mensaje, status: invitado, ruta: rutita});

}


async function cambiarContrasena(req, res) {
    console.log('mensaje --> cambiarContrasena');
    const idInvitado = getIdInvitado(req.session.jwt);
    console.log('idInvitado:', idInvitado);

    const { password } = req.body;
    console.log('contrasena que el usuario va a cambiar:', password);
    const hashedPassword = await hashPassword(password);
    const invitado = await updatePassInvitadoBD(idInvitado, hashedPassword);
    // if todo bien -> 200
    //return res.redirect('/invitado/cambiarContrasena.html');
    const rutita = '/invitado/home/invitado.html';
    let mensaje = '';
    if(invitado === 200){
        mensaje = 'password actualizada correctamente';
    }else if(invitado === 500){
        mensaje = 'error al actualizar la contraseña';
    }


    const invitadoNuevo = await getInvitadoByIdBD(idInvitado);
    const token1 = generateTokenInvitado(invitado.email_invitado, invitado.id_invitado, 4, invitado.newCount, invitado.changeFirstPass);
    req.session.jwt = token1;
    
    return res.status(200).json({
        ruta: rutita,
        status: invitado,
        message: mensaje
    });



}
module.exports = {
    logout,
    setDataInvitado,
    Pruebaguardar,
    cambiarContrasena,
    getInvitadoByEmail
};



