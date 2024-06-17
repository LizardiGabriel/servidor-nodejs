const express = require('express');
const { log } = require('console');
const { getReunionesBD, getUsuarioByIdBD,getReunionByIdBD,getSalaByIdBD,getInvitacionByIdBD,getInvitadoByIdBD,getInvitadoByNameBD,getInvitacionesByIdInv, getDetallesReunionByIdBD,
    getInvitacionesByIdReunionBD
} = require('../tools/peticiones');
const { response } = require('express');
const { json } = require('body-parser');
const {confirmarDispositivosBD,confirmarAutomovilesBD,registrarHoraEnBD,obtenerDetallesInvitacionAnfiBD, getInvitacionByIdSeguridadBD, obtenerDetallesInvitacionSeguridadBD} = require("../tools/petiAdmin");


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
            const detallesReunion = await getDetallesReunionByIdBD(reunion.id_reunion);
            // Obtener repeticiones de la reunión
            // Asegúrate de que esta es la estructura correcta donde se almacenan las repeticiones
            const repeticiones = detallesReunion.Repeticion || [];

            // Mapear repeticiones a un formato legible
            const detallesRepeticion = repeticiones.map(rep => ({
                fecha: rep.fecha_repeticion,
                hora_inicio: rep.hora_inicio_repeticion,
                hora_fin: rep.hora_fin_repeticion
            }));

            for(const detalle of detallesRepeticion){

                const user = await getUsuarioByIdBD(reunion.id_usuario);
                const sala = await getSalaByIdBD(reunion.id_sala);
                // corregir para obtener todas las invitaciones a la reunion
                // const invitacion = await getInvitacionByIdBD(reunion.id_reunion);
                // const invitado = await getInvitadoByIdBD(invitacion.id_invitado);

                const invitaciones = await getInvitacionesByIdReunionBD(reunion.id_reunion);
                for (const invitacion of invitaciones) {
                    try {
                        console.log('invitacion--->', invitacion.id_invitado);
                        const invitado = await getInvitadoByIdBD(invitacion.id_invitado);
                        console.log('invitado--->', invitado.id_invitado);
                        const respuesta = {
                            isConfirmed: invitacion.isConfirmed,
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
                            //repeticiones: detallesRepeticion, // Añadir detalles de las repeticiones
                            fecha_reunion: detalle.fecha,
                            hora_inicio: detalle.hora_inicio,
                            hora_fin: detalle.hora_fin


                        };
                        console.log('respuesta--->', respuesta);
                        reunionesInfo.push(respuesta);




                    } catch (error) {
                        console.error("Error al recuperar los datos:", error);
                    }
                }

            }






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

async function getSeguridadInfo_idInv_idReu(req,res){
    const {idReunion,idInvitado, idInvitacion} = req.body;
    console.log('mensaje --> getInfo_idInv_idReu');
    console.log('ZZZZZZZZZ >>> id_reunion: ', idReunion, 'id_invitado: ', idInvitado, 'id_invitacion: ', idInvitacion);

    let id_invitacion = 0;

    if (idInvitacion === null){
        id_invitacion = await getInvitacionByIdSeguridadBD(idReunion, idInvitado);
    }else{
        id_invitacion = idInvitacion;
    }


    const invitacion = await obtenerDetallesInvitacionSeguridadBD(id_invitacion);

    res.status(200).json(invitacion);
}


async function registrarHora(req, res) {
    const { idInvitacion, hora, tipo } = req.body;
    try {
        const invitacionActualizada = await registrarHoraEnBD(idInvitacion, hora, tipo);
        if (invitacionActualizada) {
            res.json({ status: 'success' });
        } else {
            res.status(404).json({ status: 'error', message: 'Invitación no encontrada' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error' });
    }
}



async function confirmarDispositivo(req, res) {
    const { idInvitacion, dispositivos } = req.body;
    try {
        await confirmarDispositivosBD(idInvitacion, dispositivos);
        res.json({ status: 'success' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Error al confirmar dispositivos' });
    }
}

async function confirmarAutomovil(req, res) {
    const { idInvitacion, automoviles } = req.body;
    try {
        await confirmarAutomovilesBD(idInvitacion, automoviles);
        res.json({ status: 'success' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Error al confirmar automóviles' });
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
    getSeguridadInfo_idInv_idReu,
    registrarHora,
    confirmarAutomovil,
    confirmarDispositivo
    
    
};
