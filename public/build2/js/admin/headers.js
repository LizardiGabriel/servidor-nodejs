var ejemplo = document.getElementById('headers');
ejemplo.insertAdjacentHTML('beforeend', returnHTML());

function returnHTML() {
  console.log(window.location.pathname);
  //Invitaciones
  let optionInvitaciones = `<div id="" class="sidebar__menu-option" onclick="gestionarInvitaciones()">`
  //Usuarios
  let optionUsuarios = `<div id="" class="sidebar__menu-option" onclick="gestionDeUsuarios()">`
  //Salas
  let optionSalas = `<div id="" class="sidebar__menu-option" onclick="gestionarSalas()">`
  //Reuniones
  let optionReuniones = `<div id="" class="sidebar__menu-option" onclick="gestionarReuniones()">`

  //Ponemos activo la opción en la que se encuentra
  if (window.location.pathname == "/admin/catalogo/GestionDeInvitaciones.html") {
    optionInvitaciones = `<div id="" class="sidebar__menu-option option__active" onclick="gestionarInvitaciones()">`
  } else if(window.location.pathname == "/admin/catalogo/GestionDeUsuarios.html"  || window.location.pathname == "/admin/editarPersonal.html" || window.location.pathname == "/admin/catalogo/crearCuenta.html") {
    optionUsuarios = `<div id="" class="sidebar__menu-option option__active" onclick="gestionDeUsuarios()">`
  } else if (window.location.pathname == "/admin/catalogo/GestionarSalas.html" || window.location.pathname == "/admin/EditarSala.html" || window.location.pathname == "/admin/catalogo/CrearSala.html") {
    optionSalas = `<div id="" class="sidebar__menu-option option__active" onclick="gestionarSalas()">`
  } else if (window.location.pathname == "/admin/catalogo/GestionarReuniones.html" || window.location.pathname == "/admin/ConsultarReunion.html") {
    optionReuniones = `<div id="" class="sidebar__menu-option option__active" onclick="gestionarReuniones()">`
  }

  return `
    <nav class="sidebar close">
        <div class="header">
            <div class="sidebar__marca">
                <div class="sidebar__imagen" onclick="homeAdmin()">
                    <img src="../../img/BeeMeet2.png" alt="Logo">
                </div>
                <div class="sidebar__texto">
                    <p class="sidebar__texto-marca">BeeMeet</p>
                    <p class="sidebar__texto-slogan">Super Administrador</p>
                </div>
            </div>
            <div class="sidebar__arrow toggle">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill=#FFFFFF class="bi bi-arrow-right-short" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"/>
                </svg>
            </div>
        </div>
        <div id="sidebar__list" class="sidebar__menu">
            ${optionInvitaciones}
                <div class="icon st0" title="Invitaciones">
                    <svg fill="#F9D8C1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
                        <g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)">
                            <path class="st0" d="M1667.9,102.8c-278.4-117.8-471.1-353.3-471.1-556.7c0-21.4,546-42.8,1209.8-42.8
                                c1316.9,0,1552.5-74.9,1841.5-642.4c96.4-182,160.6-599.6,160.6-1017.1c0-738.8,74.9-835.1,428.3-481.8
                                c182,182,214.1,353.3,214.1,1263.4c0,995.7-10.7,1070.7-278.4,1316.9c-257,235.5-364,257-1520.3,289.1
                                C2363.9,242,1903.5,209.9,1667.9,102.8z"/>
                            <path class="st0" d="M661.5-925c-96.4-64.2-117.8-128.5-53.5-192.7c781.6-674.5,1338.3-1092.1,1466.8-1092.1
                                c85.7,0,417.6,224.8,738.8,492.5c835.1,706.6,813.7,685.2,631.7,792.3C3231.1-785.8,875.6-785.8,661.5-925z"/>
                            <path class="st0" d="M126.2-2402.5c0-995.7,10.7-1070.7,278.4-1316.9c246.3-224.8,385.4-257,1349-289.1
                                c2055.7-74.9,2227,42.8,2227,1584.6c0,588.9-32.1,1070.7-74.9,1070.7c-53.5,0-417.6-289.1-835.1-642.4s-856.5-642.4-985-642.4
                                c-139.2,0-567.4,278.4-1006.4,642.4c-417.6,353.3-803,642.4-856.5,642.4S126.2-1824.4,126.2-2402.5z"/>
                        </g>
                    </svg>

                </div>
                <div>
                    <p class="option__text">Invitaciones</p>
                </div>
            </div>
            ${optionUsuarios}
                <div class="icon" title="Usuarios">
                    <svg fill="#F9D8C1"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
                            <path class="st0" d="M256,362.7c-47.1,0-85.3-38.2-85.3-85.3S208.9,192,256,192s85.3,38.2,85.3,85.3S303.1,362.7,256,362.7z
                            M384,448c0-35.3-28.7-64-64-64H192c-35.3,0-64,28.7-64,64v64h256V448z M384,170.7c-47.1,0-85.3-38.2-85.3-85.3S336.9,0,384,0
                            s85.3,38.2,85.3,85.3S431.1,170.7,384,170.7z M128,170.7c-47.1,0-85.3-38.2-85.3-85.3S80.9,0,128,0s85.3,38.2,85.3,85.3
                            S175.1,170.7,128,170.7z M128,277.3c0-31.5,11.7-61.9,32.8-85.3H64c-35.3,0-64,28.7-64,64v64h135.4C130.5,306.3,128,291.9,128,277.3
                            z M376.6,320H512v-64c0-35.3-28.7-64-64-64h-96.8C382.6,226.7,392.4,275.9,376.6,320L376.6,320z"/>
                    </svg>

                </div>
                <div>
                    <p class="option__text">Usuarios</p>
                </div>
            </div>
            ${optionSalas}
                <div class="icon" title="Salas">
                  
                    <svg class="" aria-hidden="true" fill="#F9D8C1" viewBox="0 0 20 20"  >
                        <path fill-rule="evenodd" d="M4 4a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2v14a1 1 0 1 1 0 2H5a1 1 0 1 1 0-2V5a1 1 0 0 1-1-1Zm5 2a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H9Zm5 0a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-1Zm-5 4a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1H9Zm5 0a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1h-1Zm-3 4a2 2 0 0 0-2 2v3h2v-3h2v3h2v-3a2 2 0 0 0-2-2h-2Z" clip-rule="evenodd"/>
                    </svg>
                      
                </div>
            <div>
                    <p class="option__text">Salas</p>
                </div>
            </div>
            ${optionReuniones}
                <div class="icon" title="Reuniones">
                    <svg fill="#F9D8C1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                    viewBox="0 0 128 128" style="enable-background:new 0 0 128 128;" xml:space="preserve">
                <g>
                    <ellipse class="st0" cx="23.2" cy="47.4" rx="7.8" ry="7.8"/>
                    <path class="st0" d="M37.4,97.5h-9.5c0,0-0.5,0-0.9,0c-4.3-0.4-8-3.5-9.1-7.8l-6.5-24.2c-0.4-1.4-1.8-2.1-3-1.8
                        c-1.4,0.4-2.1,1.8-1.8,3L13,90.9c1.7,6.3,7,10.9,13.5,11.4c0.6,0.1,1.3,0.1,1.3,0.1h9.5c1.4,0,2.4-1.1,2.5-2.5
                        C39.8,98.5,38.8,97.5,37.4,97.5z"/>
                    <path class="st0" d="M48.6,83.9h-13c-0.3-4.9-1.1-9.8-2.3-14.7c-0.1-0.4-0.4-1.4-0.4-1.5c-1.7-6.3-7.7-10.3-14-9.7
                        c0,0-0.8,0.1-1,0.1c-2.3,0.6-3.7,3-3.1,5.4l6.7,24.9c0.7,2.8,3.1,4.9,6.1,5.1h0.6h15.5v17.8c0,2.7,2.1,4.9,4.9,4.9
                        c2.7,0,4.9-2.1,4.9-4.9V88.8c0-1.3-0.5-2.5-1.5-3.4C51.1,84.4,49.8,83.9,48.6,83.9z"/>
                </g>
                <g>
                    <ellipse class="st0" cx="104.4" cy="47.5" rx="7.8" ry="7.8"/>
                    <path class="st0" d="M90.2,97.5h9.5c0,0,0.5,0,0.9,0c4.3-0.4,8-3.5,9.1-7.8l6.5-24.2c0.4-1.4,1.8-2.1,3-1.8c1.4,0.4,2.1,1.8,1.8,3
                        l-6.4,24.2c-1.7,6.3-7,10.9-13.5,11.4c-0.6,0.1-1.3,0.1-1.3,0.1h-9.5c-1.4,0-2.4-1.1-2.5-2.5C87.8,98.5,88.9,97.5,90.2,97.5z"/>
                    <path class="st0" d="M79,83.9h13c0.3-4.9,1.1-9.8,2.3-14.7c0.1-0.4,0.4-1.4,0.4-1.5c1.7-6.3,7.7-10.3,14-9.7c0,0,0.8,0.1,1,0.1
                        c2.3,0.6,3.7,3,3.1,5.4L106,88.4c-0.7,2.8-3.1,4.9-6.1,5.1h-0.6H83.9v17.8c0,2.7-2.1,4.9-4.9,4.9s-4.9-2.1-4.9-4.9V88.8
                        c0-1.3,0.5-2.5,1.5-3.4C76.5,84.4,77.8,83.9,79,83.9z"/>
                </g>
                <rect x="38.8" y="70.8" class="st0" width="50.6" height="6"/>
                <circle class="st0" cx="64.1" cy="43.2" r="7.2"/>
                <path class="st0" d="M52.5,67.9v-4.3h-0.1c0-0.5,0.4-0.9,0.9-0.9s0.9,0.4,0.9,0.9v4.3h19.9v-4.3H74c0-0.5,0.4-0.9,0.9-0.9
                    s0.9,0.4,0.9,0.9v4.3H82v-6.1c0-5-4-9-9-9H55c-5,0-9,4-9,9v6.1H52.5z"/>
                </svg>
                
                </div>
                <div>
                    <p class="option__text">Reuniones</p>
                </div>
            </div>
            <div class="option__indicator"></div>
        </div>
    </nav>

    <div id="blur" class=""></div>

    <header>
        <nav class="navbar navbar-expand navbar-dark">
            <div class="container-fluid">
                <a id="navbar-img" class="navbar-brand" href="#">
                    <img id="navbar-imgs" src="/build/img/BeeMeet2.png" alt="Logo">
                </a>
                <div class="navbar-nav ms-auto">
                    <div class="nav-item dropdown">
                        <button class="navbar__profile-container nav-link profile-button" onclick="toggleMenu()">
                            <div id="user-menu" style="display: none;">
                                <a onclick="editarDatosPersonales()">Mis datos</a>
                                <a onclick="logout()">Cerrar sesión</a>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    </header>
    `;
}


var prueba2 = document.getElementById('footers');
prueba2.insertAdjacentHTML('beforeend', returnHTML2());

function returnHTML2() {
    return `
    <footer class="footer">
        <hr>
        <p class="copyright">Copyright. Todos los derechos reservados. BeeMeet © 2024</p>
    </footer>
    `;
}


// Selecciona el primer elemento con la clase 'navbar__profile-container'
var element = document.querySelector('.navbar__profile-container');

fetch(`/admin/getFotoPerfil`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
      element.style.backgroundImage = `url('${data.foto}')`;
      element.style.backgroundSize = "100% 100%"; // Abarca el 100% del ancho y ajusta la altura automáticamente
      element.style.backgroundRepeat = "no-repeat"; // No repetir la imagen
      element.style.backgroundPosition = "center center"; // Centrar la imagen
    }
    )
    .catch(error => {
      element.style.backgroundImage = "url('../img/usuario.webp')";
      element.style.backgroundSize = "100% 100%"; // Abarca el 100% del ancho y ajusta la altura automáticamente
      element.style.backgroundRepeat = "no-repeat"; // No repetir la imagen
      element.style.backgroundPosition = "center center"; // Centrar la imagen

        console.log(error);
    });





