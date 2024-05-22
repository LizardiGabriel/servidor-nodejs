const { ok } = require('assert');
const path = require('path');


const { getReunionesBD,
    getReunionesConRepeticionByIdOfUserBD,
    getSalasBD, setNewReunionBD,
    getInvitadoByEmailBD, setNewInvitadoBD, setNewInvitacionBD

} = require('../tools/peticiones');


async function logout(req, res) {
    console.log('mensaje --> logout');
    req.session.destroy();
    res.redirect('/');
}

async function getReunionesAnfitrion(req, res) {
    console.log('mensaje --> getReunionesAll');
    //console.log(req.session);
    const reuniones = await getReunionesConRepeticionByIdOfUserBD(req.session.userId);
    if (reuniones !== null) {
        res.json((reuniones));
    } else {
        res.json([]);
    }
}

async function getSalasAnfitrion(req, res) {
    console.log('mensaje --> getSalasAnfitrion');
    //console.log(req.session);
    const salas = await getSalasBD(req.session.userId);
    if (salas !== null) {
        res.json((salas));
    } else {
        res.json([]);
    }
}

async function setNewReunion(req, res) {
    console.log('mensaje --> setNewReunion');
    const { titulo_reunion, descripcion_reunion, fecha_reunion, hora_inicio_reunion,
        hora_fin_reunion, isRepetible, nombreSala, fechasRepetir } = req.body;
    
   const crearReunion = await setNewReunionBD(titulo_reunion, descripcion_reunion, fecha_reunion, hora_inicio_reunion,
    hora_fin_reunion, isRepetible, nombreSala, fechasRepetir, req.session.userId);

    res.json({ respuesta: crearReunion });

}

async function crearInvitacion(req, res) {
    console.log('mensaje --> crearInvitacion dcervrvwcececwfr')
    const idReunion = req.params;
    console.log(idReunion);

    res.sendFile(path.resolve('./public/crearInvitacion.html'));
}

async function setInvitacion(req, res) {
    console.log('mensaje --> setInvitacion');
    const {idReunion, correoInv, acompanantesInv} = req.body;

    //console.log('idAnfitrion: ', req.session.userId, 'idReunion: ', idReunion, 'correoInv: ', correoInv, 'numAcomp: ', acompanantesInv);
    
    var invitado = await getInvitadoByEmailBD(correoInv);
    if (invitado === null) {
        invitado = await setNewInvitadoBD(correoInv);
    }
    const id_invitado = invitado.id_invitado;
    
    const setInvitacion = await setNewInvitacionBD(idReunion, id_invitado, acompanantesInv);

    if(setInvitacion !== null){
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