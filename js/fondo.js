const imagenes = [
  "./img/fondo1.jpeg",
  "./img/fondo2.jpeg",
  "./img/fondo3.jpeg",
  "./img/fondo4.jpeg",
  "./img/fondo5.jpeg",
  "./img/fondo6.jpeg",
  "./img/fondo7.jpeg",
  "./img/fondo8.jpeg",
  "./img/fondo9.jpeg",
  "./img/fondo10.jpeg",
];

let index = 0;

function cambiarFondo() {
  const fondo = document.getElementById("fondo");
  if (!fondo) {
    return;
  }
  const url = imagenes[index];
  fondo.style.backgroundImage = `url('${url}')`;
  index = (index + 1) % imagenes.length;
}

// Esperar a que el DOM esté listo antes de cambiar el fondo
window.addEventListener("DOMContentLoaded", () => {
  cambiarFondo(); // Primera imagen al cargar
  setInterval(cambiarFondo, 20000); // Cambia cada 20 segundos
});

// Fallback si DOMContentLoaded ya pasó
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {});
} else {
  cambiarFondo();
  setInterval(cambiarFondo, 20000);
}
