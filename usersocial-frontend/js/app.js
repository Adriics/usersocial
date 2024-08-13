// Ejecutar cuando la página se carga
window.onload = function () {
  userLoad();
  cargarMensajes();
};

// Obtener elementos del DOM
let usernameDiv = document.querySelector("#username");
let messageInput = document.querySelector("#typeSomething");
let btnPost = document.getElementById("btnPost");
let postsDiv = document.querySelector("#posts div");
let btnDelete = document.getElementById("btnDelete");
let btnLogOut = document.getElementById("logout");

// Mostrar el nombre de usuario en la interfaz
function userLoad() {
  let username = localStorage.getItem("loggedInUser");

  if (username) {
    let usernameElement = document.createElement("span");
    usernameElement.innerHTML = "@" + username;
    usernameDiv.appendChild(usernameElement);
  } else {
    console.error("Error al cargar usuario");
  }
}

// Función para publicar un nuevo mensaje

function publicar() {
  let message = messageInput.value.trim();

  if (message) {
    let mensajes = JSON.parse(localStorage.getItem("mensajes")) || [];
    mensajes.push({
      content: message,
      user: localStorage.getItem("loggedInUser"),
      date: new Date().toISOString(),
    });

    localStorage.setItem("mensajes", JSON.stringify(mensajes));
    messageInput.value = "";
    cargarMensajes();
  }
}
// Función para cargar todos los mensajes desde localStorage
function cargarMensajes() {
  let mensajes = JSON.parse(localStorage.getItem("mensajes")) || [];
  mostrarMensajes(mensajes);
}
// Función para mostrar los mensajes en el DOM

function mostrarMensajes(mensajes) {
  postsDiv.innerHTML = "";
  mensajes.forEach((mensaje) => {
    let name = document.createElement("h5");
    let newMessage = document.createElement("p");
    name.className = "name-user-message";
    name.innerHTML = mensaje.user;

    newMessage.className = "styled-message";
    newMessage.innerHTML = mensaje.content;

    postsDiv.appendChild(name);
    postsDiv.appendChild(newMessage);
  });
}

// Agregar evento para el botón de publicar
btnPost.addEventListener("click", (e) => {
  publicar();
});

btnDelete.addEventListener("click", (mensajes) => {
  localStorage.removeItem("mensajes");
  cargarMensajes();
});

btnLogOut.addEventListener("click", (e) => {
  logOut();
});

function logOut() {
  localStorage.removeItem("userLoggedIn");
  localStorage.removeItem("mensajes");

  window.location.href = "index.html";
}
