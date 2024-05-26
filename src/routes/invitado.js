const { } = require('../tools/peticiones');

async function logout(req, res) {
    console.log('mensaje --> logout');
    req.session.destroy();
    res.redirect('/');
}
async function setDataInvitado(req, res) {
    console.log('mensaje --> setNDataInvitado');
    return res.json({ message: req.body, status: 200});

}
module.exports = {
    logout,
    setDataInvitado
};



