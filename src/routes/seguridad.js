const express = require('express');
const { log } = require('console');
const { getReunionesBD, getUsuarioByIdBD,getReunionByIdBD,getSalaByIdBD,getInvitacionByIdBD,getInvitadoByIdBD,getInvitadoByNameBD,getInvitacionesByIdInv, getDetallesReunionByIdBD,
    getInvitacionesByIdReunionBD,getUsuarioByEmailBD,updateUsuarioBD
} = require('../tools/peticiones');
const { response } = require('express');
const { json } = require('body-parser');
const {eliminarAccesoBD,confirmarDispositivosBD,confirmarAutomovilesBD,registrarHoraEnBD,obtenerDetallesInvitacionAnfiBD, getInvitacionByIdSeguridadBD, obtenerDetallesInvitacionSeguridadBD,
    getReunionByIdInvitacionBD
} = require("../tools/petiAdmin");
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');

async function logout(req, res) {
    console.log('mensaje --> logout');
    req.session.destroy();
    res.redirect('/');
}

async function guardarImagenDesdeBase64(base64Data, nombreArchivo) {
    // Eliminar la cabecera de datos URL si existe (data:image/png;base64,)
    const base64Image = base64Data.split(';base64,').pop();

    // Especificar la ruta donde se guardará la imagen
    const filePath2 = 'uploads/'+nombreArchivo;
    const filePath = path.join('public/build2/uploads',nombreArchivo);
    // Decodificar la imagen y guardarla
    fs.writeFile(filePath, base64Image, {encoding: 'base64'}, (error) => {
        if (error) {
            console.error('Error al guardar la imagen:', error);
        } else {
            console.log('Imagen guardada correctamente:', filePath);
        }
    });
    return filePath2;
    
}

//------------------------Funciones auxiliares----------------
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
function esCadenaBase64Valida(str) {
    const base64Regex = /^data:image\/[a-zA-Z0-9]+;base64,[a-zA-Z0-9+/=]+$/;
    return base64Regex.test(str);
}

async function obtenerExtensionDeBase64(cadenaBase64) {
    const resultado = cadenaBase64.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
    if (resultado && resultado.length > 1) {
        const tipoMime = resultado[1];
        switch (tipoMime) {
            case 'image/jpeg':
                return 'jpg';
            case 'image/png':
                return 'png';
            case 'image/gif':
                return 'gif';
            default:
                return ''; 
        }
    }
    return '';
    }

//-----------------------------------------------
async function getUserEmail(req,res){
    console.log('=============================mensaje -->Se intento obtener del correo');
    if(req.session){
        res.json({ email: getemail(req.session.jwt) }); 
    }
    else {
        res.status(403).send('No autorizado');
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
                hora_fin: rep.hora_fin_repeticion,
                id_repeticion: rep.id_repeticion
            }));

            for(const detalle of detallesRepeticion){

                const user = await getUsuarioByIdBD(reunion.id_usuario);
                const sala = await getSalaByIdBD(reunion.id_sala);
                // corregir para obtener todas las invitaciones a la reunion
                // const invitacion = await getInvitacionByIdBD(reunion.id_reunion);
                // const invitado = await getInvitadoByIdBD(invitacion.id_invitado);

                const invitaciones = await getInvitacionesByIdReunionBD(reunion.id_reunion);
                if(invitaciones !== null)
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
                            hora_fin: detalle.hora_fin,
                            id_repeticion: detalle.id_repeticion


                        };
                        console.log('respuesta--->', respuesta);getInvitadoByIdBD
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
    let { idInvitacion, idReunion, hora, tipo } = req.body;
    console.log('--> funcion "registrarHora", parametros:', req.body);
    try {
        console.log('>>>|||>>>> registrarHora >>>>>|||idInvitacion:', idInvitacion, 'idReunion:', idReunion, 'hora:', hora, 'tipo:', tipo);
        if (!idReunion){
            idReunion = await getReunionByIdInvitacionBD(idInvitacion);
        }
        console.log('>>>|||>>>> registrarHora >>>>>|||idReunion:', idReunion);

        const invitacionActualizada = await registrarHoraEnBD(idInvitacion, idReunion, hora, tipo);
        if (invitacionActualizada) {
            res.status(200).json({ status: 'success' });
        } else {
            res.status(404).json({ status: 'error', message: 'Invitación no encontrada' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error' });
    }
}



async function confirmarDispositivo(req, res) {
    console.log("Datos recibidos Dispositivo: ", req.body);
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
    console.log("Datos recibidos Automovil: ", req.body);
    const { idInvitacion, automoviles } = req.body;
    try {
        await confirmarAutomovilesBD(idInvitacion, automoviles);
        res.json({ status: 'success' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Error al confirmar automóviles' });
    }
}

async function eliminarAcceso(req, res) {
    console.log("Datos recibidos Eliminar Acceso: ", req.body);
    const { id_acceso, typeAction } = req.body;
    try {
        await eliminarAccesoBD(id_acceso, typeAction);
        res.json({ status: 'success' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Error al eliminar acceso' });
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
    confirmarDispositivo,
    getUserEmail,
    getUsuarioByEmail,
    updateUsuario,
    eliminarAcceso
    
};
