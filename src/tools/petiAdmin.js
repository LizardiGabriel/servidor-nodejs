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
                numero_colados: invitacionesReunion[i].numero_colados,
                correo_invitado: invitadito.email_invitado
            };
            infoInvitados.push(nombreInvColados);
        }
        reunion.infoInvitados = infoInvitados;

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
module.exports = {
    getReunionAdminByIdBD
};

