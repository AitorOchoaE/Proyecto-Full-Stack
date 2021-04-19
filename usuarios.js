const express = require('express');
const router = express.Router();

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.get("/get", function (req, res) { //el "/" es lo mismo que localhost:3000/usuarios/, ya que /usuarios lo hemos definido en el index.js
    let dbConnection = req.app.locals.db;
    dbConnection.collection("usuarios").find().toArray(function (err, datos) {
        if (err != null) {
            console.log(err);
            res.send({ mensaje: "error: " + err });
        } else {
            console.log(datos);
            // res.send(datos);
            res.json(datos);
        }
    });
})

// function checkProperties(obj) {  //Para mirar si todos estan vacios.
//     for (var key in obj) {
//         if (obj[key] !== null && obj[key] != ""){
//             return false;
//         }    
//     }
//     return true;
// }
// function checkProperties(obj) { //para mirar si alguno está vacío.
//     for (var key in obj) {
//         if (obj[key] === null || obj[key] == ""){
//             return true;
//         }    
//     }
//     return false;
// }
let funmod = require("./functionsmodule");

router.post("/post", function (req, res) { //el "/post" es lo mismo que localhost:3000/usuarios/post/, ya que /usuarios lo hemos definido en el index.js
    let usuarioNuevo = {  //creamos el objeto para que saque toda la info del input (del html)
        nombre: req.body.nombre,
        apellido1: req.body.apellido1,
        apellido2: req.body.apellido2,
        dni: req.body.dni
    }
    let dbConnection = req.app.locals.db;

    let checkempty = funmod.checkProperties(usuarioNuevo);
    if (checkempty) {
        res.send({ mensaje: "Rellene todos los campos", status: false });
    }
    else {
        let lastchar = usuarioNuevo.dni[usuarioNuevo.dni.length - 1];
        let onetoeightchars = usuarioNuevo.dni.substring(0, 8);
        if (usuarioNuevo.dni.length != 9 || !/[A-Z]/.test(lastchar) || !/[0-9]/.test(onetoeightchars)) {
            res.send({ mensaje: usuarioNuevo.dni + " no es un formato válido de DNI.", status: false });
        } else {
            dbConnection.collection("usuarios").insertOne(usuarioNuevo, function (err, datos) {
                if (err != null) {
                    console.log(err);
                    res.send({ mensaje: "error: " + err, status: false });
                } else {
                    // console.log(datos);
                    // res.send(datos);
                    // res.json(datos);
                    res.send({ mensaje: "Usuario añadido correctamente", status: true });
                }
            });
        }
    }



})

router.put("/put", function (req, res) {
    let usuarioModif = {  //creamos el objeto para que saque toda la info del input (del html)
        nombre: req.body.nombre,
        apellido1: req.body.apellido1,
        apellido2: req.body.apellido2,
        dni: req.body.dni
    }
    let dbConnection = req.app.locals.db;

    let checkempty = funmod.checkProperties(usuarioModif);
    if (checkempty) {
        res.send({ mensaje: "Rellene todos los campos", status: false });
    }
    else {
        dbConnection.collection("usuarios").find({ "dni": usuarioModif.dni }).toArray(function (err, datosUsFind) {
            if (datosUsFind.length == 0) {
                res.send({ mensaje: "El usuario con DNI " + usuarioModif.dni + " no existe en la base de datos.", status: false });
            } else {
                dbConnection.collection("usuarios").updateOne({ "dni": usuarioModif.dni }, { $set: { "nombre": usuarioModif.nombre, "apellido1": usuarioModif.apellido1, "apellido2": usuarioModif.apellido2 } }, function (err, datos) {
                    if (err != null) {
                        console.log(err);
                        res.send({ mensaje: "error: " + err, status: false });
                    } else {
                        // console.log(datos);
                        // res.send(datos);
                        // res.json(datos);
                        res.send({ mensaje: "Usuario con DNI " + usuarioModif.dni + " modificado correctamente", status: true });
                    }
                });
            }
        })
    }

})

router.delete("/delete", function (req, res) {
    let usuarioElim = {  //creamos el objeto para que saque toda la info del input (del html)
        dni: req.body.dni
    }
    let dbConnection = req.app.locals.db;

    let checkempty = funmod.checkProperties(usuarioElim);
    if (checkempty) {
        res.send({ mensaje: "Rellene todos los campos", status: false });
    }
    dbConnection.collection("usuarios").deleteOne({ "dni": usuarioElim.dni }, function (err, datosUsuElim) {  ///datosUsuElim es el objeto filtrado.
        if (err != null) {
            console.log(err);
            res.send({ mensaje: "error: " + err, status: false });
        } else {
            // console.log(datos);
            // res.send(datos);
            // res.json(datos);
            res.send({ mensaje: "El usuario con DNI " + usuarioElim.dni + " ha sido eliminado correctamente", status: true });
        }
    });
})

module.exports = router; ///////////habría que ver si es la manera de exportar router en este caso o si solo nos exporta el ultimo.