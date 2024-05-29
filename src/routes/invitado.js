const { log } = require('console');
const {getInvitadoByEmailBD,updateInvitadoBDtoInvitacion} = require('../tools/peticiones');
const { Prisma } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

async function logout(req, res) {
    console.log('mensaje --> logout');
    req.session.destroy();
    res.redirect('/');
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
    const {nombre,apellidoPat,apellidoMa,correo,tel,empresa,identificacion,foto}=req.body;
    const pre_invitado = await getInvitadoByEmailBD(correo);
    const extensionfoto= await obtenerExtensionDeBase64(foto);
    console.log(extensionfoto);
    const rutafoto= await guardarImagenDesdeBase64(foto,"fotografia_invitado"+pre_invitado.id_invitado+"."+extensionfoto);
    const invitado= await updateInvitadoBDtoInvitacion(pre_invitado.id_invitado, correo, nombre, apellidoPat, apellidoMa, tel,empresa,identificacion,rutafoto);
    return res.json({ message: req.body, status: 200});
}
module.exports = {
    logout,
    setDataInvitado,
    Pruebaguardar
};



