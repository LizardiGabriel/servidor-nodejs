document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        events: function(info, successCallback, failureCallback){
            fetch('reuniones')
                .then(function(response){
                    return response.json();
                })
                .then(function(data){
                    let eventosPorDia = {};

                    for(const reunion of data){
                        for(const fecha of reunion.fechasRepeticion){
                            const fechaFormateada = formatearFecha(fecha.fecha_repeticion);

                            if (!eventosPorDia[fechaFormateada]) {
                                eventosPorDia[fechaFormateada] = [];
                            }

                            const evento = {
                                id_repeticion: fecha.id_repeticion,
                                title: reunion.titulo_reunion,
                                start: fechaFormateada,
                                end: fechaFormateada,
                                location: "Num sala " + reunion.id_sala,
                                url: "/anfitrion/reuniones/ConsultarDatos.html?idReunion=" + reunion.id_reunion + "&" + "fecha_i=" + fecha.fecha_repeticion + "&" + "fecha_f=" + fecha.fecha_repeticion + "&" + "hora_i=" + fecha.hora_inicio_repeticion + "&" + "hora_f=" + fecha.hora_fin_repeticion + "&" + "idRepeticion=" + fecha.id_repeticion,
                                timeStart: fecha.hora_inicio_repeticion,
                                timeEnd: fecha.hora_fin_repeticion
                            };

                            eventosPorDia[fechaFormateada].push(evento);
                        }
                    }

                    let eventosParaCalendario = [];
                    for (let fecha in eventosPorDia) {
                        const count = eventosPorDia[fecha].length;
                        eventosParaCalendario.push({
                            title: `${count} reuniones`,
                            start: fecha,
                            end: fecha,
                            extendedProps: {
                                eventos: eventosPorDia[fecha]
                            }
                        });
                    }

                    successCallback(eventosParaCalendario);
                })
                .catch(function(error){
                    failureCallback(error);
                });
        },
        eventClick: function(info) {
            showModal(info.event.startStr, info.event.extendedProps.eventos);
        }
    });
    calendar.render();
});

function formatearFecha(fechaString) {
    const fecha = new Date(fechaString);

    // Extraer los componentes de la fecha
    let mes = fecha.getMonth() + 1; // getMonth() devuelve un índice basado en 0
    let dia = fecha.getDate(); // Considerando índice en 0
    let año = fecha.getFullYear();

    // Asegurar que el día y mes tengan dos dígitos
    mes = mes < 10 ? '0' + mes : mes;
    dia = dia < 10 ? '0' + dia : dia;

    // Formatear la fecha en el formato deseado
    return `${año}-${mes}-${dia}`; // Ajusta el formato para que coincida con el formato 'startStr'
}

function showModal(dateStr, eventos) {
    document.getElementById('modalDate').innerText = dateStr;
    const modalEvents = document.getElementById('modalEvents');
    modalEvents.innerHTML = `Número de reuniones: ${eventos.length}<br><br>`;

    eventos.forEach(event => {
        const eventDiv = document.createElement('div');
        eventDiv.innerHTML = `<strong>${event.title}</strong><br>
                              Location: ${event.location}<br>
                              Time: ${event.timeStart} - ${event.timeEnd}<br>`;
        const detailsButton = document.createElement('button');
        detailsButton.innerText = 'Detalles';
        detailsButton.onclick = function() {
            window.location.href = event.url;
        };
        eventDiv.appendChild(detailsButton);
        modalEvents.appendChild(eventDiv);
        modalEvents.appendChild(document.createElement('br'));
    });

    document.getElementById('eventModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('eventModal').style.display = 'none';
}
