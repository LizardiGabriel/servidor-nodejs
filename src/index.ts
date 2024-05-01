import express from 'express';
import adminRoutes from './routes/adminRoutes';
import anfitrionRoutes from './routes/anfitrionRoutes';
import inicioRoutes from './routes/inicioRoutes';

import https from 'https';
import fs from 'fs';

import helmet from "helmet";
import bodyParser from 'body-parser';


const path = require('path');

const app = express();
app.use(helmet());


app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

/*
  Este par de claves se puede utilizar para desarrollo y pruebas, pero producción se debe obtener un
  certificado de una Autoridad de Certificación (CA) confiable.
*/
// Configuración de SSL
const opcionesSSL = {
  key: fs.readFileSync('keys/clave-privada.pem'),
  cert: fs.readFileSync('keys/certificado-publico.pem')
};

app.use('/', express.static('./public'));

app.use('/admin', adminRoutes);
app.use('/anfitrion', anfitrionRoutes);
app.use('/home', inicioRoutes);

app.get('/', (req, res) => {
  res.send('Hello World 2');
});

// Crear servidor HTTPS
const servidorHTTPS = https.createServer(opcionesSSL, app);

servidorHTTPS.listen(3000, () => {
  console.log('Servidor HTTPS listo en localhost:3000');
});

