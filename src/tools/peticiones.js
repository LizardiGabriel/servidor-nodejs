const { PrismaClient } = require('@prisma/client');
const { json } = require('body-parser');
const prisma = new PrismaClient();

async function getUsersByEmailBD(email) {
    console.log('peticion a la bd de getUsersByEmail param: email: ', email);
    try {
        const usuario = await prisma.usuario.findFirst({
            where: {
                email_usuario: email,
            },
        });
        //console.log('respuesta de la bd: ', usuario);

        return usuario;

    } catch (error) {
        console.error('Error al obtener usuario por email:', error);
        return null;
    }
}

async function getUsersByIDBD(ID) {
    console.log('peticion a la bd de getUsersByID');
    try {
        const usuario = await prisma.usuario.findFirst({
            where: {
                id_usuario: ID,
            },
        });
        return usuario;
    } catch (error) {
        console.error('Error al obtener usuario por ID:', error);
        return null;
    }
}

async function getUsersByEmailBD(correo) {
    console.log('peticion a la bd de getUsersByCorreo');
    try {
        const usuario = await prisma.usuario.findFirst({
            where: {
                email_usuario: correo,
            },
        });
        return usuario;
    } catch (error) {
        console.error('Error al obtener usuario por ID:', error);
        return null;
    }
}

async function getColadoByIdInvitadoBD(idInvitado) {
    console.log('peticion a la bd  getColadoByIdInvitadoBD');
    try {
        const colado = await prisma.colado.findFirst({
            where: {
                id_invitado: parseInt(idInvitado) ,
            },
        });
        return colado;
    } catch (error) {
        console.error('Error al obtener colado:', error);
        return null;
    }
}

async function createUserBD({ email, hashedPassword, nombre, apellido_paterno, apellido_materno, telefono, rol, foto_usuario }) {
    console.log('peticion a la bd de createUser');

    try {

        await prisma.usuario.create({
            data: {
                email_usuario: email,
                password_usuario: hashedPassword,
                nombre_usuario: nombre,
                apellido_paterno_usuario: apellido_paterno,
                apellido_materno_usuario: apellido_materno,
                telefono_usuario: parseInt(telefono),
                rol_usuario: 'SuperAdmin',
                foto_usuario: 'prueba.jpg'

            },
        });
        return 'Usuario creado correctamente';
    } catch (error) {
        console.error('Error al crear usuario:', error);
        return 'Error interno del servidor';
    }
}

async function updateUserBD(id, email, hashedPassword) {
    console.log('peticion a la bd de updateUser, param-> id: ', id, 'email: ', email, 'hashedPassword: ', hashedPassword);
    try {
        const usuarioActualizado = await prisma.usuario.update({
            where: { id_usuario: Number(id) },
            data: {
                email_usuario: email,
                password_usuario: hashedPassword,
            },
        });
        //console.log('respuesta de la bd: ', usuarioActualizado);
        return usuarioActualizado;
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        return json({ error: 'Error al actualizar usuario' });
    }

}

async function getSalasBD() {
    console.log('peticion a la bd de getSalas');
    try {
        const salas = await prisma.sala.findMany();
        //console.log('respuesta en json: ', salas);
        return salas;
    } catch (error) {
        console.error('Error al obtener salas:', error);
        return json({ error: 'Error al obtener salas' });
    }
}

async function setNewSalaBD(nombreSala, cupoMaximo, piso, numerito, estatus) {
    console.log('peticion a la bd de setNewSala');
    try {
        const nuevaSala = await prisma.sala.create({
            data: {
                nombre_sala: nombreSala,
                capacidad_sala: parseInt(cupoMaximo),
                piso_sala: parseInt(piso),
                numero_sala: parseInt(numerito),
                estatus_sala: (estatus)
            }
        });
        return nuevaSala;
    } catch (error) {
        console.error('Error al crear sala:', error);
        return json({ error: 'Error al crear sala' });
    }
}

// Ruta para obtener una sala por su ID
async function getSalaByIdBD(id) {
    console.log('peticion a la bd de getSalaById');
    try {
        const sala = await prisma.sala.findUnique({
            where: { id_sala: Number(id) }
        });
        return sala;
    } catch (error) {
        console.error('Error al obtener sala:', error);
        return json({ error: 'Error al obtener sala' });
    }
}

async function updateSalaBD(id, nombreSala, cupoMaximo, piso, numerito, estatus) {
    console.log('peticion a la bd de updateSala');
    try {
        const salaActualizada = await prisma.sala.update({
            where: { id_sala: Number(id) },
            data: {
                nombre_sala: nombreSala,
                capacidad_sala: parseInt(cupoMaximo),
                piso_sala: parseInt(piso),
                numero_sala: parseInt(numerito),
                estatus_sala: (estatus)
            }
        });
        return salaActualizada;
    } catch (error) {
        console.error('Error al actualizar sala:', error);
        return json({ error: 'Error al actualizar sala' });
    }
}

async function updateDateRepBD(id,fecha) {
    console.log('peticion a la bd de updateFechaRepeticion');
    try {
        const repeActualizada = await prisma.repeticion.update({
            where: { id_repeticion: Number(id) },
            data: {
                fecha_repeticion: fecha
            }
        });
        return repeActualizada;
    } catch (error) {
        console.error('Error al actualizar la repeticion:', error);
        return json({ error: 'Error al actualizar la repeticion' });
    }
}

