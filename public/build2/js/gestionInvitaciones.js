const data = [
    { id: 1, nombreAnfi: "Rafael Cabañas", fecha: "2024-03-10", horaInicio: "10:30 AM", horaFin: "11:30 AM", sala: "Multiusos", numInvi: "25", numAcompa: "7" },
    { id: 2, nombreAnfi: "Paola Fernández", fecha: "2024-03-23", horaInicio: "11:30 AM", horaFin: "01:30 PM", sala: "Multiusos", numInvi: "39", numAcompa: "10" },
    { id: 3, nombreAnfi: "Diego López", fecha: "2024-04-05", horaInicio: "09:00 AM", horaFin: "10:30 AM", sala: "Salón Principal", numInvi: "18", numAcompa: "5" },
    { id: 4, nombreAnfi: "María Rodriguez", fecha: "2024-04-18", horaInicio: "02:00 PM", horaFin: "04:00 PM", sala: "Sala de Conferencias", numInvi: "30", numAcompa: "8" },
    { id: 5, nombreAnfi: "Juan Pérez", fecha: "2024-04-22", horaInicio: "08:30 AM", horaFin: "10:00 AM", sala: "Sala A", numInvi: "20", numAcompa: "6" },
    { id: 6, nombreAnfi: "Luisa Gómez", fecha: "2024-05-02", horaInicio: "01:00 PM", horaFin: "02:30 PM", sala: "Sala B", numInvi: "15", numAcompa: "4" },
    { id: 7, nombreAnfi: "Daniel Martínez", fecha: "2024-05-15", horaInicio: "11:00 AM", horaFin: "12:30 PM", sala: "Sala de Reuniones", numInvi: "12", numAcompa: "3" },
    { id: 8, nombreAnfi: "Ana Jiménez", fecha: "2024-05-29", horaInicio: "03:00 PM", horaFin: "04:30 PM", sala: "Salón Principal", numInvi: "22", numAcompa: "6" },
    { id: 9, nombreAnfi: "Roberto Sánchez", fecha: "2024-06-10", horaInicio: "10:30 AM", horaFin: "12:00 PM", sala: "Sala de Conferencias", numInvi: "28", numAcompa: "8" },
    { id: 10, nombreAnfi: "Laura Pérez", fecha: "2024-06-25", horaInicio: "02:30 PM", horaFin: "04:00 PM", sala: "Sala A", numInvi: "35", numAcompa: "9" },
    { id: 11, nombreAnfi: "Jorge González", fecha: "2024-07-08", horaInicio: "09:30 AM", horaFin: "11:00 AM", sala: "Sala B", numInvi: "17", numAcompa: "5" },
    { id: 12, nombreAnfi: "Marisol Torres", fecha: "2024-07-20", horaInicio: "11:00 AM", horaFin: "12:30 PM", sala: "Sala de Reuniones", numInvi: "10", numAcompa: "3" },
    { id: 13, nombreAnfi: "Pedro Ramírez", fecha: "2024-08-03", horaInicio: "02:00 PM", horaFin: "03:30 PM", sala: "Multiusos", numInvi: "26", numAcompa: "7" },
    { id: 14, nombreAnfi: "Lucía Rodríguez", fecha: "2024-08-16", horaInicio: "10:00 AM", horaFin: "11:30 AM", sala: "Salón Principal", numInvi: "19", numAcompa: "5" },
    { id: 15, nombreAnfi: "Fernando Díaz", fecha: "2024-08-29", horaInicio: "03:30 PM", horaFin: "05:00 PM", sala: "Sala de Conferencias", numInvi: "33", numAcompa: "9" },
    { id: 16, nombreAnfi: "Gabriela Ruiz", fecha: "2024-09-12", horaInicio: "01:30 PM", horaFin: "03:00 PM", sala: "Sala A", numInvi: "24", numAcompa: "6" },
    { id: 17, nombreAnfi: "Andrés González", fecha: "2024-09-25", horaInicio: "09:30 AM", horaFin: "11:00 AM", sala: "Sala B", numInvi: "16", numAcompa: "4" },
    { id: 18, nombreAnfi: "Valeria Sánchez", fecha: "2024-10-08", horaInicio: "11:00 AM", horaFin: "12:30 PM", sala: "Sala de Reuniones", numInvi: "13", numAcompa: "3" },
    { id: 19, nombreAnfi: "Mario López", fecha: "2024-10-21", horaInicio: "02:00 PM", horaFin: "03:30 PM", sala: "Multiusos", numInvi: "29", numAcompa: "8" },
    { id: 20, nombreAnfi: "Camila Torres", fecha: "2024-11-03", horaInicio: "10:00 AM", horaFin: "11:30 AM", sala: "Salón Principal", numInvi: "21", numAcompa: "6" },
    { id: 21, nombreAnfi: "Javier Martínez", fecha: "2024-11-16", horaInicio: "03:30 PM", horaFin: "05:00 PM", sala: "Sala de Conferencias", numInvi: "36", numAcompa: "10" }
];

// Función para llenar la tabla con datos iniciales
function loadTableData() {
    const tbody = document.querySelector('tbody');
    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `<td class="id">${item.id}</td>
                    <td class="nombreAnfi">${item.nombreAnfi}</td>
                    <td class="fecha">${item.fecha}</td>
                    <td class="horaInicio">${item.horaInicio}</td>
                    <td class="horaFin">${item.horaFin}</td>
                    <td class="sala">${item.sala}</td>
                    <td class="numInvi">${item.numInvi}</td>
                    <td class="numAcompa">${item.numAcompa}</td>`;
        tbody.appendChild(row);
    });
}

// Cargar datos en la tabla al iniciar la página
loadTableData();

// Activación de DataTables
$(document).ready(function () {
    $('#Tabla').DataTable({
        pagingType: 'full_numbers', //Tipo de paginación 
        info: false, //Desactiva la información de los registros totales
        language: {
            lengthMenu: ' Mostrar  _MENU_  registros', //Para cambiar el texto de los registros que se muestran
            search: 'Buscar',
            zeroRecords: 'No se encontró ninguna coincidencia ):'
        },
        columnDefs: [
            { type: 'date', targets: [2] }, // Indica la columna que contiene la fecha
            { type: 'time', targets: [3] }, // Indica la columna que contiene la hora 
            { type: 'time', targets: [4] } // Indica la columna que contiene la hora
        ],
        autoWidth: true
    });

});
