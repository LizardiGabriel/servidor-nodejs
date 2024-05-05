const { PrismaClient } = require('@prisma/client');
const { json } = require('body-parser');
const prisma = new PrismaClient();

async function getUsersByEmailBD(email) {
    console.log('peticion a la bd de getUsersByEmail');
    try {
        const usuario = await prisma.usuario.findFirst({
            where: {
                Email: email,
            },
        });
        return usuario;
    } catch (error) {
        console.error('Error al obtener usuario por email:', error);
        return null;
    }
}

async function createUserBD({ nombre, apellido_paterno, apellido_materno, email, hashedPassword, telefono }) {
    console.log('peticion a la bd de createUser');
    try {
        await prisma.usuario.create({
            data: {
            Nombre: nombre,
            Apellido_Paterno: apellido_paterno,
            Apellido_Materno: apellido_materno,
            Email: email,
            Contrasena: hashedPassword,
            Telefono: parseInt(telefono), 
            ID_Rol: parseInt('1'), 
            

            },
        });
        return 'Usuario creado correctamente';
    } catch (error) {
        console.error('Error al crear usuario:', error);
        return  'Error interno del servidor';
    }
}

async function getSalasBD() {
    console.log('peticion a la bd de getSalas');
    try {
        const salas = await prisma.sala.findMany();
        return salas;
    } catch (error) {
        console.error('Error al obtener salas:', error);
        return json({ error: 'Error al obtener salas' });
    }
}

async function setNewSalaBD(nombreSala, cupoMaximo, numeroSala, piso, estado){
    console.log('peticion a la bd de setNewSala');
    try {
        const nuevaSala = await prisma.sala.create({
            data: {
                Nombre_Sala: nombreSala,
                Capacidad: parseInt(cupoMaximo),
                Numero_Sala: parseInt(numeroSala),
                Piso: parseInt(piso),
                Estado: (estado)
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
            where: { ID_Sala: Number(id) }
        });
        return sala;
    } catch (error) {
        console.error('Error al obtener sala:', error);
        return json({ error: 'Error al obtener sala' });
    }
}

async function updateSalaBD(id, nombreSala, cupoMaximo, numeroSala, piso, estado){
    console.log('peticion a la bd de updateSala');
    try {
        const salaActualizada = await prisma.sala.update({
            where: { ID_Sala: Number(id) },
            data: {
                Nombre_Sala: nombreSala,
                Capacidad: parseInt(cupoMaximo),
                Numero_Sala: parseInt(numeroSala),
                Piso: parseInt(piso),
                Estado: (estado)
            }
        });
        return salaActualizada;
    } catch (error) {
        console.error('Error al actualizar sala:', error);
        return json({ error: 'Error al actualizar sala' });
    }
}

async function deleteSalaBD(id){
    console.log('peticion a la bd de deleteSala');
    try {
        const salaEliminada = await prisma.sala.delete({
            where: { ID_Sala: Number(id) }
        });
        return salaEliminada;
    } catch (error) {
        console.error('Error al eliminar sala:', error);
        return json({ error: 'Error al eliminar sala' });
    }
}

// reuniones
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

module.exports = {
    getUsersByEmailBD,
    createUserBD,
    getSalasBD,
    setNewSalaBD,
    getSalaByIdBD,
    updateSalaBD,
    deleteSalaBD,
    getReunionesBD,
};
