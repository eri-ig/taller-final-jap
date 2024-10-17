const archivo = document.getElementById("fotoPerfil");
const fotoPredeterminada = "./img/img_perfil.png";
const img = document.getElementById("img");
const botonEditarFoto = document.getElementById("editarFotoBtn");

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
window.addEventListener('DOMContentLoaded', () => {
  const imagenGuardada = localStorage.getItem('imagenGuardada');
  if (imagenGuardada) {
    img.src = imagenGuardada;
  }
  guardarImagen(archivo);
});





