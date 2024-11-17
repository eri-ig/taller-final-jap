// usamos un Map para almacenar los productos. utilizamos map porque nos da la misma ventaja del localstorage de guardar clave- valor
let ProductosCarrito = new Map();

//cargar el carrito desde el localStorage 
function cargarCarrito() {
    const jsoncarritoCargado = localStorage.getItem("claveProductoCarrito");// obtenemos el carrito del localStorage usando la clave "claveProductoCarrito"
    const carritoCargado = JSON.parse(jsoncarritoCargado);// convertimos el json en un objeto de js
    
    if (carritoCargado != null) {// si hay datos en el carrito los cargamos en nuestro Map
        ProductosCarrito = new Map(carritoCargado);
    }
    mostrarCarrito();// mostramos el carrito 
    actualizarBadgeCarrito(); //Actualizamos el badge
}

function guardarCarrito() {// guardamos el estado actual del carrito en localStorage
    const mapAsArray = Array.from(ProductosCarrito.entries());// convertimos el Map a un array para poder serializarlo en json
    localStorage.setItem("claveProductoCarrito", JSON.stringify(mapAsArray));// guardamos el carrito en localStorage 
}

//Funcion para actualizar el badge
function actualizarBadgeCarrito() {
    let totalProductos = 0;

    //Contamos la cantidad de cada producto en el carrito
    ProductosCarrito.forEach(producto => {
        totalProductos += producto.quantity;
    });
    //Actualizamos el badge con el total
    const badgeCarrito = document.getElementById("cart-count");
    const badgeCarritoDropdown = document.getElementById("cart-count-dropdown");

    if (badgeCarrito) {
        badgeCarrito.textContent = totalProductos;
    }
    if (badgeCarritoDropdown) {
        badgeCarritoDropdown.textContent = totalProductos;
    }
}

function agregarProductoAlCarrito(id, nombre, imagen, precio) {//agregar un producto al carrito
    id = parseInt(id);//  el id y el precio deben ser del tipo correcto
    precio = parseFloat(precio);
        
    if (ProductosCarrito.has(id)) {//si el producto ya existe en el carrito
        const productoExistente = ProductosCarrito.get(id);
        productoExistente.quantity += 1;//si existe incrementamos la cantidad en 1
        ProductosCarrito.set(id, productoExistente);
    } else {
        // Si no creamos un nuevo objeto de producto con cantidad 1
        const productoAgregar = {
            id: id,
            name: nombre,
            image: imagen,
            price: precio,
            quantity: 1
        };
        
        ProductosCarrito.set(id, productoAgregar);//añadimos el producto al carrito
    }
    guardarCarrito();//guardamos  en el localStorage
    mostrarCarrito();//actualizamos el carrito
    actualizarBadgeCarrito(); //Llamamos a la funcion para que se actualice el badge
}


