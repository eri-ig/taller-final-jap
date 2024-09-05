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
<<<<<<< HEAD
=======
    //validarCorreo();
>>>>>>> a4e338db7b8e101ab8d92eaea198f3ca338d3bc8
    showUserInformation();
});

function verifyUser() {
    // verifica si hay un usuario guardado en sessionStorage//
    const username = sessionStorage.getItem("username");

    // si no hay un usuario guardado, redirigir al formulario de inicio de sesión//
    if (!username) {
        window.location.href = "login.html"; // asegúrate de que este sea el nombre del archivo HTML de inicio de sesión//
    } else {
        window.location.href = "products.html";
    }
};

function showUserInformation() {// se utiliza para dejar el nombre del usuario plasmado en el dropdown
    const username = sessionStorage.getItem("username");
<<<<<<< HEAD

=======
>>>>>>> a4e338db7b8e101ab8d92eaea198f3ca338d3bc8
    if (username) {
        var userName = document.getElementById("welcome-message")
        userName.innerHTML = username;
    }
};
<<<<<<< HEAD

=======
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
>>>>>>> a4e338db7b8e101ab8d92eaea198f3ca338d3bc8
