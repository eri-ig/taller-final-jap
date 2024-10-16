const archivo = document.getElementById("fotoPerfil");
const fotoPredeterminada = "./img/img_perfil.png";
const img = document.getElementById("img");
const botonEditarFoto = document.getElementById("editarFotoBtn");

// Mostrar imagen seleccionada y guardarla en localStorage
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

// Ocultar el input de archivo y usar el botón para disparar la selección de archivo
botonEditarFoto.addEventListener('click', () => {
  archivo.click();
});

// Recuperar imagen guardada del localStorage
window.addEventListener('DOMContentLoaded', () => {
  const imagenGuardada = localStorage.getItem('imagenGuardada');
  if (imagenGuardada) {
    img.src = imagenGuardada;
  }
  guardarImagen(archivo);
});



