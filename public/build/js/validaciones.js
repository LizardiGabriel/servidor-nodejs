const loginPassword = document.getElementById("loginPassword");
const loginPasswordR = document.getElementById("loginPasswordR");
const passwordForm = document.getElementById("passwordForm");
const passwordFormR = document.getElementById("passwordFormR");

const loginEmail = document.getElementById("loginEmail");
const emailForm = document.getElementById("emailForm");

const checkbox1 = document.getElementById("cbx-1");
const checkbox2 = document.getElementById("cbx-2");

const eyeButton = document.getElementById("eyebutton");
const eyeButtonR = document.getElementById("eyebuttonR");

//E-MAIL
const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

//PASSWORD
const validatePassword = (password) => {
    if(password.length < 10 || password.length > 20)
        return "Length";
    else if(!(password.match(/[A-Z]/)))
        return "Mayus";
    else if(!(password.match(/\d.*\d/)))
        return "Num";
    else if(!(password.match(/[!@#$%^&*(),.?":{}|<>_-].*[!@#$%^&*(),.?":{}|<>_-]/)))
        return "Symbol";
    else
        return "OK";
};

var msgErrorEmail = '<p class="msg-error-form">El correo electrónico no es valido</p>';

let valorP;
if(loginPassword != null)
loginPassword.addEventListener('input', () => {
    valorP = loginPassword.value;
    //Valido Password
    let msg = validatePassword(valorP);
    switch(msg){
        case "Length":
            passwordForm.innerHTML = '<p class="msg-error-form">La contraseña deber ser al menos de 10 caracteres de longitud</p>';
        break;
        case "Mayus":
            passwordForm.innerHTML = '<p class="msg-error-form">La contraseña debe contener al menos 1 mayuscula</p>';
        break;
        case "Num":
            passwordForm.innerHTML = '<p class="msg-error-form">La contraseña debe contener al menos 2 números</p>';
        break;
        case "Symbol":
            passwordForm.innerHTML = '<p class="msg-error-form">La contraseña debe contener al menos 2 símbolos</p>';
        break;
        case "OK":
            passwordForm.innerHTML = '';
        break;
    }
});

let valorPR;
if(loginPasswordR != null)
loginPasswordR.addEventListener('input', () => {
    valorPR = loginPasswordR.value;
    //Valido Password
    let msg = validatePassword(valorPR);
    if(msg != "OK" && valorPR != valorP){
        passwordFormR.innerHTML = '<p class="msg-error-form">La contraseña no coincide</p>';
    }
});

if(loginEmail != null)
loginEmail.addEventListener('input', () => {
    let valor = loginEmail.value;
    //Valido Email
    if(!validateEmail(valor))
        emailForm.innerHTML = msgErrorEmail;
    else
        emailForm.innerHTML = '';
});


//CHECKBOX
if(checkbox1 != null)
checkbox1.addEventListener("change", function() {
    if (this.checked) {
        checkbox2.checked = false;
    }
});

if(checkbox2 != null)
checkbox2.addEventListener("change", function() {
    if (this.checked) {
        checkbox1.checked = false;
    }
});

if(eyeButton != null){
    eyeButton.addEventListener("click", () => {
        const currentType = loginPassword.getAttribute("type");
        const newType = currentType === "password" ? "text" : "password";
        loginPassword.setAttribute("type", newType);
      });
}
if(eyeButtonR != null){
    eyeButtonR.addEventListener("click", () => {
        console.log("VER")
        const currentType = loginPasswordR.getAttribute("type");
        const newType = currentType === "password" ? "text" : "password";
        loginPasswordR.setAttribute("type", newType);
      });
}


