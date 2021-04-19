///// PUT/////

// let modulo = require('./bibliotecasGetScript');
// let arrayBar = modulo.arrayBarrios;

fetch("/bibliotecas/get") //hace una llamada a la url del app.get. //cuando reciba la respuesta del app.get del index.js, entonces hacemos las 2 siguientes lineas.
    .then((res) => res.json()) //SIGNIFICA QUE VAMOS A RECIBIR UN JSON. // VA A RECIBIR LO QUE LE MANDEMOS DEL RES.JSON EN APP.GET // Lo recibimos y convertimos en json. //// estamos recibiendo un array desde index.js (si no es array no recoge el json)
    .then(data => { //data va a ser los objetos con todas las propiedades. Cogeremos el barrio.

        let htmlselect = `<option value="">~ Elegir ~</option>`;
        data.forEach(element => {
            htmlselect += `<option value="${element.barrio}">${element.barrio}</option>`
        })
        document.querySelector("#barrio").innerHTML = htmlselect;
    })


// let htmlselect = "";
// arrayBar.forEach(element => {
//     htmlselect += `<option value="${element}">${element}</option>`
// })
// document.querySelector("#barrio").innerHTML = htmlselect;


document.querySelector("#botonModificarBiblioteca").addEventListener("click", function () {
    let objeto = {
        barrio: document.querySelector("#barrio").value,
        distrito: document.querySelector("#distrito").value,
        direccion: document.querySelector("#direccion").value,
        telefono: document.querySelector("#telefono").value,
        mail: document.querySelector("#mail").value
    }
    let fetchData = {
        method: 'PUT',
        body: JSON.stringify(objeto),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    }
    fetch("/bibliotecas/put", fetchData) //le metemos la ruta en el servidor, y los datos que queremos que le meta. //cuando reciba la respuesta del app.get del index.js, entonces hacemos las 2 siguientes lineas.
        .then(res => res.json()) //SIGNIFICA QUE VAMOS A RECIBIR UN JSON. //// VA A RECIBIR LO QUE LE MANDEMOS DEL RES.SEND EN APP.GET// Lo recibimos y convertimos en json. // estamos recibiendo un array desde index.js (si no es array no recoge el json)
        .then(
            data => {
                if (data.status) { //si es true, correcto.
                    alert(data.mensaje);
                    location.href = "http://localhost:3000/bibliotecasGet.html";
                }
                else {
                    alert(data.mensaje);
                }
            }
        )
})