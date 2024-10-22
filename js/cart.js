let ProductosCarrito = new Map()// se hace un map para almacenar los productos usando como clave su id y luego los detalles como valor.
const container = document.getElementById("carrito")// donde se va a ejecutar visualmente el carrito

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