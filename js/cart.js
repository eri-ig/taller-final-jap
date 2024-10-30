// cart.js

// Inicializar el carrito como un Map
let ProductosCarrito = new Map();

// Función para cargar el carrito desde localStorage
function cargarCarrito() {
    const jsoncarritoCargado = localStorage.getItem("claveProductoCarrito");
    const carritoCargado = JSON.parse(jsoncarritoCargado);
    if (carritoCargado != null)
        ProductosCarrito = new Map(carritoCargado);
}

// Cargar el carrito al iniciar
cargarCarrito();

// Función para guardar el carrito en localStorage
function guardarCarrito() {
    const mapAsArray = Array.from(ProductosCarrito.entries());
    localStorage.setItem("claveProductoCarrito", JSON.stringify(mapAsArray));
}

// Función para agregar un producto al carrito
function agregarProductoAlCarrito(id, nombre, imagen, precio) {
    id = parseInt(id); // Asegurarse de que el ID sea un número

    // Verificar si el producto ya está en el carrito
    if (ProductosCarrito.has(id)) {
        const productoExistente = ProductosCarrito.get(id);
        productoExistente.quantity += 1;
        ProductosCarrito.set(id, productoExistente);
    } else {
        const productoAgregar = {
            id: id,
            image: imagen,
            price: precio,
            name: nombre,
            quantity: 1
        };
        ProductosCarrito.set(id, productoAgregar);
    }
    guardarCarrito();
    mostrarCarrito(); // Actualiza el offcanvas y cart.html
}

// Función para mostrar el carrito en el offcanvas y cart.html
function mostrarCarrito() {
    // Actualizar el offcanvas
    const offcanvasCartItems = document.querySelector("#offcanvasCarrito #cartItems");
    if (offcanvasCartItems) {
        offcanvasCartItems.innerHTML = ""; // Limpia el carrito del offcanvas

        let totalOffcanvas = 0; // Inicializar el total

        for (let [id, item] of ProductosCarrito.entries()) {
            const itemDeLista = document.createElement("li");
            itemDeLista.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center", "lista-personalizada", "item-carrito");

            // Contenido del producto
            itemDeLista.innerHTML = `
                <div class="d-flex align-items-center">
                    <img src="${item.image}" alt="${item.name}" class="product-img">
                    <div>
                        <strong>${item.name}</strong>
                        <br>
                        <small>Precio: $${item.price.toFixed(2)}</small>
                        <div class="d-flex align-items-center mt-1">
                            <button class="btn btn-outline-secondary btn-sm" onclick="cambiarCantidad(${item.id}, -1)">-</button>
                            <span class="mx-2">${item.quantity}</span>
                            <button class="btn btn-outline-secondary btn-sm" onclick="cambiarCantidad(${item.id}, 1)">+</button>
                        </div>
                    </div>
                </div>
                <div class="text-end">
                    <span class="badge badge-personalizado rounded-pill">$${(item.price * item.quantity).toFixed(2)}</span>
                    <button class="btn btn-danger btn-sm ms-2" onclick="removeItem(${item.id})">
                        <i class="mdi mdi-trash-can-outline"></i>
                    </button>
                </div>
            `;
            offcanvasCartItems.appendChild(itemDeLista);

            // Sumar al total
            totalOffcanvas += item.price * item.quantity;
        }

        // Actualizar el total en el offcanvas
        const totalAmountElement = document.querySelector("#offcanvasCarrito #totalOffcanvas");
        if (totalAmountElement) {
            totalAmountElement.textContent = totalOffcanvas.toFixed(2);
        }
    }
}

    // Actualizar la página cart.html
    const cartItemsPage = document.getElementById("cartItems");
    if (cartItemsPage && !document.querySelector("#offcanvasCarrito")) {
        cartItemsPage.innerHTML = ""; // Limpia el carrito en cart.html

        for (let [id, producto] of ProductosCarrito.entries()) {
            // Generar las opciones del select para la cantidad
            let opciones = '';
            for (let i = 1; i <= 10; i++) {
                opciones += `<option value="${i}" ${producto.quantity === i ? 'selected' : ''}>${i}</option>`;
            }

            // Crear el elemento div con la estructura proporcionada
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('card', 'mb-3');

            itemDiv.innerHTML = `
        <div class="card-body">
  <div class="d-flex align-items-start bottom pb-3">
    <div class="me-4">
      <img src="${producto.image}" alt="${producto.name}" class="avatar-lg rounded">
    </div>
    <div class="flex-grow-1 align-self-center overflow-hidden">
      <h5 class="text-truncate font-size-18"><a href="#" class="text-dark">${producto.name}</a></h5>
      <p class="text-muted mb-2">Precio</p>
      <h5>$${producto.price.toFixed(2)}</h5>
    </div>
    <div class="flex-shrink-0 ms-2">
      <ul class="list-inline mb-0 font-size-16">
        <li class="list-inline-item">
          <button class="btn btn-danger btn-sm" onclick="removeItem(${producto.id})">
            <i class="mdi mdi-trash-can-outline"></i>
          </button>
        </li>
        <li class="list-inline-item">
          <button class="btn btn-outline-secondary btn-sm">
            <i class="mdi mdi-heart-outline"></i>
          </button>
        </li>
      </ul>
    </div>
  </div>
  <div class="row">
    <div class="col-md-5 mt-3">
      <p class="text-muted mb-2">Cantidad</p>
      <div class="d-inline-flex">
        <select class="form-select form-select-sm w-xl" onchange="cambiarCantidadSelect(${producto.id}, this.value)">
          ${opciones}
        </select>
      </div>
    </div>
  </div>
</div>
      `;

            cartItemsPage.appendChild(itemDiv);
        }

        // Actualizar los totales en cart.html
        actualizacionTotalPagina();
    }


