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
const invitado= require('./routes/invitado');
const { log } = require('console');

const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtFunctions = require('./tools/jwtFunctions');





const app = express();
app.use(express.json({ limit: '50mb' }));
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
  //Recursos de imagen
    ['/prueba.ico', '../public/favicon.ico'],
    ['/img/BeeMeet2.png', '../public/build2/img/BeeMeet2.png'],
    ['/img/BeeMeet.png', '../public/build2/img/BeeMeet.png'],
    ['/img/icons/ico-editar.svg', '../public/build2/img/icons/ico-editar.svg'],
    ['/img/icons/ico-trash.svg', '../public/build2/img/icons/ico-trash.svg'],
    ['/img/icons/ico-camara.png', '../public/build2/img/icons/ico-camara.png'],
    ['/img/usuario.webp', '../public/build2/img/usuario.webp'],
    ['/build/img/BeeMeet2.png', '../public/build2/img/BeeMeet2.png'],
    ['/build/img/BeeMeet.png', '../public/build2/img/BeeMeet.png'],
    ['/img/icons/ico-view.svg', '../public/build2/img/icons/view.png'],
    ['/img/bee.png', '../public/build2/img/bee.png'],
    ['/img/NUBE.png', '../public/build2/img/NUBE.png'],
    ['/img/NUBES.png', '../public/build2/img/NUBES.png'],
    ['/img/EDIFICIO.png', '../public/build2/img/EDIFICIO.png'],
    ['/img/EDIFICIOS-GRADIANT.png', '../public/build2/img/EDIFICIOS-GRADIANT.png'],
    ['/img/EDIFICIOS-GRADIANT3.png', '../public/build2/img/EDIFICIOS-GRADIANT3.png'],
    ['/img/EDIFICIOS-GRADIANT4.png', '../public/build2/img/EDIFICIOS-GRADIANT4.png'],
    ['/img/hexagono.png', '../public/build2/img/hexagono.png'],
    ['/img/hexagono2.png', '../public/build2/img/hexagono2.png'],

    
    ['/js/buttonProfiles.js', '../public/build2/js/buttonProfiles.js'],
    ['/js/validaciones.js', '../public/build2/js/validaciones.js'],
    ['/js/ventanas-modales.js', '../public/build2/js/ventanas-modales.js'],
    ['/js/plantilla-formularios.js', '../public/build2/js/plantilla-formularios.js'],
    ['/js/sidebar.js', '../public/build2/js/sidebar.js'],
    ['/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js', '../public/build2/js/bootstrap.bundle.min.js' ],

    ['/build/js/header.js', '../public/build2/js/header.js'],
    ['/js/header.js', '../public/build2/js/header.js'],

    ['/js/index.global.min.js', '../public/build2/js/index.global.min.js'],
    ['/js/anfitrion.js', '../public/build2/js/anfitrion.js'],
    ['/js/registrarInformacionPersonal.js','../public/build2/js/registrarInformacionPersonal.js'],
    
    ['/js/superAdmin.js', '../public/build2/js/admin/superAdmin.js'],
    ['/js/gestionInvitaciones.js', '../public/build2/js/admin/gestionInvitaciones.js'],
    ['/js/admin/headers.js', '../public/build2/js/admin/headers.js'],
    
    ['/js/anfitrion/headers.js', '../public/build2/js/anfitrion/headers.js'],
    ['/js/anfitrion/calendar.js', '../public/build2/js/anfitrion/calendar.js'],
    ['/js/clockpicker.js', '../public/build2/js/clockpicker.js'],
    
    
    //Rutas de js para iniciar sesión
    ['/js/sesiones/iniciarsesion.js', '../public/build2/js/sesiones/iniciarsesion.js'],
    ['/js/sesiones/recuperarContrasena.js', '../public/build2/js/sesiones/recuperarContrasena.js'],
    ['/js/sesiones/cambiarContrasena.js', '../public/build2/js/sesiones/cambiarContrasena.js'],
    
    //Rutas para la edición de cuentas personales
    ['/js/admin/editarDatosPersonales.js', '../public/build2/js/admin/editarDatosPersonales.js'],
    ['/js/anfitrion/editarDatosPersonales.js', '../public/build2/js/anfitrion/editarDatosPersonales.js'],
    ['/js/seguridad/editarDatosPersonales.js', '../public/build2/js/seguridad/editarDatosPersonales.js'],
    ['/js/invitado/editarDatosPersonales.js', '../public/build2/js/invitado/editarDatosPersonales.js'],
    
    //Rutas para la gestión de usuarios (SuperAdmin)
    ['/js/admin/gestionUsuarios.js', '../public/build2/js/admin/gestionUsuarios.js'],
    ['/js/admin/crearUsuario.js', '../public/build2/js/admin/crearUsuario.js'],
    ['/js/admin/confirmarCrearCuenta.js', '../public/build2/js/admin/confirmarCrearCuenta.js'],
    ['/js/admin/editarCuentaAnfitrionSeguridad.js', '../public/build2/js/admin/editarCuentaAnfitrionSeguridad.js'],
    
    //Rutas para la gestión de salas (SuperAdmin)
    ['/js/admin/gestionarSalas.js', '../public/build2/js/admin/gestionarSalas.js'],
    ['/js/admin/crearSala.js', '../public/build2/js/admin/crearSala.js'],
    ['/js/admin/editarSala.js', '../public/build2/js/admin/editarSala.js'],
    
    //Rutas para la gestión de reuniones (SuperAdmin)
    ['/js/gestionarReuniones.js', '../public/build2/js/admin/gestionarReuniones.js'],
    ['/js/admin/consultarDatosReunion.js', '../public/build2/js/admin/consultarDatosReunion.js'],

    //Rutas de js para Anfitrion
    ['/js/anfitrion/crearReunion.js', '../public/build2/js/anfitrion/crearReunion.js'],
    ['/js/anfitrion/anfitrion.js', '../public/build2/js/anfitrion/anfitrion.js'],
    ['/js/anfitrion/CatalogoSalas.js', '../public/build2/js/anfitrion/CatalogoSalas.js'],
    ['/js/anfitrion/ConsultarDatosReunion.js', '../public/build2/js/anfitrion/ConsultarDatosReunion.js'],
    ['/js/anfitrion/ListaReuniones.js', '../public/build2/js/anfitrion/ListaReuniones.js'],

    //Rutas de js para Invitado
    ['/js/invitado/invitado.js', '../public/build2/js/invitado/invitado.js'],
    ['/js/invitado/invitacion.js', '../public/build2/js/invitado/invitacion.js'],
    ['/js/invitado/RegistrarInformacionPersonal.js', '../public/build2/js/invitado/RegistrarInformacionPersonal.js'],
    ['/js/invitado/headers.js', '../public/build2/js/invitado/headers.js'],
    ['/img/icons/trash.png', '../public/build2/img/icons/trash.png'],
    
    //Rutas de js para Seguridad
    ['/js/seguridad/seguridad.js', '../public/build2/js/seguridad/seguridad.js'],
    ['/js/seguridad/headers.js', '../public/build2/js/seguridad/headers.js'],
    ['/js/seguridad/consultarDetallesInvitado.js', '../public/build2/js/seguridad/consultarDetallesInvitado.js'],
    ['/js/seguridad/visualizarAgendaDelDia.js', '../public/build2/js/seguridad/visualizarAgendaDelDia.js'],
    ['/js/seguridad/escanearQR.js', '../public/build2/js/seguridad/escanearQR.js'],
    ['/js/consultarDatosDelInvitado.js', '../public/build2/js/consultarDetallesInvitado.js'],
    ['/js/qrCode.min.js', '../public/build2/js/seguridad/qrCode.min.js'],
    ['/js/scanQR.js', '../public/build2/js/seguridad/scanQR.js'],
    ['/seguridad/html5-qrcode.min.js', '../public/build2/js/html5-qrcode.min.js'],

    // sweetalert2@11
    ['/seguridad/sweetalert211.min.js', '../public/build2/js/sweetalert211.min.js'],
    

    //Rutas de css de toda la interfaz
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


