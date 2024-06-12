const { ok } = require('assert');
const path = require('path');


const { getReunionesBD,
    getReunionesConRepeticionByIdOfUserBD,
    getSalasBD, setNewReunionBD,
    getInvitadoByEmailBD, setNewInvitadoBD, setNewInvitacionBD,
    getReunionByIdBD, getSalaByIdBD, getUsuarioByIdBD, getDetallesReunionByIdBD,getUsuarioByEmailBD,
    updateHoraReunionBD,deleteInvitadoBD

} = require('../tools/peticiones');

const { getReunionAdminByIdBD } = require('../tools/petiAdmin');

const jwt = require("jsonwebtoken");

const mail = require('../tools/mail');

const {beforeEach} = require("node:test");
require('dotenv').config();


async function logout(req, res) {
    console.log('mensaje --> logout');
    req.session.destroy();
    res.redirect('/');
}

function verifyTokenAndGetUserId(jsonToken) {
    return new Promise((resolve, reject) => {
        jwt.verify(jsonToken, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                console.log(' <<<<<<< ºººººº |||||||    >>>>>>>>>><  error en el token');
                reject(-1);
            } else {
                const userId = decoded.idUsuario;
                console.log(' <<<<<<< ºººººº |||||||    >>>>>>>>>><  idUsuario: ', userId);
                resolve(userId);
            }
        });
    });
}

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

async function getUserEmail(req,res){
    console.log('=============================mensaje -->Se intento obtener del correo');
    if(req.session){
        res.json({ email: getemail(req.session.jwt) }); 
    }
    else {
        res.status(403).send('No autorizado');
    }
}

async function getReunionesAnfitrion(req, res) {
    console.log('mensaje --> getReunionesAll');
    //console.log(req.session);
    const jsonToken = req.session.jwt;
    let id_usuario = 0;
    try {
        id_usuario = await verifyTokenAndGetUserId(jsonToken);
        console.log('id_usuarioo ---------: ', id_usuario);
    } catch (error) {
        console.log('Error al verificar el token: ', error);
    }

    const reuniones = await getReunionesConRepeticionByIdOfUserBD(id_usuario);
    if (reuniones !== null) {
        res.json((reuniones));
    } else {
        res.json([]);
    }
}

async function getSalasAnfitrion(req, res) {
    console.log('>>>>>>>>>>>>>>>>>>>>> d bsuvbhuwd   mensaje --> getSalasAnfitrion');
    //console.log(req.session);
    const salas = await getSalasBD();
    if (salas !== null) {
        res.json((salas));
    } else {
        res.json([]);
    }
}

async function setNewReunion(req, res) {
    const jsonToken = req.session.jwt;
    let userId = 0;
    try {
        userId = await verifyTokenAndGetUserId(jsonToken);
    } catch (error) {
        console.log('Error al verificar el token: ', error);
    }
    console.log('mensaje --> setNewReunion');
    console.log(req.body);
    const { titulo_reunion, descripcion_reunion, fecha_reunion, hora_inicio_reunion,
        hora_fin_reunion, isRepetible, nombreSala, fechasRepetir } = req.body;
    
   const crearReunion = await setNewReunionBD(titulo_reunion, descripcion_reunion, fecha_reunion, hora_inicio_reunion,
    hora_fin_reunion, isRepetible, nombreSala, fechasRepetir, userId);

    res.json({ respuesta: crearReunion });

}



async function generatePassword() {
    // generar un password de 8 digitos entre letras Mayus y numeros
    let password = "";
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < 8; i++) {
        password += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return password;

}

async function setInvitacion(req, res) {
    console.log('mensaje --> setInvitacion');
    const {idReunion, correoInv, acompanantesInv} = req.body;

    //console.log('idAnfitrion: ', req.session.userId, 'idReunion: ', idReunion, 'correoInv: ', correoInv, 'numAcomp: ', acompanantesInv);
    
    let invitado = await getInvitadoByEmailBD(correoInv);
    let wasRegistred = 1;
    let password = ""
    if (invitado === null) {
        wasRegistred = 0;
        password = await generatePassword();
        invitado = await setNewInvitadoBD(correoInv, password);
    }

    const id_invitado = invitado.id_invitado;
    
    const setInvitacion = await setNewInvitacionBD(idReunion, id_invitado, acompanantesInv, 1);
    const reunion = await getDetallesReunionByIdBD(idReunion);


    const sala = await getSalaByIdBD(reunion.id_sala);
    const titulo = reunion.titulo_reunion;
    const descripcion = reunion.descripcion_reunion;
    const anfitrion = await getUsuarioByIdBD(reunion.id_usuario);
    const repeticiones = reunion.Repeticion;


    console.log('reunion: ', JSON.stringify(reunion, null, 2));


    if(setInvitacion !== null){

        let emailText = "";
        if(wasRegistred){
            // si el cliente ya ha sido invitado a reuniones antes --> el email debe de decir que se le envio una nueva invitacion y revise su cuenta
            emailText =  correoInv + "se te ha enviado una nueva invitacion, inicia sesion para confirmar tu asistencia"
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
            "tu usuario es: " + correoInv + " y tu contrasena temporal es: " + password;
        }

        // mandar el email, el email debe tener
        console.log('emailText: ', emailText);
        const envio = await mail(emailText, correoInv);
        console.log('envio: ', envio);
        res.json({ message: 'succesful', status: 200});

    }
    else{
        res.json({ message: 'error', status: 400});
    }    

}


async function getReunionById(req, res) {
    console.log('mensaje --> getReunionById');
    const { idReunion } = req.params;
    const reunion = await getReunionAdminByIdBD(idReunion);
    if (reunion !== null) {
        res.json(reunion);
    } else {
        res.json([]);
    }
}

async function getInvitadoByEmail(req,res){
    const email = req.query.email;
    console.log('mensaje --> getInvitadoByemail');
    const invitado = await (getInvitadoByEmailBD(email));
    if (invitado !== null) {
        res.json((invitado));
    } else {
        res.json([]);
    }
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
        const usuarioActualizadoNoFoto = await updateUsuarioBD(id_final, email, nombre, apellidoPaterno, apellidoMaterno, telefono, id_rol, '');
        res.status(201).json({ message: 'Usuario actualizado pero fotoUsuario inválido o ausente' });

    } else {
        console.error('fotoUsuario está undefined o es inválido.');
        const usuarioActualizadoNoFoto = await updateUsuarioBD(id_final, email, nombre, apellidoPaterno, apellidoMaterno, telefono, id_rol, '');
        res.status(201).json({ message: 'Usuario actualizado pero fotoUsuario inválido o ausente' });
    }
}

async function updateHoraReunion(req,res){
    const { id_reunion,hora_fin_repeticion} = req.body;
    const repeActualizada= await updateHoraReunionBD(id_reunion,hora_fin_repeticion);
    console.log(repeActualizada);
    res.status(200).json({ message: 'Reunion actualizado correctamente' });
}

async function deleteInvitado(req,res){
    const { id_invitado} = req.body;
    const invitadoDel= await deleteInvitadoBD(id_invitado);
    console.log(invitadoDel);
    res.status(200).json({ message: 'Invitado eliminado correctamente' });
}

module.exports = {
    logout,
    getReunionesAnfitrion,
    getSalasAnfitrion,
    setNewReunion,
    setInvitacion,
    getReunionById,
    getInvitadoByEmail,
    getUserEmail,
    getUsuarioByEmail,
    updateUsuario,
    updateHoraReunion,
    deleteInvitado
};