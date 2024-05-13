const {getUsersByEmailBD, createUserBD, updateUserBD} = require('../tools/peticiones');
const { hashPassword, comparePassword } = require('../tools/cipher');
const { json } = require('body-parser');


async function login(req, res) {
    try {
        const email = req.body.email;
        const password = req.body.password;

        console.log(req.body);
        
        
        const usuario = await getUsersByEmailBD(email);

        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const isMatch = await comparePassword(password, usuario.password_usuario);
        console.log('es la contrasena?: ' + isMatch);
        if (!isMatch) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }
        const rol = usuario.rol_usuario;
        
        req.session.userId = usuario.id_usuario;
        req.session.email = email;

    
        switch (rol) {
            case 'SuperAdmin':
                req.session.rol = 1;
                res.redirect('/admin/admin.html');
                break;
            case 'Anfitrion':
                req.session.rol = 2;
                res.redirect('/anfitrion/anfitrion.html');
                break;
            case 'Seguridad':
                req.session.rol = 3;
                res.redirect('/seguridad/seguridad.html');
                break;
            default:
                res.status(401).json({ error: 'Rol no encontrado' });
                break;
        }
        console.log('rol de la bd: ' + rol);
        //res.status(200).json({ message: 'Inicio de sesión exitoso' });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

async function signup(req, res) {
    try {
        console.log(req.query);
        const { nombre, apellido_paterno, apellido_materno, email, contrasena, telefono } = req.query;
        
        
        const usuario = await getUsersByEmailBD(email);
        if (usuario) {
            return res.status(409).json({ error: 'Usuario ya registrado' });
        }
        const hashedPassword = await hashPassword(contrasena);
        console.log('hashed pass: ' + hashedPassword);

        const resp = await createUserBD({ nombre, apellido_paterno, apellido_materno, email, hashedPassword, telefono });
        

        res.status(201).json({ message: resp });
    } catch (error) {
        console.error('Error en singup:', error);
    }
}

async function recuperar(req, res) {
    try {
        console.log(req.body);
        const email = req.body.email;
        console.log('peticion contorlador, param: email: ' + email);
        const usuario = await getUsersByEmailBD(email);
        if (usuario === null) {
            return res.status(404).json({ error: 'notFound' });
        }
        res.status(200).json({ message: 'Usuario encontrado', id: usuario.id_usuario});
    } catch (error) {
        console.error('Error en recuperar:', error);
    }
}

async function cambiar(req, res) {
    try {
        const { id, email, password } = req.body;
        console.log('peticion contorlador, param: id: ' + id + ' email: ' + email + ' contrasena: ' + password);
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