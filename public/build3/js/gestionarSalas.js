const data = [
    { id: 1, nombreSala: "Juntas Principal", estado: "Disponible", cupoMax: "60", numeroS: "1", pisoS: "21" },
    { id: 2, nombreSala: "Sala de Reuniones", estado: "No Disponible", cupoMax: "20", numeroS: "2", pisoS: "21" },
    { id: 3, nombreSala: "Sala de Conferencias", estado: "Disponible", cupoMax: "100", numeroS: "3", pisoS: "21" },
    { id: 4, nombreSala: "Sala de Proyecciones", estado: "Disponible", cupoMax: "80", numeroS: "4", pisoS: "21" },
    { id: 5, nombreSala: "Sala de Juntas Pequeña", estado: "No Disponible", cupoMax: "10", numeroS: "5", pisoS: "21" },
    { id: 6, nombreSala: "Sala de Reuniones", estado: "Disponible", cupoMax: "20", numeroS: "6", pisoS: "22" },
    { id: 7, nombreSala: "Sala de Conferencias", estado: "Disponible", cupoMax: "100", numeroS: "7", pisoS: "22" },
    { id: 8, nombreSala: "Juntas Principal", estado: "No Disponible", cupoMax: "60", numeroS: "8", pisoS: "22" },
    { id: 9, nombreSala: "Sala de Reuniones", estado: "Disponible", cupoMax: "20", numeroS: "9", pisoS: "22" },
    { id: 10, nombreSala: "Sala de Conferencias", estado: "Disponible", cupoMax: "100", numeroS: "10", pisoS: "22" },
    { id: 11, nombreSala: "Sala de Proyecciones", estado: "No Disponible", cupoMax: "80", numeroS: "11", pisoS: "22" },
    { id: 12, nombreSala: "Sala de Juntas Pequeña", estado: "Disponible", cupoMax: "10", numeroS: "12", pisoS: "22" },
    { id: 13, nombreSala: "Sala de Reuniones", estado: "Disponible", cupoMax: "20", numeroS: "13", pisoS: "23" },
    { id: 14, nombreSala: "Sala de Conferencias", estado: "No Disponible", cupoMax: "100", numeroS: "14", pisoS: "23" },
    { id: 15, nombreSala: "Juntas Principal", estado: "Disponible", cupoMax: "60", numeroS: "15", pisoS: "23" },
    { id: 16, nombreSala: "Sala de Reuniones", estado: "Disponible", cupoMax: "20", numeroS: "16", pisoS: "23" },
    { id: 17, nombreSala: "Sala de Conferencias", estado: "Disponible", cupoMax: "100", numeroS: "17", pisoS: "23" },
    { id: 18, nombreSala: "Sala de Proyecciones", estado: "No Disponible", cupoMax: "80", numeroS: "18", pisoS: "23" },
    { id: 19, nombreSala: "Sala de Juntas Pequeña", estado: "Disponible", cupoMax: "10", numeroS: "19", pisoS: "23" },
    { id: 20, nombreSala: "Sala de Reuniones", estado: "Disponible", cupoMax: "20", numeroS: "20", pisoS: "24" },
    { id: 21, nombreSala: "Sala de Conferencias", estado: "No Disponible", cupoMax: "100", numeroS: "21", pisoS: "24" },
    { id: 22, nombreSala: "Juntas Principal", estado: "Disponible", cupoMax: "60", numeroS: "22", pisoS: "24" },
    { id: 23, nombreSala: "Sala de Reuniones", estado: "Disponible", cupoMax: "20", numeroS: "23", pisoS: "24" },
    { id: 24, nombreSala: "Sala de Conferencias", estado: "Disponible", cupoMax: "100", numeroS: "24", pisoS: "24" }

  ];

// Función para llenar la tabla con datos iniciales
function loadTableData() {
    const tbody = document.querySelector('tbody');
    data.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `<td class="id">${item.id}</td>
                      <td class="nombreSala">${item.nombreSala}</td>
                      <td class="estado">${item.estado}</td>
                      <td class="cupoMax">${item.cupoMax}</td>
                      <td class="numeroS">${item.numeroS}</td>
                      <td class="pisoS">${item.pisoS}</td>
                      <td class="acciones">
                        <button class="btn btn-sm editar" data-id="${item.id}"><img src="../../img/icons/ico-editar.svg" alt="Editar"></button>
                        <button class="btn btn-sm eliminar" data-id="${item.id}"><img src="../../img/icons/ico-trash.svg" alt="Eliminar"></button>
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
      { "orderable": false, "targets": -1 } // Desactiva el ordenamiento en la última columna (Acciones)
    ],
    autoWidth: true
  });
  
  // Botón de editar
  document.querySelector('tbody').addEventListener('click', function (event) {
    if (event.target.classList.contains('editar')) {
      const id = event.target.dataset.id;
      //Aqui va lo necesario para editar el registro
      console.log(`Editar`);
    }
  });
  
  // Botón de eliminar
  document.querySelector('tbody').addEventListener('click', function (event) {
    if (event.target.classList.contains('eliminar')) {
      const id = event.target.dataset.id;
      //Aqui va lo necesario para eliminar el registro
      console.log(`Eliminar`);
    }
  });
  
  