const { log } = require('console');

const { Prisma } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const jwt = require("jsonwebtoken");
require('dotenv').config();


const { hashPassword, comparePassword } = require('../tools/cipher');
const { getInvitadoByIdBD, getInvitadoByIdEmailBD, setNewInvitadoBD, setNewColadoBD, getInvitacionByIdBD,
    setNewInvitacionBD,
    getDetallesReunionByIdBD, getSalaByIdBD, getUsuarioByIdBD
} = require('../tools/peticiones');
const {getInvitadoByEmailBD,updateInvitadoBDtoInvitacion, updatePassInvitadoBD, getReunionesConRepeticionByIdOfInvitadoBD, getReunionesNuebasBD} = require('../tools/peticiones');

const { getInvitacionBy_IdInvitado_IdReunionBD } = require('../tools/peticiones');

const { generatePassword } = require('../tools/tools');

const{putInfoInvitadoToReunionBD, createColadoBD} = require('../tools/peticiones');
const mail = require("../tools/mail");

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

function getidSeleccionado(jsonToken){
    let idSeleccionado = '';
    jwt.verify(jsonToken, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return -1;
        } else {
            idSeleccionado = decoded.idSeleccionado;
        }
    });
    return idSeleccionado;
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

async function reunionesNuevas(req, res){
    console.log('mensaje --> reunionesPendientes');
    const idInvitado = getIdInvitado(req.session.jwt);
    console.log('idInvitado:', idInvitado);
    const reuniones = await getReunionesNuebasBD(idInvitado);
    if (reuniones !== null) {
        res.json((reuniones));
    } else {
        res.json([]);
    }
}

async function reunionesPendientes(req, res){
    console.log('mensaje --> reunionesPendientes');
    const idInvitado = getIdInvitado(req.session.jwt);
    console.log('idInvitado:', idInvitado);
    const reuniones = await getReunionesConRepeticionByIdOfInvitadoBD(idInvitado);
    if (reuniones !== null) {
        res.json((reuniones));
    } else {
        res.json([]);
    }
}


async function aceptarReunion(req, res){
    console.log('mensaje --> aceptarReunion');
    const idInvitado = getIdInvitado(req.session.jwt);
    const idReunion = getidSeleccionado(req.session.jwt);

    const invitacion = await getInvitacionBy_IdInvitado_IdReunionBD(idInvitado, idReunion);
    const idInvitacion = invitacion.id_invitacion;

    const colados = req.body.colados;
    const dispositivos = req.body.dispositivos;
    const automoviles = req.body.automoviles;


    // añadirlo en un for
    for(const colado of colados){
        console.log('===---___>>>procesando el colado: ', colado);
        let invitado = await getInvitadoByEmailBD(colado);
        let wasRegistred = 1;
        let password = ""
        if (invitado === null) {
            wasRegistred = 0;
            password = await generatePassword();
            console.log('password generated successfully:', password);
            invitado = await setNewColadoBD(colado, password);
        }

        const id_invitado = invitado.id_invitado;
        const setInvitacion = await setNewInvitacionBD(idReunion, id_invitado, 0);
        const reunion = await getDetallesReunionByIdBD(idReunion);

        const sala = await getSalaByIdBD(reunion.id_sala);
        const titulo = reunion.titulo_reunion;
        const descripcion = reunion.descripcion_reunion;
        const anfitrion = await getUsuarioByIdBD(reunion.id_usuario);
        const repeticiones = reunion.Repeticion;

        if(setInvitacion !== null){
            let emailText = "";
            if(wasRegistred){
                // si el cliente ya ha sido invitado a reuniones antes --> el email debe de decir que se le envio una nueva invitacion y revise su cuenta
                emailText =  colado + "se te ha enviado una nueva invitacion, inicia sesion para confirmar tu asistencia"
                    + "a la reunion: "+ titulo + " en la sala: " + sala.nombre_sala + " con el anfitrion: " + anfitrion.nombre_usuario + " " + anfitrion.apellido_paterno_usuario +
                    " con la descripcion: " + descripcion + " en la(s) fecha(s): " +
                    repeticiones.map((rep) => { return rep.fecha_repeticion + " de " + rep.hora_inicio_repeticion + " a " + rep.hora_fin_repeticion }).join(", ") +
                    " entra a la plataforma beemeet.com para conocer los detalles ";
            }else{
                emailText = "invitado@test.com, has sido invitado a una reunion " +
                    "en la sala: " + sala.nombre_sala + " con el anfitrion: " + anfitrion.nombre_usuario + " " + anfitrion.apellido_paterno_usuario +
                    " con la descripcion: " + descripcion + " en la(s) fecha(s): " +
                    repeticiones.map((rep) => { return rep.fecha_repeticion + " de " + rep.hora_inicio_repeticion + " a " + rep.hora_fin_repeticion }).join(", ") +
                    " entra a la plataforma beemeet.com para conocer los detalles " +
                    "tu usuario es: " + colado + " y tu contrasena temporal es: " + password;
            }

            // mandar el email, el email debe tener
            console.log('emailText: ', emailText);
            const envio = await mail(emailText, colado);
            console.log('envio: ', envio);

            // tabla de colados

            const coladito = await createColadoBD(id_invitado, idInvitacion);
            console.log('coladito: ', coladito);

        }else{
            res.json({ message: 'error', status: 400});
        }

    }




    const actualizarInvitacionReunionBD = await putInfoInvitadoToReunionBD(idInvitacion, dispositivos, automoviles);
    console.log('actualizarInvitacionReunionBD: ', actualizarInvitacionReunionBD);



    res.status(200).json({ message: 'succesful', status: 200});



}



module.exports = {
    logout,
    setDataInvitado,
    Pruebaguardar,
    cambiarContrasena,
    reunionesNuevas,
    reunionesPendientes,
    getInvitadoByEmail,
    aceptarReunion
};



