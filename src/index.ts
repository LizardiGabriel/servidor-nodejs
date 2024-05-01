import express from 'express';
import adminRoutes from './routes/adminRoutes';
import anfitrionRoutes from './routes/anfitrionRoutes';
import inicioRoutes from './routes/inicioRoutes';
import https from 'https';
import fs from 'fs';

import bodyParser from 'body-parser';


const path = require('path');

const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', express.static('./public'));

app.use('/admin', adminRoutes);
app.use('/anfitrion', anfitrionRoutes);
app.use('/home', inicioRoutes);

app.get('/', (req, res) => {
  res.send('Hello World 2');
});



app.listen(3000, () => {
  console.log('Servidor HTTPS listo en localhost:3000');
});
