/////RESERVAS - GET/////
fetch("/reservas/get") //hace una llamada a la url del app.get. //cuando reciba la respuesta del app.get del index.js, entonces hacemos las 2 siguientes lineas.
    .then((res) => res.json()) //SIGNIFICA QUE VAMOS A RECIBIR UN JSON. // VA A RECIBIR LO QUE LE MANDEMOS DEL RES.JSON EN APP.GET // Lo recibimos y convertimos en json. //// estamos recibiendo un array desde index.js (si no es array no recoge el json)
    .then(
        // if (document.querySelector("#reservas").innerHTML === ""){ //si está vacío (al principio), cuando no hay ninguna reserva en la coleccion reservas.
        //     document.querySelector("#reservas").innerHTML = "No hay reservas";
        // }
        // else{
        data => {
            let tableData = `<table style="width: 40%; border: 1px solid #dddddd; text-align: left; font-size: 1.1rem">
        <tr><th>Cliente</th><th>Num habitación</th><th>Fecha Check In</th><th>Fecha Check Out</th></tr>`
            // for (let i = 0; i < data.length; i++) {
            //     let text = document.createElement("p");
            //     text.innerHTML = data[i].tamaño + " | " + data[i].color + " | " + data[i].material + " | " + data[i].patas;
            //     document.querySelector("#clientes").appendChild(text);
            // }
            data.forEach(element => {
                tableData += `<tr>
                <td>${element.dni}</td>
                <td>${element.num_habit}</td>
                <td>${element.fechaCheckIn}</td>
                <td>${element.fechaCheckOut}</td>
            </tr>`
            });
            tableData += `</table>`
            document.querySelector("#reservas").innerHTML += tableData;
            // }
        })