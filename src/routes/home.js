const {getUsersByEmailBD, createUserBD} = require('../tools/peticiones');
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

        const isMatch = await comparePassword(password, usuario.Contrasena);
        console.log('es la contrasena?: ' + isMatch);
        if (!isMatch) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }
        const rol = usuario.ID_Rol;
        
        req.session.userId = usuario.ID_Usuario;
        req.session.email = email;
        req.session.rol = rol;
        switch (rol) {
            case 1:
                res.redirect('/admin/admin.html');
                break;
            case 2:
                res.redirect('/anfitrion/anfitrion.html');
                break;
            case 3:
                res.redirect('/seguridad/seguridad.html');
                break;
            case 4:
                res.redirect('/externo/externo.html');
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
        const email = req.body.email;
        const usuario = await getUsersByEmailBD(email);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Usuario encontrado' });
    } catch (error) {
        console.error('Error en recuperar:', error);
    }
}

module.exports = {
    login,
    signup,
    recuperar,
};