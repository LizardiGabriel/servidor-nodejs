import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();

router.get('/', (req, res) => {
    res.status(501).json({error: 'Not implemented: pagina home'});
});

// Usuario iniciar sesión
router.get('/login/:email/:password', async (req, res) => {
    try {
        const { email, password } = req.params;
        const usuario = await prisma.usuario.findUnique({
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

// Usuario registrarse --> ejemplo: http://localhost:3000/home/signup/mail/pass/nom/ape/123
router.get('/signup/:email/:password/:nombre/:apellido/:telefono', async (req, res) => {
    try {
        const { email, password, nombre, apellido, telefono } = req.params;
        const usuario = await prisma.usuario.findUnique({
            where: {
                Email: email,
            },
        });

        if (usuario) {
            return res.status(409).json({ error: 'Usuario ya registrado' });
        }

        await prisma.usuario.create({
            data: {
                Email: email,
                Contrasena: password,
                Nombre: nombre,
                Apellido_Paterno: apellido,
                Apellido_Materno: '',
                Telefono: telefono
            }
        });

        res.status(201).json({ message: 'Usuario registrado' });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});


export default router;