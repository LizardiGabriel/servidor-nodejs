const { log } = require('console');

const { Prisma } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const jwt = require("jsonwebtoken");
require('dotenv').config();
const { hashPassword, comparePassword } = require('../tools/cipher');
const { generatePassword } = require('../tools/tools');
const { generateQR } = require('../tools/tools');
const { v4: uuidv4 } = require('uuid');
const mail = require("../tools/mail");
const jwtFunctions = require('../tools/jwtFunctions');

const { getInvitadoByIdBD, getInvitadoByIdEmailBD, setNewInvitadoBD, setNewColadoBD, getInvitacionByIdBD } = require('../tools/peticiones');
const { setNewInvitacionBD, getDetallesReunionByIdBD, getSalaByIdBD, getUsuarioByIdBD, getReunionesNuebasByIdBD } = require('../tools/peticiones');
const {getInvitadoByEmailBD,updateInvitadoBDtoInvitacion, updatePassInvitadoBD, getReunionesConRepeticionByIdOfInvitadoBD, getReunionesNuebasBD} = require('../tools/peticiones');
const { getInvitacionBy_IdInvitado_IdReunionBD } = require('../tools/peticiones');
const{putInfoInvitadoToReunionBD, createColadoBD,getReunionByIdBD} = require('../tools/peticiones');




async function logout(req, res) {
    console.log('mensaje --> logout');
    req.session.destroy();
    res.redirect('/');
}

function getemail(jsonToken){
    let email = "";
    jwt.verify(jsonToken, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return -1;
        } else {
            email= decoded.email;
        }
    });
    return email;
}

function getIdInvitado(jsonToken){
    let idInvitado = '';
    jwt.verify(jsonToken, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return -1;
        } else {
            idInvitado = decoded.idInvitado;
        }
    });
    return idInvitado;
}

function getidSeleccionado(jsonToken){
    let idSeleccionado = '';
    jwt.verify(jsonToken, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return -1;
        } else {
            idSeleccionado = decoded.idSeleccionado;
        }
    });
    return idSeleccionado;
}



function generateTokenInvitado(email, idInvitado, rolNum, newCount, changeFirstPass) {
    return jwt.sign({ email: email, idInvitado: idInvitado, rol: rolNum, newCount: newCount, changeFirstPass: changeFirstPass }, process.env.SECRET_KEY, { expiresIn: '60m' });
}



async function guardarImagenDesdeBase64(base64Data, nombreArchivo) {
    // Eliminar la cabecera de datos URL si existe (data:image/png;base64,)
    const base64Image = base64Data.split(';base64,').pop();

    // Especificar la ruta donde se guardará la imagen
    const filePath = path.join('public/build2/uploads',nombreArchivo);
    const path2  = path.join('uploads',nombreArchivo);
    // Decodificar la imagen y guardarla
    fs.writeFile(filePath, base64Image, {encoding: 'base64'}, (error) => {
        if (error) {
            console.error('Error al guardar la imagen:', error);
        } else {
            console.log('Imagen guardada correctamente:', filePath);
        }
    });
    return path2;
    
}

async function getInvitadoByEmail(req,res){
    const email = req.query.email;
    console.log('mensaje --> getInvitadoByemail');
    const invitado = await (getInvitadoByEmail(email));
    if (invitado !== null) {
        res.json((invitado));
    } else {
        res.json([]);
    }
}


async function obtenerExtensionDeBase64(cadenaBase64) {
    // Usar una expresión regular para encontrar el tipo MIME en la cadena Base64
    const resultado = cadenaBase64.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
    if (resultado && resultado.length > 1) {
        // Extraer el tipo MIME
        const tipoMime = resultado[1];
        // Convertir tipo MIME a una extensión de archivo
        switch (tipoMime) {
            case 'image/jpeg':
                return 'jpg';
            case 'image/png':
                return 'png';
            case 'image/gif':
                return 'gif';
            default:
                return ''; // Devuelve una cadena vacía si el tipo MIME no es reconocido
        }
    }
    return ''; // Devuelve una cadena vacía si no se encuentra el tipo MIME
}

