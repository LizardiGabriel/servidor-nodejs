var salita = 1;

document.addEventListener('DOMContentLoaded',async function() {
  console.log("Es hora de cargar dato")
  cargarDatos();
});

function cargarDatos() {
    console.log("Cargando datos");

    let url = window.location.href;
    let urlParams = new URLSearchParams(window.location.search);
    const idSala = urlParams.get('idSala');
    salita = idSala;

    console.log('idSala: ' + idSala);



    fetch(`/admin/catalogo/salas/${idSala}`)
        .then(response => response.json())
        .then(data => {
            
            document.getElementById('nombreSala').value = data.nombre_sala;
            document.getElementById('numberSala').value = data.numero_sala;
            document.getElementById('pisoSala').value = data.piso_sala;
            document.getElementById('cupoMaxSala').value = data.capacidad_sala;
            document.getElementById('estadoSala').value = data.estatus_sala ;

        })
        .catch(error => {
            console.log(error);
        });

}

function enviarForm() {
  cargarDatos();
  const nombreSala = document.getElementById("nombreSala").value;
  const cupoMaximo = document.getElementById("cupoMaxSala").value;
  const piso = document.getElementById("pisoSala").value;
  const numerito = document.getElementById("numberSala").value;

  const selectElement = document.getElementById("estadoSala");
  const estado = selectElement.options[selectElement.selectedIndex].value;

  //Si esta bien la validación hacemos la pregunta de confirmación
  if (validarEditSala(nombreSala, cupoMaximo, piso, numerito, estado)) {
    modal.fire({
      timer: undefined,
      icon: 'question',
      title: "¿Desea continuar?",
      html: `Se modificará la sala con los siguientes datos: <br>
      Nombre de sala: ${nombreSala}<br>
      Cupo máximo de sala: ${cupoMaximo}<br>
      Piso de la sala: ${piso}<br>
      Número de la sala: ${numerito}<br>
      Estado de la sala: ${estado}`,
      showDenyButton: true,
      confirmButtonText: "Editar Sala",
      denyButtonText: `Cancelar`
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`/admin/catalogo/salas/${salita}`, {
          method: 'PUT',
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
            // redirigir a salas
            modal.fire({
              title: "Operación exitosa",
              icon: "success",
              text: "Sala editada correctamente",
            }).then(() => {
              window.location.href = '/admin/catalogo/GestionarSalas.html';
            });
            /* finishRedirect(); */
          } else {
            modal.fire({
              title: "Error",
              icon: "error",
              text: "Error al modificar sala:" + response.statusText,
            });
            console.error('Error al modificar sala:', response.statusText);
          }
      })
      .catch(error => {
        modal.fire({
          title: "Error",
          icon: "error",
          text: "Error al editar sala:" + error,
        });
        console.error('Error al editar sala:', error);
      });
      } else if (result.isDenied) {
        
      }
    });
  }
}

function cancelar() {
    window.location.href = '/admin/catalogo/GestionarSalas.html';
}

/* Función para esperar a que se muestre el modal */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function finishRedirect() {
  await sleep(1000); 
  window.location.href = '/admin/catalogo/GestionarSalas.html';
}

function validarEditSala(nombreSala, cupomax, piso, numero, estado) {
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