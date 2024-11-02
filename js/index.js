document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("autos").addEventListener("click", function () {
        localStorage.setItem("catID", 101);
        verifyUser()
    });
    document.getElementById("juguetes").addEventListener("click", function () {
        localStorage.setItem("catID", 102);
        verifyUser()
    });
    document.getElementById("muebles").addEventListener("click", function () {
        localStorage.setItem("catID", 103);
        verifyUser()
    });
    //validarCorreo();
    showUserInformation();
    cargarImagenDePerfil();
});

function verifyUser() {
    // verifica si hay un usuario guardado en sessionStorage//
    const username = sessionStorage.getItem("email");

    // si no hay un usuario guardado, redirigir al formulario de inicio de sesión//
    if (!username) {
        window.location.href = "login.html"; // asegúrate de que este sea el nombre del archivo HTML de inicio de sesión//
    } else {
        window.location.href = "products.html";
    }
};


//Si hubiese que validar el correo:
/*function validarCorreo(correo) {
    const password = sessionStorage.getItem("password");
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(correo) && correo.endsWith(".com")) {
        return "El correo es válido";
    } else {
        return "El correo no es válido";
    }
}*/