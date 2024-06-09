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

module.exports = {
    generatePassword

}