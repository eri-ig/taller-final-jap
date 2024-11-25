const CATEGORIES_URL = "http://localhost:3000/cats";
const PUBLISH_PRODUCT_URL = "http://localhost:3000/sell/publish";
const PRODUCTS_URL = "http://localhost:3000/cats_products";
const PRODUCT_INFO_URL =  "http://localhost:3000/products";
const PRODUCT_INFO_COMMENTS_URL = "http://localhost:3000/products_comments";
const CART_INFO_URL = "http://localhost:3000/user_cart";
const CART_BUY_URL = "http://localhost:3000/cart";
const EXT_TYPE = ".json";
const darkModeSwitch = document.getElementById('darkModeSwitch');
const body = document.body;
const btnCerrar = document.getElementById("cerrar_session");

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

function cargarImagenDePerfil() {
  const img = document.getElementById("imagenPerfil");
  const imagenGuardada = localStorage.getItem('imagenGuardada');

  if (img && imagenGuardada) {
    img.src = imagenGuardada;
  }
}
document.addEventListener('DOMContentLoaded',()=>{
  cargarImagenDePerfil();
  showUserInformation();
  inicializarModoOscuro();
});

// (#+_+) recuperar datos del almacenamiento //

function showUserInformation() {
  const username = sessionStorage.getItem("email");
  const welcomeMessage = document.getElementById("welcome-message");
  
  if (localStorage.getItem("nombre")) {
      welcomeMessage.innerHTML = localStorage.getItem("nombre");
  } else {
    if (username) {
    const userName = document.getElementById("welcome-message")
    userName.innerHTML = username;
}}
  
};

function aplicarTema(tema) {
    if (tema === 'dark') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}

function guardarPreferencia(tema) {
    localStorage.setItem('tema', tema);
}

function cargarTemaGuardado() {
    const temaGuardado = localStorage.getItem('tema');
    if (temaGuardado) {
        aplicarTema(temaGuardado);
        if (darkModeSwitch) {
            darkModeSwitch.checked = (temaGuardado === 'dark');
        }
    }
}

function inicializarModoOscuro() {
    if (darkModeSwitch) {
        darkModeSwitch.addEventListener('change', () => {
            if (darkModeSwitch.checked) {
                aplicarTema('dark');
                guardarPreferencia('dark');
            } else {
                aplicarTema('light');
                guardarPreferencia('light');
            }
        });
    }
    cargarTemaGuardado();
}

function cerrarSesion(){
// ✖‿✖  Elimina todos los datos del perfil al cerrar sesion//
    localStorage.removeItem("nombre");
    localStorage.removeItem("segundoNombre");
    localStorage.removeItem("apellido");
    localStorage.removeItem("segundoApellido");
    localStorage.removeItem("email");
    localStorage.removeItem("telefono");
    localStorage.removeItem("imagenGuardada");
// elimina los datos de sessionStorage //
sessionStorage.removeItem("username");

// redirige a la pagina de inicio de sesision//
window.location.href = "login.html";
}

//Evento para evitar que el offcanvas del carrito redirija a la pagina del carrito automaticamente
document.addEventListener("DOMContentLoaded", function () {
const cartLink = document.querySelector(".nav-link[data-bs-toggle='offcanvas']");
const offcanvasCart = document.getElementById("offcanvasCart");
});