var ejemplo = document.getElementById('headers');
ejemplo.insertAdjacentHTML('beforeend', returnHTML());

function returnHTML() {
  console.log(window.location.pathname);
  //Consultar Reunion
  let optionReuniones = `<div id="" class="sidebar__menu-option" onclick="refReuniones()">`
  //Agendar reunion
  let optionAgendar = `<div id="" class="sidebar__menu-option" onclick="reuniones2()">`
  //Salas
  let optionSalas = `<div id="" class="sidebar__menu-option" onclick="refSalas()">`
  //Home
  //let optionHome = `<div id="" class="sidebar__menu-option" onclick="home()">`

  //Ponemos activo la opción en la que se encuentra
  if (window.location.pathname == "/anfitrion/reuniones.html" || window.location.pathname == "/anfitrion/reuniones/ConsultarDatos.html") {
    optionReuniones = `<div id="" class="sidebar__menu-option option__active" onclick="refReuniones()">`
  } else if (window.location.pathname == "/anfitrion/crearReunion.html" || window.location.pathname == "/anfitrion/crearReunion") {
    optionAgendar = `<div id="" class="sidebar__menu-option option__active" onclick="reuniones2()">`
  } else if (window.location.pathname == "/anfitrion/salas.html") {
    optionSalas = `<div id="" class="sidebar__menu-option option__active" onclick="refSalas()">`
  }else if(window.location.pathname == "/anfitrion/anfitrion.html"){
    optionHome = `<div id=""  onclick="home()">`
  }

    return `
        <nav class="sidebar close">
        <div class="header">
            <div class="sidebar__marca">
                <div class="sidebar__imagen" onclick="homeAnfitrion()">
                    <img src="../../img/BeeMeet2.png" alt="Logo">
                </div>
                <div class="sidebar__texto">
                    <p class="sidebar__texto-marca">BeeMeet</p>
                    <p class="sidebar__texto-slogan">Anfitrión</p>
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
        <div id="sidebar__list" class="sidebar__menu" style="grid-template-columns:repeat(3, 6rem)">
            ${optionReuniones}
                <div class="icon" title="Consultar Reunión">
                    <svg fill="#F9D8C1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                        x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;"
                        xml:space="preserve">
                        <path class="st0"
                            d="M256,362.7c-47.1,0-85.3-38.2-85.3-85.3S208.9,192,256,192s85.3,38.2,85.3,85.3S303.1,362.7,256,362.7z
                            M384,448c0-35.3-28.7-64-64-64H192c-35.3,0-64,28.7-64,64v64h256V448z M384,170.7c-47.1,0-85.3-38.2-85.3-85.3S336.9,0,384,0
                            s85.3,38.2,85.3,85.3S431.1,170.7,384,170.7z M128,170.7c-47.1,0-85.3-38.2-85.3-85.3S80.9,0,128,0s85.3,38.2,85.3,85.3
                            S175.1,170.7,128,170.7z M128,277.3c0-31.5,11.7-61.9,32.8-85.3H64c-35.3,0-64,28.7-64,64v64h135.4C130.5,306.3,128,291.9,128,277.3
                            z M376.6,320H512v-64c0-35.3-28.7-64-64-64h-96.8C382.6,226.7,392.4,275.9,376.6,320L376.6,320z" />
                    </svg>

                </div>
                <div>
                    <p class="option__text">Consultar Reunión</p>
                </div>
            </div>
            ${optionAgendar}
                <div class="icon" title="Agendar Reunión">
                    <svg fill="#F9D8C1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 128 128" style="enable-background:new 0 0 128 128;" xml:space="preserve">
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
                    <p class="option__text">Agendar Reunión</p>
                </div>
            </div>
            ${optionSalas}
                <div class="icon" title="Salas">

                    <svg class="" aria-hidden="true" fill="#F9D8C1" viewBox="0 0 20 20">
                        <path fill-rule="evenodd"
                            d="M4 4a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2v14a1 1 0 1 1 0 2H5a1 1 0 1 1 0-2V5a1 1 0 0 1-1-1Zm5 2a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H9Zm5 0a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-1Zm-5 4a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1H9Zm5 0a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1h-1Zm-3 4a2 2 0 0 0-2 2v3h2v-3h2v3h2v-3a2 2 0 0 0-2-2h-2Z"
                            clip-rule="evenodd" />
                    </svg>

                </div>
                <div>
                    <p class="option__text">Salas</p>
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
                                <a href="#" onclick="window.location.href='/anfitrion/EditarDatosPersonales.html';">Mis datos</a>
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
    </footer>
    `;
}

var element = document.querySelector('.navbar__profile-container');

fetch(`/anfitrion/getFotoPerfil`)
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