async function deleteSalaBD(id) {
    console.log('peticion a la bd de deleteSala');
    try {
        // aqui hacer la validacion cuando se quiera eliminar una sala que tenga reuniones asociadas
        const salaEliminada = await prisma.sala.delete({
            where: { id_sala: Number(id) }
        });
        return salaEliminada;
    } catch (error) {
        console.error('Error al eliminar sala:', error);
        return json({ error: 'Error al eliminar sala' });
    }
}
//
async function deleteReunionBD(id) {
    console.log('peticion a la bd de deleteSala');
    try {
        // aqui hacer la validacion cuando se quiera eliminar una sala que tenga reuniones asociadas
        const reunionEliminada = await prisma.reunion.delete({
            where: { id_reunion: Number(id) }
        });
        return reunionEliminada;
    } catch (error) {
        console.error('Error al eliminar sala:', error);
        return json({ error: 'Error al eliminar sala' });
    }
}

// invitados

async function getInvitadoByIdEmailBD(email) {
    console.log('peticion a la bd de getInvitadoByIdEmail');
    try {
        const invitado = await prisma.invitado.findFirst({
            where: { email_invitado: email }
        });
        return invitado;
    } catch (error) {
        console.error('Error al obtener invitado:', error);
        return null;
    }
}

async function getInvitadosBD() {
    console.log('peticion a la bd de getInvitados');
    try {
        const invitados = await prisma.invitado.findMany();
        return invitados;
    } catch (error) {
        console.error('Error al obtener invitados:', error);
        return json({ error: 'Error al obtener invitados' });
    }

}


// usuarios

async function getUsuariosBD() {
    console.log('peticion a la bd de getUsuarios');
    try {
        const usuarios = await prisma.usuario.findMany();
        return usuarios;
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        return json({ error: 'Error al obtener usuarios' });
    }
}

async function setNewUsuarioBD(email, passwordHashed, nombre, apellidoPaterno, apellidoMaterno, telefono, rol, fotoUsuario) {
    console.log('peticion a la bd de setNewUsuario');
    try {
        const nuevoUsuario = await prisma.usuario.create({
            data: {
                email_usuario: email,
                password_usuario: passwordHashed,
                nombre_usuario: nombre,
                apellido_paterno_usuario: apellidoPaterno,
                apellido_materno_usuario: apellidoMaterno,
                telefono_usuario: telefono,
                rol_usuario: rol,
                foto_usuario: 'uploads/fotografia_usuario1.jpg'

                // uploads/fotografia_usuario1.jpg

            }
        });

        return 'true';
    } catch (error) {
        console.error('Error al crear usuario:', error);
        return 'false';
    }
}

async function getUsuarioByIdBD(id) {
    console.log('peticion a la bd de getUsuarioById, id: ', id);
    try {
        const usuario = await prisma.usuario.findUnique({
            where: { id_usuario: Number(id) }
        });
        return usuario;
    } catch (error) {
        console.error('Error al obtener usuario:', error);
        return json({ error: 'Error al obtener usuario' });
    }
}

async function getUsuarioByEmailBD(email) {
    console.log('peticion a la bd de getUsuarioByEmail');
    try {
        const usuario = await prisma.usuario.findUnique({
            where: { email_usuario: email }
        });
        return usuario;
    } catch (error) {
        console.error('Error al obtener usuario:', error);
        return json({ error: 'Error al obtener usuario' });
    }
}


async function updateUsuarioBD(id, email, nombre, apellidoPaterno, apellidoMaterno, telefono, rol, fotoUsuario) {
    console.log('peticion a la bd de updateUsuario');

    try {
        // Obtener el usuario actual
        const usuarioActual = await prisma.usuario.findUnique({
            where: { id_usuario: Number(id) }
        });

        if (!usuarioActual) {
            throw new Error('Usuario no encontrado');
        }

        // Usar los valores actuales si los nuevos valores están vacíos
        const updatedData = {
            email_usuario: email || usuarioActual.email_usuario,
            nombre_usuario: nombre || usuarioActual.nombre_usuario,
            apellido_paterno_usuario: apellidoPaterno || usuarioActual.apellido_paterno_usuario,
            apellido_materno_usuario: apellidoMaterno || usuarioActual.apellido_materno_usuario,
            telefono_usuario: telefono || usuarioActual.telefono_usuario,
            rol_usuario: rol || usuarioActual.rol_usuario,
            foto_usuario: fotoUsuario || '../uploads/usuario.webp'
        };

        const usuarioActualizado = await prisma.usuario.update({
            where: { id_usuario: Number(id) },
            data: updatedData
        });

        return usuarioActualizado;
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        return { error: 'Error al actualizar usuario' };
    }
}


async function deleteUsuarioBD(id) {
    console.log('peticion a la bd de deleteUsuario');
    try {
        const usuarioEliminado = await prisma.usuario.delete({
            where: { id_usuario: Number(id) }
        });
        return usuarioEliminado;
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        return json({ error: 'Error al eliminar usuario' });
    }
}

