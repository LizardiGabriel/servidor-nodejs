const { getReunionesBD } = require('../tools/peticiones');

async function getReuniones (req, res) {

    const reuniones = await getReunionesBD();
    res.json(reuniones);
}

// Exportar las funciones para poder ser utilizadas en otros archivos
module.exports = {
    getReuniones
};