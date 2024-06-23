
document.addEventListener('DOMContentLoaded', function() {
    
    let activarBoton = document.getElementById('editProfile');
    let contenedor = document.getElementById('buttonsEdit');
    let cancelar = document.getElementById('cancelarProfile');
    let guardar = document.getElementById('guardarProfile');
    let contenedorEdit = document.getElementById('contenedorEdit');
    let foto = document.getElementById('upload-icon');  //NO ESTA IMPLEMENTADA EN HTML

    //Variables de validación
    let patron_name = /^[áéíóúÁÉÍÓÚñäëïöüÄËÏÖÜ\w\d]{1,100}$/;
    let patron_email = /^([\w.+]+@{1}[a-z]+([.]{1}[a-z]{1,3})(([.]{1}[a-z]{1,3})?))$/;
    let patron_phoneNumber =/(^\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})$/;
    
    activarBoton.addEventListener('click', function (event) {
      activarBoton.style.display = "none";
      contenedorEdit.style.display = '';
      foto.style.display = "flex";
      /* foto.style.display = 'block';  // NO ESTA IMPLEMENTADA EN HTML
      foto.style.textAlign = 'center';  // NO ESTA IMPLEMENTADA EN HTML */
      habilitarInputs();
    });

   /*  guardar.addEventListener('click', function () {
        contenedor.classList.add("view");
        contenedorEdit.style.display = "none";
        activarBoton.style.display = '';
        foto.style.display = 'none'
        // foto.style.display = 'none';  //NO ESTA IMPLEMENTADA EN HTML
        deshabiltarInputs();
    }); */

    cancelar.addEventListener('click', function () {
        contenedor.classList.add("view");
        contenedorEdit.style.display = "none";
        activarBoton.style.display = '';
        foto.style.display = '';
        //foto.style.display = 'none'; // NO ESTA IMPLEMENTADA EN HTML 
        deshabiltarInputs();
    });

    /* Función  para deshabilitar los inputs */
    function deshabiltarInputs() {
        document.getElementById('nombre').disabled = true;
        document.getElementById('app').disabled = true;
        document.getElementById('apm').disabled = true;
        document.getElementById('telefono').disabled = true;
        document.getElementById('file-input').disabled = true;
    }
    
    /* Función para habilitar los inputs */
    function habilitarInputs() {
        document.getElementById('nombre').disabled = false;
        document.getElementById('app').disabled = false;
        document.getElementById('apm').disabled = false;
        document.getElementById('telefono').disabled = false;
        document.getElementById('file-input').disabled = false;
    }
});
