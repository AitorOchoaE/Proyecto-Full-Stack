///// GET/////
// let arrayBarrios = [];
fetch("/bibliotecas/get") //hace una llamada a la url del app.get. //cuando reciba la respuesta del app.get del index.js, entonces hacemos las 2 siguientes lineas.
    .then((res) => res.json()) //SIGNIFICA QUE VAMOS A RECIBIR UN JSON. // VA A RECIBIR LO QUE LE MANDEMOS DEL RES.JSON EN APP.GET // Lo recibimos y convertimos en json. //// estamos recibiendo un array desde index.js (si no es array no recoge el json)
    .then(data => {
        
        let tableData = `<table style="width: 90%; border: 1px solid #dddddd; text-align: left; font-size: 1rem">
        <tr><th>Barrio</th><th>Distrito</th><th>Dirección</th><th>Teléfono</th><th>Contacto</th></tr>`
        data.forEach(element => {
            tableData += `<tr>
                <td>${element.barrio}</td>
                <td>${element.distrito}</td>
                <td>${element.direccion}</td>
                <td>${element.telefono}</td>
                <td>${element.mail}</td>
            </tr>`
            // arrayBarrios.push(element.barrio);
        });
        tableData += `</table>`
        document.querySelector("#bibliotecas").innerHTML += tableData;
    })
// console.log(arrayBarrios);

// export let array = arrayBarrios;
// export let array = arrayBarrios;
// module.exports = {arrayBarrios};