const { log } = require('console');
const { getReunionesBD, getUsuarioByIdBD,getReunionByIdBD,getSalaByIdBD,getInvitacionByIdBD,getInvitadoByIdBD,getInvitadoByNameBD,getInvitacionesByIdInv, getDetallesReunionByIdBD} = require('../tools/peticiones');
const { response } = require('express');
const { json } = require('body-parser');


async function logout(req, res) {
    console.log('mensaje --> logout');
    req.session.destroy();
    res.redirect('/');
}


async function getReuniones(req, res) {
    const reuniones = await getReunionesBD();    
    res.json(reuniones);
}

async function getReunionesAll(req, res) {
    console.log('entre a  xd getreunionesAll');
    const reuniones = await getReunionesBD();
    let reunionesInfo = [];
    for (const reunion of reuniones) {
        try {
            console.log('reunion --->:' + reunion.id_reunion);
            const user = await getUsuarioByIdBD(reunion.id_usuario);
            const sala = await getSalaByIdBD(reunion.id_sala);
            const invitacion = await getInvitacionByIdBD(reunion.id_reunion);
            const invitado = await getInvitadoByIdBD(invitacion.id_invitado);
            const detallesReunion = await getDetallesReunionByIdBD(reunion.id_reunion);

            // Obtener repeticiones de la reunión
            const repeticiones = detallesReunion.Repeticion || []; // Asegúrate de que esta es la estructura correcta donde se almacenan las repeticiones
            
            // Mapear repeticiones a un formato legible
            const detallesRepeticion = repeticiones.map(rep => ({
                fecha: rep.fecha_repeticion,
                hora_inicio: rep.hora_inicio_repeticion,
                hora_fin: rep.hora_fin_repeticion
            }));

            const respuesta = {
                id_reunion: reunion.id_reunion,
                nombre_user: user.nombre_usuario,
                apellidoP_user: user.apellido_paterno_usuario,
                apellidoM_user: user.apellido_materno_usuario,
                nombre_sala: sala.nombre_sala,
                titulo_reunion: reunion.titulo_reunion,
                descripcion_reunion: reunion.descripcion_reunion,
                id_inv: invitado.id_invitado,
                nombre_inv: invitado.nombre_invitado,
                apellido_inv: invitado.apellido_paterno_invitado,
                repeticiones: detallesRepeticion, // Añadir detalles de las repeticiones
                hora_llegada: detallesReunion.hora_llegada // Asegúrate de que este campo existe en detallesReunion
            };
            console.log('respuesta--->', respuesta);
            reunionesInfo.push(respuesta);
        } catch (error) {
            console.error("Error al recuperar los datos:", error);
        }
    }
    res.json(reunionesInfo);
}


async function getReunionByIdAll(req,res){
    const { id } = req.params;
    console.log('=========> get reunion por id: id_reunion--->' + id);
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

async function getReunionByNaveInv(req,res) {
    const {nombre} = req.params;
    const invitado = await getInvitadoByNameBD(nombre);
    const invitaciones = await getInvitacionesByIdInv(invitado.id_invitado);
    let reunionesInfo = [];
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
                nombre_inv: invitado.nombre_invitado,
                apellido_inv: invitado.apellido_paterno_invitado
            };
            reunionesInfo.push(respuesta);
        } catch (error) {
            console.error("Error al recuperar los datos:", error);
        }
    }
}
    async function getInvitadoById(req, res) {
        const { id } = req.params;
        try {
            const invitado = await getInvitadoByIdBD(id);
            if (invitado) {
                res.json(invitado);
            } else {
                res.status(404).json({ error: 'Invitado no encontrado' });
            }
        } catch (error) {
            console.error('Error al obtener el invitado:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }



//Visualizar agenda
module.exports = {
    logout,
    getReuniones,
    getReunionById,
    getReunionByIdAll,
    getReunionesAll,
    getReunionByNaveInv,
    getInvitadoById,
    getDetallesReunionByIdBD,
};
