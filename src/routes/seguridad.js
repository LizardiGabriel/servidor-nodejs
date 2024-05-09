const { log } = require('console');
const { getReunionesBD, getUsersByIDBD } = require('../tools/peticiones');
const { response } = require('express');


async function logout(req, res) {
    console.log('mensaje --> logout');
    req.session.destroy();
    res.redirect('/');
}


async function getReuniones(req, res) {
    const reuniones = await getReunionesBD();    
    res.json(reuniones);
}

async function getAllReunioneData(){
    const reuniones = await getReunionesBD();    
    res.json(reuniones); 
}
//Visualizar agenda
module.exports = {
    logout,
    getReuniones
};
