const botonGuardarEnlace = document.getElementById("guardar-enlace");
const textoEnlace = document.getElementById("texto-enlace");
const listaEnlaces = document.getElementById("lista-enlaces");
const borrarTodo = document.getElementById("borrarTodos");

let enlaces = JSON.parse(localStorage.getItem("enlaces")) || [];

enlaces.forEach((enlace) => pintarEnlaces(enlace));

botonGuardarEnlace.addEventListener("click", () => {
  const valor = textoEnlace.value.trim();

  if (valor === "") return;

  enlaces.push(valor);
  localStorage.setItem("enlaces", JSON.stringify(enlaces));

  pintarEnlaces(valor);
  textoEnlace.value = "";
});

function pintarEnlaces(texto) {
  let divEnlace = document.createElement("div");
  divEnlace.classList.add("divEnlace");

  let enlace = document.createElement("p");
  enlace.textContent = texto;

  let botonBorrar = document.createElement("button");
  botonBorrar.textContent = "Borrar";
  botonBorrar.addEventListener("click", () => {
    borrarEnlace(texto, divEnlace);
  });

  divEnlace.appendChild(enlace);
  divEnlace.appendChild(botonBorrar);

  listaEnlaces.appendChild(divEnlace);
}

function borrarEnlace(texto, divEnlace) {
  enlaces = enlaces.filter((e) => e !== texto);
  localStorage.setItem("enlaces", JSON.stringify(enlaces));
  divEnlace.remove();
}

borrarTodo.addEventListener("click", () => {
  enlaces = [];
  localStorage.clear();
  listaEnlaces.innerHTML = "";
});
