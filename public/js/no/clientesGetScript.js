/////CLIENTES - GET/////
fetch("/clientes/get") //hace una llamada a la url del app.get. //cuando reciba la respuesta del app.get del index.js, entonces hacemos las 2 siguientes lineas.
    .then((res) => res.json()) //SIGNIFICA QUE VAMOS A RECIBIR UN JSON. // VA A RECIBIR LO QUE LE MANDEMOS DEL RES.JSON EN APP.GET // Lo recibimos y convertimos en json. //// estamos recibiendo un array desde index.js (si no es array no recoge el json)
    .then(data => {
        let tableData = `<table style="width: 40%; border: 1px solid #dddddd; text-align: left; font-size: 1.1rem">
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