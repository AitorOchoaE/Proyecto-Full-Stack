const express = require('express');
const router = express.Router();

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.get("/get", function (req, res) { //el "/" es lo mismo que localhost:3000/catbiblios/, ya que /catbiblios lo hemos definido en el index.js
    let dbConnection = req.app.locals.db;
    dbConnection.collection("catbiblios").find().toArray(function (err, datos) {
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

router.post("/post", function (req, res) { //el "/post" es lo mismo que localhost:3000/catbiblios/post/, ya que /catbiblios lo hemos definido en el index.js
    let catbibliosNuevo = {  //creamos el objeto para que saque toda la info del input (del html)
        // titulo: req.body.titulo,
        // autor: req.body.autor,
        isbn: req.body.isbn,
        // genero: req.body.genero,
        barrio: req.body.barrio,
        // distrito: req.body.distrito,
        // disponibilidad: req.body.disponibilidad,
        // direccion: req.body.direccion,
        // telefono: req.body.telefono,
        // mail: req.body.mail,
    }
    let dbConnection = req.app.locals.db;

    let checkempty = funmod.checkProperties(catbibliosNuevo);
    if (checkempty) {
        res.send({ mensaje: "Rellene todos los campos", status: false });
    } else {
        dbConnection.collection("libros").find({ "isbn": catbibliosNuevo.isbn }).toArray(function (err, respLibros) {
            if (respLibros.length == 0) {
                res.send({ mensaje: "El libro con ISBN " + catbibliosNuevo.isbn + " no está registrado en la base de datos. Vaya a la Sección de Libros a registrar sus datos.", status: false });
            }
            else {
                catbibliosNuevo.titulo = respLibros[0].titulo;
                catbibliosNuevo.autor = respLibros[0].autor;
                catbibliosNuevo.genero = respLibros[0].genero;
                dbConnection.collection("bibliotecas").find({ "barrio": catbibliosNuevo.barrio }).toArray(function (err, respBiblios) {
                    if (respBiblios.length == 0) {
                        res.send({ mensaje: "Nombre de biblioteca incorrecto o no registrado en la Sección de Bibliotecas.", status: false });
                    }
                    else {
                        catbibliosNuevo.disponibilidad = "Disponible";
                        catbibliosNuevo.distrito = respBiblios[0].distrito;
                        catbibliosNuevo.direccion = respBiblios[0].direccion;
                        catbibliosNuevo.telefono = respBiblios[0].telefono;
                        catbibliosNuevo.mail = respBiblios[0].mail;
                        dbConnection.collection("catbiblios").find({ "isbn": catbibliosNuevo.isbn, "barrio": catbibliosNuevo.barrio }).toArray(function (err, respCatbiblios) {
                            if (respCatbiblios.length != 0) {
                                res.send({ mensaje: "Este libro ya se encuentra registrado en esta biblioteca.", status: false });
                            }
                            else {
                                dbConnection.collection("catbiblios").insertOne(catbibliosNuevo, function (err, respCatbiblios2) {
                                    if (err != null) {
                                        console.log(err);
                                        res.send({ mensaje: "error: " + err, status: false });
                                    } else {
                                        // console.log("Hola");
                                        // res.send(datos);
                                        // res.send(respinsert);
                                        res.send({ mensaje: "Has registrado el libro en la biblioteca correctamente", status: true });
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    }
})

//PARA MODIFICAR LIBRO, ACUDIR A LAS COLECCIONES DE LIBROS Y/O BIBLIOTECAS.
// router.put("/put", function (req, res) {
//     let libroModif = {  //creamos el objeto para que saque toda la info del input (del html)
//         titulo: req.body.titulo,
//         autor: req.body.autor,
//         isbn: req.body.isbn,
//         genero: req.body.genero,
//     }
//     let dbConnection = req.app.locals.db;
//     dbConnection.collection("catbiblios").updateOne({ "isbn": libroModif.isbn }, { $set: { "titulo": libroModif.titulo, "autor": libroModif.autor, "genero": libroModif.genero } }, function (err, datos) {
//         if (err != null) {
//             console.log(err);
//             res.send({ mensaje: "error: " + err });
//         } else {
//             // console.log(datos);
//             // res.send(datos);
//             // res.json(datos);
//             res.send({ mensaje: "Libro con ISBN " + libroModif.isbn + " modificado correctamente" });
//         }
//     });
// })

// BORRAR UN LIBRO QUE YA NO ESTÉ DISPONIBLE EN ESA BIBLIO.
router.delete("/delete", function (req, res) {
    let catbibliosElim = {  //creamos el objeto para que saque toda la info del input (del html)
        isbn: req.body.isbn,
        barrio: req.body.barrio,
    }
    let dbConnection = req.app.locals.db;

    let checkempty = funmod.checkProperties(catbibliosElim);
    if (checkempty) {
        res.send({ mensaje: "Rellene todos los campos", status: false });
    }else{
        dbConnection.collection("libros").find({ "isbn": catbibliosElim.isbn }).toArray(function (err, datoslibElim) {
        if (datoslibElim.length == 0) {
            res.send({ mensaje: "El libro con ISBN " + catbibliosElim.isbn + " no está registrado en la base de datos.", status: false });
        }
        else {
            dbConnection.collection("bibliotecas").find({ "barrio": catbibliosElim.barrio }).toArray(function (err, datosbibElim) {
                if (datosbibElim.length == 0) {
                    res.send({ mensaje: "Nombre de biblioteca incorrecto o no registrado en la Sección de Bibliotecas.", status: false });
                }
                else {
                    dbConnection.collection("catbiblios").find({ "isbn": catbibliosElim.isbn, "barrio": catbibliosElim.barrio }).toArray(function (err, datoscatlibElim) {
                        if (datoscatlibElim.length == 0) {
                            res.send({ mensaje: "El libro con ISBN " + catbibliosElim.isbn + " no está registrado en la biblioteca de " + catbibliosElim.barrio, status: false });
                        }
                        else {
                            dbConnection.collection("catbiblios").deleteOne({ "isbn": catbibliosElim.isbn, "barrio": catbibliosElim.barrio }, function (err, datoscatbiblioElim) {  ///datosUsuElim es el objeto filtrado.
                                if (err != null) {
                                    console.log(err);
                                    res.send({ mensaje: "error: " + err, status: false });
                                } else {
                                    // console.log(datos);
                                    // res.send(datos);
                                    // res.json(datos);
                                    res.send({ mensaje: "El libro con ISBN " + catbibliosElim.isbn + " ha sido eliminado correctamente de la biblioteca de " + catbibliosElim.barrio, status: true });
                                }
                            });
                        }
                    })
                }
            })
        }
    })
    }
})

module.exports = router; ///////////habría que ver si es la manera de exportar router en este caso o si solo nos exporta el ultimo.