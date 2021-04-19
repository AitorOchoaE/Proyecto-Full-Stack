///// GET/////
// fetch("/login/entrar") //hace una llamada a la url del app.get. //cuando reciba la respuesta del app.get del index.js, entonces hacemos las 2 siguientes lineas.
//     .then((res) => res.json()) //SIGNIFICA QUE VAMOS A RECIBIR UN JSON. // VA A RECIBIR LO QUE LE MANDEMOS DEL RES.JSON EN APP.GET // Lo recibimos y convertimos en json. //// estamos recibiendo un array desde index.js (si no es array no recoge el json)
//     .then(data => {
//         document.querySelector(".us").innerHTML = data.user;
//     })