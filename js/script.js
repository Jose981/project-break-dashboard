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
  obtenerLocalizacion();
});

// API del tiempo (la variable `ciudad` ahora puede venir de `getCity()`)
const apiKey = "4a1cbd6a7a1d4d28ac7200810250512";

// Función que obtiene la ciudad según la IP del usuario usando ipapi.co
async function getCityFromIP() {
  try {
    const res = await fetch("https://ipapi.co/json/");
    if (!res.ok) throw new Error(`ipapi error ${res.status}`);
    const json = await res.json();
    // Devolver la ciudad si existe, si no devolver region o país como fallback
    return json.city || json.region || json.country_name || "Desconocida";
  } catch (err) {
    console.error("Error obteniendo ciudad por IP:", err);
    return "Desconocida";
  }
}

// Guardamos la promesa en una const `ciudad` (resuelve a la ciudad como string)
const ciudad = getCityFromIP();

// Ejemplo: usar la ciudad para hacer la petición del tiempo cuando esté disponible
ciudad
  .then((c) => {
    const weatherUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(
      c
    )}&aqi=no`;

    return fetch(weatherUrl);
  })
  .then((response) => {
    if (!response || !response.ok) {
      throw new Error(
        `Error al acceder a la API del tiempo (status ${
          response && response.status
        })`
      );
    }
    return response.json();
  })
  .then((data) => {
    console.log("Tiempo (por IP):", data);
    // renderiza datos en DOM si quieres
  })
  .catch((err) => {
    console.error("Fetch weather error:", err);
    const tiempoEl = document.querySelector(".tiempo");
    if (tiempoEl) {
      tiempoEl.textContent = "No se pudo obtener el tiempo";
    }
  });
