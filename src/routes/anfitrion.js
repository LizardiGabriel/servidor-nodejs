const { ok } = require('assert');
const path = require('path');


const { getReunionesBD,
    getReunionesConRepeticionByIdOfUserBD,
    getSalasBD, setNewReunionBD,
    getInvitadoByEmailBD, setNewInvitadoBD, setNewInvitacionBD

} = require('../tools/peticiones');
const jwt = require("jsonwebtoken");
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

async function crearInvitacion(req, res) {
    // no usages
    console.log('mensaje --> crearInvitacion dcervrvwcececwfr')
    const idReunion = req.params;
    console.log(idReunion);

    res.sendFile(path.resolve('./public/crearInvitacion.html'));
}

async function setInvitacion(req, res) {
    console.log('mensaje --> setInvitacion');
    const {idReunion, correoInv, acompanantesInv} = req.body;

    //console.log('idAnfitrion: ', req.session.userId, 'idReunion: ', idReunion, 'correoInv: ', correoInv, 'numAcomp: ', acompanantesInv);
    
    let invitado = await getInvitadoByEmailBD(correoInv);
    let wasRegistred = 1;
    if (invitado === null) {
        wasRegistred = 0;
        const password = "ABCDEFGH";
        invitado = await setNewInvitadoBD(correoInv, password);
    }

    const id_invitado = invitado.id_invitado;
    
    const setInvitacion = await setNewInvitacionBD(idReunion, id_invitado, acompanantesInv);

    if(setInvitacion !== null){

        let emailText = "";
        if(wasRegistred){
            // si el cliente ya ha sido invitado a reuniones antes --> el email debe de decir que se le envio una nueva invitacion y revise su cuenta
            emailText = "se te ha enviado una nueva invitacion, inicia sesion para registrarte";

        }else{
            emailText = "invitado@test.com, has sido invitado a una reunion (detalles)... entra a la plataforma beemeet.com para conocer los detalles "+ 
            "tu usuario es: invitado@test y tu contrasena es **** ****";
        }

        // mandar el email, el email debe tener
        // email y la contrasena temporal de la cuenta
        // un mensaje como de 'esta es tu correo, es tu cuenta, entra para que aceptes la reunion a la que se te invito

        //


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
    crearInvitacion,
    setInvitacion
};