function getRol(jsonToken){
    let rol = 0;
    jwt.verify(jsonToken, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return -1;
        } else {
            rol = decoded.rol;
        }
    });
    return rol;
}



function getnewCount(jsonToken) {
        let newCount = 0;
        jwt.verify(jsonToken, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return -1;
            } else {
                newCount = decoded.newCount;
                console.log('newCount from the function: ' + newCount);
            }
        });
        return newCount;
}

function getchangeFirstPass(jsonToken){
    let changeFirstPass = 0;
    jwt.verify(jsonToken, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return -1;
        } else {
            changeFirstPass = decoded.changeFirstPass;
        }
    });
    return changeFirstPass;
}

function getNombre(jsonToken){
    let nombre = '';
    let apellido = '';
    jwt.verify(jsonToken, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return -1;
        } else {
            nombre = decoded.nombre;
            apellido = decoded.apellido;
        }
    });
    return nombre + ' ' + apellido;
}

function getFoto(jsonToken){
    let foto = '';
    jwt.verify(jsonToken, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return -1;
        } else {
            foto = decoded.foto;
        }
    });
    return foto;
}

app.get('/get-nombre', (req, res) => {
    let nombre = getNombre(req.session.jwt);
    res.status(200).json({nombre: nombre});
});



app.use('/admin', (req, res, next) => {
    if(req.session) {
        let rol = getRol(req.session.jwt);
        if (rol !== 1) {
            return res.redirect('/home/login.html');
            return res.status(401).json({error: 'Unauthorized', status: 401});
        } else {
            if(rol === 1) {
                next();
            }}
    }
});

