const botonGuardarEnlace = document.getElementById("guardar-enlace");
const textoEnlace = document.getElementById("texto-enlace");
const nombreEnlace = document.getElementById("nombre-enlace");
const listaEnlaces = document.getElementById("lista-enlaces");
const borrarTodo = document.getElementById("borrarTodos");

// Cargar y normalizar enlaces desde localStorage
let enlaces = JSON.parse(localStorage.getItem("enlaces")) || [];
// Si los elementos son strings (versión anterior), convertir a objetos
if (enlaces.length && typeof enlaces[0] === "string") {
  enlaces = enlaces.map((url) => ({ title: url, url }));
}

renderEnlaces();

botonGuardarEnlace.addEventListener("click", () => {
  const url = textoEnlace.value.trim();
  const title = nombreEnlace.value.trim() || url;

  if (url === "") return;

  enlaces.push({ title, url });
  localStorage.setItem("enlaces", JSON.stringify(enlaces));

  renderEnlaces();
  textoEnlace.value = "";
  nombreEnlace.value = "";
});

function renderEnlaces() {
  listaEnlaces.innerHTML = "";
  enlaces.forEach((item, idx) => pintarEnlace(item, idx));
}

function pintarEnlace(item, idx) {
  const divEnlace = document.createElement("div");
  divEnlace.classList.add("divEnlace");

  const cont = document.createElement("div");
  cont.style.display = "flex";
  cont.style.flexDirection = "column";
  cont.style.gap = "4px";

  const titulo = document.createElement("p");
  titulo.classList.add("link-title");
  titulo.textContent = item.title;

  const enlaceA = document.createElement("a");
  enlaceA.href = item.url;
  enlaceA.target = "_blank";
  enlaceA.rel = "noopener noreferrer";
  enlaceA.textContent = item.url;
  enlaceA.classList.add("link-url");

  cont.appendChild(titulo);
  cont.appendChild(enlaceA);

  const botonBorrar = document.createElement("button");
  botonBorrar.textContent = "Borrar";
  botonBorrar.addEventListener("click", () => {
    borrarEnlace(idx);
  });

  divEnlace.appendChild(cont);
  divEnlace.appendChild(botonBorrar);

  listaEnlaces.appendChild(divEnlace);
}

function borrarEnlace(index) {
  enlaces.splice(index, 1);
  localStorage.setItem("enlaces", JSON.stringify(enlaces));
  renderEnlaces();
}

borrarTodo.addEventListener("click", () => {
  enlaces = [];
  localStorage.removeItem("enlaces");
  listaEnlaces.innerHTML = "";
});
