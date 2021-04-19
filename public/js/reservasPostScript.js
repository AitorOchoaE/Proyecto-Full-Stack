/////RESERVAS - POST/////
document.querySelector("#botonAnadir").addEventListener("click", function () {
    let objeto = {
        dni: document.querySelector("#dni").value,
        num_habit: document.querySelector("#room").value,
        fechaCheckIn: document.querySelector("#dateCheckIn").value,
        fechaCheckOut: document.querySelector("#dateCheckOut").value
    }
    let fetchData = {
        method: 'POST',
        body: JSON.stringify(objeto),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    }
    fetch("/reservas/post", fetchData) //le metemos la ruta en el servidor, y los datos que queremos que le meta. //cuando reciba la respuesta del app.get del index.js, entonces hacemos las 2 siguientes lineas.
        .then(res => res.json()) //SIGNIFICA QUE VAMOS A RECIBIR UN JSON. //// VA A RECIBIR LO QUE LE MANDEMOS DEL RES.SEND EN APP.GET// Lo recibimos y convertimos en json. // estamos recibiendo un array desde index.js (si no es array no recoge el json)
        .then(
            data => {
            alert(data.mensaje);
            location.href = "http://localhost:3000/reservasGet.html"
            }
        )
})