const { PrismaClient } = require('@prisma/client');
const { json } = require('body-parser');
const prisma = new PrismaClient();


async function getReunionAdminByIdBD(id_reunion) {
    console.log('Petición a la BD de getReunionByIdBD');
    try {
        // Obtener la reunión por su ID
        const reunion = await prisma.reunion.findUnique({
            where: { id_reunion: Number(id_reunion) }
        });

        if (!reunion) {
            throw new Error('Reunión no encontrada');
        }

        // Obtener el número de repeticiones de la reunión
        const numRepeticion = await prisma.repeticion.count({
            where: { id_reunion: reunion.id_reunion }
        });
        reunion.numRepeticion = numRepeticion;

        // Obtener las fechas de repetición de la reunión
        const repeticiones = await prisma.repeticion.findMany({
            where: { id_reunion: reunion.id_reunion }
        });
        var fechasRep = [];
        for (let i = 0; i < repeticiones.length; i++) {
            const fechasRep2 = {
                id_repeticion: repeticiones[i].id_repeticion,
                fecha_repeticion: repeticiones[i].fecha_repeticion,
                estatus_repeticion: repeticiones[i].estatus_repeticion,
                hora_inicio_repeticion: repeticiones[i].hora_inicio_repeticion,
                hora_fin_repeticion: repeticiones[i].hora_fin_repeticion
            };
            fechasRep.push(fechasRep2);
        }
        reunion.fechasRepeticion = fechasRep;

        // Obtener información de los invitados de la reunión
        const invitacionesReunion = await prisma.invitacion.findMany({
            where: { id_reunion: reunion.id_reunion }
        });

        var infoInvitados = [];
        for (let i = 0; i < invitacionesReunion.length; i++) {
            const invitadito = await getInvitadoByIdBD(invitacionesReunion[i].id_invitado);
            console.log('Invitado email: ', invitadito.email_invitado);

            const nombreInvColados = {
                nombre_invitado: invitadito.nombre_invitado,
                numero_colados: invitacionesReunion[i].numero_colados,
                correo_invitado: invitadito.email_invitado
            };
            infoInvitados.push(nombreInvColados);
        }
        reunion.infoInvitados = infoInvitados;

        const salita = await prisma.sala.findUnique({
            where: { id_sala: reunion.id_sala }
        });

        reunion.nombreSala = salita.nombre_sala;

        return reunion;

    } catch (error) {
        console.error('Error al obtener la reunión:', error);
        return { error: 'Error al obtener la reunión' };
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


async function getReunionAnfitrionByIdBD(id_reunion) {
    console.log('Petición a la BD de getReunionByIdBD');
    try {
        // Obtener la reunión por su ID con todas las relaciones necesarias
        const reunion = await prisma.reunion.findUnique({
            where: { id_reunion: Number(id_reunion) },
            include: {
                Repeticion: true,
                Invitacion: {
                    include: {
                        invitado: true,
                        Colado: {
                            include: {
                                invitado: true
                            }
                        }
                    }
                },
                sala: true
            }
        });

        if (!reunion) {
            throw new Error('Reunión no encontrada');
        }

        // Agregar el número de repeticiones de la reunión
        reunion.numRepeticion = reunion.Repeticion.length;

        // Formatear las fechas de repetición de la reunión
        reunion.fechasRepeticion = reunion.Repeticion.map(rep => ({
            id_repeticion: rep.id_repeticion,
            fecha_repeticion: rep.fecha_repeticion,
            estatus_repeticion: rep.estatus_repeticion,
            hora_inicio_repeticion: rep.hora_inicio_repeticion,
            hora_fin_repeticion: rep.hora_fin_repeticion
        }));

        // Obtener información de los invitados de la reunión
        reunion.infoInvitados = reunion.Invitacion.map(invitacion => {
            let infoInvitado = {
                nombre_invitado: invitacion.invitado.nombre_invitado,
                correo_invitado: invitacion.invitado.email_invitado,
                numero_colados: invitacion.numero_colados,
                id_invitado: invitacion.id_invitado,
                isConfirmed: invitacion.isConfirmed,
                es_colado_invitado: invitacion.es_colado_invitado
            };
            if (invitacion.es_colado_invitado === 1) {
                // añadir los colados de los invitados y despues retornar
                infoInvitado.colados = invitacion.Colado.map(colado => ({
                    nombre_invitado: colado.invitado.nombre_invitado,
                    correo_invitado: colado.invitado.email_invitado,
                    id_colado: colado.id_invitado,
                }));
            }
            return infoInvitado;

        });

        // Agregar el nombre de la sala
        reunion.nombreSala = reunion.sala.nombre_sala;

        // Eliminar propiedades innecesarias antes de retornar el objeto
        delete reunion.Repeticion;
        delete reunion.Invitacion;
        delete reunion.sala;

        return reunion;

    } catch (error) {
        console.error('Error al obtener la reunión:', error);
        return { error: 'Error al obtener la reunión' };
    }
}

async function obtenerDetallesInvitacionAnfiBD(idReunion, idInvitado) {
    try {
        console.log('Petición a la BD de obtenerDetallesInvitacionAnfiBD');
        console.log('id_reunion:', idReunion);
        console.log('id_invitado:', idInvitado);

        const invitacion = await prisma.invitacion.findFirst({
            where: {
                id_invitado: Number(idInvitado),
                id_reunion: Number(idReunion)
            },
            include: {
                invitado: true,
                Automovil: true,
                dispositivo_electronico: true,
                Colado: {
                    include: {
                        invitado: true
                    }
                }
            }
        });

        if (!invitacion) {
            throw new Error('No se encontró la invitación con los IDs proporcionados');
        }

        const detallesInvitacion = {
            //nombre_completo_invitado: `${invitacion.invitado.nombre_invitado} ${invitacion.invitado.apellido_paterno_invitado} ${invitacion.invitado.apellido_materno_invitado}`,
            idReunion: invitacion.id_reunion,
            nombre_invitado: invitacion.invitado.nombre_invitado,
            apellido_paterno_invitado: invitacion.invitado.apellido_paterno_invitado,
            apellido_materno_invitado: invitacion.invitado.apellido_materno_invitado,
            email_invitado: invitacion.invitado.email_invitado,
            empresa_invitado: invitacion.invitado.empresa_invitado,
            foto_invitado: invitacion.invitado.foto_invitado,
            lista_autos: invitacion.Automovil.map(auto => ({
                color: auto.color_automovil,
                matricula: auto.matricula_automovil,
                marca: auto.marca_automovil,
                modelo: auto.modelo_automovil
            })),
            lista_dispositivos: invitacion.dispositivo_electronico.map(dispositivo => ({
                no_serie: dispositivo.no_serie_dispositivo_electronico,
                modelo: dispositivo.modelo_dispositivo_electronico,
                marca: dispositivo.marca_dispositivo_electronico
            })),
            es_colado_invitado: invitacion.es_colado_invitado
        };



        if (invitacion.es_colado_invitado === 1) {
            // console.log('colados de invitado:', invitacion.Colado);

            const lista_acompanantesPromises = invitacion.Colado.map(async (colado) => {
                const isConfirmed = await getIsConfirmedColado(colado.id_invitado, invitacion.id_reunion);
                return {
                    idInvitado: colado.id_invitado,
                    idReunion: invitacion.id_reunion,
                    isConfirmed: isConfirmed,
                    nombre: colado.invitado.nombre_invitado,
                    apellidoPat: colado.invitado.apellido_paterno_invitado,
                    apellidoMat: colado.invitado.apellido_materno_invitado,
                    correo: colado.invitado.email_invitado
                };
            });

            detallesInvitacion.lista_acompanantes = await Promise.all(lista_acompanantesPromises);


        }


        return detallesInvitacion;

    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function getIsConfirmedColado(idInvitado, id_reunion) {
    try {
        console.log('Petición a la BD de getIsConfirmedColado');
        console.log('id_reunion:', id_reunion);
        console.log('id_invitado:', idInvitado);

        const invitacion = await prisma.invitacion.findFirst({
            where: {
                id_invitado: Number(idInvitado),
                id_reunion: Number(id_reunion)
            }
        });

        if (!invitacion) {
            throw new Error('No se encontró la invitación con los IDs proporcionados');
        }

        return invitacion.isConfirmed;

    } catch (error) {
        console.error(error);
        throw error;
    }
}



async function getInvitacionByIdSeguridadBD(idReunion, idInvitado) {
    console.log('Petición a la BD de getInvitacionByIdSeguridadBD');
    try {
        // Obtener la invitación por su ID
        const invitacion = await prisma.invitacion.findFirst({
            where: {
                id_reunion: Number(idReunion),
                id_invitado: Number(idInvitado)
            }
        });

        if (!invitacion) {
            throw new Error('Invitación no encontrada');
        }

        return invitacion.id_invitacion;

    } catch (error) {
        console.error('Error al obtener la invitación:', error);
        return { error: 'Error al obtener la invitación' };
    }

}

// get id reunon by id invitacion
async function getReunionByIdInvitacionBD(idInvitacion) {
    console.log('Petición a la BD de getReunionByIdInvitacionBD');
    try {
        // Obtener la invitación por su ID
        const invitacion = await prisma.invitacion.findUnique({
            where: { id_invitacion: Number(idInvitacion) }
        });

        if (!invitacion) {
            throw new Error('Invitación no encontrada');
        }

        return invitacion.id_reunion;

    } catch (error) {
        console.error('Error al obtener la invitación:', error);
        return { error: 'Error al obtener la invitación' };
    }
}

async function obtenerDetallesInvitacionSeguridadBD(id_invitacion) {
    try {
        console.log('Petición a la BD de obtenerDetallesInvitacionSeguridadBD');
        console.log('id_invitacion:', id_invitacion);
        const invitacion = await prisma.invitacion.findFirst({
            where: {
                id_invitacion: Number(id_invitacion)
            },
            include: {
                reunion: {  //reunion
                    include: {
                        sala: true,  //sala
                        usuario: {   //usuario
                            select: {
                                nombre_usuario: true,
                                apellido_paterno_usuario: true,
                                apellido_materno_usuario: true
                            }

                        }
                    }
                },
                invitado: { //invitado
                    select: {
                        nombre_invitado: true,
                        apellido_paterno_invitado: true,
                        apellido_materno_invitado: true,
                        email_invitado: true,
                        empresa_invitado: true,
                        foto_invitado: true,
                        telefono_invitado: true,
                        id_invitado: true,
                        identificacion_invitado: true,
                        habilitado: true
                    }
                },
                dispositivo_electronico: {
                    select: {
                        id_dispositivo_electronico: true,
                        no_serie_dispositivo_electronico: true,
                        modelo_dispositivo_electronico: true,
                        marca_dispositivo_electronico: true,
                        cheack_dispositivo_electronico: true
                    }
                },
                Automovil: {
                    select: {
                        id_automovil: true,
                        color_automovil: true,
                        marca_automovil: true,
                        matricula_automovil: true,
                        modelo_automovil: true,
                        cheack_automovil: true
                    }
                },
                Colado: {
                    select: {
                        id_invitado: true,
                        isConfirmed: true
                    }
                },
                Acceso: {
                    select: {
                        id_acceso: true,
                        hora_entrada_acceso: true,
                        hora_salida_acceso: true,
                        nota_acceso: true,
                        acceso_dispositivo_electronico: true,
                        acceso_automovil: true
                    }
                }

            }


        });

        if (!invitacion) {
            throw new Error('No se encontró la invitación con los IDs proporcionados');
        }

        console.log('>>>>>>>>----------->>>>>>>>Invitacion:', invitacion);

        return invitacion;

    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function registrarHoraEnBD(idInvitacion, idReunion, hora, tipo) {
    const fechaActual = new Date().toLocaleString("es-MX", { timeZone: "America/Mexico_City" });

    if (tipo === 'entrada') {
        return prisma.acceso.create({
            data: {

                hora_entrada_acceso: fechaActual,
                hora_salida_acceso: "",
                nota_acceso: 'Entrada',
                invitacion: {
                    connect: {
                        id_invitacion: Number(idInvitacion)
                    }
                },
                reunion: {
                    connect: {
                        id_reunion: Number(idReunion)
                    }
                }

            }
        });
    } else {
        console.log('salida --> debug ---> idInvitacion:', idInvitacion, 'idReunion:', idReunion);
        const salida= await prisma.acceso.findMany({
            where: {
                id_invitacion: Number(idInvitacion),
                id_reunion: Number(idReunion)
            },
            orderBy: {
                id_acceso: 'desc',
            },
            take: 1


        });

        console.log('accesos con idInvitacion:', idInvitacion, 'idReunion:', idReunion, 'salida:', salida);

        return prisma.acceso.update({
            where: {
                id_acceso: salida[0].id_acceso,

            },
            data: {
                hora_salida_acceso: fechaActual,
                nota_acceso: 'Salida'
            }
        });
    }
}


async function confirmarDispositivosBD(idInvitacion, dispositivos) {
    const salida= await prisma.acceso.findMany({
        where: {
            id_invitacion: parseInt(idInvitacion),
        },
        orderBy: {
            id_acceso: 'desc',
        },
        take: 1,
    });

    console.log(dispositivos);
    dispositivos.forEach(dispositivo => {
        console.log(dispositivo[0]);
        crearAccesosDispositivos(salida[0].id_acceso, dispositivos[0])
    });
}

async function crearAccesosDispositivos(id_acceso, dispositivo) {
    // Store the result of the create operation in a variable
    const createdDeviceAccess = await prisma.acceso_dispositivo_electronico.create({
        data: {
            id_acceso: id_acceso,
            id_dispositivo_electronico: parseInt(dispositivo),
            checka: 1
        }
    });

    const currentDevice = await prisma.dispositivo_electronico.findUnique({
        where: {
            id_dispositivo_electronico: parseInt(dispositivo)
        },
        select: {
            cheack_dispositivo_electronico: true
        }
    });

    // Determine the new status
    const newStatus = (currentDevice.cheack_dispositivo_electronico === 1) ? 0 : 1;
    // Update the device status
    await prisma.dispositivo_electronico.update({
        where: {
            id_dispositivo_electronico: parseInt(dispositivo)
        },
        data: {
            cheack_dispositivo_electronico: newStatus
        }
    });


    return createdDeviceAccess;
}

async function confirmarAutomovilesBD(idInvitacion, automoviles) {
    const salida= await prisma.acceso.findMany({
        where: {
            id_invitacion: parseInt(idInvitacion),
        },
        orderBy: {
            id_acceso: 'desc',
        },
        take: 1,
    });

    console.log(automoviles);
    automoviles.forEach(automovil => {
        console.log(automovil[0]);
        crearAccesosCarro(salida[0].id_acceso, automovil[0])
    });
}

async function crearAccesosCarro(id_acceso, carro) {
    const createAccesoAuto =  await prisma.acceso_automovil.create({
        data: {
            id_acceso: id_acceso,
            id_automovil: parseInt(carro),
            checka: 1
        }
    });

    const currentCar = await prisma.automovil.findUnique({
        where: {
            id_automovil: parseInt(carro)
        },
        select: {
            cheack_automovil: true
        }
    });

// Determine the new status
    const newStatus = (currentCar.cheack_automovil === 1) ? 0 : 1;

// Update the car status
    await prisma.automovil.update({
        where: {
            id_automovil: parseInt(carro)
        },
        data: {
            cheack_automovil: newStatus
        }
    });



    return createAccesoAuto;
}

async function eliminarAccesoBD(id_acceso, typeAction) {

    try{
        if (typeAction == "registro") {
            return await prisma.acceso.delete({
                where: {
                    id_acceso: id_acceso
                }
            });
        } else {
            return await prisma.acceso.update({
                where: { id_acceso: id_acceso },
                data: {
                    hora_salida_acceso: "",
                }
            })
        }

    }
    catch (error) {
        console.error('Error al eliminar el acceso:', error);
        return { error: 'Error al eliminar el acceso' };
    }

}



module.exports = {
    getReunionAdminByIdBD,
    getReunionAnfitrionByIdBD,
    obtenerDetallesInvitacionAnfiBD,
    getInvitacionByIdSeguridadBD,
    obtenerDetallesInvitacionSeguridadBD,
    registrarHoraEnBD,
    confirmarAutomovilesBD,
    confirmarDispositivosBD,
    eliminarAccesoBD,

    getReunionByIdInvitacionBD


};