async function deleteInvitadoBD(id) {
    console.log('peticion a la bd de deleteInvitadoBD');
    console.log(id);
    try {

        const invitacion = await prisma.invitacion.findMany({
            where: { id_invitado: Number(id) }
        });

         await prisma.invitacion.deleteMany({
            where: { id_invitado: Number(id) }
        });

        console.log(invitacion);

        await prisma.automovil.deleteMany({
            where: { id_invitacion: Number(invitacion[0].id_invitacion) }
        });

        await prisma.dispositivo_electronico.deleteMany({
            where: { id_invitacion: Number(invitacion[0].id_invitacion) }
        });

        await prisma.colado.deleteMany({
            where: { id_invitado: Number(id) }
        });
        
      }catch (error) {
        console.error('Error al eliminar usuario:', error);
        return json({ error: 'Error al eliminar usuario' });
    }
}

async function getReunionesBD() {
    console.log('peticion a la bd de getReuniones');
    try {
        const reuniones = await prisma.reunion.findMany();
        return reuniones;
    } catch (error) {
        console.error('Error al obtener reuniones:', error);
        return json({ error: 'Error al obtener reuniones' });
    }
}

async function getReunionByIdBD(id) {
    console.log('peticion a la bd de getReunionById');
    try {
        const reunion = await prisma.reunion.findUnique({
            where: { id_reunion: Number(id) }
        });
        return reunion;
    } catch (error) {
        console.error('Error al obtener la reunion:', error);
        return json({ error: 'Error al obtener la reunion' });
    }
}

async function getDetallesReunionByIdBD(id) {
    console.log('peticion a la bd de getReunionById');
    try {
        const reunion = await prisma.reunion.findUnique({
            where: { id_reunion: Number(id) },
            include: {
                Repeticion: true,
            }
        });
        return reunion;
    } catch (error) {
        console.error('Error al obtener la reunion:', error);
        return { error: 'Error al obtener la reunion' };
    }
}

async function getInvitacionByIdBD(id) {
    console.log('peticion a la bd de getInvitacionByIdBD');
    try {
        const invitacion = await prisma.invitacion.findUnique({
            where: { id_invitacion: Number(id) }
        });
        return invitacion;
    } catch (error) {
        console.error('Error al obtener la invitacion:', error);
        return json({ error: 'Error al obtener la invitacion' });
    }
}

async function getInvitadoByIdBD(id) {
    console.log('peticion a la bd de getInvitadonByIdBD, id:', id);
    try {
        const invitado = await prisma.invitado.findUnique({
            where: { id_invitado: Number(id) }
        });
        return invitado;
    } catch (error) {
        console.error('Error al obtener el invitado:', error);
        return json({ error: 'Error al obtener el invitado' });
    }
}

async function getInvitadoByNameBD(nombre) {
    console.log('peticion a la bd de getInvitadonByNameBD');
    try {
        const invitado = await prisma.invitado.findUnique({
            where: { nombre_usuario: String(nombre) }
        });
        return invitado;
    } catch (error) {
        console.error('Error al obtener el invitado:', error);
        return json({ error: 'Error al obtener el invitado' });
    }
}
async function updateInvitadoBD(id, email, nombre, apellidoPaterno, apellidoMaterno, telefono) {
    console.log('peticion a la bd de updateInvitado');
    try {
        const invitadoActualizado = await prisma.invitado.update({
            where: { id_invitado: Number(id) },
            data: {
                email_invitado: email,
                nombre_invitado: nombre,
                apellido_paterno_invitado: apellidoPaterno,
                apellido_materno_invitado: apellidoMaterno,
                telefono_invitado: telefono
            }
        });
        if (invitadoActualizado != null) {
            return { message: 'Invitado actualizado correctamente', status: 200 };
        } else {
            return { message: 'Error al actualizar invitado', status: 500 };
        }
    } catch (error) {
        console.error('Error al actualizar invitado:', error);
        return { message: 'Error al actualizar invitado', status: 500 };
    }
}

async function updateInvitadoWithFotoBD(id, email, nombre, apellidoPaterno, apellidoMaterno, telefono,fotoUsuario) {
    console.log('peticion a la bd de updateInvitado');
    try {
        const invitadoActualizado = await prisma.invitado.update({
            where: { id_invitado: Number(id) },
            data: {
                email_invitado: email,
                nombre_invitado: nombre,
                apellido_paterno_invitado: apellidoPaterno,
                apellido_materno_invitado: apellidoMaterno,
                telefono_invitado: telefono,
                foto_invitado: fotoUsuario
            }
        });
        if (invitadoActualizado != null) {
            return { message: 'Invitado actualizado correctamente', status: 200 };
        } else {
            return { message: 'Error al actualizar invitado', status: 500 };
        }
    } catch (error) {
        console.error('Error al actualizar invitado:', error);
        return { message: 'Error al actualizar invitado', status: 500 };
    }
}

async function updateInvitadoBDtoInvitacion(id, nombre, apellidoPaterno, apellidoMaterno, telefono, empresa, identifacion, foto) {
    console.log('peticion a la bd de updateInvitado');
    try {
        const invitadoActualizado = await prisma.invitado.update({
            where: { id_invitado: Number(id) },
            data: {
                nombre_invitado: nombre,
                apellido_paterno_invitado: apellidoPaterno,
                apellido_materno_invitado: apellidoMaterno,
                telefono_invitado: telefono,
                empresa_invitado: empresa,
                identificacion_invitado: identifacion,
                foto_invitado: foto,
                newCount: 0
            }
        });
        if (invitadoActualizado != null) {
            return 200;
        } else {
            return 500;
        }
    } catch (error) {
        console.error('Error al actualizar invitado:', error);
        return 500;
    }
}