// admin

app.get('/admin/getFotoPerfil', admin.getFotoAdmin);


app.use('/admin/admin.html', express.static('./public/build2/views/Admin/admin.html'));

app.use('/admin/catalogo/GestionDeInvitaciones.html', express.static('./public/build2/views/Admin/GestionDeInvitaciones.html'));

app.use('/admin/catalogo/GestionDeUsuarios.html', express.static('./public/build2/views/Admin/GestionDeUsuarios.html'));
app.use('/admin/editarPersonal.html', express.static('./public/build2/views/Admin/EditarCuentaAnfitrionSeguridad.html'));
app.use('/admin/catalogo/crearCuenta.html', express.static('./public/build2/views/Admin/crearCuenta.html'));
app.use('/admin/catalogo/confirmarCuenta.html', express.static('./public/build2/views/Admin/confirmarCrearCuenta.html'));

app.use('/admin/catalogo/invitados.html', express.static('./public/build2/views/Admin/gestiondeinvitados.html'));
app.use('/admin/editarinvitados.html', express.static('./public/build2/views/Admin/EditarCuentaInvitado.html'));

app.use('/admin/catalogo/GestionarSalas.html', express.static('./public/build2/views/Admin/GestionarSalas.html'));
app.use('/admin/catalogo/crearSala.html', express.static('./public/build2/views/Admin/CrearSala.html'));
app.use('/admin/EditarSala.html', express.static('./public/build2/views/Admin/EditarSala.html'));

app.use('/admin/catalogo/GestionarReuniones.html', express.static('./public/build2/views/Admin/GestionarReuniones.html'));
app.use('/admin/ConsultarReunion.html', express.static('./public/build2/views/Admin/ConsultarDatosReunion.html'));

app.use('/admin/catalogo/EditarDatosPersonales.html', express.static('./public/build2/views/Admin/EditarDatosPersonales.html'));


app.get('/admin/logout', admin.logout);
app.get('/admin/getemail', admin.getUserEmail);
app.get('/admin/catalogo/salas', admin.getSalas);
app.get('/admin/catalogo/salas/:id', admin.getSalaById);
app.post('/admin/catalogo/salas', admin.setNewSala);
app.put('/admin/catalogo/salas/:id', admin.updateSala);
app.delete('/admin/catalogo/salas/:id', admin.deleteSala);


app.get('/admin/catalogo/usuarios', admin.getUsuarios);
app.get('/admin/catalogo/usuarios/:id', admin.getUsuarioById);
app.get('/admin/catalogo/usuarioEmail/:email', admin.getUsuarioByEmail);
app.post('/admin/catalogo/usuarios', admin.setNewUsuario);
app.put('/admin/catalogo/usuarios/:id', admin.updateUsuario);
app.delete('/admin/catalogo/usuarios/:id', admin.deleteUsuario);


app.get('/admin/catalogo/invitados', admin.getInvitados);
app.get('/admin/catalogo/invitados/:id', admin.getInvitadoById);
app.put('/admin/catalogo/invitados', admin.updateInvitado);


app.get('/admin/catalogo/reuniones', admin.getReuniones);
app.get('/admin/catalogo/reuniones/:id', admin.getReunionById);


