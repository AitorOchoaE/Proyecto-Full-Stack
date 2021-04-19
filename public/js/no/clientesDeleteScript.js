/////EJERCICIO 1 GET/////
// fetch("/api/mesas") //hace una llamada a la url del app.get. //cuando reciba la respuesta del app.get del index.js, entonces hacemos las 2 siguientes lineas.
//     .then((res) => res.json()) //SIGNIFICA QUE VAMOS A RECIBIR UN JSON. // VA A RECIBIR LO QUE LE MANDEMOS DEL RES.JSON EN APP.GET // Lo recibimos y convertimos en json. //// estamos recibiendo un array desde index.js (si no es array no recoge el json)
//     // .then(data => console.log(data))
//     .then(data => {
//         for (let i = 0; i < data.length; i++) {
//             let text = document.createElement("p");
//             text.innerHTML = data[i].tamaño + " | " + data[i].color + " | " + data[i].material + " | " + data[i].patas;
//             document.querySelector("#ejerc").appendChild(text);
//         }
//     })

/////EJERCICIO 2/////
// document.querySelector("#botonAnadir").addEventListener("click", function () {
//     let objeto = {
//         tamaño: document.querySelector("#size").value,
//         color: document.querySelector("#colour").value,
//         material: document.querySelector("#material").value,
//         patas: document.querySelector("#legs").value
//     }
//     let fetchData = {
//         method: 'POST',
//         body: JSON.stringify(objeto),
//         headers: {
//             'Content-type': 'application/json; charset=UTF-8'
//         }
//     }
//     fetch("/api/anyadir", fetchData) //le metemos la ruta en el servidor, y los datos que queremos que le meta. //cuando reciba la respuesta del app.get del index.js, entonces hacemos las 2 siguientes lineas.
//         .then(res => res.json()) //SIGNIFICA QUE VAMOS A RECIBIR UN JSON. //// VA A RECIBIR LO QUE LE MANDEMOS DEL RES.SEND EN APP.GET// Lo recibimos y convertimos en json. // estamos recibiendo un array desde index.js (si no es array no recoge el json)
//         .then(data => {
//             for (let i = 0; i < data.length; i++) {
//                 let text = document.createElement("p");
//                 text.innerHTML = data[i].tamaño + " | " + data[i].color + " | " + data[i].material + " | " + data[i].patas;
//                 document.querySelector("#ejerc").appendChild(text);
//             }
//         })
// })

/////EJERCICIO 3/////
// document.querySelector("#botonModificar").addEventListener("click", function () {
//     let colorMod = document.querySelector("#colour").value;
//     let fetchData = {
//         method: 'PUT',
//         ///body: JSON.stringify(objeto),
//         headers: {
//             'Content-type': 'application/json; charset=UTF-8'
//         }
//     }
//     fetch("/api/modificar/:color", fetchData) //le metemos la ruta en el servidor, y los datos que queremos que le meta. //cuando reciba la respuesta del app.get del index.js, entonces hacemos las 2 siguientes lineas.
//         .then(res => res.json()) //SIGNIFICA QUE VAMOS A RECIBIR UN JSON. //// VA A RECIBIR LO QUE LE MANDEMOS DEL RES.SEND EN APP.GET// Lo recibimos y convertimos en json. // estamos recibiendo un array desde index.js (si no es array no recoge el json)
//         .then(data => {
//             for (let i = 0; i < data.length; i++) {
//                 let text = document.createElement("p");
//                 text.innerHTML = data[i].tamaño + " | " + data[i].color + " | " + data[i].material + " | " + data[i].patas;
//                 document.querySelector("#ejerc").appendChild(text);
//             }
//         })
// })

/////EJERCICIO 4 DELETE/////
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