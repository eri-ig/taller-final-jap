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

  products.forEach(products => {
    const productCard = `
        <div class="col">
          <div class="card shadow-sm">
          <img src="${products.image}" alt="${products.name}" class="productImage">
            <div class="card-body">
            <h3 class="tituloProducto">${products.name}</h3>
            <p class="productoPrecio">${products.cost} USD</p>
              <p class="card-text">${products.description}</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button type="button" class="btn btn-sm btn-outline-secondary">Comprar</button>
                  <button id="like_btn${products.id}" type="button" class="btn btn-sm btn-outline-secondary"><span>♥</span></button>
                </div>
                <small class="text-body-secondary" style="font-size: x-small;"> Vendidos ${products.soldCount} hasta el momento </small>
              </div>
            </div>
          </div>
        </div>
            `;
    productGrid.innerHTML += productCard;
  });
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