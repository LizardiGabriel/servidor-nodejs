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
        const foto = document.getElementById('foto').files[0];

        let data={
            nombre:nombre,
            apellidoPat:apellidoPaterno,
            apellidoMa:apellidoMaterno,
            correo:correo,
            tel:telefono,
            empresa:empresa,
            foto:base64String
        }
        console.log(data);
        fetch('/invitado/registrarinformacion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify()
        })
            .then(response => response.json())
            .then(data => {
                console.log('Respuesta del servidor:', data);
                //window.location.href = 'consultarReunion.html';
            })
            .catch(error => console.error('Error al mandar datos:', error));
            modal.fire({
                title: "Error",
                icon: "error",
                text: error,
            });
                    /*
        const numAcompanantes = document.getElementById('numAcompanantes').value;
        const nombreAcompanante = document.getElementById('nombreAcompanante').value;
        const apellidoPaternoAcompanante = document.getElementById('apellidoPaternoAcompanante').value;
        const apellidoMaternoAcompanante = document.getElementById('apellidoMaternoAcompanante').value;
        const correoAcompanante = document.getElementById('correoAcompanante').value;
        const conDispositivos = document.querySelector('input[name="conDispositivos"]:checked').value;
        const numDispositivos = document.getElementById('numDispositivos').value;
        const numSerie = document.getElementById('numSerie').value;
        const modelo = document.getElementById('modelo').value;
        const marca = document.getElementById('marca').value;
        const conAutomovil = document.querySelector('input[name="conAutomovil"]:checked').value;
        const numPlaca = document.getElementById('numPlaca').value;
        const marcaAuto = document.getElementById('marcaAuto').value;
        const modeloAuto = document.getElementById('modeloAuto').value;
        const colorAuto = document.getElementById('colorAuto').value;
        const formData = new FormData();
        */
    });