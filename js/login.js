window.onload = function() {
    const form = document.querySelector("form");

    form.onsubmit = function(event) {
        // previene el envío normal del formulario//
        event.preventDefault();

        // obtiene el valor de los campos de usuario y contraseña
        const username = document.querySelector('input[type="text"]').value;
        const password = document.querySelector('input[type="password"]').value;

        // guardar los valores en sessionStorage//
        sessionStorage.setItem("username", username);
        sessionStorage.setItem("password", password);

        // redirige a la página de inicio//
        window.location.href = "index.html";
    };

    // verifica si hay un usuario guardado en sessionStorage//
    const username = sessionStorage.getItem("username");

    // si no hay un usuario guardado, redirigir al formulario de inicio de sesión//
    if (!username) {
        window.location.href = "login.html"; // asegúrate de que este sea el nombre del archivo HTML de inicio de sesión//
    } else {
        // si hay un usuario guardado, mostrar un mensaje de bienvenida//
        const welcomeMessage = document.createElement("p");
        welcomeMessage.innerText = `¡Hola, ${username}! Bienvenido de nuevo a eMercado.`;

        // añade la clase para los estilos desde el CSS//
        welcomeMessage.classList.add("welcome-message");

        // inserta el mensaje en la parte superior del contenedor//
        document.querySelector(".container").prepend(welcomeMessage);
    }
};