async function updatePassInvitadoBD(idInvitado, hashedPassword) {
    console.log('peticion a la bd de updatePassInvitado');
    try {
        const invitadoActualizado = await prisma.invitado.update({
            where: { id_invitado: Number(idInvitado) },
            data: {
                password_invitado: hashedPassword,
                changeFirstPass: 1
            }
        });
        if (invitadoActualizado != null) {
            return 200;
        } else {
            return 500;
        }

    } catch (error) {
        console.error('Error al actualizar invitado:', error);
        return 500;
    }

}

async function getInvitacionesByIdInv(id) {
    console.log('Petición a la BD de getInvitacionesByIdInvitado');
    try {
        const invitaciones = await prisma.invitacion.findMany({
            where: { id_invitado: Number(id) }
        });
        return invitaciones;
    } catch (error) {
        console.error('Error al obtener las invitaciones para el invitado:', error);
        return json({ error: 'Error al obtener las invitaciones' });
    }
}
async function getReunionByIdInvBD(id) {
    console.log('peticion a la bd de getReunionByIdInv');
    try {
        const reunion = await prisma.reunion.findUnique({
            where: { id_invitacion: Number(id) }
        });
        return reunion;
    } catch (error) {
        console.error('Error al obtener la reunion:', error);
        return json({ error: 'Error al obtener la reunion' });
    }
}

async function getReunionesConRepeticionByIdOfUserBD(id_usuario) {
    console.log('peticion a la bd de getSalasConRepeticionByIdOfUser');
    try {

        const reuniones = await prisma.reunion.findMany({
            where: { id_usuario: Number(id_usuario) }
        });


        for (let i = 0; i < reuniones.length; i++) {
            const numRepeticion = await prisma.repeticion.count({
                where: { id_reunion: reuniones[i].id_reunion }
            });

            reuniones[i].numRepeticion = numRepeticion;
        }

        //tambien añadir el numero de invitados

        // añadir las fechas de repeticion

        for (let i = 0; i < reuniones.length; i++) {
            const repeticiones = await prisma.repeticion.findMany({
                where: { id_reunion: reuniones[i].id_reunion }
            });
            var fechasRep = [];
            for (let j = 0; j < repeticiones.length; j++) {
                const fechasRep2 = {
                    id_repeticion: repeticiones[j].id_repeticion,
                    fecha_repeticion: repeticiones[j].fecha_repeticion,
                    estatus_repeticion: repeticiones[j].estatus_repeticion,
                    hora_inicio_repeticion: repeticiones[j].hora_inicio_repeticion,
                    hora_fin_repeticion: repeticiones[j].hora_fin_repeticion
                };
                fechasRep.push(fechasRep2);
            }
            reuniones[i].fechasRepeticion = fechasRep;
        }


        for (let i = 0; i < reuniones.length; i++) {
            const invitacionesReunion = await prisma.invitacion.findMany({
                where: { id_reunion: reuniones[i].id_reunion }
            });

            var infoInvitados = [];
            for (let j = 0; j < invitacionesReunion.length; j++) {

                const invitadito = await getInvitadoByIdBD(invitacionesReunion[j].id_invitado);
                console.log('invitado email: ', invitadito.email_invitado)

                const nombreInvColados = {
                    numero_colados: invitacionesReunion[j].numero_colados,
                    correo_invitado: invitadito.email_invitado
                };
                infoInvitados.push(nombreInvColados);
            }
            reuniones[i].infoInvitados = infoInvitados;

        }

        return reuniones;

    } catch (error) {
        console.error('Error al obtener las salas con repeticion:', error);
        return json({ error: 'Error al obtener las salas con repeticion' });
    }
}

// la uso para seguridad xd
async function getInvitacionesByIdReunionBD(id_reunion) {
    console.log('Petición a la BD de getInvitacionesByIdReunion');
    try {
        const invitaciones = await prisma.invitacion.findMany({
            where: {
                id_reunion: Number(id_reunion),
                //isConfirmed: 1
            },
            select: {
                id_invitacion: true,
                id_invitado: true,
                qr_acceso: true,
                habilitado: true,
                numero_colados: true,
                isConfirmed: true,
                es_colado_invitado: true


            }
        });
        if (invitaciones.length === 0) {
            return null;
        }
        return invitaciones;
    } catch (error) {
        console.error('Error al obtener las invitaciones para la reunión:', error);
        return json({ error: 'Error al obtener las invitaciones' });
    }

}

