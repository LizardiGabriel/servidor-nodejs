/* Función para añadir un nuevo usuario */
function addUser() {
  let email = document.getElementById("loginEmail").value;
  let nombre = document.getElementById("nombre").value;
  let app = document.getElementById("app").value;
  let apm = document.getElementById("apm").value;
  let rolSeguridad = document.getElementById("rolSeguridad").checked;
  let rolAnfitrion = document.getElementById("rolAnfitrion").checked;
  let rol;
  //Si esta bien la validación, hacemos la petición
  if (validarAddUser(email, nombre, app, apm, rolSeguridad, rolAnfitrion)) {
    if (rolSeguridad) {
      rol = `&rolSeguridad="on"`
    } else if (rolAnfitrion) {
      rol = `&rolAnfitrion="on"`
    }
      
    window.location.href = `/admin/catalogo/confirmarCuenta.html?email=${email}&nombre=${nombre}&apellidoPaterno=${app}&apellidoMaterno=${apm}${rol}`
  }
}

function validarAddUser(email, nombre, app, apm, rolSeguridad, rolAnfitrion) {
  //Validación del correo
  let flag = false
  if (email) {
    if (!validateEmail(email)) {
    }
  } else {
    document.getElementById("emailForm").innerHTML = `<p class="msg-error-form">Favor de especificar un correo</p>`;
  }
  
  //Validación de nombre
  if (nombre) {
    if (!validateTextWithSpacesWithoutNumber(nombre)) {
    }
  } else {
    document.getElementById("nombreForm").innerHTML = `<p class="msg-error-form">Favor de especificar un nombre</p>`
  }

  //Validación de apellido paterno
  if (app) {
    if (!validateTextWithoutSpacesNumber(app)) {
    }
  } else {
    document.getElementById("appForm").innerHTML = `<p class="msg-error-form">Favor de especificar un apellido paterno</p>`
  }

  //Validación de apellido materno
  if (apm) {
    if (!validateTextWithoutSpacesNumber(apm)) {
    }
  } else {
    document.getElementById("apmForm").innerHTML = `<p class="msg-error-form">Favor de especificar un apellido materno</p>`
  }

  //Validación de selección de roles
  if (rolAnfitrion || rolSeguridad) {
    flag = true
  } else {
    document.getElementById("rolForm").innerHTML = `<p class="msg-error-form">Favor de especificar un rol de usuario</p>`
  }

  return flag
}