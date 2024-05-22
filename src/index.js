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



const rutas = [
    ['/prueba.ico', '../public/favicon.ico'],
    ['/img/BeeMeet2.png', '../public/build2/img/BeeMeet2.png'],
    ['/img/BeeMeet.png', '../public/build2/img/BeeMeet.png'],
    ['/img/icons/ico-editar.svg', '../public/build2/img/icons/ico-editar.svg'],
    ['/img/icons/ico-trash.svg', '../public/build2/img/icons/ico-trash.svg'],
    ['/img/usuario.webp', '../public/build2/img/usuario.webp'],
    ['/build/img/BeeMeet2.png', '../public/build2/img/BeeMeet2.png'],
    ['/build/img/BeeMeet.png', '../public/build2/img/BeeMeet.png'],
    ['/img/icons/ico-view.svg', '../public/build2/img/icons/view.png'],


    ['/js/validaciones.js', '../public/build2/js/validaciones.js'],
    ['/js/ventanas-modales.js', '../public/build2/js/ventanas-modales.js'],
    ['/js/plantilla-formularios.js', '../public/build2/js/plantilla-formularios.js'],
    ['/js/sidebar.js', '../public/build2/js/sidebar.js'],
    ['/js/gestionUsuarios.js', '../public/build2/js/gestionUsuarios.js'],
    ['/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js', '../public/build2/js/bootstrap.bundle.min.js' ],
    ['/build/js/header.js', '../public/build2/js/header.js'],
    ['/js/gestionarSalas.js', '../public/build2/js/gestionarSalas.js'],
    ['/js/gestionarReuniones.js', '../public/build2/js/gestionarReuniones.js'],
    ['/js/gestionInvitaciones.js', '../public/build2/js/gestionInvitaciones.js'],



    ['/css/app.css', '../public/build2/css/app.css'],
    ['/css/app.css.map', '../public/build2/css/app.css.map'],


];



rutas.forEach(([rutaEntrada, rutaArchivo]) => {
  app.get(rutaEntrada, (req, res) => {
      res.status(200).sendFile(path.join(__dirname, rutaArchivo));
  });
});


app.use('/', express.static('./public'));
app.post('/home/login', home.login);
app.get('/home/signup', home.signup);
app.post('/home/recuperar', home.recuperar);
app.post('/home/cambiar', home.cambiar);

app.use('/home/login.html', express.static('./public/build2/views/Sesiones/iniciarSesion.html'));
app.use('/home/signup.html', express.static('./public/signup.html'));
app.use('/home/recuperar.html', express.static('./public/build2/views/Sesiones/recuperarContrasena.html'));

app.use('/home/recuperar2.html', express.static('./public/build2/views/Sesiones/cambiarContrasena.html'));

app.get('/catalogo/reuniones', reuniones.getReuniones);






app.use('/admin', (req, res, next) => {
  if (req.session && req.session.rol === 1) {
    next();
  } else {
      res.redirect('/home/login.html');
  }
});

// admin

app.use('/admin/admin.html', express.static('./public/build2/views/Admin/admin.html'));
app.get('/admin/logout', admin.logout);


app.use('/admin/catalogo/catalogo.html', express.static('./public/build2/views/Admin/catalogo.html'));
app.get('/admin/catalogo/salas', admin.getSalas);
app.post('/admin/catalogo/salas', admin.setNewSala);
app.get('/admin/catalogo/salas/:id', admin.getSalaById);
app.put('/admin/catalogo/salas/:id', admin.updateSala);
app.delete('/admin/catalogo/salas/:id', admin.deleteSala);


app.use('/admin/catalogo/usuarios.html', express.static('./public/build2/views/Admin/gestionarusuarios.html'));
app.get('/admin/catalogo/usuarios', admin.getUsuarios);
app.post('/admin/catalogo/usuarios', admin.setNewUsuario);
app.get('/admin/catalogo/usuarios/:id', admin.getUsuarioById);
app.put('/admin/catalogo/usuarios/:id', admin.updateUsuario);
app.delete('/admin/catalogo/usuarios/:id', admin.deleteUsuario);


app.use('/admin/catalogo/invitados.html', express.static('./public/build2/views/Admin/gestiondeinvitados.html'));
app.get('/admin/catalogo/invitados', admin.getInvitados);
app.get('/admin/catalogo/invitados/:id', admin.getInvitadoById);
app.put('/admin/catalogo/invitados', admin.updateInvitado);


app.use('/admin/catalogo/crearCuenta.html', express.static('./public/build2/views/Admin/crearCuenta.html'));
app.use('/admin/catalogo/confirmarCuenta.html', express.static('./public/build2/views/Admin/confirmarCrearCuenta.html'));

app.use('/admin/catalogo/crearSala.html', express.static('./public/build2/views/Admin/CrearSala.html'));
app.use('/admin/catalogo/GestionDeUsuarios.html', express.static('./public/build2/views/Admin/GestionDeUsuarios.html'));
app.use('/admin/catalogo/GestionarSalas.html', express.static('./public/build2/views/Admin/GestionarSalas.html'));
app.use('/admin/editarPersonal.html', express.static('./public/build2/views/Admin/EditarCuentaAnfitrionSeguridad.html'));
app.use('/admin/editarinvitados.html', express.static('./public/build2/views/Admin/EditarCuentaInvitado.html'));


app.use('/admin/catalogo/GestionarReuniones.html', express.static('./public/build2/views/Admin/GestionarReuniones.html'));
app.use('/admin/catalogo/GestionDeInvitaciones.html', express.static('./public/build2/views/Admin/GestionDeInvitaciones.html'));

app.get('/admin/catalogo/reuniones', admin.getReuniones);
app.get('/admin/catalogo/invitaciones', admin.getInvitaciones);

app.use('/admin/EditarSala.html', express.static('./public/build2/views/Admin/EditarSala.html'));


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
app.use('/anfitrion/anfitrion.html', express.static('./public/build2/views/Anfitrion/anfitrion.html'));
app.get('/anfitrion/logout', anfitrion.logout);
app.use('/anfitrion/reuniones.html', express.static('./public/build2/views/Anfitrion/reunionesAnf.html'));
app.use('/anfitrion/salas.html', express.static('./public/build2/views/Anfitrion/salasAnf.html'));
app.use('/anfitrion/cuenta.html', express.static('./public/build2/views/Anfitrion/cuentaAnf.html'));

app.get('/anfitrion/reuniones', anfitrion.getReunionesAnfitrion);
app.get('/anfitrion/salas', anfitrion.getSalasAnfitrion);
app.post('/anfitrion/reuniones', anfitrion.setNewReunion);
app.post('/anfitrion/reuniones/invitacion', anfitrion.setInvitacion);




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
    console.log('============================  intento entrar a la ruta: ', req.url);
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