app.get('/admin/catalogo/invitaciones', admin.getInvitaciones);


app.use('/admin/uploads', (req, res) => {
    // obtener la peticion actual
    const rutaArchivo = '../public/build2/uploads' + req.path;
    res.status(200).sendFile(path.join(__dirname, rutaArchivo));
});

app.use('/admin/catalogo/uploads', (req, res) => {
    // obtener la peticion actual
    const rutaArchivo = '../public/build2/uploads' + req.path;
    res.status(200).sendFile(path.join(__dirname, rutaArchivo));
});

app.use('/anfitrion/uploads', (req, res) => {
    // obtener la peticion actual
    const rutaArchivo = '../public/build2/uploads' + req.path;
    res.status(200).sendFile(path.join(__dirname, rutaArchivo));
});

app.use('/anfitrion/catalogo/uploads', (req, res) => {
    // obtener la peticion actual
    const rutaArchivo = '../public/build2/uploads' + req.path;
    res.status(200).sendFile(path.join(__dirname, rutaArchivo));
});

app.use('/anfitrion/reuniones/uploads', (req, res) => {
    // obtener la peticion actual
    const rutaArchivo = '../public/build2/uploads' + req.path;
    res.status(200).sendFile(path.join(__dirname, rutaArchivo));
});

app.use('/seguridad/uploads', (req, res) => {
    // obtener la peticion actual
    const rutaArchivo = '../public/build2/uploads' + req.path;
    res.status(200).sendFile(path.join(__dirname, rutaArchivo));
});


app.use('/invitado/home/uploads', (req, res) => {
    // obtener la peticion actual
    const rutaArchivo = '../public/build2/uploads' + req.path;
    res.status(200).sendFile(path.join(__dirname, rutaArchivo));
});




app.get('/admin/test', (req, res) => {
  console.log('test');
  console.log(req.session);
  res.send('test');
});


// anfitrion

app.use('/anfitrion', (req, res, next) => {
    if (req.session) {
        let rol = getRol(req.session.jwt);
        if (rol !== 2) {
            return res.redirect('/home/login.html');
            //return res.status(401).json({error: 'Unauthorized', status: 401});
        }
        if (rol === 2) {
            next();
        } else {
            return res.redirect('/home/login.html');
            //res.status(401).send('Unauthorized');
        }
    }else
        return res.redirect('/home/login.html');
        //return res.status(401).json({error: 'Unauthorized', status: 401});
});
app.get('/anfitrion/getFotoPerfil', admin.getFotoAdmin);
app.get('/anfitrion/logout', anfitrion.logout);

app.use('/anfitrion/anfitrion.html', express.static('./public/build2/views/Anfitrion/anfitrion.html'));
app.use('/anfitrion/reuniones.html', express.static('./public/build2/views/Anfitrion/consultarReuniones.html'));

app.use('/anfitrion/crearReunion', express.static('./public/build2/views/Anfitrion/CrearReunion.html'));
app.use('/anfitrion/reunionesLista', express.static('./public/build2/views/Anfitrion/ListaReuniones.html'));
app.use('/anfitrion/datosInvitado.html', express.static('./public/build2/views/Anfitrion/ConsultarDatosInvitado.html'));

app.use('/anfitrion/salas.html', express.static('./public/build2/views/Anfitrion/CatalogoSalas.html'));
app.use('/anfitrion/cuenta.html', express.static('./public/build2/views/Anfitrion/cuentaAnf.html'));

app.use('/anfitrion/EditarDatosPersonales.html', express.static('./public/build2/views/Anfitrion/EditarDatosPersonales.html'));



app.get('/anfitrion/reuniones', anfitrion.getReunionesAnfitrion);
app.get('/anfitrion/getUserEmail', anfitrion.getReunionesAnfitrion);
app.get('/anfitrion/getemail', anfitrion.getUserEmail);
app.get('/anfitrion/salas', anfitrion.getSalasAnfitrion);
app.get('/anfitrion/obtenerInfoInvitado', anfitrion.getInvitadoByEmail)
app.get('/anfitrion/catalogo/salas', anfitrion.getSalasAnfitrion);
app.get('/anfitrion/catalogo/usuarioEmail/:email', admin.getUsuarioByEmail);


