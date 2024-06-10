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
//funcion para generar un QR en base al id de la invitación y los datos de la reunion
async function generateQR(id_invitacion) {
    const qr = require('qrcode'); //importar la libreria qrcode
    let qrData = {
        idInvitacion: id_invitacion,
    }
    let qrString = JSON.stringify(qrData); //convertir el objeto a string
    let qrImage = await qr.toDataURL(qrString); //convertir el string a imagen
    return qrImage; //retornar la imagen
}
module.exports = {
    generatePassword,
    generateQR

}