function toggleMenu() {
    var menu = document.getElementById('user-menu');
    if (menu.style.display === 'none' || menu.style.display === '') {
        menu.style.display = 'block';
    } else {
        menu.style.display = 'none';
    }
}

$(document).ready(function() {
    $('input[type=radio][name=acompanantes]').change(function() {
        if (this.value == 'si') {
            $('#acompanantesHabilitada').removeClass('hidden');
        } else {
            $('#acompanantesHabilitada').addClass('hidden');
        }
    });

    $('input[type=radio][name=dispositivos]').change(function() {
        if (this.value == 'si') {
            $('#dispositivosHabilitada').removeClass('hidden');
        } else {
            $('#dispositivosHabilitada').addClass('hidden');
        }
    });

    (function() {
        'use strict';
        window.addEventListener('load', function() {
            var forms = document.getElementsByClassName('needs-validation');
            var validation = Array.prototype.filter.call(forms, function(form) {
                form.addEventListener('submit', function(event) {
                    if (form.checkValidity() === false) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                    form.classList.add('was-validated');
                }, false);
            });
        }, false);
    })();
});

$(document).ready(function() {
    $('input[type=radio][name=automovil]').change(function() {
        if (this.value == 'si') {
            $('#automovilHabilitada').removeClass('hidden');
        } else {
            $('#automovilHabilitada').addClass('hidden');
        }
    });
});