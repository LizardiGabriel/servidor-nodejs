const { ok } = require('assert');
const path = require('path');


const { getReunionesBD,
    getReunionesConRepeticionByIdOfUserBD,
    getSalasBD, setNewReunionBD,
    getInvitadoByEmailBD, getInvitadoByIdBD,setNewInvitadoBD, setNewInvitacionBD,
    getReunionByIdBD, getSalaByIdBD, getUsuarioByIdBD, getDetallesReunionByIdBD, getUsuarioByEmailBD,
    updateHoraReunionBD, deleteInvitadoBD, getInvitacionBy_IdInvitado_IdReunionBD, updateDateRepBD,
    getInvitacionesByIdReunionBD,deleteReunionBD
} = require('../tools/peticiones');

const { getReunionAdminByIdBD, getReunionAnfitrionByIdBD, obtenerDetallesInvitacionAnfiBD } = require('../tools/petiAdmin');

const jwt = require("jsonwebtoken");

const mail = require('../tools/mail');

const { beforeEach } = require("node:test");
require('dotenv').config();


async function logout(req, res) {
    console.log('mensaje --> logout');
    req.session.destroy();
    res.redirect('/');
}

function verifyTokenAndGetUserId(jsonToken) {
    return new Promise((resolve, reject) => {
        jwt.verify(jsonToken, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                console.log(' <<<<<<< ºººººº |||||||    >>>>>>>>>><  error en el token');
                reject(-1);
            } else {
                const userId = decoded.idUsuario;
                console.log(' <<<<<<< ºººººº |||||||    >>>>>>>>>><  idUsuario: ', userId);
                resolve(userId);
            }
        });
    });
}

function getemail(jsonToken) {
    let email = "";
    jwt.verify(jsonToken, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return -1;
        } else {
            email = decoded.email;
        }
    });
    return email;
}

async function getUserEmail(req, res) {
    console.log('=============================mensaje -->Se intento obtener del correo');
    if (req.session) {
        res.json({ email: getemail(req.session.jwt) });
    }
    else {
        res.status(403).send('No autorizado');
    }
}

async function getReunionesAnfitrion(req, res) {
    console.log('mensaje --> getReunionesAll');
    //console.log(req.session);
    const jsonToken = req.session.jwt;
    let id_usuario = 0;
    try {
        id_usuario = await verifyTokenAndGetUserId(jsonToken);
        console.log('id_usuarioo ---------: ', id_usuario);
    } catch (error) {
        console.log('Error al verificar el token: ', error);
    }

    const reuniones = await getReunionesConRepeticionByIdOfUserBD(id_usuario);
    if (reuniones !== null) {
        res.json((reuniones));
    } else {
        res.json([]);
    }
}

async function getSalasAnfitrion(req, res) {
    console.log('>>>>>>>>>>>>>>>>>>>>> d bsuvbhuwd   mensaje --> getSalasAnfitrion');
    //console.log(req.session);
    const salas = await getSalasBD();
    if (salas !== null) {
        res.json((salas));
    } else {
        res.json([]);
    }
}

async function setNewReunion(req, res) {
    const jsonToken = req.session.jwt;
    let userId = 0;
    try {
        userId = await verifyTokenAndGetUserId(jsonToken);
    } catch (error) {
        console.log('Error al verificar el token: ', error);
    }
    console.log('mensaje --> setNewReunion');
    console.log(req.body);
    const { titulo_reunion, descripcion_reunion, fecha_reunion, hora_inicio_reunion,
        hora_fin_reunion, isRepetible, nombreSala, fechasRepetir } = req.body;

    const crearReunion = await setNewReunionBD(titulo_reunion, descripcion_reunion, fecha_reunion, hora_inicio_reunion,
        hora_fin_reunion, isRepetible, nombreSala, fechasRepetir, userId);

    res.json({ respuesta: crearReunion });

}



async function generatePassword() {
    // generar un password de 8 digitos entre letras Mayus y numeros
    let password = "";
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < 8; i++) {
        password += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return password;

}

