/* Función para los modales */
const modal = Swal.mixin({
    timer: 3000,
    timerProgressBar: true,
    background: "#fbfff1",
    showConfirmButton: true,
    confirmButtonColor: "#89b6b1",
    cancelButtonColor: "#305272",
    width: "50%",
    customClass: {
        title: "titleSize",
        htmlContainer: "contentSize",
        confirmButton: "buttonSize",
        icon: "iconSize",
    }
})


const formInvitado = document.getElementById('formInvitado');
        formInvitado.addEventListener('submit', function(event) {
            event.preventDefault(); // Evitar el envío del formulario por defecto

            const nombre = document.getElementById('nombre').value;
            const apellidoPaterno = document.getElementById('apellidoPaterno').value;
            const apellidoMaterno = document.getElementById('apellidoMaterno').value;
            const correo = document.getElementById('correo').value;
            const telefono = document.getElementById('telefono').value;
            const empresa = document.getElementById('empresa').value;
            const identificacion = document.getElementById("identificacion").value;
            const foto = document.getElementById("foto").files[0];
            const num_serie_dsp= document.getElementById("num_serie_dsp").value;
            const modelo_dsp= document.getElementById("modeo_dsp").value;
            const marca_dispositivo= document.getElementById("marca_dispositivo").value;

            let data = {
                nombre: nombre,
                apellidoPat: apellidoPaterno,
                apellidoMa: apellidoMaterno,
                correo: correo,
                tel: telefono,
                empresa: empresa,
                identificacion: identificacion,
                num_serie_dsp: num_serie_dsp,
                modelo_dispositivo:modelo_dispositivo,
                marca_dispositivo:marca_dispositivo
            };

            if (foto) {
                const reader = new FileReader();
                reader.onloadend = function() {
                    data.foto = reader.result; // Añade la foto en formato Base64 al objeto data
                    enviarData(data);
                };
                reader.readAsDataURL(foto);
            } else {
                enviarData(data); // Enviar sin foto si no se seleccionó ninguna
            }
        });
        function enviarData(data) {
            fetch('/invitado/registrarinformacion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Respuesta del servidor:', data);
                window.location.href = 'cambiarContraseña.html';
            })
            .catch(error => {
                console.error('Error al mandar datos:', error)
                modal.fire({
                    title: "Error",
                    icon: "error",
                    text: error,
                });
            });
        }