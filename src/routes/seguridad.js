const { log } = require('console');
const { getReunionesBD, getUsuarioByIdBD,getReunionByIdBD,getSalaByIdBD,getInvitacionByIdBD,getInvitadoByIdBD,getInvitadoByNameBD,getInvitacionesByIdInv} = require('../tools/peticiones');
const { response } = require('express');


async function logout(req, res) {
    console.log('mensaje --> logout');
    req.session.destroy();
    res.redirect('/');
}


async function getReuniones(req, res) {
    const reuniones = await getReunionesBD();    
    res.json(reuniones);
}

async function getReunionesAll(req,res){
    const reuniones = await getReunionesBD();
    let reunionesInfo= [];
    for (const reunion of reuniones) {
        try {
            const user = await getUsuarioByIdBD(reunion.id_usuario);
            const sala = await getSalaByIdBD(reunion.id_sala);
            const invitacion= await getInvitacionByIdBD(reunion.id_reunion);
            const invitado= await getInvitadoByIdBD(invitacion.id_invitado);
            console.log(invitado);
            const respuesta = {
                id_reunion: reunion.id_reunion,
                nombre_user: user.nombre_usuario,
                apellido_user: user.apellido_paterno_usuario,
                nombre_sala: sala.nombre_sala,
                titulo_reunion: reunion.titulo_reunion,
                fecha_reunion: reunion.fecha_reunion,
                descripcion_reunion: reunion.descripcion_reunion,
                id_inv: invitado.id_invitado,
                nombre_inv:invitado.nombre_invitado,
                apellido_inv: invitado.apellido_paterno_invitado
            };
            reunionesInfo.push(respuesta);
        } catch (error) {
            console.error("Error al recuperar los datos:", error);
        }
    }
    res.json(reunionesInfo)
}


async function getReunionByIdAll(req,res){
    const { id } = req.params;
    try {
        const reunion = await getReunionByIdBD(id);
        const user = await getUsuarioByIdBD(reunion.id_usuario);
        const sala = await getSalaByIdBD(reunion.id_sala);
    
        const respuesta = {
            id_reunion: reunion.id_reunion,
            nombre_user: user.nombre_usuario,
            apellido_user: user.apellido_paterno_usuario,
            nombre_sala: sala.nombre_sala,
            titulo_reunion: reunion.titulo_reunion,
            fecha_reunion: reunion.fecha_reunion,
            descripcion_reunion: reunion.descripcion_reunion
        };
        res.json(respuesta);
    } catch (error) {
        console.error("Error al recuperar los datos:", error);
    }
    
}
async function getReunionById(req,res){
    const { id } = req.params;
    const reunion= await getReunionByIdBD(id);
    res.json(reunion);
}

async function getReunionByNaveInv(req,res){
    const {nombre}=req.params;
    const invitado= await getInvitadoByNameBD(nombre);
    const invitaciones= await getInvitacionesByIdInv(invitado.id_invitado);
    let reunionesInfo= [];
    for (const invitacion of invitaciones) {
        try {
            const reunion = await getReunionByIdBD(invitacion.id_reunion);
            const user = await getUsuarioByIdBD(reunion.id_usuario);
            const sala = await getSalaByIdBD(reunion.id_sala);
            const respuesta = {
                id_reunion: reunion.id_reunion,
                nombre_user: user.nombre_usuario,
                apellido_user: user.apellido_paterno_usuario,
                nombre_sala: sala.nombre_sala,
                titulo_reunion: reunion.titulo_reunion,
                fecha_reunion: reunion.fecha_reunion,
                descripcion_reunion: reunion.descripcion_reunion,
                id_inv: invitado.id_invitado,
                nombre_inv:invitado.nombre_invitado,
                apellido_inv: invitado.apellido_paterno_invitado
            };
            reunionesInfo.push(respuesta);
        } catch (error) {
            console.error("Error al recuperar los datos:", error);
        }
    }


}
//Visualizar agenda
module.exports = {
    logout,
    getReuniones,
    getReunionById,
    getReunionByIdAll,
    getReunionesAll,
    getReunionByNaveInv
};