async function setNewReunionBD(
    titulo_reunion, descripcion_reunion, fecha_reunion, hora_inicio_reunion,
    hora_fin_reunion, isRepetible, nombreSala, fechasRepetir, id_usuario) {
    console.log('peticion a la bd de setNewReunion');
    /*
    titulo, desc1, 2024-05-30, 00:01, 14:02, true, 5, [ '2024-05-31', '2024-05-28' ]
    */
    try {
        const nuevaReunion = await prisma.reunion.create({
            data: {
                // id_usuario, id_sala, titulo_reunion, descripcion_reunion
                id_usuario: id_usuario,
                id_sala: Number(nombreSala),
                titulo_reunion: titulo_reunion,
                descripcion_reunion: descripcion_reunion
            }
        });

        await prisma.repeticion.create({
            data: {
                // id_reunion, subtema_repeticion, descripcion_repeticion, fecha_repeticion, 
                // hora_inicio_repeticion, hora_fin_repeticion, estatus_repeticion
                id_reunion: nuevaReunion.id_reunion,
                fecha_repeticion: fecha_reunion,
                hora_inicio_repeticion: hora_inicio_reunion,
                hora_fin_repeticion: hora_fin_reunion,
                estatus_repeticion: 'Pendiente'

            }
        });

        if (isRepetible) {
            for (let i = 0; i < fechasRepetir.length; i++) {
                await prisma.repeticion.create({
                    data: {
                        // id_reunion, subtema_repeticion, descripcion_repeticion, fecha_repeticion, 
                        // hora_inicio_repeticion, hora_fin_repeticion, estatus_repeticion
                        id_reunion: nuevaReunion.id_reunion,
                        fecha_repeticion: fechasRepetir[i],
                        hora_inicio_repeticion: hora_inicio_reunion,
                        hora_fin_repeticion: hora_fin_reunion,
                        estatus_repeticion: 'Pendiente'

                    }
                });
            }
        }

        return 'true';
    } catch (error) {
        console.error('Error al crear reunion:', error);
        return 'false';
    }

}

async function getInvitadoByEmailBD(email) {
    console.log('peticion a la bd de getInvitadoByEmail');
    try {
        const invitado = await prisma.invitado.findFirst({
            where: { email_invitado: email }
        });
        return invitado;
    } catch (error) {
        console.error('Error al obtener invitado:', error);
        return null;
    }

}
async function setNewInvitadoBD(email, password) {
    console.log('peticion a la bd de setNewInvitado');
    try {
        const nuevoInvitado = await prisma.invitado.create({
            data: {
                email_invitado: email,
                nombre_invitado: "",
                apellido_paterno_invitado: "",
                apellido_materno_invitado: "",
                password_invitado: password,
                telefono_invitado: "",
                empresa_invitado: "",
                foto_invitado: "uploads/usuario.webp",
                identificacion_invitado: "",

                habilitado: 1,
                newCount: 1,
                changeFirstPass: 0

            }
        });
        return nuevoInvitado;
    } catch (error) {
        console.error('Error al crear invitado:', error);
        return null;
    }


}

async function setNewColadoBD(email, password) {
    console.log('peticion a la bd de setNewColado');
    try {
        const nuevoColado = await prisma.invitado.create({
            data: {
                email_invitado: email,
                nombre_invitado: "",
                apellido_paterno_invitado: "",
                apellido_materno_invitado: "",
                password_invitado: password,
                telefono_invitado: "",
                empresa_invitado: "",
                foto_invitado: "uploads/usuario.webp",
                identificacion_invitado: "",

                habilitado: 1,
                newCount: 1,
                changeFirstPass: 0

            }
        });
        return nuevoColado;
    } catch (error) {
        console.error('Error al crear colado:', error);
        return null;
    }

}

async function setNewInvitacionBD(idReunion, id_invitado, acompanantesInv, es_colado_invitado) {
    console.log('peticion a la bd de setNewInvitacion');
    console.log('idReunion: ', idReunion, 'id_invitado: ', id_invitado);
    try {
        const nuevaInvitacion = await prisma.invitacion.create({
            data: {
                id_reunion: idReunion,
                id_invitado: id_invitado,
                habilitado: "No",
                qr_acceso: "",
                numero_colados: Number(acompanantesInv),
                isConfirmed: 0,
                es_colado_invitado: Number(es_colado_invitado)
            }
        });
        return nuevaInvitacion;
    } catch (error) {
        console.error('Error al crear invitacion:', error);
        return null;
    }
}


async function getReunionesAdminBD() {
    console.log('peticion a la bd de getReunionesAdmin');
    try {
        const reuniones = await prisma.reunion.findMany({
            include: {
                usuario: {
                    select: {
                        nombre_usuario: true,
                        apellido_paterno_usuario: true,
                        apellido_materno_usuario: true
                    }
                },
                sala: {
                    select: {
                        nombre_sala: true
                    }
                },
                Repeticion: {
                    select: {
                        fecha_repeticion: true,
                        hora_inicio_repeticion: true,
                        hora_fin_repeticion: true
                    }
                }
            }
        });

        const resultado = reuniones.flatMap(reunion =>
            reunion.Repeticion.map(repeticion => ({
                id_reunion: reunion.id_reunion,
                titulo_reunion: reunion.titulo_reunion,
                nombre_anfitrion: `${reunion.usuario.nombre_usuario} ${reunion.usuario.apellido_paterno_usuario} ${reunion.usuario.apellido_materno_usuario}`,
                fecha_repeticion: repeticion.fecha_repeticion,
                hora_inicio_repeticion: repeticion.hora_inicio_repeticion,
                hora_fin_repeticion: repeticion.hora_fin_repeticion,
                nombre_sala: reunion.sala.nombre_sala
            }))
        );

        return resultado;


    } catch (error) {
        console.error('Error al obtener reuniones:', error);
        return json({ error: 'Error al obtener reuniones' });
    }
}

