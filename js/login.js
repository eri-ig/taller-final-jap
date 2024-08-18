window.onload = function() {
const form = document.querySelector("form");

form.onsubmit = function(event) {
 //prevenir el envio normal del formulario//
 event.preventDefault();

 //obtener el valor del los campos de usuario y contraseña//
 const username = document.querySelector('input[type="text"]').value;
 const password = document.querySelector('input[type="password"]').value;


 //guarda los valores en sessionStorage//
 sessionStorage.setItem("username",username);
 sessionStorage.setItem("password",password);


 //redirige al la pagina//
 window.location.href = "index.html";


};


 // Verifica si hay un usuario guardado en sessionStorage//
    const username = sessionStorage.getItem("username");

 // Si no hay un usuario guardado, redirigir al formulario de inicio de sesión//
    if (!username) {
        window.location.href = "login.html"; 
    } else {
 // Si hay un usuario guardado, mostrar un mensaje de bienvenida
     const welcomeMessage = document.createElement("p");
     welcomeMessage.innerText = `¡Hola, ${username}! Bienvenido de nuevo a eMercado.`;

 
     welcomeMessage.classList.add("welcome-message");

 // Insertar el mensaje en la parte superior del contenedor//
     document.querySelector(".container").prepend(welcomeMessage);
    }
};