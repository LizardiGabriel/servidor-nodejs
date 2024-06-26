var ejemplo = document.getElementById('headers');
ejemplo.insertAdjacentHTML('beforeend', returnHTML());

function returnHTML() {
  console.log(window.location.pathname);
  //Escanear QR
  let optionQR = `<div id="" class="sidebar__menu-option" onclick="scannerQR()">`
  //Visualizar agenda del día
  let optionAgenda = `<div id="" class="sidebar__menu-option" onclick="agendaDelDia()">`

  if (window.location.pathname == "/seguridad/escanearQR.html") {
    optionQR = `<div id="" class="sidebar__menu-option option__active" onclick="scannerQR()">`
  } else if (window.location.pathname == "/seguridad/visualizarAgenda.html") {
    optionAgenda = `<div id="" class="sidebar__menu-option option__active" onclick="agendaDelDia()">`
  }

  return `
    <nav class="sidebar close">
        <div class="header">
            <div class="sidebar__marca">
            <a href="/seguridad/seguridad.html">
                <div class="sidebar__imagen" onclick="homeSeguridad()">
                    <img src="/img/BeeMeet2.png" alt="Logo">
                </div>
            </a>
                <div class="sidebar__texto">
                    <p class="sidebar__texto-marca">BeeMeet</p>
                    <p class="sidebar__texto-slogan">Seguridad</p>
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
        <div id="sidebar__list" class="sidebar__menu" style="grid-template-columns:repeat(2, 6rem)">
            ${optionQR}
                <div class="icon" title="Escanear QR">
                    <svg fill="#F9D8C1" x="0" y="0" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                        class="bi bi-qr-code-scan" viewBox="0 0 16 16">
                        <path
                            d="M0 .5A.5.5 0 0 1 .5 0h3a.5.5 0 0 1 0 1H1v2.5a.5.5 0 0 1-1 0zm12 0a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0V1h-2.5a.5.5 0 0 1-.5-.5M.5 12a.5.5 0 0 1 .5.5V15h2.5a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1 0-1H15v-2.5a.5.5 0 0 1 .5-.5M4 4h1v1H4z" />
                        <path d="M7 2H2v5h5zM3 3h3v3H3zm2 8H4v1h1z" />
                        <path d="M7 9H2v5h5zm-4 1h3v3H3zm8-6h1v1h-1z" />
                        <path
                            d="M9 2h5v5H9zm1 1v3h3V3zM8 8v2h1v1H8v1h2v-2h1v2h1v-1h2v-1h-3V8zm2 2H9V9h1zm4 2h-1v1h-2v1h3zm-4 2v-1H8v1z" />
                        <path d="M12 9h2V8h-2z" />
                    </svg>

                </div>
                <div>
                    <p class="option__text">Escanear QR</p>
                </div>
            </div>
            ${optionAgenda}
                <div class="icon" title="Visualizar Agenda">
                    <svg fill="#F9D8C1" x="0" y="0" xmlns="http://www.w3.org/2000/svg"  fill="currentColor"
                        class="bi bi-person-lines-fill" viewBox="0 0 16 16">
                        <path
                            d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z" />
                    </svg>
                </div>
                <div>
                    <p class="option__text">Visualizar Agenda</p>
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
                    <img id="navbar-imgs" src="../../img/BeeMeet2.png" alt="Logo">
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

fetch(`/seguridad/getFotoPerfil`)
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





