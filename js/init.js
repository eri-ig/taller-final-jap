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

function showUserInformation() {// se utiliza para dejar el nombre del usuario plasmado en el dropdown
  const username = sessionStorage.getItem("username");
  if (username) {
      var userName = document.getElementById("welcome-message")
      userName.innerHTML = username;
  }
};

function aplicarTema(tema) {
    const navbar = document.querySelector('.navbar');
    const footer = document.querySelector('footer');
    const cards = document.querySelectorAll('.card'); // Selecciona todas las tarjetas

    if (tema === 'dark') {
        body.classList.add('bg-dark', 'text-white');
        body.classList.remove('bg-light', 'text-dark');

        if (navbar) {
            navbar.classList.add('bg-dark', 'text-white');
            navbar.classList.remove('bg-light', 'text-dark');
        }
        if (footer) {
            footer.classList.add('bg-dark', 'text-white');
            footer.classList.remove('bg-light', 'text-dark');
        }

        cards.forEach(card => {//tema oscuro para las tarjetas
            card.classList.add('bg-dark', 'text-white');
            card.classList.remove('bg-light', 'text-dark');
        });

    } else {
        body.classList.add('bg-light', 'text-dark');
        body.classList.remove('bg-dark', 'text-white');

        if (navbar) {
            navbar.classList.add('bg-light', 'text-dark');
            navbar.classList.remove('bg-dark', 'text-white');
        }
        if (footer) {
            footer.classList.add('bg-light', 'text-dark');
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

