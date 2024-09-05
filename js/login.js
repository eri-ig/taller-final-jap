window.onload = function () {
    const form = document.querySelector("form");

    form.onsubmit = function (event) {
        // previene el envío normal del formulario//
        event.preventDefault();

        // obtiene el valor de los campos de usuario y contraseña
        const username = document.querySelector('input[type="text"]').value;
        const password = document.querySelector('input[type="password"]').value;
       
        if (username == "" || password == "") {
            alert("Complete los datos del formulario")
            return;
        }
        // guardar los valores en sessionStorage//
        sessionStorage.setItem("username", username);
        sessionStorage.setItem("password", password);

        // redirige a la página de productos//
        window.location.href = "products.html";
    };
};