// creado por beecoders

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const cookieParser = require('cookie-parser');
const session = require('express-session');
const logger = require('morgan');
const errorHandler = require('errorhandler');
const methodOverride = require('method-override');


const home = require('./routes/home');
const reuniones = require('./routes/reuniones');

const admin = require('./routes/admin');
const anfitrion = require('./routes/anfitrion');
const seguridad = require('./routes/seguridad');
const externo = require('./routes/externo');






const app = express();
app.locals.appTitle = 'beemeetings';

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride());


app.use(cookieParser('3CCC4ACD-6ED1-4844-9217-82131BDCB239'));

app.use(session({
  secret: '2C44774A-D649-4D44-9535-46E296EF984F',
  resave: true, saveUninitialized: true
}));

app.use(errorHandler());


app.get('/prueba.ico', (req, res) => {
  console.log('---> peticion de favicon.ico');
  res.status(200).sendFile(path.join(__dirname, '../public/favicon.ico'));
});

app.get('/css/app.css', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../public/build/css/app.css'));
});

app.get('/img/BeeMeet2.png', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../public/build/img/BeeMeet2.png'));
});
app.get('/js/validaciones.js', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../public/build/js/validaciones.js'));
});

app.get('/js/ventanas-modales.js', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../public/build/js/ventanas-modales.js'));
});

app.get('/img/BeeMeet.png', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../public/build/img/BeeMeet.png'));
});

app.get('/css/app.css.map', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../public/build/css/app.css.map'));
});


app.use('/', express.static('./public'));
app.post('/home/login', home.login);
app.get('/home/signup', home.signup);
app.post('/home/recuperar', home.recuperar);
app.post('/home/cambiar', home.cambiar);

app.use('/home/login.html', express.static('./public/build/views/Sesiones/iniciarSesion.html'));
app.use('/home/signup.html', express.static('./public/signup.html'));
app.use('/home/recuperar.html', express.static('./public/build/views/Sesiones/recuperarContrasena.html'));

app.use('/home/recuperar2.html', express.static('./public/build/views/Sesiones/cambiarContrasena.html'));

app.get('/catalogo/reuniones', reuniones.getReuniones);






app.use('/admin', (req, res, next) => {
  if (req.session && req.session.rol === 1) {
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
});

// admin

app.use('/admin/admin.html', express.static('./public/admin.html'));
app.get('/admin/logout', admin.logout);


app.use('/admin/catalogo/catalogo.html', express.static('./public/catalogo.html'));
app.get('/admin/catalogo/salas', admin.getSalas);
app.post('/admin/catalogo/salas', admin.setNewSala);
app.get('/admin/catalogo/salas/:id', admin.getSalaById);
app.put('/admin/catalogo/salas/:id', admin.updateSala);
app.delete('/admin/catalogo/salas/:id', admin.deleteSala);


app.use('/admin/catalogo/usuarios.html', express.static('./public/gestionarusuarios.html'));
app.get('/admin/catalogo/usuarios', admin.getUsuarios);
app.post('/admin/catalogo/usuarios', admin.setNewUsuario);
app.get('/admin/catalogo/usuarios/:id', admin.getUsuarioById);
app.put('/admin/catalogo/usuarios/:id', admin.updateUsuario);
app.delete('/admin/catalogo/usuarios/:id', admin.deleteUsuario);


app.use('/admin/catalogo/crearCuenta.html', express.static('./public/build/views/Sesiones/crearCuenta.html'));
app.use('/admin/catalogo/confirmarCuenta.html', express.static('./public/build/views/Sesiones/confirmarCrearCuenta.html'));



app.get('/admin/test', (req, res) => {
  console.log('test');
  console.log(req.session);
  res.send('test');
});


// anfitrion

app.use('/anfitrion', (req, res, next) => {
  if (req.session && req.session.rol === 2) {
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
}
);
app.use('/anfitrion/anfitrion.html', express.static('./public/anfitrion.html'));
app.get('/anfitrion/logout', anfitrion.logout);
app.use('/anfitrion/reuniones.html', express.static('./public/reunionesAnf.html'));
app.use('/anfitrion/salas.html', express.static('./public/salasAnf.html'));
app.use('/anfitrion/cuenta.html', express.static('./public/cuentaAnf.html'));

app.get('/anfitrion/reuniones', anfitrion.getReunionesAnfitrion);
app.get('/anfitrion/salas', anfitrion.getSalasAnfitrion);
app.post('/anfitrion/reuniones', anfitrion.setNewReunion);

app.get('/anfitrion/crearInvitacion.html/:idReunion', anfitrion.crearInvitacion);



app.get('/anfitrion/test', (req, res) => {
  console.log('test');
  console.log(req.session);
  res.send('test');
});

// seguridad
app.use('/seguridad', (req, res, next) => {
  if (req.session && req.session.rol === 3) {
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
});
app.use('/seguridad/seguridad.html', express.static('./public/seguridad.html'));
app.get('/seguridad/logout', seguridad.logout);
app.use('/seguridad/visualizarAgenda.html', express.static('./public/visualizarAgenda.html'));
app.get('/seguridad/getAgendas', seguridad.getReunionesAll);
app.get('/seguridad/getAgendaID/:id', seguridad.getReunionByIdAll);
app.use('/seguridad/verDatosInv.html', express.static('./public/verDatosInv.html'));
app.get('/seguridad/test', (req, res) => {
  console.log('test');
  console.log(req.session);
  res.send('test');
});

// externo
app.use('/externo', (req, res, next) => {
  if (req.session && req.session.rol === 4) {
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
});
app.use('/externo/externo.html', express.static('./public/externo.html'));
app.get('/externo/logout', externo.logout);
app.get('/externo/test', (req, res) => {
  console.log('test');
  console.log(req.session);
  res.send('test');
});


app.use('/not-found', express.static('./public/notFound.html'));






app.get('/', (req, res) => {
  res.send('Hello World 2');
});

app.all('*', (req, res) => {  
  res.redirect('/not-found');
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
