const data = [
    { id: 1, nombreReu: "Contrato", nombreAnfi: "Rafael Cabañas", fecha: "2024-11-01", horario: "09:30 AM", sala: "42" },
    { id: 2, nombreReu: "Revisión de Proyecto", nombreAnfi: "Laura Martínez", fecha: "2024-02-02", horario: "10:00 AM", sala: "30" },
    { id: 3, nombreReu: "Negociación con Cliente", nombreAnfi: "Alejandro Gutiérrez", fecha: "2024-04-03", horario: "11:00 AM", sala: "25" },
    { id: 4, nombreReu: "Capacitación de Equipo", nombreAnfi: "Patricia Ramírez", fecha: "2024-04-04", horario: "12:00 PM", sala: "50" },
    { id: 5, nombreReu: "Junta Directiva", nombreAnfi: "Paola Herrera", fecha: "2024-03-05", horario: "01:00 PM", sala: "60" },
    { id: 6, nombreReu: "Seguimiento de Tareas", nombreAnfi: "Ana López", fecha: "2024-02-08", horario: "09:30 AM", sala: "42" },
    { id: 7, nombreReu: "Lanzamiento de Producto", nombreAnfi: "Francisco Pérez", fecha: "2024-07-09", horario: "10:00 AM", sala: "30" },
    { id: 8, nombreReu: "Entrevista con Candidato", nombreAnfi: "Mariana Gómez", fecha: "2024-08-10", horario: "11:00 AM", sala: "25" },
    { id: 9, nombreReu: "Planeación Estratégica", nombreAnfi: "Pedro Vargas", fecha: "2024-06-11", horario: "12:00 PM", sala: "50" },
    { id: 10, nombreReu: "Celebración de Cumpleaños", nombreAnfi: "Todos", fecha: "2024-10-12", horario: "01:00 PM", sala: "60" },
    { id: 11, nombreReu: "Revisión de Metas", nombreAnfi: "Isabel Juárez", fecha: "2024-11-15", horario: "09:30 AM", sala: "42" },
    { id: 12, nombreReu: "Tormenta de Ideas", nombreAnfi: "Diego Ortiz", fecha: "2024-12-16", horario: "10:00 AM", sala: "30" },
    { id: 13, nombreReu: "Firma de Contrato", nombreAnfi: "Gabriela Moreno", fecha: "2024-01-17", horario: "11:00 AM", sala: "25" },
    { id: 14, nombreReu: "Capacitación en Software", nombreAnfi: "Luis Hernández", fecha: "2024-02-18", horario: "12:00 PM", sala: "50" },
    { id: 15, nombreReu: "Evento de Networking", nombreAnfi: "Claudia Rivera", fecha: "2024-03-19", horario: "01:00 PM", sala: "60" },
    { id: 16, nombreReu: "Presentación de Resultados", nombreAnfi: "Enrique Martínez", fecha: "2024-04-22", horario: "09:30 AM", sala: "42" }
];


// Función para llenar la tabla con datos iniciales
function loadTableData() {
    const tbody = document.querySelector('tbody');
    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `<td class="id">${item.id}</td>
                    <td class="nombreR">${item.nombreReu}</td>
                    <td class="nombreA">${item.nombreAnfi}</td>
                    <td class="fecha">${item.fecha}</td>
                    <td class="horario">${item.horario}</td>
                    <td class="sala">${item.sala}</td>
                    <td class="accion">
                      <button class="btn btn-sm visualizar" data-id="${item.id}"><img src="../../img/icons/ico-view.svg"></button>
                    </td>`;
        tbody.appendChild(row);
    });
}


// Cargar datos en la tabla al iniciar la página
loadTableData();

//Activación de DataTables
new DataTable('#Tabla', {
    pagingType: 'full_numbers', //Tipo de paginación 
    info: false, //Desactiva la información de los registros totales
    language: {
        lengthMenu: ' Mostrar  _MENU_  registros', //Para cambiar el texto de los registros que se muestran
        search: 'Buscar',
        zeroRecords: 'No se encontró ninguna coincidencia ):'
    },
    columnDefs: [
        { "orderable": false, "targets": -1 }, // Desactiva el ordenamiento en la última columna (Acciones)
        { type: 'date', targets: [3] }, // Indica la columna que contiene la fecha
        { type: 'time', targets: [4] } // Indica la columna que contiene la hora y aplica la función de ordenamiento personalizada
    ],
    autoWidth: true
});