async function getInvitacionesAdminBD() {
    const invitaciones = await prisma.invitacion.findMany({
        include: {
            invitado: {
                select: {
                    email_invitado: true,
                },
            },
            reunion: {
                include: {
                    usuario: {
                        select: {
                            id_usuario: true,
                            nombre_usuario: true,
                            apellido_paterno_usuario: true,
                            apellido_materno_usuario: true,
                        },
                    },
                    sala: {
                        select: {
                            nombre_sala: true,
                            capacidad_sala: true,
                        },
                    },
                    Repeticion: {
                        select: {
                            fecha_repeticion: true,
                            hora_inicio_repeticion: true,
                            hora_fin_repeticion: true,
                        },
                    },
                    _count: {
                        select: {
                            Invitacion: true,
                        },
                    },
                },
            },
        },
    });

    // Transformar los datos para obtener el formato deseado
    const resultado = invitaciones.map((invitacion) => {
        const reunion = invitacion.reunion;
        const repeticiones = reunion.Repeticion.map((repeticion) => ({
            id_invitacion: invitacion.id_invitacion,
            id_usuario: reunion.usuario.id_usuario,
            nombre_usuario: `${reunion.usuario.nombre_usuario} ${reunion.usuario.apellido_paterno_usuario} ${reunion.usuario.apellido_materno_usuario}`,
            fecha_repeticion: repeticion.fecha_repeticion,
            hora_inicio_repeticion: repeticion.hora_inicio_repeticion,
            hora_fin_repeticion: repeticion.hora_fin_repeticion,
            nombre_sala: reunion.sala.nombre_sala,
            numero_invitaciones: reunion._count.Invitacion,
            capacidad_sala: reunion.sala.capacidad_sala,
            correo_invitado: invitacion.invitado.email_invitado, // Agregar correo del invitado
        }));

        return repeticiones;
    }).flat();

    return resultado;
}

async function getReunionesNuebasBD(id_invitado) {


    // importante, cambiar esto, pq se deberian de enviar las invitaciones, no todas las reuniones
    console.log('Petición a la BD para obtener reuniones de un invitado con detalles');
    try {
        // Obtener todas las invitaciones del invitado específico
        const invitaciones = await prisma.invitacion.findMany({
            where: {
                id_invitado: Number(id_invitado),
                isConfirmed: 0
            },
            include: {
                reunion: {
                    include: {
                        sala: true,  // Incluye la sala asociada a la reunión
                        usuario: true // Incluye el usuario asociado a la reunión
                    }
                }
            }
        });

        const reuniones = [];

        for (let i = 0; i < invitaciones.length; i++) {
            const invitacion = invitaciones[i];
            const reunion = invitacion.reunion;

            // Añadir el conteo de repeticiones
            const numRepeticion = await prisma.repeticion.count({
                where: { id_reunion: reunion.id_reunion }
            });
            reunion.numRepeticion = numRepeticion;

            // Añadir las fechas de repetición
            const repeticiones = await prisma.repeticion.findMany({
                where: { id_reunion: reunion.id_reunion }
            });
            const fechasRep = repeticiones.map(rep => ({
                id_repeticion: rep.id_repeticion,
                fecha_repeticion: rep.fecha_repeticion,
                estatus_repeticion: rep.estatus_repeticion,
                hora_inicio_repeticion: rep.hora_inicio_repeticion,
                hora_fin_repeticion: rep.hora_fin_repeticion
            }));
            reunion.fechasRepeticion = fechasRep;

            // Añadir el número de colados de la invitación
            const numColados = invitacion.numero_colados;
            invitacion.numColados = numColados;

            // Añadir la sala y el nombre del usuario a la reunión
            reunion.nombreSala = reunion.sala.nombre_sala;
            reunion.nombreUsuario = `${reunion.usuario.nombre_usuario} ${reunion.usuario.apellido_paterno_usuario} ${reunion.usuario.apellido_materno_usuario}`;

            // Incluir la información de la invitación en la reunión
            if (!reunion.invitaciones) {
                reunion.invitaciones = [];
            }
            reunion.invitaciones.push({
                id_invitacion: invitacion.id_invitacion,
                numColados: numColados
            });

            reuniones.push(reunion);
        }

        return reuniones;
    } catch (error) {
        console.error('Error al obtener las reuniones del invitado:', error);
        return { error: 'Error al obtener las reuniones del invitado' };
    }
}