function encodeImageToBase64(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                reject(err);
            } else {
                // Convertir los datos de la imagen a base64
                const base64Image = data.toString('base64');
                resolve(base64Image);
            }
        });
    });
}




async function Pruebaguardar( req, res)  {
    const data = {
        nombre: req.body.nombre,
        apellidoPat: req.body.apellidoPaterno,
        apellidoMa: req.body.apellidoMaterno,
        correo: req.body.correo,
        tel: req.body.telefono,
        empresa: req.body.empresa,
        foto: req.file ? req.file.filename : null
    };

    console.log(data);

    res.json({ message: 'Información del invitado registrada exitosamente', data });
};

async function setDataInvitado(req, res) {
    console.log('mensaje --> setNDataInvitado');
    const idInvitado = getIdInvitado(req.session.jwt);
    console.log('idInvitado:', idInvitado);


    const { nombre, apellidoPat, apellidoMa, tel, empresa, identificacion, foto} = req.body;
    const extensionfoto= await obtenerExtensionDeBase64(foto);
    console.log(extensionfoto);

    const rutafoto= await guardarImagenDesdeBase64(foto,"fotografia_invitado"+idInvitado+"."+extensionfoto);
    const invitado= await updateInvitadoBDtoInvitacion(idInvitado, nombre, apellidoPat, apellidoMa, tel,empresa,identificacion,rutafoto);

    // if todo bien -> 200
    //return res.redirect('/invitado/cambiarContrasena.html');
    const rutita = '/invitado/cambiarContrasena.html';
    let mensaje = '';
    if(invitado === 200){
        mensaje = 'Información del invitado registrada exitosamente';
    }else if(invitado === 500){
        mensaje = 'error al actualizar la información del invitado';
    }
    return res.json({ message: mensaje, status: invitado, ruta: rutita});

}


async function cambiarContrasena(req, res) {
    console.log('mensaje --> cambiarContrasena');
    const idInvitado = getIdInvitado(req.session.jwt);
    console.log('idInvitado:', idInvitado);

    const { password } = req.body;
    console.log('contrasena que el usuario va a cambiar:', password);
    const hashedPassword = await hashPassword(password);
    const invitado = await updatePassInvitadoBD(idInvitado, hashedPassword);
    // if todo bien -> 200
    //return res.redirect('/invitado/cambiarContrasena.html');
    const rutita = '/invitado/home/invitado.html';
    let mensaje = '';
    if(invitado === 200){
        mensaje = 'password actualizada correctamente';
    }else if(invitado === 500){
        mensaje = 'error al actualizar la contraseña';
    }


    const invitadoNuevo = await getInvitadoByIdBD(idInvitado);
    let newToken = jwtFunctions.modifyJwtField(req.session.jwt, 'newCount', invitadoNuevo.newCount);
    newToken = jwtFunctions.modifyJwtField(newToken, 'changeFirstPass', invitadoNuevo.changeFirstPass);
    req.session.jwt = newToken;
    console.log('newToken: ', newToken);

    
    return res.status(200).json({
        ruta: rutita,
        status: invitado,
        message: mensaje
    });

}

async function reunionesNuevas(req, res){
    console.log('mensaje --> reunionesPendientes');
    const idInvitado = getIdInvitado(req.session.jwt);
    console.log('idInvitado:', idInvitado);
    const reuniones = await getReunionesNuebasBD(idInvitado);
    if (reuniones !== null) {
        res.json((reuniones));
    } else {
        res.json([]);
    }
}

async function reunionesPendientes(req, res){
    console.log('mensaje --> reunionesPendientes');
    const idInvitado = getIdInvitado(req.session.jwt);
    console.log('idInvitado:', idInvitado);
    const reuniones = await getReunionesConRepeticionByIdOfInvitadoBD(idInvitado);
    if (reuniones !== null) {
        res.json((reuniones));
    } else {
        res.json([]);
    }
}

async function guardarQR(base64Data, idInvitacion) {
    const nombreArchivo = `qr_${uuidv4()}_${idInvitacion}.png`;
    const filePath = await guardarImagenDesdeBase64(base64Data, nombreArchivo);
    return filePath;
}

