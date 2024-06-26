var ejemplo = document.getElementById('headers');
ejemplo.insertAdjacentHTML('beforeend', returnHTML());

function returnHTML() {
  console.log(window.location.pathname);
  //Reuniones pendientes
  let optionPendientes = `<div id="" class="sidebar__menu-option" onclick="reunionesPendientes();">`;

  //Reuniones agendadas
  let optionAgendada = `<div id="" class="sidebar__menu-option" onclick="reunionesAgendadas();">`;

  //Para ver sus datos en el header
  let optionPerfil = `<a href="mis-datos.html">Mis datos</a>`

  //Ponemos activo la opción en la que se encuentra
  if (window.location.pathname == "/invitado/home/pendientes.html" || window.location.pathname == "/invitado/home/aceptarReunion") {
    optionPendientes = `<div id="" class="sidebar__menu-option option__active" onclick="reunionesPendientes();">`
  } else if (window.location.pathname == "/invitado/home/agendadas.html") {
    optionAgendada = `<div id="" class="sidebar__menu-option option__active" onclick="reunionesAgendadas();">`
  } else if (window.location.pathname == "/invitado/invitacion.html" || window.location.pathname == "/invitado/cambiarContrasena.html") {
    optionPendientes = `<div id="" style="display:none" class="sidebar__menu-option option__active" onclick="reunionesAgendadas();">`
    optionAgendada = `<div id="" style="display:none" class="sidebar__menu-option option__active" onclick="reunionesAgendadas();`
    optionPerfil = ``
  }

    return `
        <nav class="sidebar close">
    <div class="header">
        <div class="sidebar__marca">
            <div class="sidebar__imagen" onclick="homeInvitado()">
                <img src="../../img/BeeMeet2.png" alt="Logo">
            </div>
            <div class="sidebar__texto">
                <p class="sidebar__texto-marca">BeeMeet</p>
                <p class="sidebar__texto-slogan">Invitado</p>
            </div>
        </div>
        <div class="sidebar__arrow toggle">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill=#FFFFFF
                 class="bi bi-arrow-right-short" viewBox="0 0 16 16">
                <path fill-rule="evenodd"
                      d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8" />
            </svg>
        </div>
    </div>
    <div id="sidebar__list" class="sidebar__menu"  style="grid-template-columns:repeat(2, 6rem)">
    
        ${optionPendientes}
            <div class="icon st0" title="Reuniones Pendientes">
                <svg fill="#F9D8C1" x="0px" y="0" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                     class="bi bi-clipboard2-fill" viewBox="0 0 16 16">
                    <path
                            d="M9.5 0a.5.5 0 0 1 .5.5.5.5 0 0 0 .5.5.5.5 0 0 1 .5.5V2a.5.5 0 0 1-.5.5h-5A.5.5 0 0 1 5 2v-.5a.5.5 0 0 1 .5-.5.5.5 0 0 0 .5-.5.5.5 0 0 1 .5-.5z" />
                    <path
                            d="M3.5 1h.585A1.5 1.5 0 0 0 4 1.5V2a1.5 1.5 0 0 0 1.5 1.5h5A1.5 1.5 0 0 0 12 2v-.5q-.001-.264-.085-.5h.585A1.5 1.5 0 0 1 14 2.5v12a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-12A1.5 1.5 0 0 1 3.5 1" />
                </svg>

            </div>
            <div>
                <p class="option__text">Reuniones Pendientes</p>
            </div>
        </div>
        
        ${optionAgendada}
            <div class="icon" title="Reuniones Agendadas">
                <svg fill="#F9D8C1" x="0" y="0" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                     class="bi bi-qr-code" viewBox="0 0 16 16">
                    <path d="M2 2h2v2H2z" />
                    <path d="M6 0v6H0V0zM5 1H1v4h4zM4 12H2v2h2z" />
                    <path d="M6 10v6H0v-6zm-5 1v4h4v-4zm11-9h2v2h-2z" />
                    <path
                            d="M10 0v6h6V0zm5 1v4h-4V1zM8 1V0h1v2H8v2H7V1zm0 5V4h1v2zM6 8V7h1V6h1v2h1V7h5v1h-4v1H7V8zm0 0v1H2V8H1v1H0V7h3v1zm10 1h-1V7h1zm-1 0h-1v2h2v-1h-1zm-4 0h2v1h-1v1h-1zm2 3v-1h-1v1h-1v1H9v1h3v-2zm0 0h3v1h-2v1h-1zm-4-1v1h1v-2H7v1z" />
                    <path d="M7 12h1v3h4v1H7zm9 2v2h-3v-1h2v-1z" />
                </svg>

            </div>
            <div>
                <p class="option__text">Reuniones Agendadas</p>
            </div>
        </div>
        
        <!--
        <a href="/" >
        <div id="" class="sidebar__menu-option">
            <div class="icon" title="ConsultarReu">
                <svg fill="#F9D8C1" x="0" y="0" xmlns="http://www.w3.org/2000/svg"
                     xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 128 128"
                     style="enable-background:new 0 0 128 128;" xml:space="preserve">
                        <g>
                            <ellipse class="st0" cx="23.2" cy="47.4" rx="7.8" ry="7.8" />
                            <path class="st0" d="M37.4,97.5h-9.5c0,0-0.5,0-0.9,0c-4.3-0.4-8-3.5-9.1-7.8l-6.5-24.2c-0.4-1.4-1.8-2.1-3-1.8
                   c-1.4,0.4-2.1,1.8-1.8,3L13,90.9c1.7,6.3,7,10.9,13.5,11.4c0.6,0.1,1.3,0.1,1.3,0.1h9.5c1.4,0,2.4-1.1,2.5-2.5
                   C39.8,98.5,38.8,97.5,37.4,97.5z" />
                            <path class="st0" d="M48.6,83.9h-13c-0.3-4.9-1.1-9.8-2.3-14.7c-0.1-0.4-0.4-1.4-0.4-1.5c-1.7-6.3-7.7-10.3-14-9.7
                   c0,0-0.8,0.1-1,0.1c-2.3,0.6-3.7,3-3.1,5.4l6.7,24.9c0.7,2.8,3.1,4.9,6.1,5.1h0.6h15.5v17.8c0,2.7,2.1,4.9,4.9,4.9
                   c2.7,0,4.9-2.1,4.9-4.9V88.8c0-1.3-0.5-2.5-1.5-3.4C51.1,84.4,49.8,83.9,48.6,83.9z" />
                        </g>
                    <g>
                            <ellipse class="st0" cx="104.4" cy="47.5" rx="7.8" ry="7.8" />
                        <path class="st0"
                              d="M90.2,97.5h9.5c0,0,0.5,0,0.9,0c4.3-0.4,8-3.5,9.1-7.8l6.5-24.2c0.4-1.4,1.8-2.1,3-1.8c1.4,0.4,2.1,1.8,1.8,3
                   l-6.4,24.2c-1.7,6.3-7,10.9-13.5,11.4c-0.6,0.1-1.3,0.1-1.3,0.1h-9.5c-1.4,0-2.4-1.1-2.5-2.5C87.8,98.5,88.9,97.5,90.2,97.5z" />
                        <path class="st0" d="M79,83.9h13c0.3-4.9,1.1-9.8,2.3-14.7c0.1-0.4,0.4-1.4,0.4-1.5c1.7-6.3,7.7-10.3,14-9.7c0,0,0.8,0.1,1,0.1
                   c2.3,0.6,3.7,3,3.1,5.4L106,88.4c-0.7,2.8-3.1,4.9-6.1,5.1h-0.6H83.9v17.8c0,2.7-2.1,4.9-4.9,4.9s-4.9-2.1-4.9-4.9V88.8
                   c0-1.3,0.5-2.5,1.5-3.4C76.5,84.4,77.8,83.9,79,83.9z" />
                        </g>
                    <rect x="38.8" y="70.8" class="st0" width="50.6" height="6" />
                    <circle class="st0" cx="64.1" cy="43.2" r="7.2" />
                    <path class="st0" d="M52.5,67.9v-4.3h-0.1c0-0.5,0.4-0.9,0.9-0.9s0.9,0.4,0.9,0.9v4.3h19.9v-4.3H74c0-0.5,0.4-0.9,0.9-0.9
               s0.9,0.4,0.9,0.9v4.3H82v-6.1c0-5-4-9-9-9H55c-5,0-9,4-9,9v6.1H52.5z" />
                    </svg>

            </div>
            <div>
                <p class="option__text">Consultar Reunión</p>
            </div>
        </div>
        </a>
        -->
        
        
        <div class="option__indicator"></div>
    </div>
</nav>

<div id="blur" class=""></div>

<header>
    <nav class="navbar navbar-expand navbar-dark">
        <div class="container-fluid">
            <a id="navbar-img" class="navbar-brand" href="#">
                <img id="navbar-imgs" src="../../img/BeeMeet2.png" alt="Logo">
            </a>
            <div class="navbar-nav ms-auto">
                <div class="nav-item dropdown">
                    <button class="navbar__profile-container nav-link profile-button" onclick="toggleMenu()">
                        <div id="user-menu" style="display: none;">
                            ${optionPerfil}
                            <a href="#" onclick="logout()">Cerrar sesión</a>
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
    </footer>`;
}

