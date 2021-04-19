///// GET/////
fetch("/catbiblios/get") //hace una llamada a la url del app.get. //cuando reciba la respuesta del app.get del index.js, entonces hacemos las 2 siguientes lineas.
    .then((res) => res.json()) //SIGNIFICA QUE VAMOS A RECIBIR UN JSON. // VA A RECIBIR LO QUE LE MANDEMOS DEL RES.JSON EN APP.GET // Lo recibimos y convertimos en json. //// estamos recibiendo un array desde index.js (si no es array no recoge el json)
    .then(data => {
        let tableData = `<table style="width: 90%; font-size: 1rem;">
        <tr><th>Título</th><th>Autor/a</th><th>ISBN</th><th>Género</th><th>Biblioteca</th><th>Distrito</th><th>Disponibilidad</th><th>Dirección</th><th>Teléfono</th><th>Contacto</th></tr>`
        data.forEach(element => {
            tableData += `<tr>
                <td>${element.titulo}</td>
                <td>${element.autor}</td>
                <td>${element.isbn}</td>
                <td>${element.genero}</td>
                <td>${element.barrio}</td>
                <td>${element.distrito}</td>`
            if (element.disponibilidad == "Disponible") {
                tableData += `<td style="font-weight: bold; color: green">${element.disponibilidad}</td>`;
            }
            else { //si pone "Prestado"
                tableData += `<td style="font-weight: bold; color: red">${element.disponibilidad}</td>`;
            }
            tableData += `<td>${element.direccion}</td>
                <td>${element.telefono}</td>
                <td>${element.mail}</td>
            </tr>`
        });
        tableData += `</table>`
        document.querySelector("#catbiblios").innerHTML += tableData;
    })

    // style="font-weight: italic; color: green"