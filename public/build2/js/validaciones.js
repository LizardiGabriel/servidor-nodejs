

const loginPassword = document.getElementById("loginPassword");
const loginPasswordR = document.getElementById("loginPasswordR");
const passwordForm = document.getElementById("passwordForm");
const passwordFormR = document.getElementById("passwordFormR");

const loginEmail = document.getElementById("loginEmail");
const emailForm = document.getElementById("emailForm");

const nombre = document.getElementById("nombre");
const nombreForm = document.getElementById("nombreForm");

const app = document.getElementById("app");
const appForm = document.getElementById("appForm");

const apm = document.getElementById("apm");
const apmForm = document.getElementById("apmForm");

const checkbox1 = document.getElementById("rolSeguridad");
const checkbox2 = document.getElementById("rolAnfitrion");
const rolForm = document.getElementById("rolForm");

const eyeButton = document.getElementById("eyebutton");
const eyeButtonR = document.getElementById("eyebuttonR");

const titleee = document.getElementById("titleID");
const desc = document.getElementById("descID");
const date = document.getElementById("dateID");
const time1 = document.getElementById("time1ID");
const time2 = document.getElementById("time2ID");

const titleForm = document.getElementById("titleFormID");
const descForm = document.getElementById("descFormID");
const dateForm = document.getElementById("dateFormID");
const timeForm = document.getElementById("timeFormID");

//E-MAIL
const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

