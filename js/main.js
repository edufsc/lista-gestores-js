console.log("Vista inicio!")

function obtenerGestores() {
    fetch('http://localhost:8080/gestor')
        .then(response => response.json())
        .then(gestores => {
            console.log({ gestores })

            // HTML para insertar
            let tablaGestores = ""

            // añadimos el HTML de cada Gestor
            for (gestor of gestores) {
                tablaGestores += "<div>" + gestor.usuario + " - " + gestor.email + "</div>"
            }

            // obtenemos el contenedor por id
            let contenedorGestores = document.getElementById("contenedor-gestores")

            // actualizamos el HTML de contenedorGestores
            contenedorGestores.innerHTML = tablaGestores
        })
}

// llamamos a la función
obtenerGestores()


function escucharGuardarGestor() {
    // obtenemos el botón de guardado
    const button = document.querySelector("#btn-guardar-gestor");

    // escuchamos el evento click para el botón de guardado
    button.addEventListener("click", (_event) => {

        // obtenemos los inputs por nombre (name) para trabajar con ellos
        let usuarioInput = document.querySelector("[name='usuario']")
        let correoInput = document.querySelector("[name='correo']")
        let passInput = document.querySelector("[name='pass']")

        // gestor que guardaremos
        // con .value obtenemos el valor de un input
        const nuevoGestor = {
            usuario: usuarioInput.value,
            email: correoInput.value,
            password: passInput.value
        }

        // para pasarlo como parámetro al fetch
        // indicamos el método de petición (method),
        // el cuerpo (body) y los encabezados (headers)
        const opcionesPost = {
            method: "POST",
            body: JSON.stringify(nuevoGestor),
            headers: { "Content-type": "application/json" }
        }

        fetch('http://localhost:8080/gestor', opcionesPost)
            .then(response => response.json())
            .then(gestorGuardado => {
                console.log({ gestorGuardado })
                // vaciamos los inputs con .reset()
                usuarioInput.value = ""
                correoInput.value = ""
                passInput.value = ""
                // recargamos la lista de gestores
                obtenerGestores()
            })
    });
}

escucharGuardarGestor()