async function aceptarReunion(req, res){
    console.log('mensaje --> aceptarReunion');
    const idInvitado = getIdInvitado(req.session.jwt);
    const idReunion = getidSeleccionado(req.session.jwt);
    const invitacion = await getInvitacionBy_IdInvitado_IdReunionBD(idInvitado, idReunion);
    const idInvitacion = invitacion.id_invitacion;
    const colados = req.body.colados;
    const dispositivos = req.body.dispositivos;
    const automoviles = req.body.automoviles;

    const invitado= await getInvitadoByIdBD(idInvitado);
    const reunion= await getReunionByIdBD(idReunion);
    const anfitrion = await getUsuarioByIdBD(reunion.id_usuario);
    const sala = await getSalaByIdBD(reunion.id_sala);
    const detReunion=await getDetallesReunionByIdBD(idReunion);
    const repeticiones = detReunion.Repeticion;
    console.log("Info aqui");
    console.log(repeticiones);
    console.log(sala.nombre_sala);
    // añadirlo en un for
    for(const colado of colados){
        console.log('===---___>>>procesando el colado: ', colado);
        let invitado = await getInvitadoByEmailBD(colado);
        let wasRegistred = 1;
        let password = ""
        if (invitado === null) {
            wasRegistred = 0;
            password = await generatePassword();
            console.log('password generated successfully:', password);
            invitado = await setNewColadoBD(colado, password);
        }

        const id_invitado = invitado.id_invitado;
        const setInvitacion = await setNewInvitacionBD(idReunion, id_invitado, 0, 0);
        const reunion = await getDetallesReunionByIdBD(idReunion);

        const sala = await getSalaByIdBD(reunion.id_sala);
        const titulo = reunion.titulo_reunion;
        const descripcion = reunion.descripcion_reunion;
        const anfitrion = await getUsuarioByIdBD(reunion.id_usuario);
        const repeticiones = reunion.Repeticion;

        if(setInvitacion !== null){
            let emailText = "";
            if(wasRegistred){
                // si el cliente ya ha sido invitado a reuniones antes --> el email debe de decir que se le envio una nueva invitacion y revise su cuenta
                emailText =  colado + "se te ha enviado una nueva invitacion, inicia sesion para confirmar tu asistencia"
                    + "a la reunion: "+ titulo + " en la sala: " + sala.nombre_sala + " con el anfitrion: " + anfitrion.nombre_usuario + " " + anfitrion.apellido_paterno_usuario +
                    " con la descripcion: " + descripcion + " en la(s) fecha(s): " +
                    repeticiones.map((rep) => { return rep.fecha_repeticion + " de " + rep.hora_inicio_repeticion + " a " + rep.hora_fin_repeticion }).join(", ") +
                    " entra a la plataforma beemeet.com para conocer los detalles ";
            }else{
                emailText = "invitado@test.com, has sido invitado a una reunion " +
                    "en la sala: " + sala.nombre_sala + " con el anfitrion: " + anfitrion.nombre_usuario + " " + anfitrion.apellido_paterno_usuario +
                    " con la descripcion: " + descripcion + " en la(s) fecha(s): " +
                    repeticiones.map((rep) => { return rep.fecha_repeticion + " de " + rep.hora_inicio_repeticion + " a " + rep.hora_fin_repeticion }).join(", ") +
                    " entra a la plataforma beemeet.com para conocer los detalles " +
                    "tu usuario es: " + colado + " y tu contrasena temporal es: " + password;
            }

            // mandar el email, el email debe tener
            console.log('emailText: ', emailText);
            const envio = await mail(emailText, colado,'BeeCoders-Invitación a reunión');
            console.log('envio: ', envio);

            // tabla de colados
            const coladito = await createColadoBD(id_invitado, idInvitacion);
            console.log('coladito: ', coladito);



        }else{
            res.json({ message: 'error', status: 400});
        }

    }

    const imagenQR = await generateQR(idInvitacion);
    console.log('imagenQR: ', imagenQR);
    // guardar la imagen
    const rutaImagenQR = await guardarQR(imagenQR, idInvitacion);
    console.log('rutaImagenQR: ', rutaImagenQR);

    const actualizarInvitacionReunionBD = await putInfoInvitadoToReunionBD(idInvitacion, dispositivos, automoviles, rutaImagenQR);
    console.log('actualizarInvitacionReunionBD: ', actualizarInvitacionReunionBD);

    const invitacionbyid =await getInvitacionByIdBD(idInvitacion);
    const rutaQr=path.join('public/build2',invitacionbyid.qr_acceso);
    let imageContent = fs.readFileSync(rutaQr);
    let emailText = `<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BeeCoders - QR Reunión</title>
    <style type="text/css">
        body {
            background-color: #f9f8f8;
            display: flex;
            flex-direction: column;
            align-content: center;
            justify-content: center;
            align-items: center;
            font-size: 1.1rem;
            font-family: Arial, sans-serif;
        }

        .ContenidoCorreo {
            display: flex;
            flex-direction: column;
            align-content: center;
            justify-content: center;
            align-items: center;
            max-width: 80%;
            box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.33);
            border-radius: 10px;
            margin-top: 2rem;
            margin-bottom: 2rem;
        }

        .header .header_img {
            max-width: 100%;
            border-radius: 10px;
        }

        .footer .footer_img {
            max-width: 100%;
            border-radius: 10px;
        }

        .ContenidoCorreo .Correo {
            max-width: 80%;
            padding: 4rem;
        }

        .saludo,
        .correoDiv,
        .contraDiv,
        .enlaceSesion {
            margin-left: 2rem;
            display: flex;
            flex-direction: row;
            align-items: center;
        }

        .firma,
        .qrReunion {
            display: flex;
            align-content: center;
            justify-content: center;
            align-items: center;
        }

        .firma #BeeCoders {
            font-size: 1.3rem;
        }

        input {
            border: none;
            font-size: 1.1rem;
            overflow: hidden;
            color: #48716E;
            font-weight: bold;
        }

        .inputTabla {
            color: #333333;
            font-weight: 400;
            width: 100%;
            white-space: pre-wrap;
        }

        input .inputCorreo {
            min-width: 70%;
        }

        #enlace {
            width: 75%;
        }

        .imagen,
        .QR {
            width: 15rem;
        }

        h3,
        h2 {
            padding-right: 0.5rem;
        }

        .tg {
            border-collapse: collapse;
            border-spacing: 0;
            margin: 0px auto;
        }

        .tg-wrap {
            margin-bottom: 3rem;
            margin-top: 3rem;
        }

        .tg th,
        .tg td {
            border-color: #48716E;
            border-style: solid;
            border-width: 3px;
            font-size: 14px;
            font-weight: normal;
            overflow: hidden;
            padding: 10px 5px;
            word-break: normal;
        }

        .tg .tg-1,
        .tg .tg-2 {
            background-color: #dbf1ee;
            border-color: #48716e;
            color: #333333;
            text-align: left;
            vertical-align: middle
        }

        .tg .tg-2 {
            text-align: center;
        }

        #bold-font {
            font-weight: bold;
        }

        @media only screen and (max-width: 800px) {

            body,
            input {
                font-size: 0.8rem;
            }

            .ContenidoCorreo .Correo {
                max-width: 80%;
                padding: 2rem;
            }

            input {

                text-align: center;
            }

            #inicioSesion {
                padding-right: 0;
            }

            .saludo,
            .correoDiv,
            .contraDiv,
            .enlaceSesion {
                margin-left: 0rem;
                margin-bottom: 1.5rem;
                display: flex;
                flex-direction: column;
                align-items: center;
            }

            .firma #BeeCoders {
                font-size: 1rem;
            }

            .imagen,
            .QR {
                width: 10rem;
            }

            .tg th,
            .tg td {
                font-size: 10px;
            }
        }

        @media screen and (max-width: 767px) {
            .tg {
                width: auto !important;
            }

            .tg col {
                width: auto !important;
            }

            .tg-wrap {
                overflow-x: auto;
                -webkit-overflow-scrolling: touch;
                margin: auto 0px;
            }
        }

        @media screen and (max-width: 555px) {

            body,
            input {
                font-size: 0.6rem;
            }

            .ContenidoCorreo {
                max-width: 90%;
            }

            .ContenidoCorreo .Correo {
                max-width: 90%;
                padding: 0.8rem;
            }

            input {
                text-align: center;
            }

            #inicioSesion {
                padding-right: 0;
            }

            .saludo,
            .correoDiv,
            .contraDiv,
            .enlaceSesion {
                margin-left: 0rem;
                margin-bottom: 1rem;
                display: flex;
                flex-direction: column;
                align-items: center;
            }

            .firma #BeeCoders {
                font-size: 0.8rem;
            }

            .imagen {
                width: 6rem;
            }

            .tg th,
            .tg td {
                font-size: 8px;
            }
        }
    </style>
</head>

<body>
    <main class="ContenidoCorreo">
        <section class="header">
            <img class="header_img" src="https://i.imgur.com/gol0fCj.png">
        </section>

        <section class="Correo">
            <div class="Informacion">
                <div class="saludo">
                    <h3>Hola</h3>
                    <input type="text" id="nombreInvitado" class="inputNombre" value="${invitado.email_invitado} "
                        readonly disabled>
                </div>
                <p>Ya está confirmada tu asistencia a la siguiente reunión:</p>
            </div>
            <div class="Tabla tg-wrap">
                <table class="tg">
                    <thead>
                        <tr>
                            <th class="tg-2" colspan="7">
                                <h1 id="bold-font">Detalle de la Reunión</h1>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="tg-1" rowspan="5">
                                <img class="imagen" src="https://i.imgur.com/tTgwfr6.png[/img]">
                            </td>
                            <td class="tg-1" colspan="6">
                                <h3 id="bold-font">Anfitrión:</h3>
                                <input type="text" id="nombreAnfi" class="inputTabla" value="${anfitrion.nombre_usuario} ${anfitrion.apellido_paterno_usuario}"
                                    readonly disabled>
                            </td>
                        </tr>
                        <tr>
                            <td class="tg-1" colspan="3">
                                <h3 id="bold-font">Piso:</h3>
                                <input type="number" id="piso" class="inputTabla" value="${sala.piso_sala}" readonly disabled>
                            </td>
                            <td class="tg-1" colspan="3">
                                <h3 id="bold-font">Sala:</h3>
                                <input type="text" id="sala" class="inputTabla" value="${sala.nombre_sala}" readonly disabled>
                            </td>
                        </tr>
                        <tr>
                            <td class="tg-1" colspan="6">
                                <h3 id="bold-font">Fecha:</h3>
                                <input type="text" id="fecha" class="inputTabla" value="${repeticiones.map(rep => `${rep.fecha_repeticion}`).join(", ")}" readonly disabled>
                            </td>
                        </tr>
                        <tr>
                            <td class="tg-1" colspan="3">
                                <h3 id="bold-font">Hora de Inicio:</h3>
                                <input type="text" id="horaInicio" class="inputTabla" value="${repeticiones.map(rep => `${rep.hora_inicio_repeticion}`).join(", ")}" readonly
                                    disabled>
                            </td>
                            <td class="tg-1" colspan="3">
                                <h3 id="bold-font">Hora de Fin:</h3>
                                <input type="text" id="horaFin" class="inputTabla" value="${repeticiones.map(rep => `${rep.hora_fin_repeticion}`).join(", ")}" readonly
                                    disabled>
                            </td>
                        </tr>
                        <tr>
                            <td class="tg-2">
                                <h3 id="bold-font">Nombre de la reunión:</h3>
                                <input type="text" id="${reunion.titulo_reunion}" class="inputTabla"
                                    value="Daily Meeting equipo BeeCoders" readonly disabled>
                            </td>
                            <td class="tg-1" colspan="6">
                                <h3 id="bold-font">Descripción:</h3>
                                <input type="text" id="${reunion.descripcion_reunion}" class="inputTabla descripcion"
                                    value="Conocer los avances del desarrollo del proyecto “BeeMeet” por parte del equipo “BeeCoders”"
                                    readonly disabled>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="DatosCuenta">
                <p>No olvides que el día de la reunión deberás presentar el siguiente QR que contiene toda la
                    información que registraste de tus datos personales, es importante que lo muestres para poder
                    accesar al edificio:
                </p>
                <div class="qrReunion">
                    <img src="cid:imagen1" alt="Foto qr">
                </div>
                <p>En caso de que pierdas este QR, siempre podrás recuperarlo a través de la cuenta que creaste. </p>
            </div>
            <div class="firma">
                <h3>ATTE:</h3>
                <p id="BeeCoders"> BeeCoders &#128029;</p>
            </div>
        </section>

        <section class="footer">
            <img class="footer_img" src="https://i.imgur.com/MyTjwOi.png">
        </section>

    </main>

</body>

</html>
        `;

    const envio = await mail(emailText, invitado.email_invitado,'BeeCoders-QR ACCESO',imageContent);
    console.log('envio: ', envio);
    
    

    res.status(200).json({ message: 'succesful', status: 200});



}