async function setInvitacion(req, res) {
    console.log('mensaje --> setInvitacion');
    const { idReunion, correoInv, acompanantesInv } = req.body;

    //console.log('idAnfitrion: ', req.session.userId, 'idReunion: ', idReunion, 'correoInv: ', correoInv, 'numAcomp: ', acompanantesInv);

    let invitado = await getInvitadoByEmailBD(correoInv);
    let wasRegistred = 1;
    let password = ""
    if (invitado === null) {
        wasRegistred = 0;
        password = await generatePassword();
        invitado = await setNewInvitadoBD(correoInv, password);
    }

    const id_invitado = invitado.id_invitado;

    // antes de enviar la invitacion, checar que el invitado no haya sido regsitrado a la misma reunion
    // si ya ha sido registrado, no enviar la invitacion
    const invitacion = await getInvitacionBy_IdInvitado_IdReunionBD(id_invitado, idReunion)

    console.log('invitacion ya antes?: ', invitacion);

    if (invitacion !== null) {
        res.json({ message: 'error', status: 400 });
        return;
    }



    const setInvitacion = await setNewInvitacionBD(idReunion, id_invitado, acompanantesInv, 1);
    const reunion = await getDetallesReunionByIdBD(idReunion);


    const sala = await getSalaByIdBD(reunion.id_sala);
    const titulo = reunion.titulo_reunion;
    const descripcion = reunion.descripcion_reunion;
    const anfitrion = await getUsuarioByIdBD(reunion.id_usuario);
    const repeticiones = reunion.Repeticion;


    console.log('reunion: ', JSON.stringify(reunion, null, 2));


    if (setInvitacion !== null) {

        let emailText = "";
        if (wasRegistred) {
            // si el cliente ya ha sido invitado a reuniones antes --> el email debe de decir que se le envio una nueva invitacion y revise su cuenta
            emailText = `
                    <html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BeeMeet - Invitación a Reunión</title>
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

        table {
            min-width: 100%;
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

        .firma {
            display: flex;
            align-content: center;
            justify-content: center;
            align-items: center;
        }

        .firma #BeeCoders {
            font-size: 1.3rem;
        }

        input {
            background: #f9f8f8;
            border: none;
            font-size: 1.1rem;
            overflow: hidden;
            color: #48716E;
            font-weight: bold;
        }

        .inputTabla {
            background: #dbf1ee;
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

        .imagen {
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

            .imagen {
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
    </style>
</head>

<body>
    <main class="ContenidoCorreo">
        <section class="header">
            <img class="header_img" src="https://i.imgur.com/wlg9PC4.png">
        </section>

        <section class="Correo">
            <div class="Informacion">
                <div class="saludo">
                    <h3>Hola</h3>
                    <input type="text" id="correoInvitado" class="inputCorreo" value="${correoInv}" readonly disabled>
                </div>
                <p>El motivo por el cuál has recibido este correo electrónico es porque has sido invitado a la siguiente
                    reunión:</p>
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
                            <td class="tg-1" colspan="2">
                                <h3 id="bold-font">Nombre de la reunión:</h3>
                                <input type="text" id=nombreReu"" class="inputTabla"
                                    value="${reunion.titulo_reunion}" readonly disabled>
                            </td>
                            <td class="tg-1" colspan="4">
                                <h3 id="bold-font">Descripción:</h3>
                                <input type="text" id="descripcion" class="inputTabla descripcion"
                                    value="${reunion.descripcion_reunion}" readonly disabled>
                            </td>
                        </tr>
                        <tr>
                            <td class="tg-1" colspan="2" rowspan="4">
                                <img class="imagen" src="https://i.imgur.com/tTgwfr6.png[/img]">
                            </td>
                            <td class="tg-1" colspan="4">
                                <h3 id="bold-font">Anfitrión:</h3>
                                <input type="text" id="nombreAnfi" class="inputTabla"
                                    value="${anfitrion.nombre_usuario} ${anfitrion.apellido_paterno_usuario}" readonly
                                    disabled>
                            </td>
                        </tr>
                        <tr>
                            <td class="tg-1" colspan="2">
                                <h3 id="bold-font">Piso:</h3>
                                <input type="number" id="piso" class="inputTabla" value="${sala.piso_sala}" readonly
                                    disabled>
                            </td>
                            <td class="tg-1" colspan="2">
                                <h3 id="bold-font">Sala:</h3>
                                <input type="text" id="sala" class="inputTabla" value="${sala.nombre_sala}" readonly
                                    disabled>
                            </td>
                        </tr>
                        <tr>
                            <td class="tg-1" colspan="4">
                                <h3 id="bold-font">Fecha:</h3>
                                <input type="text" id="fecha" class="inputTabla"
                                    value="${repeticiones.map(rep => `${rep.fecha_repeticion}`).join(", ")}" readonly
                                    disabled>
                            </td>
                        </tr>
                        <tr>
                            <td class="tg-1" colspan="2">
                                <h3 id="bold-font">Hora de Inicio:</h3>
                                <input type="text" id="horaInicio" class="inputTabla"
                                    value="${repeticiones.map(rep => `${rep.hora_inicio_repeticion}`).join(" , ")}"
                                    readonly disabled>
                            </td>
                            <td class="tg-1" colspan="2">
                                <h3 id="bold-font">Hora de Fin:</h3>
                                <input type="text" id="horaFin" class="inputTabla"
                                    value="${repeticiones.map(rep => `${rep.hora_fin_repeticion}`).join(" , ")}" readonly
                                    disabled>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="DatosCuenta">
                <p>Para poder aceptar esta invitación debes seguir los siguientes pasos:</p>
		    <ul>
			<li>Inicia sesión con la cuenta que con anterioridad creaste. </li>
			<li>Una vez iniciada tu sesión, dirígete desde el menú lateral al apartado de >>Reuniones pendientes<<,
                        desde ahí podrás visualizar una tarjeta con los datos de esta reunión.</li>
                	<li>Acepta o elimina la invitación. Si decides aceptar la invitación, recuerda que será necesario que completes el registro de los acompañantes, dispositivos o automóviles que llevarás a esta nueva reunión. </li>
		    </ul>
            </div>
            <div class="firma">
                <h3>ATTE:</h3>
                <p id="BeeCoders"> BeeCoders &#128029;</p>
            </div>
        </section>

        <section class="footer"><img class="footer_img" src="https://i.imgur.com/MyTjwOi.png" alt="footer">

        </section>

    </main>

</body>

</html>
    `;

        } else {
            emailText = `<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BeeMeet - Invitación a Reunión</title>
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

        table {
            min-width: 100%;
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

        .firma {
            display: flex;
            align-content: center;
            justify-content: center;
            align-items: center;
        }

        .firma #BeeCoders {
            font-size: 1.3rem;
        }

        input {
            background: #f9f8f8;
            border: none;
            font-size: 1.1rem;
            overflow: hidden;
            color: #48716E;
            font-weight: bold;
        }

        .inputTabla {
            background: #dbf1ee;
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

        .imagen {
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

            .imagen {
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
    </style>
</head>

<body>
    <main class="ContenidoCorreo">
        <section class="header">
            <img class="header_img" src="https://i.imgur.com/wlg9PC4.png">
        </section>

        <section class="Correo">
            <div class="Informacion">
                <div class="saludo">
                    <h3>Hola</h3>
                    <input type="text" id="correoInvitado" class="inputCorreo" value="${correoInv}" readonly disabled>
                </div>
                <p>El motivo por el cuál has recibido este correo electrónico es porque has sido invitado a la siguiente
                    reunión:</p>
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
                            <td class="tg-1" colspan="2">
                                <h3 id="bold-font">Nombre de la reunión:</h3>
                                <input type="text" id=nombreReu"" class="inputTabla"
                                    value="${reunion.titulo_reunion}" readonly disabled>
                            </td>
                            <td class="tg-1" colspan="4">
                                <h3 id="bold-font">Descripción:</h3>
                                <input type="text" id="descripcion" class="inputTabla descripcion"
                                    value="${reunion.descripcion_reunion}" readonly disabled>
                            </td>
                        </tr>
                        <tr>
                            <td class="tg-1" colspan="2" rowspan="4">
                                <img class="imagen" src="https://i.imgur.com/tTgwfr6.png[/img]">
                            </td>
                            <td class="tg-1" colspan="4">
                                <h3 id="bold-font">Anfitrión:</h3>
                                <input type="text" id="nombreAnfi" class="inputTabla"
                                    value="${anfitrion.nombre_usuario} ${anfitrion.apellido_paterno_usuario}" readonly
                                    disabled>
                            </td>
                        </tr>
                        <tr>
                            <td class="tg-1" colspan="2">
                                <h3 id="bold-font">Piso:</h3>
                                <input type="number" id="piso" class="inputTabla" value="${sala.piso_sala}" readonly
                                    disabled>
                            </td>
                            <td class="tg-1" colspan="2">
                                <h3 id="bold-font">Sala:</h3>
                                <input type="text" id="sala" class="inputTabla" value="${sala.nombre_sala}" readonly
                                    disabled>
                            </td>
                        </tr>
                        <tr>
                            <td class="tg-1" colspan="4">
                                <h3 id="bold-font">Fecha:</h3>
                                <input type="text" id="fecha" class="inputTabla"
                                    value="${repeticiones.map(rep => `${rep.fecha_repeticion}`).join(" , ")}" readonly
                                    disabled>
                            </td>
                        </tr>
                        <tr>
                            <td class="tg-1" colspan="2">
                                <h3 id="bold-font">Hora de Inicio:</h3>
                                <input type="text" id="horaInicio" class="inputTabla"
                                    value="${repeticiones.map(rep => `${rep.hora_inicio_repeticion}`).join(" , ")}"
                                    readonly disabled>
                            </td>
                            <td class="tg-1" colspan="2">
                                <h3 id="bold-font">Hora de Fin:</h3>
                                <input type="text" id="horaFin" class="inputTabla"
                                    value="${repeticiones.map(rep => `${rep.hora_fin_repeticion}`).join(" , ")}" readonly
                                    disabled>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="DatosCuenta">
                <p>Para poder aceptar esta invitación es necesario que tengas una cuenta en BeeMeet. Para que puedas ingresar te proporcionaremos los datos de la cuenta que se te creó con una contraseña provisional, estos datos te permitirán ingresar para configurar tu perfil.</p>
		<p>Los datos para tu inicio de sesión son los siguientes:</p>
                <div class="correoDiv">
                    <h3 id="bold-font">Correo Usuario:</h3>
                    <input type="text" class="usuario inputCorreo" id="usuario" value="${correoInv}" readonly disabled>
                </div>
                <div class="contraDiv">
                    <h3 id="bold-font">Contraseña:</h3>
                    <input type="text" class="contra inputCorreo" id="contra" value="${password}" readonly disabled>
                </div>
                <p>Después de iniciar sesión, es necesario que llenes el formulario de datos personales y posteriormente
                    cambies
                    tu contraseña para que el registro de tu cuenta se complete exitosamente.</p>
                <p>Una vez completo tu registro debes ir desde el menú lateral al apartado de >>Reuniones pendientes<<,
                        desde ahí podrás aceptar o eliminar la invitación a la reunión a la que fuiste invitado por
                        medio de este correo.</p>
            </div>
            <div class="firma">
                <h3>ATTE:</h3>
                <p id="BeeCoders"> BeeCoders &#128029;</p>
            </div>
        </section>

        <section class="footer"><img class="footer_img" src="https://i.imgur.com/MyTjwOi.png" alt="footer">

        </section>

    </main>

</body>

</html>

            `;
        }

        // mandar el email, el email debe tener
        console.log('emailText: ', emailText);
        const envio = await mail(emailText, correoInv, 'BeeCoders-Invitación a reunión');
        console.log('envio: ', envio);
        res.json({ message: 'succesful', status: 200 });

    }
    else {
        res.json({ message: 'error', status: 400 });
    }

}


