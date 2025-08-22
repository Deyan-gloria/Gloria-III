let intentos = 0;
function crearResidente(){ abrirModal(); }
function editarResidente(){ abrirModal(); }
function eliminarResidente(){ abrirModal(); }

function abrirModal(){ document.getElementById("modalClave").style.display="block"; }
function cerrarModal(){ document.getElementById("modalClave").style.display="none"; intentos=0; }

function validarClave(){
  const clave = document.getElementById("claveSeguridad").value;
  if(clave==="AdminSeguridad2025"){
    alert("Acción permitida");
    cerrarModal();
  } else {
    intentos++;
    if(intentos>=3){
      alert("⚠️ Demasiados intentos fallidos. La sesión ha sido cerrada por seguridad.");
      sessionStorage.removeItem("loggedIn");
      window.location.href="index.html";
    } else {
      alert("Clave incorrecta. Intento "+intentos+" de 3");
    }
  }
}
