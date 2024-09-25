document.addEventListener('DOMContentLoaded', function () {

    const productoActual = localStorage.getItem("productId")//se busca del localStorage el ID
    const PRODUCTO_URL = `https://japceibal.github.io/emercado-api/products/${productoActual}.json` // se busca el json segun el id del producto
    let box_comments = document.getElementById("comentarios")
    let products_commentUrl = `https://japceibal.github.io/emercado-api/products_comments/${productoActual}.json`

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


    
        //╰༼⇀︿⇀༽つ-]═── fetch de comentarios //

        fetch(products_commentUrl)
        .then(res => res.json())
        .then (datos =>{
            information = datos
             
            console.log (information)

             for ( comment of information){
                console.log(comment.user)
                
                box_comments.innerHTML += `
                <div class="comment">
                <div > <p> <b> ${comment.user} </b> - ${comment.dateTime} -  ${comment.score} </p> </div>
                <div > <p> ${comment.description} </p> </div>
                </div>`
                
                
             }
        

             
        });   

})

function infoCard(producto) { //Se le cambia los parametros a la tarjeta de informacion 
    document.getElementById("category").innerHTML = producto.category;
    document.getElementById("brand").innerHTML = producto.name;
    document.getElementById("price").innerHTML = producto.cost + " " + producto.currency;
    document.getElementById("description").innerHTML = producto.description;
    document.getElementById("ventas").innerHTML = "Cantidad vendida "+ producto.soldCount;
    const thumbnails = document.getElementById("thumbnailsList") // se añade los thumbnails
    producto.images.forEach(imagen => {
        thumbnails.innerHTML += `
    <img src="${imagen}" alt="Thumbnail 1" class="img-fluid thumbnail mx-2 " style="width: 80px;">
    `
    });
    document.getElementById("imagenPrincipal").src = producto.images[0];// se le pone una imagen principal predeterminada 
    showPrincipalImage();
    /*relatedProducts(producto.relatedProducts);*/
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

//Funcionalidades para la calificacion de los productos
let stars = document.querySelectorAll(".star");
let selectedRating = 0;

// Función para darle color a las estrellas y actualizar la calificación
stars.forEach(function(star, index) {
    star.addEventListener("click", function() {
        selectedRating = index + 1; // Actualiza la calificación seleccionada
        for (let i = 0; i <= index; i++) {
            stars[i].classList.add("checked");
        }
        for (let i = index + 1; i < stars.length; i++) {
            stars[i].classList.remove("checked");
        }
    });
});

// Función para que se cumplan requisitos al enviar una opinión
document.getElementById("submitBtn").addEventListener("click", function() {
    const commentText = document.getElementById("commentText").value;
    const username = sessionStorage.getItem("username");

    
    if (commentText === "" || selectedRating === 0) {
        alert("Por favor, escribe un comentario y selecciona una calificación.");
        return;
    }

    // Se escribe el comentario
    let commentList = document.getElementById("commentList");
    let newComment = document.createElement("div");
    newComment.classList.add("comment");

    // Esto nos permite ver las estrellas que seleccionamos
    let starHTML = "";
    for (let i = 0; i < selectedRating; i++) {
        starHTML += '<i class="bi bi-star-fill star checked"></i>';
    }
    for (let i = selectedRating; i < 5; i++) {
        starHTML += '<i class="bi bi-star-fill star"></i>';
    }

    // Para obtener la fecha en que se realiza el comentario
    let fecha = new Date();
    let day = fecha.getDate();
    let month = fecha.getMonth() + 1;
    let year = fecha.getFullYear();
    let hours = fecha.getHours();
    let minutes = fecha.getMinutes();

    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
    
    newComment.innerHTML = `
        <h3>${username}:</h3>
        <div class="stars">${starHTML}</div>
        <p>${commentText}</p>
        <span class="date">Fecha: ${formattedDate}</span>
    `;

    // Agregamos el comentario a la lista
    commentList.appendChild(newComment);

    // Limpia el formulario
    document.getElementById("commentText").value = "";
    stars.forEach(star => star.classList.remove("checked"));
    selectedRating = 0;
});