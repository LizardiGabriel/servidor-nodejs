

const loginPassword = document.getElementById("loginPassword");
const loginPasswordR = document.getElementById("loginPasswordR");
const passwordForm = document.getElementById("passwordForm");
const passwordFormR = document.getElementById("passwordFormR");

const loginEmail = document.getElementById("loginEmail");
const correoInv = document.getElementById("correoInv");
const emailForm = document.getElementById("emailForm");

const nombre = document.getElementById("nombre");
const nombreForm = document.getElementById("nombreForm");

const app = document.getElementById("app");
const appForm = document.getElementById("appForm");

const apm = document.getElementById("apm");
const apmForm = document.getElementById("apmForm");

const telefono = document.getElementById("telefono");
const telefonoForm = document.getElementById("telefonoForm");

const empresa = document.getElementById("empresa");
const empresaForm = document.getElementById("empresaForm");

const identificacion = document.getElementById("identificacion");
const identificacionForm = document.getElementById("identificacionForm");

const checkbox1 = document.getElementById("rolSeguridad");
const checkbox2 = document.getElementById("rolAnfitrion");
const rolForm = document.getElementById("rolForm");

const nombreSala = document.getElementById("nombreSala");
const nombreSalaForm = document.getElementById("nombreSalaForm");

const numberSala = document.getElementById("numberSala");
const numberSalaForm = document.getElementById("numberSalaForm");

const pisoSala = document.getElementById("pisoSala");
const pisoSalaForm = document.getElementById("pisoSalaForm");