function mostrarCarrito() {//para mostrar el carrito en el offcanvas y cart.html
    const offcanvasCartItems = document.getElementById("offcanvasCartItems"); //manejamos la visualización en el offcanvas
    const totalOffcanvasElement = document.getElementById("totalOffcanvas");
    
    if (offcanvasCartItems && totalOffcanvasElement) {// verificamos que los elementos existan
        offcanvasCartItems.innerHTML = ""; // limpiamos el contenido actual del offcanvas

        let totalOffcanvas = 0; // creamos variable para guardar el total en el offcanvas

        
        ProductosCarrito.forEach(item => {//para cada producto en el carrito
            const itemDeLista = document.createElement("li");// creamos un <li> y le añadimos clases
            itemDeLista.classList.add("list-group-item", "offcanvas-item-carrito");

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
            
            offcanvasCartItems.appendChild(itemDeLista);// añadimos el producto al offcanvas

            // se calcula el total acumulado
            totalOffcanvas += item.price * item.quantity;
        });

        totalOffcanvasElement.textContent = totalOffcanvas.toFixed(2); // se actualiza el total en el offcanvas
    }

    // ahora pasamos a cart.html
    const cartItemsPage = document.getElementById("cartItems");
    const subtotalElement = document.getElementById("subtotal");
    const discountElement = document.getElementById("discount");
    const shippingElement = document.getElementById("shipping");
    const taxElement = document.getElementById("tax");
    const totalElement = document.getElementById("total");

    if (cartItemsPage && subtotalElement && discountElement && shippingElement && taxElement && totalElement) { //si los elementos necesarios existen 
        cartItemsPage.innerHTML = ""; // limpiamos el contenido actual de la pagina 
        if (ProductosCarrito.size === 0) { // verificar si no hay productos
            const emptyMessage = document.createElement('div'); // creamos un div para el mensaje
            emptyMessage.style.background = 'rgb(255, 186, 122)'; // Establecer el fondo
            emptyMessage.style.padding = '6px'; // Agregar padding para espacio
            emptyMessage.style.borderRadius = '5px'; // Bordes redondeados
            emptyMessage.style.textAlign = 'center'; // Centrar el texto
        
            emptyMessage.innerHTML = '<p class="text-muted" style="font-size:20px;">UY!...al parecer no hay ningun producto agregado en el carrito.</p>'; // texto que se mostrará
            cartItemsPage.appendChild(emptyMessage); // agregamos el mensaje a la página
        } else {
            ProductosCarrito.forEach(producto => { // para cada producto
                let opciones = ''; //hacemos las opciones para el selector de cantidad
                for (let i = 1; i <= 10; i++) {
                    opciones += `<option value="${i}" ${producto.quantity === i ? 'selected' : ''}>${i}</option>`; //le agregamos la cantidad a seleccionar y a la seleccionada le ponemos la clase select
                }
                const itemDiv = document.createElement('div'); // se crea una tarjeta para cada producto y le ponemos clases
                itemDiv.classList.add('card', 'mb-3', 'cart-item');
    
                itemDiv.innerHTML = `
                    <div class="card-body">
                        <div class="d-flex align-items-start bottom pb-3">
                            <div class="me-4">
                                <img src="${producto.image}" alt="${producto.name}" class="avatar-lg rounded">
                            </div>
                            <div class="flex-grow-1 align-self-center overflow-hidden">
                                <h5 class="text-truncate font-size-18"><a href="#" class="text">${producto.name}</a></h5>
                                <p class="text-muted mb-2">Precio</p>
                                <h5>$${producto.price.toFixed(2)}</h5>
                            </div>
                        <div class="d-flex align-items-center flex-shrink-0 ms-2">
                                <div>
                                    <p class="text-muted mb-2">Cantidad</p>
                                    <select class="form-select form-select-sm w-auto" onchange="cambiarCantidadSelect(${producto.id}, this.value)">
                                        ${opciones}
                                    </select>
                                </div>
                                <button class="btn btn-danger btn-sm ms-4" onclick="removeItem(${producto.id})">
                                    <i class="mdi mdi-trash-can-outline"></i>
                                </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
    
                cartItemsPage.appendChild(itemDiv); //añadimos la tarjeta 
            });
        }

        
        let subtotal = 0;//calculamos el subtotal multiplicando el precio de todos los productos por la cantidad
        ProductosCarrito.forEach(item => {
            subtotal += item.price * item.quantity;
        });
        subtotalElement.textContent = subtotal.toFixed(2);//actualizamos los elementos  en la página del carrito
        totalElement.textContent = subtotal.toFixed(2); 
    }
}


function cambiarCantidad(id, delta) {//para cambiar la cantidad de un producto usando los botones + o - 
    id = parseInt(id);//se conviertye el id en entero
    
    if (ProductosCarrito.has(id)) {//vemos si el producto existe en el carrito
        const item = ProductosCarrito.get(id);
        item.quantity = Math.max(1, item.quantity + delta);//actualizamos la cantidad gracias al parametro delta y la cantidad no puede ser menor que 1
        ProductosCarrito.set(id, item);//guardamos los cambios en el carrito
        
        guardarCarrito();
        mostrarCarrito();
        actualizarBadgeCarrito(); //Actualizamos el badge
        actualizarCostos(); //Actualizamos los costos segun la opcion de envio
    }
}

// Función para cambiar la cantidad de un producto desde el selector en cart.html
function cambiarCantidadSelect(id, nuevaCantidad) {
    // Convertimos el id y la nueva cantidad a enteros
    id = parseInt(id);
    nuevaCantidad = parseInt(nuevaCantidad);
    // Verificamos si el producto existe en el carrito
    if (ProductosCarrito.has(id)) {
        const item = ProductosCarrito.get(id);
        // Actualizamos la cantidad según la selección del usuario
        item.quantity = nuevaCantidad;
        // Guardamos los cambios en el carrito
        ProductosCarrito.set(id, item);
        guardarCarrito();
        // Actualizamos la visualización del carrito
        mostrarCarrito();
        actualizarBadgeCarrito(); //Actualizamos el badge
        actualizarCostos(); //Actualizamos los costos segun la opcion de envio
    }
}

function removeItem(id) {//para eliminar un producto del carrito   
    id = parseInt(id); // convertimos el id a entero
    
    if (ProductosCarrito.has(id)) {//si el producto existe en el carrito
        ProductosCarrito.delete(id);//eliminamos el producto del carrito
        
        guardarCarrito();
        mostrarCarrito();
        actualizarBadgeCarrito(); //Actualizamos el badge
        actualizarCostos(); //Actualizamos los costos segun la opcion de envio
    }
}

function procederAlPago() {
    window.location.href = 'cart.html';
}

document.addEventListener('DOMContentLoaded', function () {
    cargarCarrito();
});

//Funcion para ocultar el contenido de los formularios
function toggleSection(element) {
    var content = element.nextElementSibling;
    if (content.style.display === "block") {
        content.style.display = "none";
    } else {
        content.style.display = "block";
    }
}

//Variables para la seccion de "Costos" (agrego tambien descuentos e impuestos)
let cartItemsPage = document.getElementById("cartItems");
let subtotalElement = document.getElementById("subtotal");
let discountElement = document.getElementById("discount");
let shippingElement = document.getElementById("shipping");
let taxElement = document.getElementById("tax");
let totalElement = document.getElementById("total");

const porcentajeDeDescuento = 10;
const porcentajeDeImpuestos = 0.12;
let costoDeEnvio = 0.15; //Opcion de envio "Premium" por defecto

function actualizarCostos() {
    let subtotal = 0;

    ProductosCarrito.forEach(item => {
        subtotal += item.price * item.quantity;
    });

    const descuento = subtotal * (porcentajeDeDescuento / 100);
    const shippingCost = subtotal * costoDeEnvio;
    const tax = subtotal * porcentajeDeImpuestos;
    const total = subtotal - descuento + shippingCost + tax;

    //Actualizamos el DOM
    subtotalElement.textContent = subtotal.toFixed(2);
    discountElement.textContent = descuento.toFixed(2);
    shippingElement.textContent = shippingCost.toFixed(2);
    taxElement.textContent = tax.toFixed(2);
    totalElement.textContent = total.toFixed(2);
}

//Funcion para cambiar el tipo de envio
document.querySelectorAll("input[name='envio']").forEach(radio => {
    radio.addEventListener('change', (event) => {
        costoDeEnvio = parseFloat(event.target.value) / 100;
        actualizarCostos();
    });
});

document.addEventListener('DOMContentLoaded', function () {
    cargarCarrito();
    actualizarCostos();
});

    //Funcion para mostrar y ocultar el modal de pagos
function abrirModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}
function cerrarModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

  // Cierra el modal al hacer clic fuera del contenido
window.onclick = function (event) {
    const modales = document.querySelectorAll(".modal");
    modales.forEach((modal) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
};

// función finalizar compra con validacion de colores (como el de myprofile)
function finalizarCompra() {
    const camposDireccion = [
      { id: 'departamento', errorMensaje: 'Por favor, complete el campo Departamento' },
      { id: 'localidad', errorMensaje: 'Por favor, complete el campo Localidad' },
      { id: 'calle', errorMensaje: 'Por favor, complete el campo Calle' },
      { id: 'numero', errorMensaje: 'Por favor, complete el campo Número' },
      { id: 'esquina', errorMensaje: 'Por favor, complete el campo Esquina' }
    ];
  
    let esValido = true;
  
    // valida los campos de direccion
    camposDireccion.forEach(campo => {
      const input = document.querySelector(`input[name="${campo.id}"]`);
      let errorElement = input.nextElementSibling;
  
      // crea el error
      if (!errorElement || !errorElement.classList.contains('text-danger')) {
        errorElement = document.createElement('small');
        errorElement.classList.add('text-danger');
        errorElement.style.display = 'none';
        input.parentNode.appendChild(errorElement);
      }
  
      // validacion basado en el my profile 
      if (input.value.trim() === '') {
        input.classList.add('is-invalid2');
        input.classList.remove('is-valid2');
        errorElement.textContent = campo.errorMensaje;
        errorElement.style.display = 'block';
        esValido = false;
      } else {
        input.classList.remove('is-invalid2');
        input.classList.add('is-valid');
        errorElement.style.display = 'none';
      }
  
      // validacion en tiempo real para que aparezca el verde 
      input.addEventListener('input', () => {
        if (input.value.trim() === '') {
          input.classList.add('is-invalid2');
          input.classList.remove('is-valid2');
          errorElement.style.display = 'block';
        } else {
          input.classList.remove('is-invalid2');
          input.classList.add('is-valid2'); 
          errorElement.style.display = 'none';
        }
      });
    });
  
    // validar el tipo de envio
    const tipoEnvioSeleccionado = document.querySelector("input[name='envio']:checked");
    const envioError = document.getElementById('envio-error');
    if (!tipoEnvioSeleccionado) {
      envioError.style.display = 'block';
      esValido = false;
    } else {
      envioError.style.display = 'none';
    }
  
    // validar la forma de pago
    const formaPagoSeleccionada = document.querySelector("input[name='pago']:checked");
    const pagoError = document.getElementById('pago-error');
    if (!formaPagoSeleccionada) {
      pagoError.style.display = 'block';
      esValido = false;
    } else {
      pagoError.style.display = 'none';
    }
  
    //  alerta si algo esta vacio
    if (!esValido) {
      alert('Por favor, complete todos los campos obligatorios antes de finalizar la compra.');
      return;
    }
   
    
    //funcion modal
     function mostrarModal() {
       const modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal2-overlay';
    
        modalOverlay.innerHTML = `
            <div class="modal2">
                <img src="img/logo.png" alt="Logo" class="modal2-logo">
            <h2>¡Su compra ha finalizado con éxito!</h2>
                <button onclick="closeModal()">Aceptar</button>
            </div>
        `;
    
        document.body.appendChild(modalOverlay);
    
        // funcion para cerrar el modal
        window.closeModal = function () {
            window.location.href = "index.html";
        };
      }
    mostrarModal()
  }
  
  document.querySelector(".btn-success[href='#finalizarCompra2']").addEventListener('click', finalizarCompra);