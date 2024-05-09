const { PrismaClient } = require('@prisma/client');
const { json } = require('body-parser');
const prisma = new PrismaClient();

async function getUsersByEmailBD(email) {
    console.log('peticion a la bd de getUsersByEmail');
    try {
        const usuario = await prisma.usuario.findFirst({
            where: {
                email_usuario: email,
            },
        });
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

async function createUserBD({ email, hashedPassword, nombre, apellido_paterno, apellido_materno, telefono, rol, foto_usuario}) {
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

async function getSalasBD() {
    console.log('peticion a la bd de getSalas');
    try {
        const salas = await prisma.sala.findMany();
        console.log('respuesta en json: ', salas);
        return salas;
    } catch (error) {
        console.error('Error al obtener salas:', error);
        return json({ error: 'Error al obtener salas' });
    }
}

async function setNewSalaBD(nombreSala, cupoMaximo, piso, ubicacion, estatus) {
    console.log('peticion a la bd de setNewSala');
    try {
        const nuevaSala = await prisma.sala.create({
            data: {
                nombre_sala: nombreSala,
                capacidad_sala: parseInt(cupoMaximo),
                piso_sala: parseInt(piso),
                ubicacion_sala: ubicacion,
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

async function updateSalaBD(id, nombreSala, cupoMaximo, piso, ubicacion, estatus) {
    console.log('peticion a la bd de updateSala');
    try {
        const salaActualizada = await prisma.sala.update({
            where: { id_sala: Number(id) },
            data: {
                nombre_sala: nombreSala,
                capacidad_sala: parseInt(cupoMaximo),
                piso_sala: parseInt(piso),
                ubicacion_sala: ubicacion,
                estatus_sala: (estatus)
            }
        });
        return salaActualizada;
    } catch (error) {
        console.error('Error al actualizar sala:', error);
        return json({ error: 'Error al actualizar sala' });
    }
}

async function deleteSalaBD(id) {
    console.log('peticion a la bd de deleteSala');
    try {
        const salaEliminada = await prisma.sala.delete({
            where: { id_sala: Number(id) }
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
                telefono_usuario: parseInt(telefono),
                rol_usuario: rol,
                foto_usuario: fotoUsuario

            }
        });
        return nuevoUsuario;
    } catch (error) {
        console.error('Error al crear usuario:', error);
        return json({ error: 'Error al crear usuario' });
    }
}

async function getUsuarioByIdBD(id) {
    console.log('peticion a la bd de getUsuarioById');
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


async function updateUsuarioBD(id, email, passwordHashed, nombre, apellidoPaterno, apellidoMaterno, telefono, rol, fotoUsuario) {
    console.log('peticion a la bd de updateUsuario');
    try {
        const usuarioActualizado = await prisma.usuario.update({
            where: { id_usuario: Number(id) },
            data: {
                email_usuario: email,
                password_usuario: passwordHashed,
                nombre_usuario: nombre,
                apellido_paterno_usuario: apellidoPaterno,
                apellido_materno_usuario: apellidoMaterno,
                telefono_usuario: parseInt(telefono),
                rol_usuario: rol,
                foto_usuario: fotoUsuario
            }
        });
        return usuarioActualizado;
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        return json({ error: 'Error al actualizar usuario' });
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
async function getReunionesBD() {
    console.log('peticion a la bd de getReuniones');
    try {
        const reuniones = await prisma.reunion.findMany();
        console.log('respuesta en json: ', reuniones);
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

    getUsuariosBD,
    setNewUsuarioBD,
    getUsuarioByIdBD,
    updateUsuarioBD,
    deleteUsuarioBD,
    getReunionesBD,
    getUsersByIDBD

};
