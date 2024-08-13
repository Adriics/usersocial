window.onload = function () {
    listarUsuarios();
}

let listarUsuarios = async () => {
    document.getElementById("formulario").style.display = "none"
    const PETICION_GET = await fetch("http://localhost:8080/api/usuarios", 
        {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
    )

    const usuarios = await PETICION_GET.json()

    let contenidoTabla = ""
    for (let usuario of usuarios) {
        let contenidoFila = `<tr>
        <td>${usuario.id}</td>
        <td>${usuario.username}</td>
        <td>${usuario.realName}</td>
        <td>${usuario.password}</td>
        <td>${usuario.bio}</td>
             <td>
                <i onClick="editarUsuario(${usuario.id})" class="material-icons button edit">edit</i>
                <i onClick="borrarUsuario(${usuario.id})" class="material-icons button delete">delete</i>
            </td>
            </tr>`

            contenidoTabla += contenidoFila;
        }
        
        document.querySelector("#tabla tbody").outerHTML = contenidoTabla;
}
    

let borrarUsuario = async (id) => {
    const PETICION_DELETE = await fetch("http://localhost:8080/api/usuarios/"+id, {
        method: 'DELETE',   
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    listarUsuarios();
}

let idEditar;

let editarUsuario = async (id) => {
    mostrarFormulario()

    idEditar = id;

    const PETICION = await fetch("http://localhost:8080/api/usuarios/" + id, {
        method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
    })

    const usuario = await PETICION.json();

    document.getElementById("username").value = usuario.username;
    document.getElementById("password").value = usuario.password;
    document.getElementById("realName").value = usuario.realName;
    document.getElementById("bio").value = usuario.bio;

    let btnModificar = document.getElementById("btnModificar")
    
    btnModificar.addEventListener("click", e => {
        aplicarActualizacion(idEditar)
    })
}

let aplicarActualizacion = async (id) => {
    let campos = {}

    campos.id = id
    campos.username = document.getElementById("username").value
    campos.password = document.getElementById("password").value
    campos.realName = document.getElementById("realName").value
    campos.bio = document.getElementById("bio").value

    const USUARIOS = await fetch("http://localhost:8080/api/usuarios/" + id,
        {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(campos)
        }
    );

    listarUsuarios();
}

function mostrarFormulario() {
    let formulario = document.getElementById("formulario").style.display="block"
}

let btnLogin = document.getElementById("login")

btnLogin.addEventListener("click", (e) => {
    window.location.href="login.html"
})