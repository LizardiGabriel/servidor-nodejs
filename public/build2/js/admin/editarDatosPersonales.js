document.addEventListener('DOMContentLoaded',async function() {
  traerDatos();
});

async function traerDatos() {
  try {
    const response = await fetch('/admin/getemail');
    const data = await response.json();
    /* const fotoResponse = fetch(`/admin/getFotoPerfil`);
    const fotico = await fotoResponse.json(); */
    var datosUsuario = await getData(data.email);  // Usar await aquí garantiza que esperamos el resultado
    const nombre= document.getElementById("nombre");
    nombre.value=datosUsuario.nombre_usuario;
    const ApellidoPat= document.getElementById("app");
    ApellidoPat.value=datosUsuario.apellido_paterno_usuario;
    const ApellidoMat= document.getElementById("apm");
    ApellidoMat.value=datosUsuario.apellido_materno_usuario;
    const Tel= document.getElementById("telefono");
    Tel.value = datosUsuario.telefono_usuario;
    const foto = document.getElementById('profile-image');
    foto.src = datosUsuario.foto_usuario;

  } catch (error) {
    modal.fire({
      title: "Error",
      icon: "error",
      text: "Error al fetching data:" + error,
    });
    console.error('Error fetching data:', error);
  }
}

async function updateData(){
  try {
      const response = await fetch('/admin/getemail');
      const data = await response.json();
      var datosUsuario = await getData(data.email);
      console.log(datosUsuario);
  } catch (error) {
      console.error('Error fetching data:', error);
  }
  const nombre= document.getElementById("nombre").value; // Obtener el valor del input
  const ApellidoPat= document.getElementById("app").value;
  const ApellidoMat= document.getElementById("apm").value;
  //obtener el valor del input para el telefono, es un entero por lo que se usa parseInt
  const Tel= document.getElementById("telefono").value;
  const file_foto = document.getElementById("file-input").files[0];

  let datatoSend={
      email:datosUsuario.email_usuario,
      nombre: nombre,
      apellidoPaterno:ApellidoPat,
      apellidoMaterno:ApellidoMat,
      telefono:Tel,
      idRol:datosUsuario.rol_usuario,
  }

  let activarBoton = document.getElementById('editProfile');
  let contenedor = document.getElementById('buttonsEdit');
  let contenedorEdit = document.getElementById('contenedorEdit');
  let foto = document.getElementById('upload-icon');  //NO ESTA IMPLEMENTADA EN HTML

  if (validaEditData(nombre, ApellidoPat, ApellidoMat, Tel)) {
    modal.fire({
      timer: undefined,
      icon: 'question',
      title: "¿Desea continuar?",
      html: `Se modificará sus datos de la cuenta.`,
      showDenyButton: true,
      confirmButtonText: "Editar perfil",
      denyButtonText: `Cancelar`
    }).then((result) => {
      if (result.isConfirmed) {
        if (file_foto) {
          const reader = new FileReader();
          reader.onloadend = function() {
            datatoSend.fotoUsuario = reader.result; // Añade la foto en formato Base64 al objeto data
            enviarData(datatoSend, datosUsuario.id_usuario);

            //Volvemos todo a la normalidad
            document.querySelector('.navbar__profile-container').style.backgroundImage = `url('${reader.result}')`
            contenedor.classList.add("view");
            contenedorEdit.style.display = "none";
            activarBoton.style.display = '';
            foto.style.display = 'none'
            document.getElementById('nombre').disabled = true;
            document.getElementById('app').disabled = true;
            document.getElementById('apm').disabled = true;
            document.getElementById('telefono').disabled = true;
            document.getElementById('file-input').disabled = true;
          };
          reader.readAsDataURL(file_foto);
        } else {
            console.log("Hubo un error al cargar los datos");
            enviarData(datatoSend,datosUsuario.id_usuario);
        }
      } else if (result.isDenied) {
        document.getElementById("nombreForm").innerHTML = ``
        document.getElementById("appForm").innerHTML = ``
        document.getElementById("apmForm").innerHTML = ``
        document.getElementById("telefonoForm").innerHTML = ``
      }
    });
  }
}

