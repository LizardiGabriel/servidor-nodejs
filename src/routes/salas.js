const { getSalasBD, setNewSalaBD, getSalaByIdBD, updateSalaBD, deleteSalaBD } = require('../tools/peticiones');

async function getSalas (req, res) {

    const salas = await getSalasBD();
    res.json(salas);
}

async function setNewSala (req, res) {
    const { nombreSala, cupoMaximo, numeroSala, piso, estado } = req.body;
    const nuevaSala = await setNewSalaBD(nombreSala, cupoMaximo, numeroSala, piso, estado);
    res.json(nuevaSala);
}

async function getSalaById (req, res) {
    const { id } = req.params;

    const sala = await getSalaByIdBD(id);
    //// console.log(sala);
    res.json(sala);
}


async function updateSala (req, res) {
    const { id } = req.params;
    const { nombreSala, cupoMaximo, numeroSala, piso, estado } = req.body;

    const salaActualizada = await updateSalaBD(id, nombreSala, cupoMaximo, numeroSala, piso, estado);
    res.json(salaActualizada);
}

async function deleteSala (req, res) {
        const { id } = req.params;
        const salaEliminada = await deleteSalaBD(id);
        res.json(salaEliminada);
}


// Exportar las funciones para poder ser utilizadas en otros archivos
module.exports = {
    getSalas,
    setNewSala,
    getSalaById,
    updateSala,
    deleteSala
};