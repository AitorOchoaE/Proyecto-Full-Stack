// Get the modal
var modal1 = document.getElementById('idInnerSignIn');
var modal2 = document.getElementById('idInnerLogIn');
var modalback = document.getElementById('bodyLogin');
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modalback) {
        modal1.style.display = "none";
        modal2.style.display = "none";
    }
}

///// SIGN IN - POST/////
document.querySelector("#signin").addEventListener("click", function () {
    let objeto = {
        username1: document.querySelector("#username1").value,
        password1: document.querySelector("#password1").value,
    }
    let fetchData = {
        method: 'POST',
        body: JSON.stringify(objeto),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    }
    fetch("/login/post", fetchData) //le metemos la ruta en el servidor, y los datos que queremos que le meta. //cuando reciba la respuesta del app.get del index.js, entonces hacemos las 2 siguientes lineas.
        .then(res => res.json()) //SIGNIFICA QUE VAMOS A RECIBIR UN JSON. //// VA A RECIBIR LO QUE LE MANDEMOS DEL RES.SEND EN APP.GET// Lo recibimos y convertimos en json. // estamos recibiendo un array desde index.js (si no es array no recoge el json)
        .then(
            data => {
                if (data.status) { //si es true, se registra correctamente.
                    alert(data.mensaje);
                    document.getElementById('idInnerSignIn').style.display='none'
                    document.getElementById('idInnerLogIn').style.display='block'
                    // location.href = "http://localhost:3000/login.html";
                }
                else {
                    alert(data.mensaje);
                }
            }
        )
})

///// LOG IN /////
document.querySelector("#login").addEventListener("click", function () {
    let objeto = {
        username2: document.querySelector("#username2").value,
        password2: document.querySelector("#password2").value,
    }
    let fetchData = {
        method: 'POST',
        body: JSON.stringify(objeto),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    }
    fetch("/login/entrar", fetchData) //le metemos la ruta en el servidor, y los datos que queremos que le meta. //cuando reciba la respuesta del app.get del index.js, entonces hacemos las 2 siguientes lineas.
        .then(res => res.json()) //SIGNIFICA QUE VAMOS A RECIBIR UN JSON. //// VA A RECIBIR LO QUE LE MANDEMOS DEL RES.SEND EN APP.GET// Lo recibimos y convertimos en json. // estamos recibiendo un array desde index.js (si no es array no recoge el json)
        .then(
            data => {
                if (data.status) { //si es true, ingresa correctamente.
                    alert(data.mensaje);
                    location.href = "http://localhost:3000/mainpage.html";
                }
                else {
                    alert(data.mensaje);
                }

                // if(data.mensaje.includes("Ingreso correcto")){

                // }
                // else{
                //     location.href = "http://localhost:3000/login.html";
                // }
            }
        )
})