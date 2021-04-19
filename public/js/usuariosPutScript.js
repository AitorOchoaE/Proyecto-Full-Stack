///// PUT/////
document.querySelector("#botonModificarUsuario").addEventListener("click", function () {
    let objeto = {
        dni: document.querySelector("#dni").value,
        nombre: document.querySelector("#name").value,
        apellido1: document.querySelector("#surname1").value,
        apellido2: document.querySelector("#surname2").value,
    }
    let fetchData = {
        method: 'PUT',
        body: JSON.stringify(objeto),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    }
    fetch("/usuarios/put", fetchData) //le metemos la ruta en el servidor, y los datos que queremos que le meta. //cuando reciba la respuesta del app.get del index.js, entonces hacemos las 2 siguientes lineas.
        .then(res => res.json()) //SIGNIFICA QUE VAMOS A RECIBIR UN JSON. //// VA A RECIBIR LO QUE LE MANDEMOS DEL RES.SEND EN APP.GET// Lo recibimos y convertimos en json. // estamos recibiendo un array desde index.js (si no es array no recoge el json)
        .then(
            data => {
                if (data.status) { //si es true, correcto.
                    alert(data.mensaje);
                    location.href = "http://localhost:3000/usuariosGet.html";
                }
                else {
                    alert(data.mensaje);
                }
            }
        )
})