async function getReunionesNuebasByIdBD(id_invitado, idReunion) {

    console.log('Petición a la BD para obtener reuniones de un invitado con detalles');
    try {
        // Obtener todas las invitaciones del invitado específico
        const invitaciones = await prisma.invitacion.findMany({
            where: {
                id_invitado: Number(id_invitado),
                isConfirmed: 0,
                id_reunion: Number(idReunion)

            },
            include: {
                reunion: {
                    include: {
                        sala: true,  // Incluye la sala asociada a la reunión
                        usuario: true // Incluye el usuario asociado a la reunión
                    }
                }
            }
        });

        const reuniones = [];

        for (let i = 0; i < invitaciones.length; i++) {
            const invitacion = invitaciones[i];
            const reunion = invitacion.reunion;

            // Añadir el conteo de repeticiones
            const numRepeticion = await prisma.repeticion.count({
                where: { id_reunion: reunion.id_reunion }
            });
            reunion.numRepeticion = numRepeticion;

            // Añadir las fechas de repetición
            const repeticiones = await prisma.repeticion.findMany({
                where: { id_reunion: reunion.id_reunion }
            });
            const fechasRep = repeticiones.map(rep => ({
                id_repeticion: rep.id_repeticion,
                fecha_repeticion: rep.fecha_repeticion,
                estatus_repeticion: rep.estatus_repeticion,
                hora_inicio_repeticion: rep.hora_inicio_repeticion,
                hora_fin_repeticion: rep.hora_fin_repeticion
            }));
            reunion.fechasRepeticion = fechasRep;

            // Añadir el número de colados de la invitación
            const numColados = invitacion.numero_colados;
            invitacion.numColados = numColados;

            // Añadir la sala y el nombre del usuario a la reunión
            reunion.nombreSala = reunion.sala.nombre_sala;
            reunion.nombreUsuario = `${reunion.usuario.nombre_usuario} ${reunion.usuario.apellido_paterno_usuario} ${reunion.usuario.apellido_materno_usuario}`;

            // Incluir la información de la invitación en la reunión
            if (!reunion.invitaciones) {
                reunion.invitaciones = [];
            }
            reunion.invitaciones.push({
                id_invitacion: invitacion.id_invitacion,
                numColados: numColados
            });

            reuniones.push(reunion);
        }

        return reuniones;
    } catch (error) {
        console.error('Error al obtener las reuniones del invitado:', error);
        return { error: 'Error al obtener las reuniones del invitado' };
    }
}



async function getReunionesConRepeticionByIdOfInvitadoBD(id_invitado) {
    console.log('Petición a la BD para obtener reuniones de un invitado con detalles');
    try {
        // Obtener todas las invitaciones del invitado específico
        const invitaciones = await prisma.invitacion.findMany({
            where: {
                id_invitado: Number(id_invitado),
                isConfirmed: 1
            },
            include: {
                reunion: {
                    include: {
                        sala: true,  // Incluye la sala asociada a la reunión
                        usuario: true // Incluye el usuario asociado a la reunión
                    }
                }
            }
        });

        const reuniones = [];

        for (let i = 0; i < invitaciones.length; i++) {
            const invitacion = invitaciones[i];
            const reunion = invitacion.reunion;

            // Añadir el conteo de repeticiones
            const numRepeticion = await prisma.repeticion.count({
                where: { id_reunion: reunion.id_reunion }
            });
            reunion.numRepeticion = numRepeticion;

            // Añadir las fechas de repetición
            const repeticiones = await prisma.repeticion.findMany({
                where: { id_reunion: reunion.id_reunion }
            });
            const fechasRep = repeticiones.map(rep => ({
                id_repeticion: rep.id_repeticion,
                fecha_repeticion: rep.fecha_repeticion,
                estatus_repeticion: rep.estatus_repeticion,
                hora_inicio_repeticion: rep.hora_inicio_repeticion,
                hora_fin_repeticion: rep.hora_fin_repeticion
            }));
            reunion.fechasRepeticion = fechasRep;




            const colados = await prisma.colado.findMany({
                where: { id_invitacion: invitacion.id_invitacion },
                include: {
                    invitado: true
                }
            });
            const infoColados = colados.map(colado => ({
                isConfirmed: colado.isConfirmed,
                apellido_ma: colado.invitado.apellido_materno_invitado,
                apellido_pa: colado.invitado.apellido_paterno_invitado,
                nombre: colado.invitado.nombre_invitado,
                email: colado.invitado.email_invitado,
                foto: colado.invitado.foto_invitado,
                id_invitado: colado.invitado.id_invitado,
                habilitado: colado.invitado.habilitado,

            }));
            reunion.colados = infoColados;


            // Añadir el número de colados de la invitación
            const numColados = invitacion.numero_colados;
            invitacion.numColados = numColados;

            // Añadir la sala y el nombre del usuario a la reunión
            reunion.nombreSala = reunion.sala.nombre_sala;
            reunion.nombreUsuario = `${reunion.usuario.nombre_usuario} ${reunion.usuario.apellido_paterno_usuario} ${reunion.usuario.apellido_materno_usuario}`;

            // Incluir la información de la invitación en la reunión
            if (!reunion.invitaciones) {
                reunion.invitaciones = [];
            }
            reunion.invitaciones.push({
                id_invitacion: invitacion.id_invitacion,
                numColados: numColados,
                qr_acceso: invitacion.qr_acceso
            });



            reuniones.push(reunion);
        }

        console.log('reuniones: ', reuniones);
        return reuniones;
    } catch (error) {
        console.error('Error al obtener las reuniones del invitado:', error);
        return { error: 'Error al obtener las reuniones del invitado' };
    }
}


async function getFotoFromUsuarioBD(idUsuario) {
    console.log('peticion a la bd de getFotoFromUsuarioBD, idUsuario: ', idUsuario);
    try {
        const user = await prisma.usuario.findUnique({
            where: { id_usuario: idUsuario },
            select: { foto_usuario: true },
        });

        return user.foto_usuario;

    } catch (error) {
        console.error('Error al actualizar invitado:', error);
        return 500;
    }
}

