const express = require('express');
const router = express.Router();

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.get("/get", function (req, res) { //el "/" es lo mismo que localhost:3000/libros/, ya que /libros lo hemos definido en el index.js
    let dbConnection = req.app.locals.db;
    dbConnection.collection("libros").find().toArray(function (err, datos) {
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

router.post("/post", function (req, res) { //el "/post" es lo mismo que localhost:3000/libros/post/, ya que /libros lo hemos definido en el index.js
    let libroNuevo = {  //creamos el objeto para que saque toda la info del input (del html)
        titulo: req.body.titulo,
        autor: req.body.autor,
        isbn: req.body.isbn,
        genero: req.body.genero,
    }
    let dbConnection = req.app.locals.db;

    let checkempty = funmod.checkProperties(libroNuevo);
    if (checkempty) {
        res.send({ mensaje: "Rellene todos los campos", status: false });
    } else {
        if (libroNuevo.isbn.length != 13 || /[A-z]/.test(libroNuevo.isbn)) {
            res.send({ mensaje: libroNuevo.isbn + " no es un formato válido de ISBN.", status: false });
        } else {
            dbConnection.collection("libros").insertOne(libroNuevo, function (err, datos) {
                if (err != null) {
                    console.log(err);
                    res.send({ mensaje: "error: " + err, status: false });
                } else {
                    // console.log(datos);
                    // res.send(datos);
                    // res.json(datos);
                    res.send({ mensaje: `Libro ${libroNuevo.titulo}, de ${libroNuevo.autor}, ha sido añadido correctamente`, status: true });
                }
            });
        }

    }

})

router.put("/put", function (req, res) {
    let libroModif = {  //creamos el objeto para que saque toda la info del input (del html)
        titulo: req.body.titulo,
        autor: req.body.autor,
        isbn: req.body.isbn,
        genero: req.body.genero,
    }
    let dbConnection = req.app.locals.db;

    let checkempty = funmod.checkProperties(libroModif);
    if (checkempty) {
        res.send({ mensaje: "Rellene todos los campos", status: false });
    } else {
        dbConnection.collection("libros").find({ "isbn": libroModif.isbn }).toArray(function (err, datosLibs) {
            if (datosLibs.length == 0) {
                res.send({ mensaje: "El libro con ISBN " + libroModif.isbn + " no existe en la base de datos.", status: false });
            } else {
                dbConnection.collection("libros").updateOne({ "isbn": libroModif.isbn }, { $set: { "titulo": libroModif.titulo, "autor": libroModif.autor, "genero": libroModif.genero } }, function (err, datos) {
                    if (err != null) {
                        console.log(err);
                        res.send({ mensaje: "error: " + err, status: false });
                    } else {
                        // console.log(datos);
                        // res.send(datos);
                        // res.json(datos);
                        res.send({ mensaje: "Libro con ISBN " + libroModif.isbn + " modificado correctamente", status: true });
                    }
                });
            }
        })

    }

})

router.delete("/delete", function (req, res) {
    let libroElim = {  //creamos el objeto para que saque toda la info del input (del html)
        isbn: req.body.isbn,
    }
    let dbConnection = req.app.locals.db;

    let checkempty = funmod.checkProperties(libroElim);
    if (checkempty) {
        res.send({ mensaje: "Rellene todos los campos", status: false });
    } else {
        dbConnection.collection("libros").find({ "isbn": libroElim.isbn }).toArray(function (err, datosLibFind) {
            if (datosLibFind.length == 0) {
                res.send({ mensaje: "El libro con ISBN " + libroElim.isbn + " no existe en la base de datos.", status: false });
            }
            else {
                dbConnection.collection("libros").deleteOne({ "isbn": libroElim.isbn }, function (err, datosLibElim) {
                    if (err != null) {
                        console.log(err);
                        res.send({ mensaje: "error: " + err, status: false });
                    } else {
                        dbConnection.collection("catbiblios").deleteMany({ "isbn": libroElim.isbn }, function (err, datosLibsElim) {
                            if (err != null) {
                                console.log(err);
                                res.send({ mensaje: "error: " + err, status: false });
                            } else {
                                dbConnection.collection("prestamos").deleteMany({ "isbn": libroElim.isbn }, function (err, datosCatBibsElim) {
                                    if (err != null) {
                                        console.log(err);
                                        res.send({ mensaje: "error: " + err, status: false });
                                    } else {
                                        // console.log(datos);
                                        // res.send(datos);
                                        // res.json(datos);
                                        res.send({ mensaje: "El libro con ISBN " + libroElim.isbn + " ha sido eliminado correctamente de la BD general y de las BBDD de las bibliotecas donde se encontraba.", status: true });
                                    }
                                })
                            }
                        });
                    }
                })
            }
        })
    }

    // dbConnection.collection("libros").deleteOne({ "isbn": libroElim.isbn }, function (err, datosLibElim) {
    //     if (datosLibElim.length == 0) {
    //         res.send({ mensaje: "El libro con ISBN " + libroElim.isbn + " no existe en la base de datos." });
    //     }
    //     else {
    //         dbConnection.collection("catbiblios").deleteMany({ "isbn": libroElim.isbn }, function (err, datosLibsElim) {  ///datosLibsElim es el objeto filtrado.
    //             if (err != null) {
    //                 console.log(err);
    //                 res.send({ mensaje: "error: " + err });
    //             } else {
    //                 dbConnection.collection("prestamos").deleteMany({ "isbn": libroElim.isbn }, function (err, datosCatBibsElim) {
    //                     if (err != null) {
    //                         console.log(err);
    //                         res.send({ mensaje: "error: " + err });
    //                     } else {
    //                         // console.log(datos);
    //                         // res.send(datos);
    //                         // res.json(datos);
    //                         res.send({ mensaje: "El libro con ISBN " + libroElim.isbn + " ha sido eliminado correctamente de la BD general y de las BBDD de las bibliotecas donde se encontraba." });
    //                     }
    //                 })
    //             }
    //         });
    //     }
    // })

})

module.exports = router; ///////////habría que ver si es la manera de exportar router en este caso o si solo nos exporta el ultimo.