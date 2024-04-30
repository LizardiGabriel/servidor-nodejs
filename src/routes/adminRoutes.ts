import {Router} from 'express';
import express from 'express';

const router = Router();


// * castear a json los parametros de la peticion
import bodyParser from 'body-parser';
router.use(express.urlencoded({ extended: true }));
router.use(bodyParser.json());


// administrador gestionar invitaciones{
    // crear invitacion
    router.post('/invitaciones', (req, res) => {
        res.status(501).json({error: 'Not implemented'});
    });
    // eliminar invitacion
    router.delete('/invitaciones/:id', (req, res) => {
        const { id } = req.params;
        res.status(501).json({error: `Not implemented: ${id}`});
    });
    // reagendar invitacion
    router.put('/invitaciones/:id', (req, res) => {
        const { id } = req.params;
        res.status(501).json({error: `Not implemented: ${id}`});
    });



// }
// administrador --> gestionar usuarios{

// administrador --> crear usuario
    router.post('/usuarios', (req, res) => {
        res.status(501).json({error: 'Not implemented'});
    });
    // administrador --> listar usuarios
    router.get('/usuarios', (req, res) => {
        res.status(501).json({error: 'Not implemented'});
    });
    //administrador --> obtener usuario
    router.get('/usuarios/:id', (req, res) => {
        const { id } = req.params;
        res.status(501).json({error: `Not implemented: ${id}`});
    });
    //administrador --> update usuario
    router.put('/usuarios/:id', (req, res) => {
        const { id } = req.params;
        res.status(501).json({error: `Not implemented: ${id}`});
    });

    //administrador --> delete usuario
    router.delete('/usuarios/:id', (req, res) => {
        const { id } = req.params;
        res.status(501).json({error: `Not implemented: ${id}`});
    });

// }

// administrador --> gestionar catalogo de salas {

    // dar de alta sala
    router.post('/salas', (req, res) => {
        res.status(501).json({error: 'Not implemented'});
    });
    // dar de baja sala
    router.delete('/salas/:id', (req, res) => {
        const { id } = req.params;
        res.status(501).json({error: `Not implemented: ${id}`});
    });
    // modificar sala
    router.put('/salas/:id', (req, res) => {
        const { id } = req.params;
        res.status(501).json({error: `Not implemented: ${id}`});
    });



// }

// administrador --> gestionar reuniones{
    // agendar reunion (crear)
    router.post('/reunion', (req, res) => {
        res.status(501).json({error: 'Not implemented'});
    });
    // cancelar reunion (eliminar)
    router.delete('/reunion/:id', (req, res) => {
        const { id } = req.params;
        res.status(501).json({error: `Not implemented: ${id}`});
    });
    // reagendar reunion (update)
    router.put('/reunion/:id', (req, res) => {
        const { id } = req.params;
        res.status(501).json({error: `Not implemented: ${id}`});
    });

//}



export default router;