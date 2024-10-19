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
  
      // redirige a la de products//
      window.location.href = "products.html";
    };
  };