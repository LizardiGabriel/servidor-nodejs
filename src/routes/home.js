const {getUsersByEmailBD, createUserBD, updateUserBD} = require('../tools/peticiones');
const { hashPassword, comparePassword } = require('../tools/cipher');
const { json } = require('body-parser');
const { stat } = require('fs');


async function login(req, res) {
    try {
        console.log('mensaje --> login');
        const email = req.body.email;
        const password = req.body.password;

        //console.log(req.body);
        
        
        const usuario = await getUsersByEmailBD(email);

        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado', status: 404});
        }

        const isMatch = await comparePassword(password, usuario.password_usuario);
        //console.log('es la contrasena?: ' + isMatch);
        if (!isMatch) {
            return res.status(401).json({ error: 'Contraseña incorrecta', status: 401});
        }
        const rol = usuario.rol_usuario;
        
        req.session.userId = usuario.id_usuario;
        req.session.email = email;

    
        switch (rol) {
            case 'SuperAdmin':
                req.session.rol = 1;
                res.status(200).json({ ruta: '/admin/admin.html', status: 200});

                break;
            case 'Anfitrion':
                req.session.rol = 2;
                res.status(200).json({ ruta: '/anfitrion/anfitrion.html', status: 200});

                break;
            case 'Seguridad':
                req.session.rol = 3;
                res.status(200).json({ ruta: '/seguridad/seguridad.html',   status: 200});
                break;
            default:
                res.status(401).json({ error: 'Rol no encontrado', status: 401});
                break;
        }
        //console.log('rol de la bd: ' + rol);
        //res.status(200).json({ message: 'Inicio de sesión exitoso' });
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
        if (usuario === null) {
            return res.status(404).json({ error: 'notFound', status: 404});
        }
        res.status(200).json({ message: 'Usuario encontrado', id: usuario.id_usuario});
    } catch (error) {
        console.error('Error en recuperar:', error);
    }
}

async function cambiar(req, res) {
    try {
        console.log('mensaje --> cambiar');
        const { id, email, password } = req.body;
        // console.log('peticion contorlador, param: id: ' + id + ' email: ' + email + ' contrasena: ' + password);
        const hashedPassword = await hashPassword(password);
        const usuario = await updateUserBD(id, email, hashedPassword);
        res.status(200).json({ message: 'Contraseña actualizada efectivamente' });
    }
    catch (error) {
        console.error('Error en cambiar:', error);
    }
}

module.exports = {
    login,
    signup,
    recuperar,
    cambiar
};