///// GET/////
fetch("/libros/get") //hace una llamada a la url del app.get. //cuando reciba la respuesta del app.get del index.js, entonces hacemos las 2 siguientes lineas.
    .then((res) => res.json()) //SIGNIFICA QUE VAMOS A RECIBIR UN JSON. // VA A RECIBIR LO QUE LE MANDEMOS DEL RES.JSON EN APP.GET // Lo recibimos y convertimos en json. //// estamos recibiendo un array desde index.js (si no es array no recoge el json)
    .then(data => {
        let tableData = `<table style="width: 80%; border: 1px solid #dddddd; text-align: left; font-size: 1rem">
        <tr><th>Título</th><th>Autor/a</th><th>ISBN</th><th>Género</th></tr>`
        data.forEach(element => {
            tableData += `<tr>
                <td>${element.titulo}</td>
                <td>${element.autor}</td>
                <td>${element.isbn}</td>
                <td>${element.genero}</td>
            </tr>`
        });
        tableData += `</table>`
        document.querySelector("#libros").innerHTML += tableData;
    })