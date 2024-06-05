
document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        events: function(info,sucessCallback,failureCallback){
            fetch('reuniones')
                .then(function(response){
                    return response.json();
                })
                .then(function(data){
                    let reunionesmap=[];
                    for(const reunion of data){
                        for(const fecha of reunion.fechasRepeticion){
                            const evento={
                                title:reunion.titulo_reunion,
                                start: new Date(formatearFecha(fecha.fecha_repeticion)),
                                end: new Date(formatearFecha(fecha.fecha_repeticion)),
                                location: "Num sala "+reunion.id_sala,
                                url: "/anfitrion/reuniones/ConsultarDatos.html?idReunion="+reunion.id_reunion+"&"+"fecha_i="+fecha.fecha_repeticion+
                                "&"+"fecha_f="+fecha.fecha_repeticion+"&"+"hora_i="+fecha.hora_inicio_repeticion+"&"+"hora_f="+fecha.hora_fin_repeticion,
                                timeStart: fecha.hora_inicio_repeticion,
                                timeEnd: fecha.hora_fin_repeticion
                            }
                            reunionesmap.push(evento);
                        }
                    }
                    console.log(reunionesmap);
                    sucessCallback(reunionesmap);
                })
                .catch(function(error){
                    failureCallback(error)
                })
        },
        eventContent: function(info){
            return {
                html: `
            <div style="overflow: hidden; font-size: 12px; positon: relative;  cursor: pointer; font-family: 'Inter', sans-serif;">
                <div><strong>${info.event.title}</strong></div>
                <div>Location: ${info.event.extendedProps.location}</div>
                <div>Time: ${info.event.extendedProps.timeStart} - ${info.event.extendedProps.timeEnd}</div>
            </div>
            `
            }
        },
        eventMouseEnter: function(mouseEnterInfo){
            console.log(mouseEnterInfo)
            let el = mouseEnterInfo.el
            el.classList.add("relative")

            let newEl = document.createElement("div")
            let newElTitle = mouseEnterInfo.event.title
            let newElLocation = mouseEnterInfo.event.extendedProps.location
            newEl.innerHTML = `
            <div
                class="fc-hoverable-event"
                style="position: absolute; bottom: 100%; left: 0; width: 300px; height: auto; background-color: white; z-index: 50; border: 1px solid #e2e8f0; border-radius: 0.375rem; padding: 0.75rem; font-size: 14px; font-family: 'Inter', sans-serif; cursor: pointer;"
            >
                <strong>${newElTitle}</strong>
                <div>Location: ${newElLocation}</div>

            </div>
        `
            el.after(newEl)
        },
        eventMouseLeave: function(){
            document.querySelector(".fc-hoverable-event").remove()
        }
    });
    calendar.render();
});

function formatearFecha(fechaString) {
    const fecha = new Date(fechaString);

    // Extraer los componentes de la fecha
    let mes = fecha.getMonth() + 1; // getMonth() devuelve un índice basado en 0
    let dia = fecha.getDate()+1; //Considerando indice en 0
    let año = fecha.getFullYear();

    // Asegurar que el día y mes tengan dos dígitos
    mes = mes < 10 ? '0' + mes : mes;
    dia = dia < 10 ? '0' + dia : dia;

    // Formatear la fecha en el formato deseado
    return `${mes}/${dia}/${año}`;
}
