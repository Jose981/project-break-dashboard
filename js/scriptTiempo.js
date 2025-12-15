// Funcion para obtener la ciudad en la que estoy
let ciudad;
let tiempo;
async function obtenerCiudad() {
  try {
    // Usar servicio HTTPS para evitar problemas de mixed content
    const response = await fetch("https://ipapi.co/json/");
    if (!response.ok) {
      throw new Error(`ipapi status ${response.status}`);
    }

    const data = await response.json();
    return data.city || null;
  } catch (error) {
    console.error("obtenerCiudad error:", error);
    return null;
  }
}

//Api para sacar el tiempo de la ciudad
async function obtenerTiempo() {
  let apiKey = "4a1cbd6a7a1d4d28ac7200810250512";
  ciudad = await obtenerCiudad();

  if (!ciudad) {
    throw new Error("No se pudo determinar la ciudad (por IP)");
  }

  try {
    // Pedimos varios días de pronóstico (5 días) y solicitamos textos en español
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(
      ciudad
    )}&days=5&aqi=no&alerts=no&lang=es`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`weatherapi status ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("obtenerTiempo error:", error);
    throw error;
  }
}

// Ejecutar la funcion del tiempo y mostrarlo
async function obtenerTiempoCiudad() {
  try {
    tiempo = await obtenerTiempo();
    console.log("tiempo obtenido:", tiempo);

    // Datos relevantes del JSON
    const ciudadNombre =
      tiempo.location && tiempo.location.name
        ? tiempo.location.name
        : "Desconocida";
    const temp =
      tiempo.current && tiempo.current.temp_c != null
        ? `${tiempo.current.temp_c}°C`
        : "--";
    const condicion =
      tiempo.current &&
      tiempo.current.condition &&
      tiempo.current.condition.text
        ? tiempo.current.condition.text
        : "";
    let icono =
      tiempo.current &&
      tiempo.current.condition &&
      tiempo.current.condition.icon
        ? tiempo.current.condition.icon
        : "";
    if (icono && icono.startsWith("//")) icono = "https:" + icono;

    // Insertar en el widget si existen los elementos
    const elCity = document.getElementById("weather-city");
    const elTemp = document.getElementById("weather-temp");
    const elCond = document.getElementById("weather-condition");
    const elIcon = document.getElementById("weather-icon");
    const elForecast = document.getElementById("weather-forecast");
    if (elCity) elCity.innerText = ciudadNombre;
    if (elTemp) elTemp.innerText = temp;
    if (elCond) elCond.innerText = condicion;
    if (elIcon && icono) elIcon.src = icono;

    // Renderizar pronóstico de varios días si está disponible
    if (
      elForecast &&
      tiempo &&
      tiempo.forecast &&
      tiempo.forecast.forecastday
    ) {
      const days = tiempo.forecast.forecastday;
      elForecast.innerHTML = days
        .map((d) => {
          const date = new Date(d.date);
          const opciones = { weekday: "short", month: "short", day: "numeric" };
          const label = date.toLocaleDateString("es-ES", opciones);
          let icon = d.day.condition.icon || "";
          if (icon && icon.startsWith("//")) icon = "https:" + icon;
          const max = Math.round(d.day.maxtemp_c);
          const min = Math.round(d.day.mintemp_c);
          const cond = d.day.condition.text || "";
          return `
            <article class="forecast-day" role="group" aria-label="Pronóstico ${label}">
              <div class="fd-date">${label}</div>
              <img class="fd-icon" src="${icon}" alt="${cond}"/>
              <div class="fd-temps"><span class="fd-max">${max}°</span><span class="fd-min">${min}°</span></div>
              <div class="fd-cond">${cond}</div>
            </article>`;
        })
        .join("");
    }
  } catch (err) {
    console.error("Error inicializando tiempo:", err);
  }
}

// Lanzar la carga del tiempo al final del archivo
obtenerTiempoCiudad();