//PASSWORD
const validatePassword = (password) => {
    if (password.length < 10 || password.length > 20)
        return "Length";
    else if (!(password.match(/[A-Z]/)))
        return "Mayus";
    else if (!(password.match(/\d.*\d/)))
        return "Num";
    else if (!(password.match(/[!@#$%^&*(),.?":{}|<>_-].*[!@#$%^&*(),.?":{}|<>_-]/)))
        return "Symbol";
    else
        return "OK";
};

//TITLE
const validateTitle = (title) => {
    // console.log("Validando titulo")
    return title.length < 20;
}
//DESC
const validateDesc = (desc) => {
    return desc.length < 60;
}
//DATE
function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Los meses son indexados desde 0
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

const validateDate = (date) => {
    date.setAttribute('min', getTodayDate()); //Desde la fecha de hoy en adelante   
}

//TIME
function convertirHora(hora) {
    const partes = hora.split(':');
    const date = new Date();
    date.setHours(partes[0], partes[1], 0, 0);
    return date;
}

const validateTime = (time1, time2) => {
    const timeFirst = time1.value;
    const timeLast = time2.value;
    if (timeFirst && timeLast) {
        const inicio = convertirHora(timeFirst);
        const fin = convertirHora(timeLast);

        if (inicio >= fin) {
            return 0;
        } else {
            return 1;
        }
    }
}


//Texto sin numeros y espacios 
const validateTextWithSpacesWithoutNumber = (text) => {
  return text.match(/^[áéíóúÁÉÍÓÚÑñäëïöüÄËÏÖÜa-zA-Z\s]{1,100}$/);
}

//Texto sin numeros y sin espacios
const validateTextWithoutSpacesNumber = (text) => { 
  return text.match(/^[áéíóúÁÉÍÓÚÑñäëïöüÄËÏÖÜa-zA-Z]{1,100}$/);
}

var msgErrorEmail = '<p class="msg-error-form">El correo electrónico no es valido</p>';

let valorP;
if (loginPassword != null)
    loginPassword.addEventListener('input', () => {
        valorP = loginPassword.value;
        //Valido Password
        let msg = validatePassword(valorP);
        switch (msg) {
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
if (loginPasswordR != null)
    loginPasswordR.addEventListener('input', () => {
        valorPR = loginPasswordR.value;
        //Valido Password
        let msg = validatePassword(valorPR);
        if (msg != "OK" && valorPR != valorP) {
            passwordFormR.innerHTML = '<p class="msg-error-form">La contraseña no coincide</p>';
        } else {
            passwordFormR.innerHTML = '';
        }
    });

if (loginEmail != null)
    loginEmail.addEventListener('input', () => {
        let valor = loginEmail.value;
        //Valido Email
        if (!validateEmail(valor))
            emailForm.innerHTML = msgErrorEmail;
        else
            emailForm.innerHTML = '';
    });
/* Validación mientras se detecta el teclado */
/* Confirmación de la contraseña */
if(loginPasswordR != null)
loginPasswordR.addEventListener('input', () => {
    valorPR = loginPasswordR.value;
    //Valido Password
    let msg = validatePassword(valorPR);
    if(msg != "OK" && valorPR != valorP){
        passwordFormR.innerHTML = '<p class="msg-error-form">La contraseña no coincide</p>';
    } else {
      passwordFormR.innerHTML = '';
    }
});

/* Campo de login */
if(loginEmail != null)
loginEmail.addEventListener('input', () => {
    let valor = loginEmail.value;
    //Valido Email
    if(!validateEmail(valor))
        emailForm.innerHTML = msgErrorEmail;
    else
        emailForm.innerHTML = '';
});

/* Campo de nombre */
if (nombre != null) {
  nombre.addEventListener('input', () => {
    let valor = nombre.value;
    //Valido Nombre
    if (!validateTextWithSpacesWithoutNumber(valor))
      nombreForm.innerHTML = `<p class="msg-error-form">El nombre no es valido</p>`
    else
      nombreForm.innerHTML = ``
  })
}

/* Campo de apellido paterno */
if (app != null) {
  app.addEventListener('input', () => {
    let valor = app.value;
    //Valido Apellido paterno
    if (!validateTextWithoutSpacesNumber(valor))
      appForm.innerHTML = `<p class="msg-error-form">El apellido paterno no es valido</p>`
    else
      appForm.innerHTML = ``
  })
}

/* Campo de apellido materno */
if (apm != null) {
  apm.addEventListener('input', () => { 
    let valor = apm.value;
    //Valido Apellido materno
    if (!validateTextWithoutSpacesNumber(valor))
      apmForm.innerHTML = `<p class="msg-error-form">El appelido materno no es valido</p>`
    else
      apmForm.innerHTML = ``
  })
}

//CHECKBOX
if (checkbox1 != null)
    checkbox1.addEventListener("change", function () {
        if (this.checked) {
            checkbox2.checked = false;
        }
    });

if (checkbox2 != null)
    checkbox2.addEventListener("change", function () {
        if (this.checked) {
            checkbox1.checked = false;
        }
    });
if(checkbox1 != null)
checkbox1.addEventListener("change", function() {
  if (this.checked) {
    checkbox2.checked = false;
  }
  rolForm.innerHTML = ``;
});

if(checkbox2 != null)
checkbox2.addEventListener("change", function() {
  if (this.checked) {
    checkbox1.checked = false;
  }
  rolForm.innerHTML = ``;
});

if (eyeButton != null) {
    eyeButton.addEventListener("click", () => {
        const currentType = loginPassword.getAttribute("type");
        const newType = currentType === "password" ? "text" : "password";
        loginPassword.setAttribute("type", newType);
    });
}
if (eyeButtonR != null) {
    eyeButtonR.addEventListener("click", () => {
        console.log("VER")
        const currentType = loginPasswordR.getAttribute("type");
        const newType = currentType === "password" ? "text" : "password";
        loginPasswordR.setAttribute("type", newType);
    });
}

if (titleee != null){
    titleee.addEventListener("input", () => {
        console.log(titleee.length)
        if (!validateTitle(titleee.value))
            titleForm.innerHTML = '<p class="msg-error-form">El título debe ser menor de 20 caracteres</p>';
        else
            titleForm.innerHTML = '';
    })
}

if (desc != null){
    desc.addEventListener("input", () => {
        if (!validateDesc(desc.value))
            descForm.innerHTML = '<p class="msg-error-form">La descripción debe ser menor de 60 caracteres</p>';
        else
            descForm.innerHTML = '';
    })
}

if(date != null)
    validateDate(date);

if (time1 != null && time2 != null){
    time2.addEventListener("input", () => {
        if (!validateTime(time1, time2))
            timeForm.innerHTML = '<p class="msg-error-form">Ingrese un horario valido</p>';
        else
            timeForm.innerHTML = '';
    })
}
