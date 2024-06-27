function enviarForm() {
  const nombreSala = document.getElementById("nombreSala").value;
  const cupoMaximo = document.getElementById("cupoMaxSala").value;
  const piso = document.getElementById("pisoSala").value;
  const numerito = document.getElementById("numberSala").value;
  const selectElement = document.getElementById("estadoSala");
  const estado = selectElement.options[selectElement.selectedIndex].value;

  //Si esta bien la validación hacemos la pregunta de confirmación
  if (validarAddSala(nombreSala, cupoMaximo, piso, numerito, estado)) {
    modal.fire({
      timer: undefined,
      icon: 'question',
      title: "¿Desea continuar?",
      html: `Se creará la sala con los siguientes datos: <br>
      Nombre de sala: ${nombreSala}<br>
      Cupo máximo de sala: ${cupoMaximo}<br>
      Piso de la sala: ${piso}<br>
      Número de la sala: ${numerito}<br>
      Estado de la sala: ${estado}`,
      showDenyButton: true,
      confirmButtonText: "Crear Sala",
      denyButtonText: `Cancelar`
    }).then((result) => {
      if (result.isConfirmed) {
        fetch('/admin/catalogo/salas', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            nombreSala,
            cupoMaximo,
            piso,
            numerito,
            estado
          })
        })
        .then(response => {
          if (response.ok) {
            modal.fire({
              title: "Operación exitosa",
              icon: "success",
              text: "Sala creada correctamente",
            }).then(() => {
              window.location.href = '/admin/catalogo/GestionarSalas.html';
            });
            /* finishRedirect(); */
          } else {
            modal.fire({
              title: "Error",
              icon: "error",
              text: "A ocurrido un error, favor de intentar más tarde" + response.statusText,
            });
            console.error('Error al crear sala:', response.statusText);
          }
        })
        .catch(error => {
          modal.fire({
            title: "Error",
            icon: "error",
            text: "Error al crear sala:" + error,
          });
          console.error('Error al crear sala:', error);
        });
      } else if (result.isDenied) {
        
      }
    });
  }
}

/* Función para esperar a que se muestre el modal */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function finishRedirect() {
  await sleep(1000); 
  window.location.href = '/admin/catalogo/GestionarSalas.html';
}

function validarAddSala(nombreSala, cupomax, piso, numero, estado) {
  let flag = true
  //Validación de nombre de la sala
  if (nombreSala) {
    if (!validateTextWithSpacesNumber(nombreSala)) {
      flag = false;
    }
  } else {
    flag = false;
    document.getElementById("nombreSalaForm").innerHTML = `<p class="msg-error-form">Favor de especificar un nombre de sala</p>`
  }
  
  //Validación del cupo máximo de la sala
  if (cupomax) {
    if (!validateNumber(cupomax)) {
      flag = false;
    }
  } else {
    flag = false;
    document.getElementById("cupoMaxSalaForm").innerHTML = `<p class="msg-error-form">Favor de especificar un cupo máximo de sala</p>`
  }
  
  //Validación del piso de la sala
  if (piso) {
    if (!validateNumber(piso)) {
      flag = false;
    }
  } else {
    flag = false;
    document.getElementById("pisoSalaForm").innerHTML = `<p class="msg-error-form">Favor de especificar un piso de sala</p>`
  }
  
  //Validación del número de sala
  if (numero) {
    if (!validateTextWithSpacesNumber(numero)) {
      flag = false;
    }
  } else {
    flag = false;
    document.getElementById("numberSalaForm").innerHTML = `<p class="msg-error-form">Favor de especificar un número de sala</p>`
  }
  
  //Validación del estado de la sala
  if (estado != "Disponible" && estado != "NoDisponible") {
    flag = false;
    document.getElementById("estadoSalaForm").innerHTML = `<p class="msg-error-form">Favor de seleccionar un estado de sala</p>`
  }

  return flag;
}