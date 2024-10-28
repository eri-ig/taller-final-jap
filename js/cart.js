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

 

// funcion mostrar carrito
 
 function mostrarProductosCarrito() {
    container.innerHTML = ""; // limpiador//

  //mensaje de carrito vacio//
    if (ProductosCarrito.size === 0) {
     const mostrarMensaje = document.createElement("div");
     mostrarMensaje.classList.add("alert", "alert-warning", "text-center");
     mostrarMensaje.textContent = "Uy, al parecer no ha seleccionado ningún producto.";
        container.appendChild(mostrarMensaje);
        return; 
    }

    //recorrer y mostrar los productos//
    ProductosCarrito.forEach((producto) => {
        //tarjeta para cada producto/
        const productoDiv = document.createElement("div");
        productoDiv.classList.add("card", "border", "shadow-none", "mb-3", "mx-auto");
    
        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
    
    //imagen y detalles del producto//
        
       const contenidoProducto = document.createElement("div");
        contenidoProducto.classList.add("d-flex", "align-items-start", "bottom", "pb-1");
    
        const imagenProducto = document.createElement("div");
        imagenProducto.classList.add("me-4");
    
        const imagen = document.createElement("img");
        imagen.src = producto.image;
        imagen.alt = producto.name;
        imagen.classList.add("avatar-lg", "rounded");
        imagenProducto.appendChild(imagen);
    
        const detalleProducto = document.createElement("div");
        detalleProducto.classList.add("flex-grow-1", "align-self-center", "overflow-hidden");
    
        const titulo = document.createElement("h5");
        titulo.classList.add("text-truncate", "font-size-18");
        titulo.innerHTML = `<a href="#" class="text-dark">${producto.name}</a>`;
    
        const precioProductos = document.createElement("p");
        precioProductos.classList.add("text-muted", "mb-2");
        precioProductos.textContent = "Precio";
        const precio = document.createElement("h5");
        precio.textContent = `$${producto.price}`;
    
     // selector de las cantidades//
          const quantityContainer = document.createElement("div");
          quantityContainer.classList.add("mt-3");
    
          const quantityTexto = document.createElement("p");
          quantityTexto.classList.add("text-muted", "mb-2");
          quantityTexto.textContent = "Cantidad";
    
          const menuDesplegable = document.createElement("div");
          menuDesplegable.classList.add("d-inline-flex");
    
          const quantitySelect = document.createElement("select");
          quantitySelect.classList.add("form-select", "form-select-sm", "w-xl");
    
    // agrega el selector de cantidad//
    
        menuDesplegable.appendChild(quantitySelect);
        quantityContainer.appendChild(quantityTexto);
        quantityContainer.appendChild(menuDesplegable);
    
  // agregalos detalles del producto/
          detalleProducto.appendChild(titulo);
          detalleProducto.appendChild(precioProductos);
          detalleProducto.appendChild(precio);
          detalleProducto.appendChild(quantityContainer); 
        
        contenidoProducto.appendChild(imagenProducto);
        contenidoProducto.appendChild(detalleProducto);
    
        
    //pone el contenido dentro de la tarjeta//
        cardBody.appendChild(contenidoProducto);
    
    //muetra la tarjeta//
        productoDiv.appendChild(cardBody);
        container.appendChild(productoDiv);
    });
    
   }

mostrarProductosCarrito();