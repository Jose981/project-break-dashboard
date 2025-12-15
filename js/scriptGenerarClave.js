// Capturar botones
const botonGenerar = document.getElementById("generador");
const numeroCaracteres = document.getElementById("eleccion");
const claveGenerada = document.getElementById("clave-generada");

botonGenerar.addEventListener("click", () => {
  const longitud = parseInt(numeroCaracteres.value);

  if (isNaN(longitud) || longitud <= 0) {
    claveGenerada.textContent = "Introduce un número entre el 12 y el 50";
    return;
  }

  const letras = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numeros = "0123456789";
  const simbolos = "!@#$%^&*()-_=+{}[];:'<>,.?/";

  const todos = letras + numeros + simbolos;

  let contraseña = "";

  for (let i = 0; i < longitud; i++) {
    const randomIndex = Math.floor(Math.random() * todos.length);
    contraseña += todos[randomIndex];
  }

  claveGenerada.textContent = contraseña;
  console.log(contraseña);
});
