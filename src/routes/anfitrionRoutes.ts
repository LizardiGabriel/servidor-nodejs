import {Router} from 'express';
import { PrismaClient } from '@prisma/client';
import express from 'express';

const prisma = new PrismaClient();

const router = Router();

// * castear a json los parametros de la peticion
import bodyParser from 'body-parser';
router.use(express.urlencoded({ extended: true }));
router.use(bodyParser.json());


router.get('/', (req, res) => {
    res.status(501).json({error: 'Not implemented: pagina del anfitrion'});
});

// anfitrion --> gestionar reuniones{

    // anfitrion --> agendar reunion (crear)
    router.post('/reuniones', (req, res) => {
        res.status(501).json({error: 'Not implemented'});
    });
    //anfitrion --> eliminar reunion (cancelar)
    router.delete('/reuniones/:id', (req, res) => {
        const { id } = req.params;
        res.status(501).json({error: `Not implemented: ${id}`});
    });
    //anfitrion --> update reunion (reagendar)
    router.put('/reuniones/:id', (req, res) => {
        const { id } = req.params;
        res.status(501).json({error: `Not implemented: ${id}`});
    });

    // anfitrion --> consultar reuniones (listar)
    router.get('/reuniones/', async (req, res) => {
        const allReuniones = await prisma.reunion.findMany();
        res.json(allReuniones);
    });
    //anfitrion --> consultar una reunion (obtener)
    router.get('/reuniones/:id', (req, res) => {
        const { id } = req.params;
        res.status(501).json({error: `Not implemented: ${id}`});
    });

// }

// anfitrion --> gestionar salas{
    // anfitrion --> consultar salas (listar)
    router.get('/salas', (req, res) => {
        res.status(501).json({error: 'Not implemented'});
    });
// }

// anfitrion --> gestionar invitaciones{
    // anfitrion --> crear invitacion (altas)
    router.post('/invitaciones', (req, res) => {
        res.status(501).json({error: 'Not implemented'});
    });
    //anfitrion --> cancelar invitacion (bajas)
    router.delete('/invitaciones/:id', (req, res) => {
        const { id } = req.params;
        res.status(501).json({error: `Not implemented: ${id}`});
    });
    //anfitrion --> consultar invitaciones (listar)
    router.get('/invitaciones', (req, res) => {
        res.status(501).json({error: 'Not implemented'});
    });
    // anfitrion --> consultar una invitacion (obtener)
    router.get('/invitaciones/:id', (req, res) => {
        const { id } = req.params;
        res.status(501).json({error: `Not implemented: ${id}`});
    });

//}

export default router;