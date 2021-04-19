/////CLIENTES - GET/////
fetch("/clientes/get") //hace una llamada a la url del app.get. //cuando reciba la respuesta del app.get del index.js, entonces hacemos las 2 siguientes lineas.
    .then((res) => res.json()) //SIGNIFICA QUE VAMOS A RECIBIR UN JSON. // VA A RECIBIR LO QUE LE MANDEMOS DEL RES.JSON EN APP.GET // Lo recibimos y convertimos en json. //// estamos recibiendo un array desde index.js (si no es array no recoge el json)
    .then(data => {
        let tableData = `<table style="width: 30%; border: 1px solid #dddddd; text-align: left; font-size: 1.1rem">
        <tr><th>Nombre</th><th>Apellido</th><th>DNI</th></tr>`
        // for (let i = 0; i < data.length; i++) {
        //     let text = document.createElement("p");
        //     text.innerHTML = data[i].tamaño + " | " + data[i].color + " | " + data[i].material + " | " + data[i].patas;
        //     document.querySelector("#clientes").appendChild(text);
        // }
        data.forEach(element => {
            tableData += `<tr>
                <td>${element.nombre}</td>
                <td>${element.apellido}</td>
                <td>${element.dni}</td>
            </tr>`
        });
        tableData += `</table>`
        document.querySelector("#clientes").innerHTML += tableData;
    })


/////CLIENTES - POST/////
document.querySelector("#botonAnadir").addEventListener("click", function () {
    let objeto = {
        nombre: document.querySelector("#name").value,
        apellido: document.querySelector("#surname").value,
        dni: document.querySelector("#dni").value
    }
    let fetchData = {
        method: 'POST',
        body: JSON.stringify(objeto),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    }
    fetch("/clientes/post", fetchData) //le metemos la ruta en el servidor, y los datos que queremos que le meta. //cuando reciba la respuesta del app.get del index.js, entonces hacemos las 2 siguientes lineas.
        .then(res => res.json()) //SIGNIFICA QUE VAMOS A RECIBIR UN JSON. //// VA A RECIBIR LO QUE LE MANDEMOS DEL RES.SEND EN APP.GET// Lo recibimos y convertimos en json. // estamos recibiendo un array desde index.js (si no es array no recoge el json)
        .then(
            location.href = "http://localhost:3000/clientesGet.html"
        )
})


/////CLIENTES - PUT/////
document.querySelector("#botonModificar").addEventListener("click", function () {
    let objeto = {
        nombre: document.querySelector("#name").value,
        apellido: document.querySelector("#surname").value,
        dni: document.querySelector("#dni").value
    }
    let fetchData = {
        method: 'PUT',
        body: JSON.stringify(objeto),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    }
    fetch("/clientes/put", fetchData) //le metemos la ruta en el servidor, y los datos que queremos que le meta. //cuando reciba la respuesta del app.get del index.js, entonces hacemos las 2 siguientes lineas.
        .then(res => res.json()) //SIGNIFICA QUE VAMOS A RECIBIR UN JSON. //// VA A RECIBIR LO QUE LE MANDEMOS DEL RES.SEND EN APP.GET// Lo recibimos y convertimos en json. // estamos recibiendo un array desde index.js (si no es array no recoge el json)
        .then(
            location.href = "http://localhost:3000/clientesGet.html"
        )
})


/////CLIENTES - DELETE/////
// document.querySelector("#botonBorrar").addEventListener("click", function () {
//     let patas = document.querySelector("#legs").value;
//     let fetchData = {
//         method: 'DELETE', //OJO!! quitamos BODY porque lo que recojamos con fetch es un parametro!! (para luego poder mandar con params al /:color)
//     }
//     fetch("/api/borrar/" + patas, fetchData) //OJO!!! aqui no es :patas, sino que hay que meterle el valor del parametro!!! //le metemos la ruta en el servidor, y los datos que queremos que le meta. //cuando reciba la respuesta del app.get del index.js, entonces hacemos las 2 siguientes lineas.
//         .then(res => res.json()) //SIGNIFICA QUE VAMOS A RECIBIR UN JSON. //// VA A RECIBIR LO QUE LE MANDEMOS DEL RES.SEND EN APP.GET// Lo recibimos y convertimos en json. // estamos recibiendo un array desde index.js (si no es array no recoge el json)
//         .then(
//            location.href = "http://localhost:3000/clientesGet.html"
//         )
// })