app.post('/anfitrion/reuniones', anfitrion.setNewReunion);
app.post('/anfitrion/reunionesReagendar', anfitrion.reagendarReunion);
app.post('/anfitrion/reuniones/invitacion', anfitrion.setInvitacion);
app.put('/anfitrion/catalogo/usuarios/:id', admin.updateUsuario);
app.use('/anfitrion/reuniones/ConsultarDatos.html', express.static('./public/build2/views/Anfitrion/ConsultarDatosReunion.html'));
app.get('/anfitrion/reuniones/detalles/:idReunion', anfitrion.getReunionById);
app.put('/anfitrion/reuniones/hora', anfitrion.updateHoraReunion);
app.post('/anfitrion/reuniones/delInvitado', anfitrion.deleteInvitado);

app.use('/anfitrion/reuniones/ConsultarDatosInvitado.html', express.static('./public/build2/views/Anfitrion/ConsultarDatosInvitado.html'));
app.post('/anfitrion/reuniones/invitadoInf', anfitrion.getInfo_idInv_idReu);
app.post('/anfitrion/reuniones/cancelarReu', anfitrion.cancelarReunion);






app.get('/anfitrion/test', (req, res) => {
  console.log('test');
  console.log(req.session);
  res.send('test');
});

// seguridad
app.use('/seguridad', (req, res, next) => {
    if (req.session) {
        let rol = getRol(req.session.jwt);
        if (rol !== 3) {
            return res.redirect('/home/login.html');
            // return res.status(401).json({error: 'Unauthorized', status: 401});
        }
        if (rol === 3) {
            next();
        } else {
            return res.redirect('/home/login.html');
            res.status(401).send('Unauthorized');
        }
    } else
        return res.redirect('/home/login.html');
        //return res.status(401).json({error: 'Unauthorized', status: 401});
});


app.use('/seguridad/seguridad.html', express.static('./public/build2/views/seguridad/seguridad.html'));
app.get('/seguridad/logout', seguridad.logout);
app.use('/seguridad/visualizarAgenda.html', express.static('./public/build2/views/seguridad/visualizarAgendaDia.html'));
app.get('/seguridad/getAgendas', seguridad.getReunionesAll);
app.get('/seguridad/getemail',seguridad.getUserEmail);
app.get('/seguridad/catalogo/usuarioEmail/:email', seguridad.getUsuarioByEmail);
app.put('/seguridad/catalogo/usuarios/:id', seguridad.updateUsuario);

app.get('/seguridad/getAgendaID', seguridad.getReunionById);
app.get('/seguridad/getAgendaID/:id', seguridad.getReunionByIdAll);
app.use('/seguridad/verDatosInv.html', express.static('./public/build2/views/seguridad/ConsultarDatosDelInvitado.html'));
app.use('/seguridad/EditarDatosPersonales.html', express.static('./public/build2/views/seguridad/editarDatosPersonales.html'));
app.use('/seguridad/escanearQR.html', express.static('./public/build2/views/seguridad/scanearQr.html'));
app.get('/seguridad/getFotoPerfil', admin.getFotoAdmin);
app.post('/seguridad/registrarHora', seguridad.registrarHora);
app.post('/seguridad/confirmarDispositivo', seguridad.confirmarDispositivo);
app.post('/seguridad/confirmarAutomovil', seguridad.confirmarAutomovil);
app.delete('/seguridad/eliminarAcceso', seguridad.eliminarAcceso); 

//app.post('/seguridad/registrarDispositivo', seguridad.registrarDispositivo);
//app.post('/seguridad/registrarAutomovil', seguridad.registrarAutomovil);

// lizardi
app.post('/seguridad/reuniones/invitadoInf', seguridad.getSeguridadInfo_idInv_idReu);


app.get('/seguridad/test', (req, res) => {
  console.log('test');
  console.log(req.session);
  res.send('test');
});

// externo
app.use('/invitado', async (req, res, next) => {
    if (req.session) {
        console.log('jwt: ' + req.session.jwt);
        let rol = getRol(req.session.jwt);
        if (rol !== 4) {
            return res.redirect('/home/login.html');
            //return res.status(401).json({error: 'Unauthorized ppp: ' + rol, status: 401});
        }
        if (rol === 4) {
            next();
        } else {
            return res.redirect('/home/login.html');
            res.status(401).send('Unauthorized pipipi');
        }
    } else
        return res.redirect('/home/login.html');
        //return res.status(401).json({error: 'Unauthorized cual', status: 401});
});

