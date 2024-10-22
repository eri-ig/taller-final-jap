const archivo = document.getElementById("fotoPerfil");
const fotoPredeterminada = "./img/img_perfil.png";
const img = document.getElementById("img");
const botonEditarFoto = document.getElementById("editarFotoBtn");
const botonPerfil = document.getElementById("btnGuardar")
const emailInput = document.getElementById("email");

// muestra la imagen seleccionada y la guarda en el localstorage
function guardarImagen(archivo) {
  archivo.addEventListener('change', evento => {
    const file = evento.target.files[0];
    if (file) {
      const lectorArchivo = new FileReader();
      lectorArchivo.onload = function (evento) {
        img.src = evento.target.result;
        localStorage.setItem('imagenGuardada', evento.target.result);
      }
      lectorArchivo.readAsDataURL(file);
    } else {
      img.src = fotoPredeterminada;
    }
  });
}

// oculta el input y usa el botón para disparar la selección de archivo
botonEditarFoto.addEventListener('click', () => {
  archivo.click();
});

// recupera imagen guardada del localStorage
document.addEventListener('DOMContentLoaded', () => {
  const imagenGuardada = localStorage.getItem('imagenGuardada');
  if (imagenGuardada) {
    img.src = imagenGuardada;
  }
  guardarImagen(archivo);
});

// lo demas esta en el init.

// ( ►_◄ )-c<*_*; ) guardar informacion perfil//
 
function guardarInformacion(){
  const nombre = document.getElementById("nombre").value;
  const segundoNombre = document.getElementById("segundoNombre").value;
  const apellido = document.getElementById("apellido").value;
  const segundoApellido = document.getElementById("segundoApellido").value;
  const email = document.getElementById("email").value;
  const telefono = document.getElementById("telefono").value;

   //validar los campos obligatorios//
    if(!nombre || !apellido || !email || !telefono){
      alert("Complete los campos obligatorios");
      return;
    }

   // Validar el email//
   if (!emailInput.checkValidity()) {
      alert("Por favor, introduce un correo electrónico válido.");
      return;
   }

   //guardar los datos en localStorage//
   localStorage.setItem("nombre", nombre);
   localStorage.setItem("segundoNombre", segundoNombre); 
   localStorage.setItem("apellido", apellido);
   localStorage.setItem("email", email);
   localStorage.setItem("telefono", telefono);
  
  //redireccinar a la pagina principal//
    window.location.href = "index.html";
}

//evento click de botonpara guardar la informacion//
botonPerfil.addEventListener('click', guardarInformacion);

// trae la informacion guardada de la pagina//
function cargarInformacionGuardada() {
    document.getElementById("nombre").value = localStorage.getItem("nombre") || "";
    document.getElementById("segundoNombre").value = localStorage.getItem("segundoNombre") || "";
    document.getElementById("apellido").value = localStorage.getItem("apellido") || "";
    document.getElementById("segundoApellido").value = localStorage.getItem("segundoApellido") || "";

    // busca el email guardado primero en sessionStorage y luego en localStorage
   // Si no encuentra ninguno, deja el campo vacio// 
    const email = sessionStorage.getItem("email") || localStorage.getItem("email") || "";
    document.getElementById("email").value = email;

    document.getElementById("telefono").value = localStorage.getItem("telefono") || "";
}

window.addEventListener('DOMContentLoaded', cargarInformacionGuardada);

