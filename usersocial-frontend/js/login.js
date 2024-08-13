document.addEventListener("DOMContentLoaded", () => {
  let btnEnviar = document.getElementById("btnEnviar");

  btnEnviar.addEventListener("click", async () => {
    let usernameTxt = document.getElementById("username").value;
    let passwordTxt = document.getElementById("password").value;

    const response = await fetch("http://localhost:8080/api/usuarios", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error(`Error: ${response.status}`);

    const usuarios = await response.json();
    let userFound = false;

    for (let usuario of usuarios) {
      if (
        usuario.username === usernameTxt &&
        usuario.password === passwordTxt
      ) {
        alert("Éxito");
        userFound = true;
        localStorage.setItem("loggedInUser", usernameTxt);
        window.location.href = "app.html";
      }
    }

    if (!userFound) {
      alert("Error: Usuario o contraseña incorrectos");
    }
  });
});