document.getElementById('cancelarProfile').addEventListener('click', function() {
  traerDatos();
  document.getElementById("nombreForm").innerHTML = ``
  document.getElementById("appForm").innerHTML = ``
  document.getElementById("apmForm").innerHTML = ``
  document.getElementById("telefonoForm").innerHTML = ``
});

async function getData(correo) {
  try {
      // Remover el ':' adicional del inicio de la URL si no es necesario
      const response = await fetch('/admin/catalogo/usuarioEmail/:'+correo);
      const data = await response.json();
      return data;  // Asegura que data sea devuelta de la función
  } catch (error) {
    modal.fire({
      title: "Error",
      icon: "error",
      text: "Error fetching data:" + error,
    });
      console.error('Error fetching data:', error);
      return null;  // Devolver null o algún indicativo de error
  }
}

function enviarData(data,id_usuario) {
  console.log(data);
      fetch('/admin/catalogo/usuarios/:'+id_usuario, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      })
      .then(response => response.json())
        .then(data => {
          modal.fire({
            title: "Operación Exitosa",
            icon: "success",
            text: "Sus datos han sido modificados correctamente"
          })
          console.log('Respuesta del servidor:', data);
      })
      .catch(error => {
        modal.fire({
          title: "Error",
          icon: "error",
          text: "Error al mandar los datos:" + error,
        });
        console.error('Error al mandar los datos:', error);
      });
}

document.addEventListener("DOMContentLoaded", function() {
  const uploadIcon = document.getElementById('upload-icon');
  const fileInput = document.getElementById('file-input');
  const profileImage = document.getElementById('profile-image');

  uploadIcon.addEventListener('click', function() {
      fileInput.click();
  });

  fileInput.addEventListener('change', function(event) {
      const file = event.target.files[0];
      if (file) {
          if (file.size > 5 * 1024 * 1024) {
              modal.fire({
                  icon: 'error',
                  title: 'Archivo demasiado grande',
                  text: 'El archivo no debe exceder los 5MB.',
              });
              fileInput.value = ""; // Resetea el input
          } else {
              const reader = new FileReader();
              reader.onload = function(e) {
                profileImage.src = e.target.result;
                fetch(`/admin/getFotoPerfil`)
                  /* modal.fire({
                      icon: 'success',
                      title: 'Imagen subida con éxito',
                      text: 'Tu imagen de perfil ha sido actualizada.',
                  }); */
              };
              reader.readAsDataURL(file);
          }
      }
  });
});

function validaEditData(nombre, app, apm, telefono) {
  let flag = true;
  //Validación de nombre
  if (nombre) {
    if (!validateTextWithSpacesWithoutNumber(nombre)) {
      flag = false;
    }
  } else {
    flag = false;
    document.getElementById("nombreForm").innerHTML = `<p class="msg-error-form">Favor de especificar un nombre</p>`
  }

  //Validación de apellido paterno
  if (app) {
    if (!validateTextWithoutSpacesNumber(app)) {
      flag = false;
    }
  } else {
    flag = false;
    document.getElementById("appForm").innerHTML = `<p class="msg-error-form">Favor de especificar un apellido paterno</p>`
  }

  //Validación de apellido materno
  if (apm) {
    if (!validateTextWithoutSpacesNumber(apm)) {
      flag = false;
    }
  } else {
    flag = false;
    document.getElementById("apmForm").innerHTML = `<p class="msg-error-form">Favor de especificar un apellido materno</p>`
  }

  //Validación de telefono
  if (telefono) {
    if (!validatePhoneNumber(telefono)) { 
      flag = false;
    }
  } else {
    flag = false;
    document.getElementById("telefonoForm").innerHTML = `<p class="msg-error-form">Favor de especificar un número teléfonico</p>`
  }

  return flag;
}
