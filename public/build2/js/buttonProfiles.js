
document.addEventListener('DOMContentLoaded', function() {
    
    let activarBoton = document.getElementById('editProfile');
    let contenedor = document.getElementById('buttonsEdit');
    let cancelar = document.getElementById('cancelarProfile');
    let guardar = document.getElementById('guardarProfile');
    let contenedorEdit = document.getElementById('contenedorEdit');
    let foto = document.getElementById('SeccionFoto');

    //Variables de validación
    let patron_name = /^[áéíóúÁÉÍÓÚñäëïöüÄËÏÖÜ\w\d]{1,100}$/;
    let patron_email = /^([\w.+]+@{1}[a-z]+([.]{1}[a-z]{1,3})(([.]{1}[a-z]{1,3})?))$/;
    let patron_phoneNumber =/(^\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})$/;
    
    activarBoton.addEventListener('click', function (event) {
        activarBoton.style.display = "none";
        contenedorEdit.style.display = '';
        foto.style.display = 'block';
        foto.style.textAlign = 'center';
        habilitarInputs();
    });

    guardar.addEventListener('click', function () {
        contenedor.classList.add("view");
        contenedorEdit.style.display = "none";
        activarBoton.style.display = '';
        foto.style.display = 'none';
        deshabiltarInputs();
    });

    cancelar.addEventListener('click', function () {
        contenedor.classList.add("view");
        contenedorEdit.style.display = "none";
        activarBoton.style.display = '';
        foto.style.display = 'none';
        deshabiltarInputs();
    });

    /* Función  para deshabilitar los inputs */
    function deshabiltarInputs() {
        document.getElementById('inputNom').disabled = true;
        document.getElementById('inputApePat').disabled = true;
        document.getElementById('inputApeMat').disabled = true;
        document.getElementById('inputTel').disabled = true;
    }
    
    /* Función para habilitar los inputs */
    function habilitarInputs() {
        document.getElementById('inputNom').disabled = false;
        document.getElementById('inputApePat').disabled = false;
        document.getElementById('inputApeMat').disabled = false;
        document.getElementById('inputTel').disabled = false;
    }

    //Función que va a validar los inputs
    function validarInputs() {
        //Validación del nombre
        if (patron_name.test(document.getElementById('inputNom').value)) {
            console.log("Nombre correcto");
        } else {
            console.log("Nombre incorrecto");
        }

        //Validación del apellido paterno
        if (patron_name.test(document.getElementById('inputApePat').value)) {
            console.log("ApePat correcto");
        } else {
            console.log("ApePat incorrecto");
        }

        //Validación del apellido materno
        if (patron_name.test(document.getElementById('inputApetMat').value)) {
            console.log("ApePat correcto");
        } else {
            console.log("ApePat incorrecto");
        }

        //Validación 
    }


});
