// creado por beecoders

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const inicioRoutes = require('./routes/inicioRoutes');
const catalogoRoutes = require('./routes/catalogoRoutes');
const adminRoutes = require('./routes/adminRoutes');
const anfitrionRoutes = require('./routes/anfitrionRoutes');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.use('/', express.static('./public'));
app.use('/home', inicioRoutes);
app.use('/admin', adminRoutes);
app.use('/anfitrion', anfitrionRoutes);
app.use('/catalogo', catalogoRoutes);

app.get('/', (req, res) => {
  res.send('Hello World 2');
});

app.listen(3000, () => {
  console.log('Servidor HTTP listo en localhost:3000');
});




/*

import https from 'https';
import fs from 'fs';

import helmet from "helmet";


app.use(helmet());



Este par de claves se puede utilizar para desarrollo y pruebas, pero producción se debe obtener un
certificado de una Autoridad de Certificación (CA) confiable.

Configuración de SSL
const opcionesSSL = {
  key: fs.readFileSync('keys/clave-privada.pem'),
  cert: fs.readFileSync('keys/certificado-publico.pem')
};

Crear servidor HTTPS
const servidorHTTPS = https.createServer(opcionesSSL, app);

servidorHTTPS.listen(3000, () => {
  console.log('Servidor HTTPS listo en localhost:3000');
}); 

*/
