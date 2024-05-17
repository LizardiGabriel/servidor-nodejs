//Funcionalidades de la tabla
// Ejemplo de datos 
const data = [
  { id: 1, nombre: "Rafael Cabañas", email: "rafa@gmail.com", tipoU: "Anfitrión" },
  { id: 2, nombre: "Diana Fernández", email: "diana@gmail.com", tipoU: "Seguridad" },
  { id: 3, nombre: "Daniel Vega", email: "daniel@gmail.com", tipoU: "Invitado" },
  { id: 4, nombre: "Paola Fernández", email: "pmartinez@hotmail.com", tipoU: "Invitado" },
  { id: 5, nombre: "Paulina Gómez", email: "pau.gomez@yahoo.com", tipoU: "Anfitrión" },
  { id: 6, nombre: "Diego Pérez", email: "dperez@outlook.com", tipoU: "Seguridad" },
  { id: 7, nombre: "César Moreno", email: "cesarmoreno@gmail.com", tipoU: "Invitado" },
  { id: 8, nombre: "Daniela González", email: "dani.gonzalez@hotmail.com", tipoU: "Anfitrión" },
  { id: 9, nombre: "Abril Rodríguez", email: "abril.rodriguez@yahoo.com", tipoU: "Seguridad" },
  { id: 10, nombre: "Julio Sánchez", email: "juliosanchez@outlook.com", tipoU: "Invitado" },
  { id: 11, nombre: "Adrián López", email: "adrian.lopez@gmail.com", tipoU: "Anfitrión" },
  { id: 12, nombre: "Andrea Alonso", email: "andrea.alonso@hotmail.com", tipoU: "Seguridad" },
  { id: 13, nombre: "Sergio Ramírez", email: "sergio.ram@yahoo.com", tipoU: "Invitado" },
  { id: 14, nombre: "Marta García", email: "marta.garcia@outlook.com", tipoU: "Anfitrión" },
  { id: 15, nombre: "David Moreno", email: "david.moreno@gmail.com", tipoU: "Seguridad" },
  { id: 16, nombre: "Ana López", email: "ana.lopez@hotmail.com", tipoU: "Invitado" },
  { id: 17, nombre: "Antonio Alonso", email: "aalonso@yahoo.com", tipoU: "Anfitrión" },
  { id: 18, nombre: "Rosa Ferrero", email: "rosa.ferr@outlook.com", tipoU: "Seguridad" },
  { id: 19, nombre: "José García", email: "jose.garcia@gmail.com", tipoU: "Invitado" },
  { id: 20, nombre: "Antonio Moreno", email: "antonio.moreno@hotmail.com", tipoU: "Anfitrión" },
  { id: 21, nombre: "Rafael López", email: "rlopez@yahoo.com", tipoU: "Seguridad" },
  { id: 22, nombre: "Isabel Alonso", email: "isabel.alonso@outlook.com", tipoU: "Invitado" },
  { id: 23, nombre: "Rafael Martínez", email: "rafael.martinez@gmail.com", tipoU: "Anfitrión" },
  { id: 24, nombre: "Diana Gómez", email: "diana.gomez@hotmail.com", tipoU: "Seguridad" },
  { id: 25, nombre: "Daniel Pérez", email: "daniel.perez@yahoo.com", tipoU: "Invitado" },
  { id: 26, nombre: "Laura Moreno", email: "laura.moreno@outlook.com", tipoU: "Anfitrión" },
  { id: 27, nombre: "Alejandro González", email: "alejandro.gonzalez@gmail.com", tipoU: "Seguridad" },
  { id: 28, nombre: "Daniel Rodríguez", email: "danrodriguez@hotmail.com", tipoU: "Invitado" },
  { id: 29, nombre: "Diego Sánchez", email: "diegos@yahoo.com", tipoU: "Anfitrión" },
  { id: 30, nombre: "Abril López", email: "abril.lopez@outlook.com", tipoU: "Seguridad" },
  { id: 31, nombre: "José Alonso", email: "jalonso@gmail.com", tipoU: "Invitado" },
  { id: 32, nombre: "Rafael Fernández", email: "rafaola@gmail.com", tipoU: "Anfitrión" }
];



// Función para llenar la tabla con datos iniciales
//NOTA: Quitar todo el td de acciones en caso de que la tabla no requiera esta columna
function loadTableData() {
  const tbody = document.querySelector('tbody');
  data.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${item.id}</td>
                    <td>${item.nombre}</td>
                    <td>${item.email}</td>
                    <td>${item.tipoU}</td>

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
  //QUITAR ESTA PARTE SI NO HAY COLUMNA DE ACCIONES ACCIONES
  columnDefs: [
    { "orderable": false, "targets": -1 } // Desactiva el ordenamiento en la última columna (Acciones)
  ]
  //FIN
});

// Botón de editar
document.querySelector('tbody').addEventListener('click', function(event) {
  if (event.target.classList.contains('editar')) {
    const id = event.target.dataset.id;
    //Aqui va lo necesario para editar el registro
    console.log(`Se oprimió Editar`);
  }
});

// Botón de eliminar
document.querySelector('tbody').addEventListener('click', function(event) {
  if (event.target.classList.contains('eliminar')) {
    const id = event.target.dataset.id;
    //Aqui va lo necesario para eliminar el registro
    console.log(`Se oprimió Eliminar`);
  }
});

/* Código implementado antes del uso de DataTables
//Funcionalidad de la búsqueda
$(document).ready(function () {
  $("#Busqueda").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#Tabla tr").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});

//Activador de la cabecera para ordenar con un clic
$('th').click(function () {
  var table = $(this).parents('table').eq(0)
  var rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()))
  this.asc = !this.asc
  if (!this.asc) {
    rows = rows.reverse()
  }
  for (var i = 0; i < rows.length; i++) {
    table.append(rows[i])
  }
  setIcon($(this), this.asc);
})

//Verifica si el ordenamiento se hará con datos numéricos (ejemplo de ID)
function comparer(index) {
  return function (a, b) {
    var valA = getCellValue(a, index),
      valB = getCellValue(b, index)
    return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.localeCompare(valB)
  }
}

function getCellValue(row, index) {
  return $(row).children('td').eq(index).html()
}*/

//Función para actualizar la flecha según el ordenamiento
/*function setIcon(element, asc) {
  $("th").each(function (index) {
    $(this).removeClass("sorting");
    $(this).removeClass("asc");
    $(this).removeClass("desc");
  });
  element.addClass("sorting");
  if (asc) element.addClass("asc");
  else element.addClass("desc");
}*/