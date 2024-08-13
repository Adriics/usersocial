let boton = document.getElementById("btnRegistrar")

boton.addEventListener("click", (e) => {
    registrarUsuario()
})

let registrarUsuario = async () => {
    
    let campos = {}

    campos.username = document.getElementById("username").value
    campos.realName = document.getElementById("realName").value
    campos.password = document.getElementById("password").value
    campos.bio = document.getElementById("bio").value

    const PETICION_POST = await fetch("http://localhost:8080/api/usuarios", 
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(campos)
        }
    )
    window.location.href="tabla.html"
}