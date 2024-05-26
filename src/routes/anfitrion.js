const { ok } = require('assert');
const path = require('path');


const { getReunionesBD,
    getReunionesConRepeticionByIdOfUserBD,
    getSalasBD, setNewReunionBD,
    getInvitadoByEmailBD, setNewInvitadoBD, setNewInvitacionBD,
    getReunionByIdBD, getSalaByIdBD, getUsuarioByIdBD, getDetallesReunionByIdBD

} = require('../tools/peticiones');
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
    console.log('mensaje --> getSalasAnfitrion');
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
    
    const setInvitacion = await setNewInvitacionBD(idReunion, id_invitado, acompanantesInv);
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


module.exports = {
    logout,
    getReunionesAnfitrion,
    getSalasAnfitrion,
    setNewReunion,
    setInvitacion
};