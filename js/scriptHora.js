// Reloj digital
function actualizarReloj() {
  const ahora = new Date();
  const horas = String(ahora.getHours()).padStart(2, "0");
  const minutos = String(ahora.getMinutes()).padStart(2, "0");
  const segundos = String(ahora.getSeconds()).padStart(2, "0");

  const relojElement = document.getElementById("reloj");
  if (relojElement) {
    relojElement.textContent = `${horas}:${minutos}:${segundos}`;
  }

  // Actualizar saludo según la hora
  actualizarSaludo(parseInt(horas));
}

// Actualizar fecha
function actualizarFecha() {
  const ahora = new Date();
  const dia = String(ahora.getDate()).padStart(2, "0");
  const mes = String(ahora.getMonth() + 1).padStart(2, "0");
  const año = ahora.getFullYear();

  const fechaElement = document.getElementById("fecha");
  if (fechaElement) {
    fechaElement.textContent = `${dia}/${mes}/${año}`;
  }
}

// Actualizar saludo según la hora del día
function actualizarSaludo(hora) {
  const saludoElement = document.getElementById("mensaje");
  let saludo = "";

  if (hora >= 5 && hora < 12) {
    saludo = "¡Buenos días!";
  } else if (hora >= 12 && hora < 18) {
    saludo = "¡Buenas tardes!";
  } else if (hora >= 18 && hora < 22) {
    saludo = "¡Buenas noches!";
  } else {
    saludo = "¡Buenas madrugadas!";
  }

  if (saludoElement) {
    saludoElement.textContent = saludo;
  }
}

// Actualizar reloj cada segundo
setInterval(actualizarReloj, 1000);

// Actualizar inmediatamente al cargar
window.addEventListener("load", () => {
  actualizarReloj();
  actualizarFecha();
});