async function getReunionById(req, res) {
    console.log('mensaje --> getReunionById');
    const { idReunion } = req.params;
    const reunion = await getReunionAnfitrionByIdBD(idReunion);
    if (reunion !== null) {
        res.json(reunion);
    } else {
        res.json([]);
    }
}

async function getInvitadoByEmail(req, res) {
    const email = req.query.email;
    console.log('mensaje --> getInvitadoByemail');
    const invitado = await (getInvitadoByEmailBD(email));
    if (invitado !== null) {
        res.json((invitado));
    } else {
        res.json([]);
    }
}

async function getUsuarioByEmail(req, res) {
    console.log('========================= get Usuario By email: ', req.params);
    const { email } = req.params;
    const usuario = await getUsuarioByEmailBD(email.replace(/^:/, ''));
    res.json(usuario);
}

async function updateUsuario(req, res) {
    const { id } = req.params;
    const { email, nombre, apellidoPaterno, apellidoMaterno, telefono, id_rol, fotoUsuario } = req.body;
    console.log(req.body);
    console.log('id: ', id, 'email: ', email, 'nombre: ', nombre, 'apellidoPaterno: ', apellidoPaterno);
    const id_final = id.replace(/^:/, '');

    if (fotoUsuario && esCadenaBase64Valida(fotoUsuario)) {
        const extensionfoto = await obtenerExtensionDeBase64(fotoUsuario);
        const rutafoto = await guardarImagenDesdeBase64(fotoUsuario, "fotografia_usuario" + id_final + "." + extensionfoto);
        console.log(rutafoto);
        const usuarioActualizado = await updateUsuarioBD(id_final, email, nombre, apellidoPaterno, apellidoMaterno, telefono, id_rol, rutafoto);
        console.log('usuarioActualizado: ', usuarioActualizado);
        res.status(200).json({ message: 'Usuario actualizado correctamente' });
    } else if (fotoUsuario) {
        console.error('Cadena base64 inválida para fotoUsuario.');
        const usuarioActualizadoNoFoto = await updateUsuarioBD(id_final, email, nombre, apellidoPaterno, apellidoMaterno, telefono, id_rol, '');
        res.status(201).json({ message: 'Usuario actualizado pero fotoUsuario inválido o ausente' });

    } else {
        console.error('fotoUsuario está undefined o es inválido.');
        const usuarioActualizadoNoFoto = await updateUsuarioBD(id_final, email, nombre, apellidoPaterno, apellidoMaterno, telefono, id_rol, '');
        res.status(201).json({ message: 'Usuario actualizado pero fotoUsuario inválido o ausente' });
    }
}

