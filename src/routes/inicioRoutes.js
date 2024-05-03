const Router = require('express');
const express = require('express')

const router = Router();

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

router.use('/login.html', express.static('./public/login.html'));
router.use('/signup.html', express.static('./public/signup.html'));
router.use('/recuperar.html', express.static('./public/recuperar.html'));

router.get('/', (req, res) => {
    console.log('entro a home');
    res.status(501).json({error: 'Not implemented: pagina home djvcwduecfvweigcwiu'});
});

// Usuario iniciar sesión
router.post('/login', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        console.log(req.body);
        
        
        const usuario = await prisma.usuario.findFirst({
            where: {
                Email: email,
            },
        });

        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        if (usuario.Contrasena !== password) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }
        

        res.status(200).json({ message: 'Inicio de sesión exitoso' });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Usuario registrarse --> 
router.get('/signup', async (req, res) => {
    try {
        const { nombre, apellido_paterno, apellido_materno, email, contrasena, telefono } = req.query;
        
        
        const usuario = await prisma.usuario.findFirst({
            where: {
                Email: email,
            },
        });

        if (usuario) {
            return res.status(409).json({ error: 'Usuario ya registrado' });
        }

        await prisma.usuario.create({
            data: {
            Nombre: nombre,
            Apellido_Paterno: apellido_paterno,
            Apellido_Materno: apellido_materno,
            Email: email,
            Contrasena: contrasena,
            Telefono: parseInt(telefono), 
            ID_Rol: parseInt('1'), 
            

            },
        });
        

        res.status(201).json({ message: 'Usuario registrado' });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        return res.status(500).json({ error: 'Usuario ya registrado' });
    }
});


module.exports = router;