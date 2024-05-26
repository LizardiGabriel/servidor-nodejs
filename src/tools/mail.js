const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');



async function main(texts, core) {
    if (!core || typeof core !== 'string') {
        throw new Error('Invalid recipient email address');
    }

    const transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: 'beemeet7@gmail.com',
            pass: 'uhfkkzuiyepyfxvv'
        }
    }));

    const mailOptions = {
        from: 'beemeet7@gmail.com',
        to: core,
        subject: 'Sending Email using Node.js[nodemailer]',
        text: texts
    };

    await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            return 'Error al enviar el email';
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    return 'Email enviado';
}

module.exports = main;