const cupoMaxSala = document.getElementById("cupoMaxSala");
const cupoMaxSalaForm = document.getElementById("cupoMaxSalaForm");

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
  else if (!(password.match(/[!@#$%^&*(),.?"';:~[{}|<>=_-].*[!@#$%^&*(),.?"';:~[{}|<>=_-]/)))
    return "Symbol";
  else
    return "OK";
};

//TITLE
const validateTitle = (title) => {
  // console.log("Validando titulo")
  //return title.length < 20;
  return title.trim() !== '' && title.length < 20;
}
//DESC
const validateDesc = (desc) => {
  //return desc.length < 60;
  return desc.trim() !== '' && desc.length < 60;
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

//Texto con todo permitido
const validateTextWithSpacesNumber = (text) => {
  return text.match(/^[áéíóúÁÉÍÓÚÑñäëïöüÄËÏÖÜa-zA-Z0-9\w\d\s]{1,100}$/);
}

//Texto con sólo números
const validateNumber = (text) => {
  return text.match(/^[\d\s]{1,100}$/);
}

//Texto sin numeros y sin espacios
const validateTextWithoutSpacesNumber = (text) => {
  return text.match(/^[áéíóúÁÉÍÓÚÑñäëïöüÄËÏÖÜa-zA-Z]{1,100}$/);
}

//Número telefonico 
const validatePhoneNumber = (tel) => {
  return tel.match(/^([+]?\d{1,2}[-\s]?|)\d{3}[-\s]?\d{3}[-\s]?\d{4}$/)
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
  
  if (correoInv != null)
    correoInv.addEventListener('input', () => {
      let valor = correoInv.value;
      //Valido Email
      if (!validateEmail(valor))
        correoInv.innerHTML = msgErrorEmail;
      else
      correoInv.innerHTML = '';
    });
/* Validación mientras se detecta el teclado */
/* Confirmación de la contraseña */
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
  correoInv
/* Campo de login */
if (loginEmail != null)
  loginEmail.addEventListener('input', () => {
    let valor = loginEmail.value;
    //Valido Email
    if (!validateEmail(valor))
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
      apmForm.innerHTML = `<p class="msg-error-form">El apelido materno no es valido</p>`
    else
      apmForm.innerHTML = ``
  })
}

/* Campo de telefono */
if (telefono != null) {
  telefono.addEventListener('input', () => {
    let valor = telefono.value;
    //Valido telefono
    if (!validatePhoneNumber(valor))
      telefonoForm.innerHTML = `<p class="msg-error-form">El télefono no es valido</p>`
    else
      telefonoForm.innerHTML = ``
  })
}

/* Campo de empresa */
if (empresa != null) {
  empresa.addEventListener('input', () => {
    let valor = empresa.value;
    //Valido empresa
    if (!validateTextWithSpacesNumber(valor))
      empresaForm.innerHTML = `<p class="msg-error-form">La empresa no es valida</p>`
    else
      empresaForm.innerHTML = ``
  })
}

/* Campo de identificacion */
if (identificacion != null) {
  identificacion.addEventListener('input', () => {
    let valor = identificacion.value;
    //Valido identificacion
    if (valor == "INE" || valor == "Pasaporte" || valor == "Visa") 
      identificacionForm.innerHTML = ``
    else
      identificacionForm.innerHTML = `<p class="msg-error-form">Favor de elegir una opción</p>`
  })
}

/* Campo nombre de sala */
if (nombreSala != null) {
  nombreSala.addEventListener('input', () => {
    let valor = nombreSala.value;
    //Valido nombre sala
    if (!validateTextWithSpacesNumber(valor))
      nombreSalaForm.innerHTML = `<p class="msg-error-form">El nombre de sala no es valido</p>`
    else
      nombreSalaForm.innerHTML = ``
  })
}

/* Campo de número de sala */
if (numberSala != null) {
  numberSala.addEventListener('input', () => {
    let valor = numberSala.value;
    //Valido numero de sala
    if (!validateNumber(valor))
      numberSalaForm.innerHTML = `<p class="msg-error-form">El número de sala no es valido</p>`
    else
      numberSalaForm.innerHTML = ``
  })
}

/* Campo de piso de sala */
if (pisoSala != null) {
  pisoSala.addEventListener('input', () => {
    let valor = pisoSala.value;
    //Valido el piso de sala
    if (!validateNumber(valor))
      pisoSalaForm.innerHTML = `<p class="msg-error-form">El piso de sala no es valido</p>`
    else
      pisoSalaForm.innerHTML = ``
  })
}

/* Campo de cupo máximo */
if (cupoMaxSala != null) {
  cupoMaxSala.addEventListener('input', () => {
    let valor = cupoMaxSala.value;
    //Valido el piso de sala
    if (!validateNumber(valor))
      cupoMaxSalaForm.innerHTML = `<p class="msg-error-form">El cupo máximo de sala no es valido</p>`
    else
      cupoMaxSalaForm.innerHTML = ``
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
if (checkbox1 != null)
  checkbox1.addEventListener("change", function () {
    if (this.checked) {
      checkbox2.checked = false;
    }
    rolForm.innerHTML = ``;
  });

if (checkbox2 != null)
  checkbox2.addEventListener("change", function () {
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

if (titleee != null) {
  titleee.addEventListener("input", () => {
    let valor = titleee.value;
    if (!validateTitle(valor))
      titleForm.innerHTML = '<p class="msg-error-form">El título debe ser menor de 20 caracteres</p>';
    else
      titleForm.innerHTML = '';
  })
}

if (desc != null) {
  desc.addEventListener("input", () => {
    let valor = desc.value;
    if (!validateDesc(valor))
      descForm.innerHTML = '<p class="msg-error-form">La descripción debe ser menor de 60 caracteres</p>';
    else
      descForm.innerHTML = '';
  })
}

if (document.getElementById('dateID') != null) {
  document.getElementById('dateID').addEventListener('input', function() {
    const inputDate = this.value;
    const minDate = getTodayDate();
  
    this.setAttribute('min', minDate);
  
    if (inputDate >= minDate) {
      document.getElementById('dateFormID').innerHTML = ''; 
    } else {
      document.getElementById('dateFormID').innerHTML = '<p class="msg-error-form">La fecha debe ser igual o posterior a la fecha de hoy.</p>';
    }
  });
}

//Validamos la hora de inicio de la reunión
if (document.getElementById('time1ID') != null) {

  // Evento blur en el input de hora fin
  document.getElementById('time1ID').addEventListener('blur', validarHora);
  document.getElementById('time1ID').addEventListener('dblclick', validarHora);

  // También capturar el evento change
  document.getElementById('time1ID').addEventListener('change', validarHora);
  $('#time1ID').on('clockpicker:done', validarHora);
}

//Validamos la hora fin de la reunión
if (document.getElementById('time2ID') != null) {
  // Evento blur en el input de hora fin
  document.getElementById('time2ID').addEventListener('blur', validarHora);
  document.getElementById('time2ID').addEventListener('dblclick', validarHora);

  // También capturar el evento change
  document.getElementById('time2ID').addEventListener('change', validarHora);
  $('#time2ID').on('clockpicker:done', validarHora);
}

function validarHora() {
  const endTime = document.getElementById('time2ID').value;
  const startTimeInput = document.getElementById('time1ID').value;
  const endTimeForm = document.getElementById('timeFormID');
  console.log('End Time:', endTime, 'Start Time:', startTimeInput);
  if (startTimeInput) {
    if (endTimeForm) {
      if (endTime <= startTimeInput) {
          endTimeForm.innerHTML = '<p class="msg-error-form">La hora de fin debe ser posterior a la hora de inicio</p>';
        } else {
          endTimeForm.innerHTML = '';
        }
      } else {
        endTimeForm.innerHTML = '<p class="msg-error-form">Favor de introducir la hora fin de la reunión</p>';
      }
    } else {
    endTimeForm.innerHTML = '<p class="msg-error-form">Favor de introducir la hora inicio de la reunión</p>';
  }
}