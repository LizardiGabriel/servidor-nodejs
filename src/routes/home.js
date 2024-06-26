const {getUsersByEmailBD, createUserBD, updateUserBD, getInvitadoByIdBD, getInvitadoByIdEmailBD,getInvitadoByEmailBD,updatePassInvitadoBD} = require('../tools/peticiones');
const { hashPassword, comparePassword } = require('../tools/cipher');
const { json } = require('body-parser');
const { stat } = require('fs');
const jwt = require('jsonwebtoken');
const { token } = require('morgan');
require('dotenv').config();
const mail = require("../tools/mail");

function generateAccessToken(email, idUsuario, rolNum, nombre, apellido, foto) {
    return jwt.sign({ email: email, idUsuario: idUsuario, rol: rolNum, nombre: nombre, apellido: apellido, foto: foto }, process.env.SECRET_KEY, { expiresIn: '20m' });
}

function generateTokenInvitado(email, idInvitado, rolNum, newCount, changeFirstPass, idSeleccionado) {
    return jwt.sign({ email: email, idInvitado: idInvitado, rol: rolNum, newCount: newCount, changeFirstPass: changeFirstPass, idSeleccionado: -1 }, process.env.SECRET_KEY, { expiresIn: '60m' });
}
function generateTokenToRecover(email, id,tipo) {
    return jwt.sign({ email: email,  tipo: tipo ,id: id}, process.env.SECRET_KEY, { expiresIn: '30m' });
}
async function login(req, res) {
    try {
        console.log('mensaje --> login');
        const email = req.body.email;
        const password = req.body.password;

        //console.log(req.body);
        
        
        const usuario = await getUsersByEmailBD(email);

        if (usuario == null) {
            const invitado = await getInvitadoByIdEmailBD(email);
            if (invitado == null) {
                return res.status(404).json({ error: 'Usuario no encontrado', status: 404});
            }else{
                let rutita = '';
                let token = '';
                // si el invitado existe
                const isMAtchInv = await comparePassword(password, invitado.password_invitado);
                
                if(isMAtchInv || password == invitado.password_invitado){
                    console.log('invitado password correcto');
                    console.log('es invitado');
                    rutita = '/invitado/home/invitado.html';
                    token = generateTokenInvitado(email, invitado.id_invitado, 4, invitado.newCount, invitado.changeFirstPass);

                    req.session.jwt = token;
                    return res.status(200).json({
                        ruta: rutita,
                        status: 200,
                        message: 'Inicio de sesión exitoso'
                    });


                }else{
                    return res.status(401).json({ error: 'invitado contraseña incorrecta', status: 401});
                }

            }
             return res.status(404).json({ error: 'Usuario no encontrado ooo', status: 404});
        }

        const isMatch = await comparePassword(password, usuario.password_usuario);
        //console.log('es la contrasena?: ' + isMatch);
        if (!isMatch) {
            return res.status(401).json({ error: 'Contraseña incorrecta', status: 401});
        }
        const rol = usuario.rol_usuario;

        let rolNum = 0;
        let ruta = '';
    
        switch (rol) {
            case 'SuperAdmin':
                rolNum = 1;
                ruta = '/admin/admin.html';
                break;
            case 'Anfitrion':
                rolNum = 2;
                ruta = '/anfitrion/anfitrion.html';
                break;
            case 'Seguridad':
                rolNum = 3;
                ruta = '/seguridad/seguridad.html';
                //req.session.rol = 3;
                //res.status(200).json({ ruta: '/seguridad/seguridad.html',   status: 200});
                break;
            default:
                res.status(401).json({ error: 'Rol no encontrado', status: 401});
                break;
        }
        const token = generateAccessToken(email, usuario.id_usuario, rolNum, usuario.nombre_usuario, usuario.apellido_paterno_usuario, usuario.foto_usuario);
        console.log('token: ' + token);
        req.session.jwt = token;
        res.status(200).json({
            ruta: ruta,
            status: 200,
            message: 'Inicio de sesión exitoso'
        });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ error: 'Error interno del servidor', status: 500});
    }
}

async function signup(req, res) {
    try {
        console.log('mensaje --> signup');

        const { nombre, apellido_paterno, apellido_materno, email, contrasena, telefono } = req.query;
        
        
        const usuario = await getUsersByEmailBD(email);
        if (usuario) {
            return res.status(409).json({ error: 'Usuario ya registrado' });
        }
        const hashedPassword = await hashPassword(contrasena);
        //console.log('hashed pass: ' + hashedPassword);

        const resp = await createUserBD({ nombre, apellido_paterno, apellido_materno, email, hashedPassword, telefono });
        

        res.status(201).json({ message: resp });
    } catch (error) {
        console.error('Error en singup:', error);
    }
}

