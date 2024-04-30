import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import express from 'express';

const prisma = new PrismaClient();
const router = Router();

// * castear a json los parametros de la peticion
import bodyParser from 'body-parser';
router.use(express.urlencoded({ extended: true }));
router.use(bodyParser.json());



router.use('/login.html', express.static('./public/login.html'));
router.use('/signup.html', express.static('./public/signup.html'));
router.use('/recuperar.html', express.static('./public/recuperar.html'));

router.get('/', (req, res) => {
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
        const usuario = await prisma.usuario.findFirst({
            where: {
                Email: email as string,
            },
        });

        if (usuario) {
            return res.status(409).json({ error: 'Usuario ya registrado' });
        }

        await prisma.usuario.create({
            data: {
            Nombre: nombre as string,
            Apellido_Paterno: apellido_paterno as string,
            Apellido_Materno: apellido_materno as string,
            Email: email as string,
            Contrasena: contrasena as string,
            Telefono: parseInt(telefono as string), 
            ID_Rol: parseInt('1'), 
            

            },
        });

        res.status(201).json({ message: 'Usuario registrado' });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        return res.status(500).json({ error: 'Usuario ya registrado' });
    }
});


export default router;