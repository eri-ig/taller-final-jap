/* se crea un evento para agregar cada json segun su id y asi poder trabajar en cada categoría */

document.addEventListener('DOMContentLoaded', function () {
  const categoriaActual = localStorage.getItem("catID");/* se guarda el id actual */
  const PRODUCTOS_URL = `https://japceibal.github.io/emercado-api/cats_products/${categoriaActual}.json`/* se busca el json con el id actual */

  fetch(PRODUCTOS_URL)
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      } return response.json();
    })
    .then(data => {
      const products = data.products;

      console.log("Datos recibidos: ", data);//para ver en consola si me cargaron bien los datos(paranoia en todo su esplendor)

      cards(products, data.catName);

      implementSearch(products);
    })
    .catch(error => {
      console.error(error)
    });
});

/* Se comienza con las categorias */
function cards(products, catName) {

  /*Segun la categoria se le asigna un titulo y una descripción */
  const pageTitle = document.getElementById('productTitle')
  const pageDescription = document.getElementById('description')
  const productGrid = document.getElementById('containerDiv')

  pageTitle.innerHTML = catName;
  if (catName == "Autos") {
    pageDescription.innerHTML = `Descubre los autos más vendidos del año, conocidos por su calidad y seguridad. Encuentra el tuyo hoy.`
  } else if (catName == "Juguetes") {
    pageDescription.innerHTML = `Descubre los juguetes más vendidos del año, reconocidos por su calidad. ¡Encuentra el perfecto para ti hoy!`
  } else {
    pageDescription.innerHTML = `Explora los muebles más vendidos del año, famosos por su durabilidad y estilo. ¡Encuentra el ideal para tu hogar hoy!`
  };

  productGrid.innerHTML = '';

  /* comienzan las tarjetas de productos */

  products.forEach(product => {
    const productCard = `
        <div class="col" id="product${product.id}">
            <div class="card shadow-sm bg-light-mode">
                <img src="${product.image}" alt="${product.name}" class="productImage">
                <div class="card-body">
                    <h3 class="tituloProducto text-black">${product.name}</h3>
                    <p class="productoPrecio text-black">${product.cost} USD</p>
                    <p class="card-text text-black">${product.description}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                            <button type="button" class="btn btn-sm btn-outline-secondary text-black" id="btnComprar" >Comprar</button>
                        </div>
                        <small class="text-body-secondary text-black" style="font-size: x-small;"> Vendidos ${product.soldCount} hasta el momento </small>
                    </div>
                </div>
            </div>
        </div>
    `;
    productGrid.innerHTML += productCard;
  });
  setProductOnClickListener();
}


/* Función para hacer la búsqueda en tiempo real */
function implementSearch(products) {
  const searchInput = document.getElementById('search');

  searchInput.addEventListener('input', function () {
    const searchText = this.value.toLowerCase();

    // Filtrar productos según el título o descripción
    const filteredProducts = products.filter(product => {
      return product.name.toLowerCase().includes(searchText) ||
        product.description.toLowerCase().includes(searchText);
    });

    // Mostrar solo los productos filtrados
    cards(filteredProducts, document.getElementById('productTitle').innerHTML);
  });
}
/* funcion para que al clickear un producto se guarde el id del producto */
function setProductOnClickListener() {

  const productDivs = document.querySelectorAll('div[id^="product"]');/* guarde en la constante una lista de div que su id inicie con product */

  productDivs.forEach(div => {/* para cada div se le añade un escuchador para que al hacer click cada id se guarde en el localStorage,se utiliza substring para acceder correctamente al ID proporcionado por el Json */
    div.addEventListener("click", function () {
      localStorage.setItem("productId", div.id.substring(7));
      document.location = "product-info.html" /* te envia directamente a la pagina product-info */
    })
  });
}

//Filtros

document.addEventListener('DOMContentLoaded', function () {
  const categoriaActual = localStorage.getItem("catID");
  const PRODUCTOS_URL = `https://japceibal.github.io/emercado-api/cats_products/${categoriaActual}.json`;

  fetch(PRODUCTOS_URL)
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then(data => {
      const products = data.products;
      cards(products, data.catName);

      implementSearch(products);
      implementFilterAndSort(products);
    })
    .catch(error => {
      console.error(error);
    });
});

function implementFilterAndSort(products) {
  const applyFilterButton = document.getElementById('applyFilter');
  const sortOrderSelect = document.getElementById('sortOrder');

  applyFilterButton.addEventListener('click', function () {
    const minPrice = parseFloat(document.getElementById('minPrice').value) || 0;
    const maxPrice = parseFloat(document.getElementById('maxPrice').value) || Infinity;

    const filteredProducts = products.filter(product => product.cost >= minPrice && product.cost <= maxPrice);
    cards(filteredProducts, document.getElementById('productTitle').innerHTML);
  });

  sortOrderSelect.addEventListener('change', function () {
    const selectedOrder = this.value;
    let sortedProducts = [...products];

    if (selectedOrder === "asc") {
      sortedProducts.sort((a, b) => a.cost - b.cost);
    } else if (selectedOrder === "desc") {
      sortedProducts.sort((a, b) => b.cost - a.cost);
    } else if (selectedOrder === "sold") {
      sortedProducts.sort((a, b) => b.soldCount - a.soldCount);
    }

    cards(sortedProducts, document.getElementById('productTitle').innerHTML);
  });
}

function implementSearch(products) {
  const searchInput = document.getElementById('search');

  searchInput.addEventListener('input', function () {
    const searchText = this.value.toLowerCase();

    const filteredProducts = products.filter(product => {
      return product.name.toLowerCase().includes(searchText) ||
        product.description.toLowerCase().includes(searchText);
    });

    cards(filteredProducts, document.getElementById('productTitle').innerHTML);
  });
}

//Fin filtros