async function recuperar(req, res) {
    try {
        console.log('mensaje --> recuperar');

        const email = req.body.email;
        // console.log('peticion contorlador, param: email: ' + email);
        const usuario = await getUsersByEmailBD(email);
        const invitado= await getInvitadoByEmailBD(email);
        if (usuario === null && invitado===null ) {
            return res.status(404).json({ error: 'notFound', status: 404});
        }
        if(usuario){
            const token=generateTokenToRecover(email, usuario.id_usuario,"usuario");
            console.log(token);
            generateCorreo(email,"http://localhost:3000/home/recuperar2.html?tk="+token);
            res.status(200).json({ message: 'Usuario encontrado', id: usuario.id_usuario});
            
        }
        else if(invitado){
            const token=generateTokenToRecover(email,invitado.id_invitado,"invitado");
            console.log(token);
            generateCorreo(email,"http://localhost:3000/home/recuperar2.html?tk="+token);
            res.status(200).json({ message: 'Invitado encontrado', id: invitado.id_invitado});
        }
            
    } catch (error) {
        console.error('Error en recuperar:', error);
    }
}

async function cambiar(req, res) {
    try {
        console.log('mensaje --> cambiar');

        const { id, email,tipo, password } = req.body;
        // console.log('peticion contorlador, param: id: ' + id + ' email: ' + email + ' contrasena: ' + password);
        const hashedPassword = await hashPassword(password);
        if(tipo	==="usuario"){
            const usuario = await updateUserBD(id, email, hashedPassword);
        }
        else if(tipo==="invitado"){
            const invitado = await updatePassInvitadoBD (id, hashedPassword);
        }
            
        res.status(200).json({ message: 'Contraseña actualizada efectivamente' });
    }
    catch (error) {
        console.error('Error en cambiar:', error);
    }
}

async function generateCorreo(correo,liga){
    let emailText = `<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BeeMeet - Recuperar contraseña</title>
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

        .saludo {
            margin-left: 0rem;
            display: flex;
            flex-direction: row;
            align-items: center;
        }

        .enlaceSesion{
            min-width: 90%;
        }

        .firma,
        .divToken,
        .enlaceSesion {
            display: flex;
            align-content: center;
            justify-content: center;
            align-items: center;
        }

        .firma {
            margin-top: 3rem;
        }

        .firma #BeeCoders {
            font-size: 1.3rem;
        }

        input {
            background-color: #f9f8f8;
            border: none;
            font-size: 1.1rem;
            overflow: hidden;
            font-weight: bold;
        }

        input .inputCorreo {
            min-width: 70%;
        }

        #enlace {
            width: 75%;
        }

        #token,
        #enlace {
            text-align: center;
            min-width: 80%;
        }

        h3,
        h2 {
            padding-right: 0.5rem;
        }

        #bold-font {
            font-weight: bold;
        }

        @media only screen and (max-width: 800px) {

            body,
            input {
                text-align: center;
                font-size: 0.7rem;
            }

            .ContenidoCorreo .Correo {
                max-width: 80%;
                padding: 2rem;
            }


            .DatosToken {
                margin-top: 2rem;
            }

            input {

                text-align: center;
            }

            input .inputCorreo {
                min-width: 90%;
            }

            #enlace {
                width: 90%;
            }

            #inicioSesion {
                padding-right: 0;
            }

            .saludo {
                margin-left: 0rem;
                margin-bottom: 1.5rem;
                display: flex;
                flex-direction: column;
                align-items: center;
            }

            .firma #BeeCoders {
                font-size: 1rem;
            }
        }

        @media screen and (max-width: 555px) {

            body,
            input {
                text-align: center;
                font-size: 0.6rem;
            }

            .ContenidoCorreo {
                max-width: 90%;
            }

            .ContenidoCorreo .Correo {
                margin-top: 1rem;
                max-width: 90%;
                padding: 0.8rem;
            }

            .DatosToken {
                margin-top: 1.5rem;
            }

            input {
                background: #f9f8f8;
                border: none;
                font-size: 0.6rem;
                overflow: hidden;
                font-weight: bold;
            }

            input .inputCorreo {
                min-width: 90%;
            }

            #enlace {
                width: 90%;
            }

            #inicioSesion {
                padding-right: 0;
            }

            .saludo {
                margin-left: 0rem;
                margin-bottom: 1rem;
                display: flex;
                flex-direction: column;
                align-items: center;
            }

            .firma #BeeCoders {
                font-size: 0.8rem;
            }
        }
    </style>
</head>

<body>
    <main class="ContenidoCorreo">
        <section class="header">
            <img class="header_img" src="https://i.imgur.com/f2picBm.png">
        </section>

        <section class="Correo">
            <div class="Informacion">
                <div class="saludo">
                    <h3>Hola</h3>
                    <input type="text" id="nombreInvitado" class="inputNombre" value="${correo}" readonly disabled>
                </div>
            </div>
            <div class="DatosToken">
                <p>Solicitaste la recuperación de tu contraseña, dirígite al siguiente enlace para que puedas configurar
                    tu nueva contraseña: </p>
                <div class="enlaceSesion">
                    <p type="url" class="enlace" id="enlace">${liga}</p>
                </div>
                <p>Es necesario que la contraseña nueva que configures cuente con una longitud de 10 a 20 caractéres,
                    además debe incluir mínimo dos números, dos caracteres especiales y una letra mayúscula.</p>
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
    const envio = await mail(emailText, correo,'BeeCoders-Recuperacion de contraseña');
}

module.exports = {
    login,
    signup,
    recuperar,
    cambiar
};