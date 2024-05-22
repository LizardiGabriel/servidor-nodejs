//SideBar

const sidebar = document.querySelector(".sidebar");
const toggle = document.querySelector(".toggle");
const blur = document.querySelector("#blur");

toggle.addEventListener("click", ()=>{
    sidebar.classList.toggle("close");
    blur.classList.toggle("blur");
    console.log("Clic en sidebar");
});

blur.addEventListener("click", (event) => {
    // Evita cerrar el sidebar y quitar el blur si el clic se hizo en una opción del sidebar
    if (!event.target.closest('.sidebar__menu-option')) {
        sidebar.classList.toggle("close");
        blur.classList.toggle("blur");
        console.log("Clic en contenido, toca cerrar sidebar");
    }
});

//Para el responsive
// Selecciona el contenedor principal
const sidebar__list = document.querySelector('#sidebar__list');

// Luego selecciona todos los divs dentro de ese contenedor
const sidebarItems = sidebar__list.querySelectorAll('.sidebar__menu-option');  // O el selector adecuado para tus elementos internos

// Ahora puedes usar forEach en sidebarItems
sidebarItems.forEach((item) => {
    item.addEventListener('click', function() {
        sidebarItems.forEach((el) => el.classList.remove('option__active'));
        item.classList.add('option__active');
    });
});


//INTENTO de cambiar color de navBar de manera dinamica