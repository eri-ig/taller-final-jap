let ProductosCarrito = new Map()// se hace un map para almacenar los productos usando como clave su id y luego los detalles como valor.
const container = document.getElementById("cartItems")// donde se va a ejecutar visualmente el carrito

function agregarProductoAlCarrito(id, nombre, imagen, precio) {
    const productoAgregar = {// se crea un objeto
        id: id,
        image: imagen,
        price: precio,
        name: nombre
    };
    console.log(productoAgregar)//paranohia
    ProductosCarrito.set(id, productoAgregar) //se guarda en el map el id con los detalles del objeto
    const mapAsArray = Array.from(ProductosCarrito.entries()); //se convierte el map en array para poderlo guardar en el localstorage
    localStorage.setItem("claveProductoCarrito", JSON.stringify(mapAsArray));//despues el array se convierte a formato json

};

function cargarCarrito() {// para cargar todos los productos sin importar si son de otras categorias
    var jsoncarritoCargado = localStorage.getItem("claveProductoCarrito") // se obtiene el json
    let carritoCargado = JSON.parse(jsoncarritoCargado)// se convierte a objeto
    if (carritoCargado != null) // se comprueba si el carrito no es null, porque sino me cambia el map por un null y no se puede trabajar con el.
        ProductosCarrito = new Map(carritoCargado) //se guarda en productos carritos los demas objetos.
}
cargarCarrito();

 

// ¯\(°_o)/¯ funcion mostrar carrito//
function mostrarProductosCarrito() {
    const container = document.getElementById("cartItems"); // Contenedor de las tarjetas//
    container.innerHTML = ''; // Limpiador//

    // trae los productos del localStorage//
    const carritoCargado = JSON.parse(localStorage.getItem("claveProductoCarrito"));

    // mansaje carrito vacio//
    if (!carritoCargado || carritoCargado.length === 0) {
        const mostrarMensaje = document.createElement("p");
        mostrarMensaje.textContent = "Uy, al parecer no hay ningún producto almacenado en el carrito.";
        container.appendChild(mostrarMensaje);
        return;
    }

    
     carritoCargado.forEach(([id, producto]) => {
        const card = document.createElement("div");
        card.className = "card border shadow-none mb-3";

    // opciones de cantidad de productos//
    let opciones = "";
       for (let i = 1; i <= 8; i++) {
       opciones += `<option value="${i}">${i}</option>`;
      }

        
       card.innerHTML = `
            <div class="card-body">
                <div class="d-flex align-items-start bottom pb-3">
                    <div class="me-4">
                        <img src="${producto.image}" alt="${producto.name}" class="avatar-lg rounded">
                    </div>
                    <div class="flex-grow-1 align-self-center overflow-hidden">
                        <h5 class="text-truncate font-size-18"><a href="#" class="text-dark">${producto.name}</a></h5>
                        <p class="text-muted mb-2">Precio</p>
                        <h5>$${producto.price}</h5>
                    </div>
                    <div class="flex-shrink-0 ms-2">
                        <ul class="list-inline mb-0 font-size-16">
                            <li class="list-inline-item">
                                <a href="#" class="text-muted px-1">
                                    <i class="mdi mdi-trash-can-outline"></i>
                                </a>
                            </li>
                            <li class="list-inline-item">
                                <a href="#" class="text-muted px-1">
                                    <i class="mdi mdi-heart-outline"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-5 mt-3">
                        <p class="text-muted mb-2">Quantity</p>
                        <div class="d-inline-flex">
                            <select class="form-select form-select-sm w-xl">
                              ${opciones}   
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        container.appendChild(card);
    });
  }

  // muestra los productos en la pagina//
    mostrarProductosCarrito();