app.use('/invitado/home', async (req, res, next) => {
    let newCount = 0;
    newCount = await getnewCount(req.session.jwt);
    console.log('newCount: ' + newCount);
    if (newCount === 1) {
        //return res.status(200).json({message: 'primero debe llenar el formulario de invitacion', status: 200});
        return res.redirect('/invitado/invitacion.html');
    }

    let changeFirstPass = 0;
    changeFirstPass = getchangeFirstPass(req.session.jwt);
    console.log('changeFirstPass: ' + changeFirstPass);
    if (changeFirstPass === 0) {
        return res.status(200).json({message: 'tiene que cambiar la contraseña de su cuenta', status: 200});
    }

    next();

});

//app.get('/externo/logout', externo.logout);



app.get('/invitado/home/log-out', invitado.logout);
app.use('/invitado/home/mis-datos.html', express.static('./public/build2/views/Invitado/misDatos.html'));

app.use('/invitado/home/invitado.html', express.static('./public/build2/views/Invitado/invitado.html'));
app.use('/invitado/invitacion.html', express.static('./public/build2/views/Invitado/RegistrarInformacionPersonal.html'));
app.post('/invitado/registrarinformacion', invitado.setDataInvitado);
app.get('/invitado/obtenerInfoInvitado', invitado.getInvitadoByEmail);
app.get('/invitado/getemail',invitado.getUserEmail);
app.get('/invitado/catalogo/usuarioEmail/:email', invitado.getUsuarioByEmail);
app.get('/invitado/getFotoPerfil', invitado.getFotoInvitado);
app.put('/invitado/catalogo/usuarios/:id',invitado.updateInvitado);
app.get('/invitado/catalogo/colados/:id',invitado.getColadoByIdInvitado);

app.use('/invitado/cambiarContrasena.html', express.static('./public/build2/views/Invitado/cambiarContrasena.html'));
app.post('/invitado/cambiar', invitado.cambiarContrasena);


app.use('/invitado/home/pendientes.html', express.static('./public/build2/views/Invitado/NotificacionesInvitado.html'));
app.use('/invitado/home/agendadas.html', express.static('./public/build2/views/Invitado/agendadas.html'));

app.get('/invitado/home/reunionesNuevas', invitado.reunionesNuevas);
app.get('/invitado/home/reunionesConfirmadas', invitado.reunionesPendientes);
app.post('/invitado/recuperarQr', invitado.recuperarQr)






app.post('/invitado/home/aceptarReunionId', (req, res) => {
    const jsonToken = req.session.jwt;
    const idReunion = req.body.id_reunion;
    console.log('aceptarReunionId: ---> ', idReunion);

    let newToken = jwtFunctions.modifyJwtField(jsonToken, 'idSeleccionado', idReunion);
    req.session.jwt = newToken;
    console.log('newToken: ', newToken);
    res.status(200).json({ruta: 'aceptarReunion', status: 200});

});


//app.use('/invitado/home/aceptarReunion', express.static('./public/build2/views/Invitado/AceptarReunion.html'));
// validar que antes de entrar a /invitado/home/aceptarReunion exista un idSeleccionado en el jwt
app.use('/invitado/home/aceptarReunion', async (req, res) => {
    let idSeleccionado = 0;
    jwt.verify(req.session.jwt, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({error: 'Unauthorized', status: 401});
        } else {
            idSeleccionado = decoded.idSeleccionado;
        }
    });

    if (idSeleccionado === -1) {
        return res.status(401).json({error: 'Unauthorized', status: 401});
    } else {
        // express.static('./public/build2/views/Invitado/AceptarReunion.html')
        res.sendFile(path.join(__dirname, '../public/build2/views/Invitado/AceptarReunion.html'));
    }
});


app.post('/invitado/home/aceptarReunionData', invitado.aceptarReunion);



app.get('/invitado/home/obtenerDetallesReunion', invitado.obtenerDetallesReunion);



app.get('/invitado/test', (req, res) => {
  console.log('test');
  console.log(req.session);
  res.send('test');
});

//Invitado




app.use('/not-found', express.static('./public/build2/views/Sesiones/notFound.html'));






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
