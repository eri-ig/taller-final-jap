document.addEventListener('DOMContentLoaded', function () {

    const productoActual = localStorage.getItem("productId")/*se busca del localStorage el ID*/ || "defaultProductId";
    const PRODUCTO_URL = `https://japceibal.github.io/emercado-api/products/${productoActual}.json` // se busca el json segun el id del producto
    const products_commentUrl = `https://japceibal.github.io/emercado-api/products_comments/${productoActual}.json`
    let box_comments = document.getElementById("comentarios")

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
}

//Cargar y mostrar comentarios
function loadComments() {
            //╰༼⇀︿⇀༽つ-]═── fetch de comentarios //
    fetch(products_commentUrl)
        .then(res => res.json())
        .then(datos => {
            let comments = datos || [];
            let localComments = JSON.parse(localStorage.getItem("localComments")) || [];
            comments = comments.concat(localComments);
            box_comments.innerHTML = '';
            comments.forEach(comment => {
                box_comments.innerHTML += `
                    <div class="comment">
                        <div> 
                            <p><b>${comment.user}</b> - ${comment.dateTime}</p>
                            <div>${generateStars(comment.score)}</div>
                        </div>
                        <div> <p>${comment.description}</p></div>
                    </div>`;
            });
        }).catch(error => {
            console.error("Error al obtener los comentarios:", error);
        });
}

//Generamos las estrellas en base al puntaje
function generateStars(score) {
    let starsHTML = '';
    for (let i = 1; i <= 5; i++) {
        starsHTML += i <= score ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>';
    }
    return starsHTML;
}

// Puntaje seleccionado
    function getSelectedRating() {
        let rating = 0;
        rateInputs.forEach(input => {
            if (input.checked) {
                rating = parseInt(input.value);
            }
        });
        return rating;
    }

const btn = document.querySelector("button");
const post = document.querySelector(".post");
const widget = document.querySelector(".star-widget");
const editBtn = document.querySelector(".edit");
const textArea = document.querySelector("textarea");
const rateInputs = document.querySelectorAll("input[name='rate']");

//Evento para enviar el comentario
btn.onclick = (event) => {
    event.preventDefault();
    let commentText = textArea.value.trim();
    let rating = getSelectedRating();

//Obtengo el nombre de usuario del sessionStorage -.-
const username = sessionStorage.getItem("username");

//Verifica que se cumpla que haya un comentario y una puntuacion
    if (commentText && rating) {
        let newComment = {
            user: username,
            dateTime: new Date().toLocaleString(),
            score: rating,
            description: commentText
        };

        let localComments = JSON.parse(localStorage.getItem("localComments")) || [];
        localComments.push(newComment);
        localStorage.setItem("localComments", JSON.stringify(localComments));
        loadComments(); //Esto hgace que cargue el comentario con el nuevo incluido
        textArea.value = '';
        rateInputs.forEach(input => input.checked = false);
        widget.style.display = "none";
        post.style.display = "block";
    } else {
        alert("Por favor, escribe un comentario y selecciona una puntuación.");
    }
};

editBtn.onclick = () => {
    widget.style.display = "block";
    post.style.display = "none";
    return false;
};

// Cargar comentarios al inicio
    loadComments();

});
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