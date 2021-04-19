const express = require('express');
const router = express.Router();

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.get("/get", function (req, res) { //el "/" es lo mismo que localhost:3000/bibliotecas/, ya que /bibliotecas lo hemos definido en el index.js
    let dbConnection = req.app.locals.db;
    dbConnection.collection("bibliotecas").find().toArray(function (err, datos) {
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

let funmod = require("./functionsmodule");

router.post("/post", function (req, res) { //el "/post" es lo mismo que localhost:3000/bibliotecas/post/, ya que /bibliotecas lo hemos definido en el index.js
    let biblioNuevo = {  //creamos el objeto para que saque toda la info del input (del html)
        barrio: req.body.barrio,
        distrito: req.body.distrito,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        mail: req.body.mail
    }
    let dbConnection = req.app.locals.db;

    let checkempty = funmod.checkProperties(biblioNuevo);
    if (checkempty) {
        res.send({ mensaje: "Rellene todos los campos", status: false });
    } else {
        dbConnection.collection("bibliotecas").insertOne(biblioNuevo, function (err, datos) {
            if (err != null) {
                console.log(err);
                res.send({ mensaje: "error: " + err, status: false });
            } else {
                // console.log(datos);
                // res.send(datos);
                // res.json(datos);
                res.send({ mensaje: `La biblioteca de ${biblioNuevo.barrio}, ${biblioNuevo.distrito}, ha sido añadida correctamente`, status: true });
            }
        });
    }

})

router.put("/put", function (req, res) {
    let biblioModif = {  //creamos el objeto para que saque toda la info del input (del html)
        barrio: req.body.barrio,
        distrito: req.body.distrito,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        mail: req.body.mail
    }
    let dbConnection = req.app.locals.db;

    let checkempty = funmod.checkProperties(biblioModif);
    if (checkempty) {
        res.send({ mensaje: "Rellene todos los campos", status: false });
    }else{
        dbConnection.collection("bibliotecas").updateOne({ "barrio": biblioModif.barrio }, { $set: { "distrito": biblioModif.distrito, "direccion": biblioModif.direccion, "telefono": biblioModif.telefono, "mail": biblioModif.mail } }, function (err, datos) {
        if (err != null) {
            console.log(err);
            res.send({ mensaje: "error: " + err, status: false });
        } else {
            // console.log(datos);
            // res.send(datos);
            // res.json(datos);
            res.send({ mensaje: "Los datos de la biblioteca de " + biblioModif.barrio + " han sido modificados correctamente", status: true });
        }
    });
    }
    
})

router.delete("/delete", function (req, res) {
    let biblioElim = {  //creamos el objeto para que saque toda la info del input (del html)
        barrio: req.body.barrio
    }
    let dbConnection = req.app.locals.db;

    let checkempty = funmod.checkProperties(biblioElim);
    if (checkempty) {
        res.send({ mensaje: "Rellene todos los campos", status: false });
    }else{
        dbConnection.collection("bibliotecas").find({ "barrio": biblioElim.barrio }).toArray(function (err, datosBibFind) {
        if (datosBibFind.length == 0) {
            res.send({ mensaje: "La biblioteca de " + biblioElim.barrio + " no existe en la base de datos.", status: false });
        }
        else {
            dbConnection.collection("bibliotecas").deleteOne({ "barrio": biblioElim.barrio }, function (err, datosBibElim) {
                if (err != null) {
                    console.log(err);
                    res.send({ mensaje: "error: " + err, status: false });
                } else {
                    dbConnection.collection("catbiblios").deleteMany({ "barrio": biblioElim.barrio }, function (err, datosBibsElim) {
                        if (err != null) {
                            console.log(err);
                            res.send({ mensaje: "error: " + err, status: false });
                        } else {
                            dbConnection.collection("prestamos").deleteMany({ "barrio": biblioElim.barrio }, function (err, datosCatBibsElim) {
                                if (err != null) {
                                    console.log(err);
                                    res.send({ mensaje: "error: " + err, status: false });
                                } else {
                                    // console.log(datos);
                                    // res.send(datos);
                                    // res.json(datos);
                                    res.send({ mensaje: "La biblioteca de " + biblioElim.barrio + " ha sido eliminada correctamente de la BD general y del catálogo de libros.", status: true });
                                }
                            })
                        }
                    });
                }
            })
        }
    })
    }
    
    // dbConnection.collection("bibliotecas").deleteOne({"barrio": biblioElim.barrio}, function (err, datosUsuElim) {  ///datosUsuElim es el objeto filtrado.
    //     if (err != null) {
    //         console.log(err);
    //         res.send({ mensaje: "error: " + err });
    //     } else {
    //         // console.log(datos);
    //         // res.send(datos);
    //         // res.json(datos);
    //         res.send({ mensaje: "La biblioteca de " + biblioElim.barrio + " ha sido eliminada correctamente" });
    //     }
    // });
})

module.exports = router; ///////////habría que ver si es la manera de exportar router en este caso o si solo nos exporta el ultimo.