async function obtenerDetallesReunion(req, res){
    console.log('mensaje --> aceptarReunion');
    const idInvitado = getIdInvitado(req.session.jwt);
    const idReunion = getidSeleccionado(req.session.jwt);

    console.log('idInvitado:', idInvitado);
    console.log('idReunion:', idReunion);

    const reunion = await getReunionesNuebasByIdBD(idInvitado, idReunion);
    if (reunion !== null) {
        res.json((reunion));
    } else {
        res.json([]);
    }
}


async function recuperarQr(req,res){
    const {id_invitacion,id_reunion}=req.body;
    const reunion= await getDetallesReunionByIdBD(id_reunion);
    const invitacion= await getInvitacionByIdBD(id_invitacion);
    const correoInv= getemail(req.session.jwt);
    const rutaQr=path.join('public/build2',invitacion.qr_acceso);
    const invitado= await getInvitadoByEmailBD(correoInv);
    let imageContent = fs.readFileSync(rutaQr);
    let emailText = `<html lang="en">


<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BeeCoders - Recuperar QR</title>
    <style type="text/css">
        body {
            background-color: #f9f8f8;
            display: flex;
            flex-direction: column;
            align-content: center;
            justify-content: center;
            align-items: center;
            font-size: 1.1rem;
            font-family: Arial, sans-serif;
        }

        .ContenidoCorreo {
            display: flex;
            flex-direction: column;
            align-content: center;
            justify-content: center;
            align-items: center;
            max-width: 80%;
            box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.33);
            border-radius: 10px;
            margin-top: 2rem;
            margin-bottom: 2rem;
        }

        .header .header_img {
            max-width: 100%;
            border-radius: 10px;
        }

        .footer .footer_img {
            max-width: 100%;
            border-radius: 10px;
        }

        .ContenidoCorreo .Correo {
            max-width: 80%;
            padding: 4rem;
        }

        .saludo,
        .correoDiv,
        .contraDiv,
        .enlaceSesion {
            margin-left: 2rem;
            display: flex;
            flex-direction: row;
            align-items: center;
        }

        .firma,
        .qrReunion {
            display: flex;
            align-content: center;
            justify-content: center;
            align-items: center;
        }

        .firma #BeeCoders {
            font-size: 1.3rem;
        }

        input {
            border: none;
            font-size: 1.1rem;
            overflow: hidden;
            color: #48716E;
            font-weight: bold;
        }

        .inputTabla {
            color: #333333;
            font-weight: 400;
            width: 100%;
            white-space: pre-wrap;
        }

        input .inputCorreo {
            min-width: 70%;
        }

        #enlace {
            width: 75%;
        }

        .imagen,
        .QR {
            width: 15rem;
        }

        h3,
        h2 {
            padding-right: 0.5rem;
        }

        .tg {
            border-collapse: collapse;
            border-spacing: 0;
            margin: 0px auto;
        }

        .tg-wrap {
            margin-bottom: 3rem;
            margin-top: 3rem;
        }

        .tg th,
        .tg td {
            border-color: #48716E;
            border-style: solid;
            border-width: 3px;
            font-size: 14px;
            font-weight: normal;
            overflow: hidden;
            padding: 10px 5px;
            word-break: normal;
        }

        .tg .tg-1,
        .tg .tg-2 {
            background-color: #dbf1ee;
            border-color: #48716e;
            color: #333333;
            text-align: left;
            vertical-align: middle
        }

        .tg .tg-2 {
            text-align: center;
        }

        #bold-font {
            font-weight: bold;
        }

        @media only screen and (max-width: 800px) {

            body,
            input {
                font-size: 0.8rem;
            }

            .ContenidoCorreo .Correo {
                max-width: 80%;
                padding: 2rem;
            }

            input {

                text-align: center;
            }

            #inicioSesion {
                padding-right: 0;
            }

            .saludo,
            .correoDiv,
            .contraDiv,
            .enlaceSesion {
                margin-left: 0rem;
                margin-bottom: 1.5rem;
                display: flex;
                flex-direction: column;
                align-items: center;
            }

            .firma #BeeCoders {
                font-size: 1rem;
            }

            .imagen,
            .QR {
                width: 10rem;
            }

            .tg th,
            .tg td {
                font-size: 10px;
            }
        }

        @media screen and (max-width: 767px) {
            .tg {
                width: auto !important;
            }

            .tg col {
                width: auto !important;
            }

            .tg-wrap {
                overflow-x: auto;
                -webkit-overflow-scrolling: touch;
                margin: auto 0px;
            }
        }

        @media screen and (max-width: 555px) {

            body,
            input {
                font-size: 0.6rem;
            }

            .ContenidoCorreo {
                max-width: 90%;
            }

            .ContenidoCorreo .Correo {
                max-width: 90%;
                padding: 0.8rem;
            }

            input {
                text-align: center;
            }

            #inicioSesion {
                padding-right: 0;
            }

            .saludo,
            .correoDiv,
            .contraDiv,
            .enlaceSesion {
                margin-left: 0rem;
                margin-bottom: 1rem;
                display: flex;
                flex-direction: column;
                align-items: center;
            }

            .firma #BeeCoders {
                font-size: 0.8rem;
            }

            .imagen {
                width: 6rem;
            }

            .tg th,
            .tg td {
                font-size: 8px;
            }
        }
    </style>
</head>

<body>
    <main class="ContenidoCorreo">
        <section class="header">
            <img class="header_img" src="https://i.imgur.com/gol0fCj.png">
        </section>

        <section class="Correo">
            <div class="Informacion">
                <div class="saludo">
                    <h3>Hola</h3>
                    <input type="text" id="nombreInvitado" class="inputNombre" value="${invitado.nombre_invitado} ${invitado.apellido_paterno_invitado}"
                        readonly disabled>
                </div>
                <p>Solicitaste la recuperación de QR para la siguiente reunión: <b>${reunion.titulo_reunion}</b></p>
            </div>
            <div class="DatosCuenta">
                <p>No olvides que el día de la reunión deberás presentar el siguiente QR que contiene toda la
                    información que registraste de tus datos personales, es importante que lo muestres para poder
                    accesar al edificio:
                </p>
                <div class="qrReunion">
                    <img src="cid:imagen1" alt="Foto qr">
                </div>
            </div>
            <div class="firma">
                <h3>ATTE:</h3>
                <p id="BeeCoders"> BeeCoders &#128029;</p>
            </div>
        </section>

        <section class="footer">
            <img class="footer_img" src="https://i.imgur.com/MyTjwOi.png">
        </section>

    </main>

</body>

</html>
    `;
    const envio = await mail(emailText, correoInv,'BeeCoders-Recuperacion del QR',imageContent);
    console.log('envio: ', envio);
    res.status(200).json({ message: 'succesful', status: 200});
}












module.exports = {
    logout,
    setDataInvitado,
    Pruebaguardar,
    cambiarContrasena,
    reunionesNuevas,
    reunionesPendientes,
    getInvitadoByEmail,
    aceptarReunion,
    obtenerDetallesReunion,
    guardarQR,
    aceptarReunion,
    recuperarQr
    
};