async function getFotoFromInvitadoBD(idInvitado) {
    console.log('peticion a la bd de getFotoFromInvitadoBD, idInvitado: ', idInvitado);
    try {
        const user = await prisma.invitado.findUnique({
            where: { id_invitado: Number(idInvitado) },
            select: { foto_invitado: true },
        });

        return user.foto_invitado;

    } catch (error) {
        console.error('Error al actualizar invitado:', error);
        return 500;
    }
}


async function getInvitacionBy_IdInvitado_IdReunionBD(idInvitado, idReunion) {
    console.log('peticion a la bd de getInvitacionBy_IdInvitado_IdReunionBD, idInvitado: ', idInvitado, 'idReunion: ', idReunion);
    try {
        const invitacion = await prisma.invitacion.findFirst({
            where: {
                id_invitado: idInvitado,
                id_reunion: idReunion
            }
        });

        return invitacion;

    } catch (error) {
        console.error('Error al actualizar invitado:', error);
        return 500;
    }


}

// insertar en la tabla colados:

async function createColadoBD(id_invitado, idInvitacion){
    console.log('peticion a la bd de createColadoBD, id_invitado: ', id_invitado, 'idInvitacion: ', idInvitacion);
    try {
        const colado = await prisma.colado.create({
            data: {
                id_invitado: id_invitado,
                id_invitacion: idInvitacion,
                isConfirmed: 0
            }
        });

        return colado;

    } catch (error) {
        console.error('Error al actualizar invitado:', error);
        return 500;
    }

}

// funcion para que el invitado guarde los dispositivos y automoviles en la invitacion que se le asigno
async function putInfoInvitadoToReunionBD(idInvitacion, dispositivos, automoviles,rutaImagenQR){

    console.log('peticion a la bd de putInfoInvitadoToReunionBD, idInvitacion: ', idInvitacion, 'dispositivos: ', dispositivos, 'automoviles: ', automoviles);

    try {


        // 1. Crear los dispositivos electrónicos
        for (const dispositivo of dispositivos) {
            await prisma.dispositivo_electronico.create({
                data: {
                    id_invitacion: Number(idInvitacion),
                    no_serie_dispositivo_electronico: dispositivo.numeroSerie,
                    modelo_dispositivo_electronico: dispositivo.tipo,
                    marca_dispositivo_electronico: dispositivo.marca,
                }
            });
        }

        // 2. Crear los automóviles
        for (const automovil of automoviles) {
            await prisma.automovil.create({
                data: {
                    id_invitacion: Number(idInvitacion),
                    color_automovil: automovil.color,
                    matricula_automovil: automovil.placa,
                    marca_automovil: automovil.marca,
                    modelo_automovil: automovil.modelo,
                }
            });
        }

        // acualizar el estatus de la invitacion y poner el url del qr de la invitacion

        await prisma.invitacion.update({
            where: { id_invitacion: Number(idInvitacion) },
            data: {
                isConfirmed: 1,
                qr_acceso: rutaImagenQR,
                habilitado: "Si"
            }
        });

        return "true";
    }
    catch (error) {
        console.error('Error al putInfoInvitadoToReunionBD:', error);
        return 500;
    }


}


async function updateHoraReunionBD(id,nueva_hora) {
    console.log('peticion a la bd de updateHoraReunion');
    try {
        const reunionActualizada = await prisma.repeticion.update({
            where: { id_repeticion: Number(id) },
            data: {
                hora_fin_repeticion: nueva_hora
            }
        });
        return reunionActualizada;
    } catch (error) {
        console.error('Error al actualizar reunion:', error);
        return json({ error: 'Error al actualizar reunion' });
    }
}




module.exports = {
    getUsersByEmailBD,
    createUserBD,
    getSalasBD,
    setNewSalaBD,
    getSalaByIdBD,
    updateSalaBD,
    deleteSalaBD,
    getReunionesBD,
    updateUserBD,

    getUsuariosBD,
    setNewUsuarioBD,
    getUsuarioByIdBD,
    updateUsuarioBD,
    deleteUsuarioBD,
    getUsuarioByEmailBD,

    getReunionesBD,
    getReunionByIdBD,

    getInvitacionByIdBD,
    getInvitadoByIdBD,
    getInvitadoByNameBD,
    getInvitacionesByIdInv,
    getReunionByIdInvBD,



    getReunionesConRepeticionByIdOfUserBD,
    setNewReunionBD,

    getInvitadoByEmailBD,
    setNewInvitadoBD,
    setNewInvitacionBD,

    getInvitadosBD,
    updateInvitadoBD,
    updateInvitadoBDtoInvitacion,
    deleteInvitadoBD,
    deleteReunionBD,
    updateInvitadoWithFotoBD,

    getReunionesAdminBD,
    getInvitacionesAdminBD,

    getDetallesReunionByIdBD,

    getInvitadoByIdEmailBD,

    updatePassInvitadoBD,

    getReunionesConRepeticionByIdOfInvitadoBD,
    getReunionesNuebasBD,

    getFotoFromUsuarioBD,
    getFotoFromInvitadoBD,

    putInfoInvitadoToReunionBD,

    setNewColadoBD,
    getInvitacionBy_IdInvitado_IdReunionBD,

    createColadoBD,
    updateHoraReunionBD,
    updateDateRepBD,

    getReunionesNuebasByIdBD,
    getColadoByIdInvitadoBD,

    getInvitacionesByIdReunionBD


};