// Función para cambiar la cantidad de un producto
function cambiarCantidad(id, delta) {
    id = parseInt(id); // Asegurarse de que el ID sea un número

    if (ProductosCarrito.has(id)) {
        const item = ProductosCarrito.get(id);
        item.quantity = Math.max(1, item.quantity + delta);
        ProductosCarrito.set(id, item);
        guardarCarrito();
        mostrarCarrito();
    }
}

// Función para cambiar la cantidad desde el select en cart.html
function cambiarCantidadSelect(id, nuevaCantidad) {
    id = parseInt(id);
    nuevaCantidad = parseInt(nuevaCantidad);

    if (ProductosCarrito.has(id)) {
        const item = ProductosCarrito.get(id);
        item.quantity = nuevaCantidad;
        ProductosCarrito.set(id, item);
        guardarCarrito();
        mostrarCarrito();
    }
}

// Función para eliminar un producto del carrito
function removeItem(id) {
    id = parseInt(id); // Asegurarse de que el ID sea un número

    ProductosCarrito.delete(id);
    guardarCarrito();
    mostrarCarrito();
}

// Función para actualizar el total en la página cart.html
function actualizacionTotalPagina() {
    let subtotal = 0;
    for (let item of ProductosCarrito.values()) {
        subtotal += item.price * item.quantity;
    }
    const subtotalElement = document.getElementById("subtotal");
    if (subtotalElement) {
        subtotalElement.textContent = subtotal.toFixed(2);
    }
    // Aquí puedes calcular y actualizar el descuento, envío, impuestos, etc.
    const discountElement = document.getElementById("discount");
    if (discountElement) {
        discountElement.textContent = "0"; // Ajusta según tus cálculos
    }
    const shippingElement = document.getElementById("shipping");
    if (shippingElement) {
        shippingElement.textContent = "0"; // Ajusta según tus cálculos
    }
    const taxElement = document.getElementById("tax");
    if (taxElement) {
        taxElement.textContent = "0"; // Ajusta según tus cálculos
    }
    const totalElement = document.getElementById("total");
    if (totalElement) {
        totalElement.textContent = subtotal.toFixed(2); // Ajusta según tus cálculos
    }
}

// Función para proceder al pago
function procederAlPago() {
    window.location.href = 'cart.html'; // Asegúrate de tener esta página creada
}

// Función para actualizar el contador del carrito en el navbar
function actualizarContadorCarrito() {
    const cartCountElement = document.getElementById("cart-count");
    if (cartCountElement) {
        let totalItems = 0;
        for (let item of ProductosCarrito.values()) {
            totalItems += item.quantity;
        }
        cartCountElement.textContent = totalItems;
    }
}

// Inicializar el carrito al cargar la página
document.addEventListener('DOMContentLoaded', function () {
    mostrarCarrito();
});