async function updateHoraReunion(req, res) {
    const { id_reunion, hora_fin_repeticion } = req.body;
    const repeActualizada = await updateHoraReunionBD(id_reunion, hora_fin_repeticion);
    console.log(repeActualizada);
    res.status(200).json({ message: 'Reunion actualizado correctamente' });
}

async function deleteInvitado(req, res) {
    const { id_invitado } = req.body;
    const invitadoDel = await deleteInvitadoBD(id_invitado);
    console.log(invitadoDel);
    res.status(200).json({ message: 'Invitado eliminado correctamente' });
}

// getInfo_idInv_idReu
async function getInfo_idInv_idReu(req, res) {
    const { idReunion, idInvitado } = req.body;
    console.log('mensaje --> getInfo_idInv_idReu');
    console.log('ZZZZZZZZZ >>> id_reunion: ', idReunion, 'id_invitado: ', idInvitado);
    const invitacion = await obtenerDetallesInvitacionAnfiBD(idReunion, idInvitado);

    res.status(200).json(invitacion);
}

async function reagendarReunion(req, res) {
    const { idReunion, idRep, fecha_reunion } = req.body;
    const repeticionAct = await updateDateRepBD(idRep, fecha_reunion);
    console.log(repeticionAct);
    res.status(200).json({ message: 'Reunion reagendada correctamente' });
}

