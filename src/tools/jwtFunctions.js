const jwt = require("jsonwebtoken");
require('dotenv').config();



// funcion para qmodificar un campo del jwt y devolver el nuevo token
function modifyJwtField(token, field, newValue) {
    // Decodificar el token sin verificar la firma
    let decoded = jwt.decode(token);

    // Verificar que el campo a modificar exista en el token
    if (!decoded.hasOwnProperty(field)) {
        throw new Error(`El campo ${field} no existe en el token.`);
    }

    // Modificar el campo con el nuevo valor
    decoded[field] = newValue;

    delete decoded.exp;


    // Crear un nuevo token con los datos modificados
    const newToken = jwt.sign(decoded, process.env.SECRET_KEY, { expiresIn: '60m' });

    return newToken;
}

module.exports = { modifyJwtField };