var element = document.querySelector('.navbar__profile-container');

fetch(`/invitado/getFotoPerfil`)
.then(response => response.json())
.then(data => {
    console.log(data);
  element.style.backgroundImage = `url('${data.foto}')`;
  element.style.backgroundSize = "100% 100%"; // Abarca el 100% del ancho y ajusta la altura automáticamente
  element.style.backgroundRepeat = "no-repeat"; // No repetir la imagen
  element.style.backgroundPosition = "center center"; // Centrar la imagen
    console.log(element.style.backgroundImage);
}
)
.catch(error => {
  element.style.backgroundImage = "url('../img/usuario.webp')";
  element.style.backgroundSize = "100% 100%"; // Abarca el 100% del ancho y ajusta la altura automáticamente
  element.style.backgroundRepeat = "no-repeat"; // No repetir la imagen
  element.style.backgroundPosition = "center center"; // Centrar la imagen
    console.log(error);
});

/*function returnHTML2() {
    return `
        <footer class="footer">
    <div class="contenedor">
        <div class="beemeet">
            <div class="beemeet__logo">
                <img src="../../img/BeeMeet2.png" alt="Logo Beemeet">
            </div>
            <h3 class="beemeet__titulo">BeeMeet</h3>
        </div>
        <div class="usernames">
            <p>Equipo de BeeCoders:</p>
            <div class="usernames__container">
                <div class="usernames1">
                    <p>@RafaElJefe</p>
                    <p>@DianaLaConsejera</p>
                    <p>@CesarLaLechugaFresca</p>
                    <p>@LizardiElGranProgramador</p>
                    <p>@DaniBoyElFrontProgramador</p>
                    <p>@DiegoElCPC</p>
                </div>
                <div class="usernames2">
                    <p>@RorroElMusculoso</p>
                    <p>@LeoElCuadrado</p>
                    <p>@ToñitoElChispas</p>
                    <p>@AdoElBienPortado</p>
                    <p>@VallejoLaCreativa</p>
                    <p>@SaulElChambeador</p>
                </div>
            </div>
        </div>
    </div>
    <hr>
    <p class="copyright">Copyright. Todos los derechos reservados. BeeMeet © 2024</p>
</footer>
    `;
}*/