const { log } = require('console');
const {getInvitadoByEmailBD,updateInvitadoBDtoInvitacion} = require('../tools/peticiones');
const { Prisma } = require('@prisma/client');


async function logout(req, res) {
    console.log('mensaje --> logout');
    req.session.destroy();
    res.redirect('/');
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
    console.log(req.body);
    const {nombre,apellidoPat,apellidoMa,correo,tel,empresa,foto}=req.body
    const pre_invitado = await getInvitadoByEmailBD(correo);
  
    const invitado= await updateInvitadoBDtoInvitacion(pre_invitado.id_invitado, correo, nombre, apellidoPat, apellidoMa, tel,empresa)
    
    return res.json({ message: req.body, status: 200});
}
module.exports = {
    logout,
    setDataInvitado,
    Pruebaguardar
};



