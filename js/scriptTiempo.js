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
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(
      ciudad
    )}&aqi=no`;
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
    if (elCity) elCity.innerText = ciudadNombre;
    if (elTemp) elTemp.innerText = temp;
    if (elCond) elCond.innerText = condicion;
    if (elIcon && icono) elIcon.src = icono;
  } catch (err) {
    console.error("Error inicializando tiempo:", err);
  }
}

// Lanzar la carga del tiempo al final del archivo
obtenerTiempoCiudad();
