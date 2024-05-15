const { ok } = require('assert');
const { getReunionesBD,
    getReunionesConRepeticionByIdOfUserBD,
    getSalasBD, setNewReunionBD

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
    console.log('mensaje --> crearInvitacion');
    idReunion = req.params.idReunion;

    res.sendFile(path.resolve('./public/crearInvitacion.html'));
}



module.exports = {
    logout,
    getReunionesAnfitrion,
    getSalasAnfitrion,
    setNewReunion,
    crearInvitacion
};