async function cancelarReunion(req,res){
    const{id_reunion}=req.body;
    console.log('========================= Cancelar reunion: ', id_reunion);
    const reunion= await getReunionByIdBD(id_reunion);
    console.log(reunion);
    const detreunion = await getDetallesReunionByIdBD(id_reunion);
    const sala = await getSalaByIdBD(reunion.id_sala);
    const anfitrion = await getUsuarioByIdBD(reunion.id_usuario);
    const repeticiones = detreunion.Repeticion;
    const invitaciones= await getInvitacionesByIdReunionBD(id_reunion);
    if(invitaciones!== null){
        for(const invitacion of invitaciones){
            const invitado= await getInvitadoByIdBD(invitacion.id_invitado);
            console.log(invitado);
            let emailText = `<html lang="en">
    
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>BeeMeet - Invitación a Reunión</title>
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
            
                    table {
                        min-width: 100%;
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
            
                    .firma {
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
            
                    .imagen {
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
            
                        .imagen {
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
                </style>
            </head>
            
            <body>
                <main class="ContenidoCorreo">
                    <section class="header">
                        <img class="header_img" src="https://i.imgur.com/FR9OWbH.png">
                    </section>
            
                    <section class="Correo">
                        <div class="Informacion">
                            <div class="saludo">
                                <h3>Hola</h3>
                                <input type="text" id="correoInvitado" class="inputCorreo" value="${invitado.email_invitado}" readonly disabled>
                            </div>
                            <p>El motivo por el cuál has recibido este correo electrónico es porque la reunión a la que habías sido 
                            invitado fue cancelada, te dejamos los datos de la reunión cancelada para que lo tengas en cuenta</p>
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
                                        <td class="tg-1" colspan="2">
                                            <h3 id="bold-font">Nombre de la reunión:</h3>
                                            <input type="text" id=nombreReu"" class="inputTabla"
                                                value="${reunion.titulo_reunion}" readonly disabled>
                                        </td>
                                        <td class="tg-1" colspan="4">
                                            <h3 id="bold-font">Descripción:</h3>
                                            <input type="text" id="descripcion" class="inputTabla descripcion"
                                                value="${reunion.descripcion_reunion}" readonly disabled>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="tg-1" colspan="2" rowspan="4">
                                            <img class="imagen" src="https://i.imgur.com/tTgwfr6.png[/img]">
                                        </td>
                                        <td class="tg-1" colspan="4">
                                            <h3 id="bold-font">Anfitrión:</h3>
                                            <input type="text" id="nombreAnfi" class="inputTabla"
                                                value="${anfitrion.nombre_usuario} ${anfitrion.apellido_paterno_usuario}" readonly
                                                disabled>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="tg-1" colspan="2">
                                            <h3 id="bold-font">Piso:</h3>
                                            <input type="number" id="piso" class="inputTabla" value="${sala.piso_sala}" readonly
                                                disabled>
                                        </td>
                                        <td class="tg-1" colspan="2">
                                            <h3 id="bold-font">Sala:</h3>
                                            <input type="text" id="sala" class="inputTabla" value="${sala.nombre_sala}" readonly
                                                disabled>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="tg-1" colspan="4">
                                            <h3 id="bold-font">Fecha:</h3>
                                            <input type="text" id="fecha" class="inputTabla"
                                                value="${repeticiones.map(rep => `${rep.fecha_repeticion}`).join("<br>")}" readonly
                                                disabled>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="tg-1" colspan="2">
                                            <h3 id="bold-font">Hora de Inicio:</h3>
                                            <input type="text" id="horaInicio" class="inputTabla"
                                                value="${repeticiones.map(rep => `${rep.hora_inicio_repeticion}`).join(" , ")}"
                                                readonly disabled>
                                        </td>
                                        <td class="tg-1" colspan="2">
                                            <h3 id="bold-font">Hora de Fin:</h3>
                                            <input type="text" id="horaFin" class="inputTabla"
                                                value="${repeticiones.map(rep => `${rep.hora_fin_repeticion}`).join(" , ")}" readonly
                                                disabled>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="firma">
                            <h3>ATTE:</h3>
                            <p id="BeeCoders"> BeeCoders &#128029;</p>
                        </div>
                    </section>
            
                    <section class="footer"><img class="footer_img" src="https://i.imgur.com/MyTjwOi.png" alt="footer">
            
                    </section>
            
                </main>
            
            </body>
            
            </html>
            `;
            const envio = await mail(emailText,invitado.email_invitado,'BeeCoders-Cancelación reunion');
        }
    }
    try {
        await deleteReunionBD(id_reunion);
        res.status(200).json({ message: 'Reunion eliminada correctamente' });
    } catch (error) {
        console.log(error);
        res.json({ message: 'error', status: 400 });
    }
}

module.exports = {
    logout,
    getReunionesAnfitrion,
    getSalasAnfitrion,
    setNewReunion,
    setInvitacion,
    getReunionById,
    getInvitadoByEmail,
    getUserEmail,
    getUsuarioByEmail,
    updateUsuario,
    updateHoraReunion,
    deleteInvitado,
    getInfo_idInv_idReu,
    reagendarReunion,
    cancelarReunion
};