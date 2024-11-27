window.onload = function () {
    const form = document.querySelector("form");
    const emailInput = document.getElementById('email');
  
    form.onsubmit = function (event) {
      event.preventDefault();
  
      const username = emailInput.value;
      const password = document.querySelector('input[type="password"]').value;
  
      
      if (!emailInput.checkValidity()) {
        alert("Por favor, introduce un correo electrónico válido.");
        return;
      }
  
      if (password === "") {
        alert("Por favor, introduce la contraseña.");
        return;
      }
      sessionStorage.setItem("email", username);
      sessionStorage.setItem("password", password);
  
      fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json", // Tipo de contenido JSON
        },
        body: JSON.stringify({ username, password }), // Enviar username y password
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.token) {
                // Guardar el token en localStorage
                localStorage.setItem("token", data.token);
                console.log("Token almacenado:", data.token);

                // Redirigir al usuario a la página de productos
                alert("Login exitoso");
                window.location.href = "products.html";
            } else {
                alert("Error en el login: " + data.message);
            }
        })
        .catch((error) => {
            console.error("Error al autenticar:", error);
            alert("Hubo un problema al iniciar sesión. Por favor, inténtalo nuevamente.");
        });
};
};
      
     