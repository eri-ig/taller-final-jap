const archivo = document.getElementById("fotoPerfil");
const fotoPredeterminada = "./img/img_perfil.png";
const img = document.getElementById("img");
const botonEditarFoto = document.getElementById("editarFotoBtn");
const botonPerfil = document.getElementById("btnGuardar")
const emailInput = document.getElementById("email");
const telefonoInput = document.getElementById("telefono");

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
  validacionesTiempoReal();
});
// lo demas esta en el init.

//Validacion en tiempo real
function validacionesTiempoReal() {
  const camposObligatorios = [
    { id: 'nombre', errorMensaje: 'Este campo es obligatorio' },
    { id: 'apellido', errorMensaje: 'Este campo es obligatorio' },
    { id: 'email', errorMensaje: 'Debe ingresar un correo válido', esEmail: true },
    { id: 'telefono', errorMensaje: 'Este campo es obligatorio' },
  ];

  camposObligatorios.forEach(campo => {
    const input = document.getElementById(campo.id);
    const errorElement = document.createElement('small');
    errorElement.classList.add('text-danger');
    errorElement.style.display = 'none';
    errorElement.textContent = campo.errorMensaje;
    input.parentNode.appendChild(errorElement);

    input.addEventListener('input', () => {
        if (campo.esEmail) {
          validarEmail(input, errorElement);
        } else {
        if (campo.id === 'telefono') {
          validarTelefono(input, errorElement);
        } else {
          validarCampoRequerido(input, errorElement);
        }
      }
    });
  });
}

// Validación de campo requerido
function validarCampoRequerido(input, errorElement) {
  if (input.value.trim() === '') {
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
    errorElement.style.display = 'block';
  } else {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
    errorElement.style.display = 'none';
  }
}

// Validación de email
function validarEmail(input, errorElement) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(input.value)) {
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
    errorElement.style.display = 'block';
  } else {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
    errorElement.style.display = 'none';
  }
}

// Validación de teléfono
function validarTelefono(input, errorElement) {
  // Permitir solo números en este campo
  input.value = input.value.replace(/[^0-9]/g, '');
  validarCampoRequerido(input, errorElement);
}
// ( ►_◄ )-c<*_*; ) guardar informacion perfil//

function guardarInformacion(){
  const nombre = document.getElementById("nombre").value;
  const segundoNombre = document.getElementById("segundoNombre").value;
  const apellido = document.getElementById("apellido").value;
  const segundoApellido = document.getElementById("segundoApellido").value;
  const email = document.getElementById("email").value;
  const telefono = telefonoInput.value;

   //verifica los campos obligatorios//
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
  localStorage.setItem("segundoApellido", segundoApellido);
  localStorage.setItem("email", email);
  localStorage.setItem("telefono", telefono);
  
  //redireccinar a la pagina principal//
    window.location.href = "index.html";
}

//evento click de boton para guardar la informacion//
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