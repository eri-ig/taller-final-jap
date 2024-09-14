document.addEventListener('DOMContentLoaded', function () {

    const productoActual = localStorage.getItem("productId")//se busca del localStorage el ID
    const PRODUCTO_URL = `https://japceibal.github.io/emercado-api/products/${productoActual}.json` // se busca el json segun el id del producto


    fetch(PRODUCTO_URL)
        .then(response => {
            if (!response.ok) {
                throw Error(response.statusText);
            } return response.json();
        })
        .then(producto => {
            infoCard(producto);

            console.log(producto);//sigo con mi paranoia del fetch XD
        })
        .catch(error => {
            console.error(error)
        });

})

function infoCard(producto) { //Se le cambia los parametros a la tarjeta de informacion 
    document.getElementById("category").innerHTML = producto.category;
    document.getElementById("brand").innerHTML = producto.name;
    document.getElementById("price").innerHTML = producto.cost + " " + producto.currency;
    document.getElementById("description").innerHTML = producto.description;
    const thumbnails = document.getElementById("thumbnailsList") // se añade los thumbnails
    producto.images.forEach(imagen => {
        thumbnails.innerHTML += `
    <img src="${imagen}" alt="Thumbnail 1" class="img-fluid thumbnail mx-2 " style="width: 80px;">
    `
    });
    document.getElementById("imagenPrincipal").src = producto.images[0];// se le pone una imagen principal predeterminada 
    showPrincipalImage();
    relatedProducts(producto.relatedProducts);
};

function showPrincipalImage() { // se le cambia el src de la imagen principal por el de el thumbnail clickeado
    document.querySelectorAll('.thumbnail').forEach(thumbnail => {
        thumbnail.addEventListener('click', function () {
            const mainImage = document.getElementById('imagenPrincipal');
            mainImage.src = this.src;
        });
    });
};

/*function relatedProducts(productosRelacionados) { // se crean las tarjetas de los productos relacionados
    const relatedCard = document.getElementById('relatedProductss');
    productosRelacionados.forEach(related => {
        relatedCard.innerHTML += `
<div class="col-md-3 col-sm-6" id="product${related.id}">
            <div class="card">
                <img src="${related.image}" class="card-img-top" alt="Producto 1">
                <div class="card-body">
                    <h5 class="card-title">${related.name}</h5>
                </div>
            </div> `
    })
    setProductOnClickListener();
};

function setProductOnClickListener() { // se recicla la funcion que permite hacer click en un producto y mediante su id se actualiza la pagina con los datos de ese producto.

    const productDivs = document.querySelectorAll('div[id^="product"]');// guarde en la constante una lista de div que su id inicie con product 

    productDivs.forEach(div => {// para cada div se le añade un escuchador para que al hacer click cada id se guarde en el localStorage,se utiliza substring para acceder correctamente al ID proporcionado por el Json 
        div.addEventListener("click", function () {
            localStorage.setItem("productId", div.id.substring(7));
            document.location = "product-info.html" // te envia directamente a la pagina product-info 
        })
    });
}*/
