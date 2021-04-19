/////CLIENTES - GET/////
// fetch("/clientes/get") //hace una llamada a la url del app.get. //cuando reciba la respuesta del app.get del index.js, entonces hacemos las 2 siguientes lineas.
//     .then((res) => res.json()) //SIGNIFICA QUE VAMOS A RECIBIR UN JSON. // VA A RECIBIR LO QUE LE MANDEMOS DEL RES.JSON EN APP.GET // Lo recibimos y convertimos en json. //// estamos recibiendo un array desde index.js (si no es array no recoge el json)
//     .then(data => {
//         let tableData = `<table style="width: 30%; border: 1px solid #dddddd; text-align: left; font-size: 1.3rem">
//         <tr><th>Nombre</th><th>Apellido</th><th>DNI</th></tr>`
//         data.forEach(element => {
//             tableData += `<tr>
//                 <td>${element.nombre}</td>
//                 <td>${element.apellido}</td>
//                 <td>${element.dni}</td>
//             </tr>`
//         });
//         tableData += `</table>`
//         document.querySelector("#clientes").innerHTML += tableData;
//     })

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