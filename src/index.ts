import express from 'express';
import adminRoutes from './routes/adminRoutes';
import anfitrionRoutes from './routes/anfitrionRoutes';
import inicioRoutes from './routes/inicioRoutes';


import helmet from "helmet";
import bodyParser from 'body-parser';


const path = require('path');

const app = express();
app.use(helmet());


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
  console.log('Servidor HTTP listo en localhost:3000');
});
