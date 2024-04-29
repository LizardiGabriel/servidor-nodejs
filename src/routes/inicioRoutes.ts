import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import express from 'express';

const prisma = new PrismaClient();
const router = Router();

router.use('/login.html', express.static('./public/login.html'));
router.use('/signup.html', express.static('./public/signup.html'));
router.use('/recuperar.html', express.static('./public/recuperar.html'));

router.get('/', (req, res) => {
    res.status(501).json({error: 'Not implemented: pagina home'});
});

// Usuario iniciar sesión
router.get('/login', async (req, res) => {
    try {
        const { email, password } = req.query;
        const usuario = await prisma.usuario.findUnique({
            where: {
                Email: email as string,
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
        const usuario = await prisma.usuario.findUnique({
            where: {
                Email: email as string,
            },
        });

        if (usuario) {
            return res.status(409).json({ error: 'Usuario ya registrado' });
        }

        await prisma.usuario.create({
            data: {
                Email: email as string,
                Contrasena: contrasena as string,
                Nombre: nombre as string,
                Apellido_Paterno: apellido_paterno as string,
                Apellido_Materno: apellido_materno as string,
                Telefono: parseInt(telefono as string),
            }
        });

        res.status(201).json({ message: 'Usuario registrado' });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        return res.status(500).json({ error: 'Usuario ya registrado' });
    }
});


export default router;