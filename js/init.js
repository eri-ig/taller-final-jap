const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
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
    const navbar = document.querySelector('.navbar');
    const footer = document.querySelector('footer');
    const cards = document.querySelectorAll('.card'); // Selecciona todas las tarjetas

    if (tema === 'dark') {
        body.classList.add('bg-dark', 'text-white');

        if (navbar) {
            navbar.classList.add('bg-dark', 'text-white');
        }
        if (footer) {
            footer.classList.add('bg-dark', 'text-white');
        }
        cards.forEach(card => {//tema oscuro para las tarjetas
            card.classList.add('bg-dark', 'text-white');   
        });

    } else {
       
        body.classList.remove('bg-dark', 'text-white');
        if (navbar) {  
            navbar.classList.remove('bg-dark', 'text-white');
        }
        if (footer) {  
            footer.classList.remove('bg-dark', 'text-white');
        }

        // quita tema oscuro
        cards.forEach(card => {
            card.classList.add('bg-light', 'text-dark');
            card.classList.remove('bg-dark', 'text-white');
        });
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
  btnCerrar.addEventListener('click', cerrarSesion);