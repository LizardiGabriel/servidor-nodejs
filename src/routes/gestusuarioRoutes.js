const Router = require('express');
const express = require('express');
const parse = require('path');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const router = Router();
router.use('/gestusuario.html', express.static('./public/gestusuario.html'));

router.get('/', (req, res) => {
    res.status(501).json({ error: 'Not implemented: pagina catalogo' });
});
// Ruta para obtener todos los usuarios
router.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await prisma.usuario.findMany();
        res.json(usuarios);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
});

// Ruta para crear un nuevo usuario
router.post('/usuarios', async (req, res) => {
    try {
        const { email, contrasena, nombre, apellidoPaterno, apellidoMaterno, telefono, idRol } = req.body;
        const nuevoUsuario = await prisma.usuario.create({
            data: {
                Email: email,
                Contrasena: contrasena,
                Nombre: nombre,
                Apellido_Paterno: apellidoPaterno,
                Apellido_Materno: apellidoMaterno,
                Telefono: parseInt(telefono), // Convertir a entero
                ID_Rol: parseInt(idRol) // Convertir a entero
            }
        });
        res.json(nuevoUsuario);
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ error: 'Error al crear usuario' });
    }
});


// Ruta para obtener un usuario por su ID
router.get('/usuarios/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await prisma.usuario.findUnique({
            where: { ID_Usuario: Number(id) }
        });
        res.json(usuario);
    } catch (error) {
        console.error('Error al obtener usuario:', error);
        res.status(500).json({ error: 'Error al obtener usuario' });
    }
});

// Ruta para actualizar un usuario
router.put('/usuarios/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { email, contrasena, nombre, apellidoPaterno, apellidoMaterno, telefono, idRol } = req.body;
        const usuarioActualizado = await prisma.usuario.update({
            where: { ID_Usuario: Number(id) },
            data: {
                Email: email,
                Contrasena: contrasena,
                Nombre: nombre,
                Apellido_Paterno: apellidoPaterno,
                Apellido_Materno: apellidoMaterno,
                Telefono: telefono,
                ID_Rol: idRol
            }
        });
        res.json(usuarioActualizado);
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        res.status(500).json({ error: 'Error al actualizar usuario' });
    }
});

// Ruta para eliminar un usuario
router.delete('/usuarios/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const usuarioEliminado = await prisma.usuario.delete({
            where: { ID_Usuario: Number(id) }
        });
        res.json(usuarioEliminado);
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).json({ error: 'Error al eliminar usuario' });
    }
});

module.exports = router;