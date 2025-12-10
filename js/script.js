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

// Funcion para obtener la ciudad en la que estoy

let ciudad;
let tiempo;
async function obtenerCiudad() {
  try {
    const response = await fetch("http://ip-api.com/json/");
    if (!response.ok) {
      return new Error("Error al conectarte");
    }

    const data = await response.json();
    return data.city;
  } catch (error) {
    return new Error("Error al conectarte a la API");
  }
}

//Api para sacar el tiempo de la ciudad
async function obtenerTiempo() {
  let apiKey = "4a1cbd6a7a1d4d28ac7200810250512";
  ciudad = await obtenerCiudad();

  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${ciudad}&aqi=no`
    );
    if (!response.ok) {
      return new Error("Error al obtener el tiempo");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return new Error("Error al obtener el tiempo de la ciudad");
  }
}

// Ejecutar la obtención del tiempo en una función async (evita top-level await)
async function obtenerTiempoCiudad() {
  try {
    tiempo = await obtenerTiempo();
    console.log(tiempo);
  } catch (err) {
    console.error("Error inicializando tiempo:", err);
  }
}

obtenerTiempoCiudad();
