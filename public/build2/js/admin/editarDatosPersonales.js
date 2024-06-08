document.addEventListener('DOMContentLoaded',async function() {
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
    console.error('Error fetching data:', error);
  }
});

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

  if (file_foto) {
      const reader = new FileReader();
      reader.onloadend = function() {
          datatoSend.fotoUsuario = reader.result; // Añade la foto en formato Base64 al objeto data
          enviarData(datatoSend,datosUsuario.id_usuario);
      };
      reader.readAsDataURL(file_foto);
  } else {
      console.log("Hubo un error al cargar los datos");
      enviarData(datatoSend,datosUsuario.id_usuario);
  }
}

async function getData(correo) {
  try {
      // Remover el ':' adicional del inicio de la URL si no es necesario
      const response = await fetch('/admin/catalogo/usuarioEmail/:'+correo);
      const data = await response.json();
      return data;  // Asegura que data sea devuelta de la función
  } catch (error) {
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
        
          console.log('Respuesta del servidor:', data);
      })
      .catch(error => console.error('Error al mandar datos:', error));
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
      let imageHeader = document.querySelector('.navbar__profile-container')
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
                imageHeader.style.backgroundImage = `url('${e.target.result}')`
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
