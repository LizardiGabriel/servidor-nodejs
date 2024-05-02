import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import express from 'express';
import { parse } from 'path';

const prisma = new PrismaClient();

const router = Router();
router.use('/catalogo.html', express.static('./public/catalogo.html'));

router.get('/', (req, res) => {
    res.status(501).json({ error: 'Not implemented: pagina catalogo' });
});
// Ruta para obtener todas las salas
router.get('/salas', async (req, res) => {
    try {
        const salas = await prisma.sala.findMany();
        res.json(salas);
    } catch (error) {
        console.error('Error al obtener salas:', error);
        res.status(500).json({ error: 'Error al obtener salas' });
    }
});

// Ruta para crear una nueva sala
router.post('/salas', async (req, res) => {
    try {
        const { nombreSala, cupoMaximo, numeroSala, piso, estado } = req.body;
        const nuevaSala = await prisma.sala.create({
            data: {
                Nombre_Sala: nombreSala,
                Capacidad: parseInt(cupoMaximo),
                Numero_Sala: parseInt(numeroSala),
                Piso: parseInt(piso),
                Estado: (estado)
            }
        });
        res.json(nuevaSala);
    } catch (error) {
        console.error('Error al crear sala:', error);
        res.status(500).json({ error: 'Error al crear sala' });
    }
});

// Ruta para obtener una sala por su ID
router.get('/salas/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const sala = await prisma.sala.findUnique({
            where: { ID_Sala: Number(id) }
        });
        //// console.log(sala);
        res.json(sala);
        
    } catch (error) {
        console.error('Error al obtener sala:', error);
        res.status(500).json({ error: 'Error al obtener sala' });
    }
});

// Ruta para actualizar una sala
router.put('/salas/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nombreSala, cupoMaximo, numeroSala, piso, estado } = req.body;
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
        res.json(salaActualizada);
    } catch (error) {
        console.error('Error al actualizar sala:', error);
        res.status(500).json({ error: 'Error al actualizar sala' });
    }
});

// Ruta para eliminar una sala
router.delete('/salas/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const salaEliminada = await prisma.sala.delete({
            where: { ID_Sala: Number(id) }
        });
        res.json(salaEliminada);
    } catch (error) {
        console.error('Error al eliminar sala:', error);
        res.status(500).json({ error: 'Error al eliminar sala' });
    }
});

export default router;