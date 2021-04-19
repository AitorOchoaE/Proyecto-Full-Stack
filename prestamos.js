const express = require('express');
const router = express.Router();

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

let ObjectId = require('mongodb').ObjectId; //vamos a usar el objectid de un objeto más abajo.

router.get("/get", function (req, res) { //el "/" es lo mismo que localhost:3000/catbiblios/, ya que /catbiblios lo hemos definido en el index.js
    let dbConnection = req.app.locals.db;
    dbConnection.collection("prestamos").find().toArray(function (err, datos) {
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
    let prestamoNuevo = {  //creamos el objeto para que saque toda la info del input (del html)
        dni: req.body.dni,
        isbn: req.body.isbn,
        barrio: req.body.barrio,
        // nombre: req.body.nombre,
        // apellido1: req.body.apellido1,
        // apellido2: req.body.apellido2,
        // titulo: req.body.titulo,
        // autor: req.body.autor,
        // fechaIni: req.body.fechaIni,
        // fechaFin: req.body.fechaFin,
    }
    let dbConnection = req.app.locals.db;

    let checkempty = funmod.checkProperties(prestamoNuevo);
    if (checkempty) {
        res.send({ mensaje: "Rellene todos los campos", status: false });
    } else {
        dbConnection.collection("usuarios").find({ "dni": prestamoNuevo.dni }).toArray(function (err, respUsu) {
            if (respUsu.length == 0) {
                res.send({ mensaje: "El cliente con DNI " + prestamoNuevo.dni + " no está previamente registrado en la base de datos", status: false });
            }
            else {
                prestamoNuevo.nombre = respUsu[0].nombre;
                prestamoNuevo.apellido1 = respUsu[0].apellido1;
                prestamoNuevo.apellido2 = respUsu[0].apellido2;
                dbConnection.collection("libros").find({ "isbn": prestamoNuevo.isbn }).toArray(function (err, respLib) {
                    if (respLib.length == 0) {
                        res.send({ mensaje: "El libro con ISBN " + prestamoNuevo.isbn + " no está registrado en la base de datos.", status: false });
                    }
                    else {
                        prestamoNuevo.titulo = respLib[0].titulo;
                        prestamoNuevo.autor = respLib[0].autor;
                        dbConnection.collection("bibliotecas").find({ "barrio": prestamoNuevo.barrio }).toArray(function (err, respBib) {
                            if (respBib.length == 0) {
                                res.send({ mensaje: "Nombre de biblioteca incorrecto o no registrado en la Sección de Bibliotecas.", status: false });
                            }
                            else {
                                dbConnection.collection("catbiblios").find({ "isbn": prestamoNuevo.isbn, "barrio": prestamoNuevo.barrio }).toArray(function (err, respCatBib) {
                                    if (respCatBib.length == 0) {
                                        res.send({ mensaje: "El libro con ISBN " + prestamoNuevo.isbn + " no se encuentra registrado en la biblioteca de " + prestamoNuevo.barrio, status: false });
                                    }
                                    else {
                                        dbConnection.collection("prestamos").find({ "isbn": prestamoNuevo.isbn, "barrio": prestamoNuevo.barrio }).toArray(function (err, respPrest) {
                                            if (respPrest.length != 0) { //si ya está en prestamos no podemos reservarlo.
                                                res.send({ mensaje: "El libro con ISBN " + prestamoNuevo.isbn + " de la biblioteca de " + prestamoNuevo.barrio + " se encuentra actualmente ocupado hasta el " + respPrest[0].fechaFin, status: false });
                                            }
                                            else {
                                                dbConnection.collection("prestamos").find({ "dni": prestamoNuevo.dni }).toArray(function (err, respDniPrest) {
                                                    if (respDniPrest.length == 3) {
                                                        res.send({ mensaje: "El usuario con DNI " + prestamoNuevo.dni + " tiene actualmente 3 préstamos (el máximo permitido).", status: false });
                                                    }
                                                    else {
                                                        var dateObj = new Date();
                                                        var month = dateObj.getUTCMonth() + 1; //months from 1-12
                                                        var day = dateObj.getUTCDate();
                                                        var year = dateObj.getUTCFullYear();
                                                        prestamoNuevo.fechaIni = `${year}/${month}/${day}`;
                                                        dateObj.setDate(dateObj.getDate() + 15);
                                                        var month = dateObj.getUTCMonth() + 1; //months from 1-12
                                                        var day = dateObj.getUTCDate();
                                                        var year = dateObj.getUTCFullYear();
                                                        prestamoNuevo.fechaFin = `${year}/${month}/${day}`;

                                                        dbConnection.collection("catbiblios").updateOne({ "isbn": prestamoNuevo.isbn, "barrio": prestamoNuevo.barrio, "disponibilidad": "Disponible" }, { $set: { "disponibilidad": "Prestado" } });
                                                        dbConnection.collection("prestamos").insertOne(prestamoNuevo, function (err, respinsert) {
                                                            if (err != null) {
                                                                console.log(err);
                                                                res.send({ mensaje: "error: " + err, status: false });
                                                            } else {
                                                                // console.log("Hola");
                                                                // res.send(datos);
                                                                // res.send(respinsert);
                                                                res.send({ mensaje: "Se ha realizado la reserva correctamente.", status: true });
                                                            }
                                                        })
                                                    }
                                                })

                                            }
                                        })


                                        // if (respCatBib[0].disponibilidad != "Disponible"){
                                        //     res.send({ mensaje: "El libro con ISBN " + prestamoNuevo.isbn + " de la biblioteca de " + prestamoNuevo.barrio + " se encuentra actualmente ocupado."  }); //hasta " + respCatBib[0].fechaFin
                                        // }
                                        // else{
                                        //     var dateObj = new Date();
                                        //     var month = dateObj.getUTCMonth() + 1; //months from 1-12
                                        //     var day = dateObj.getUTCDate();
                                        //     var year = dateObj.getUTCFullYear();
                                        //     prestamoNuevo.fechaIni = `${year}/${month}/${day}`;
                                        //     dateObj.setDate(dateObj.getDate() + 15);
                                        //     var month = dateObj.getUTCMonth() + 1; //months from 1-12
                                        //     var day = dateObj.getUTCDate();
                                        //     var year = dateObj.getUTCFullYear();
                                        //     prestamoNuevo.fechaFin = `${year}/${month}/${day}`;

                                        //     dbConnection.collection("catbiblios").updateOne({"isbn": prestamoNuevo.isbn, "barrio": prestamoNuevo.barrio, "disponibilidad": "Disponible"},{$set:{"disponibilidad": "Prestado"}});
                                        //     dbConnection.collection("prestamos").insertOne(prestamoNuevo, function(err,respinsert){
                                        //         if (err != null) {
                                        //             console.log(err);
                                        //             res.send({ mensaje: "error: " + err });
                                        //         } else {
                                        //             // console.log("Hola");
                                        //             // res.send(datos);
                                        //             // res.send(respinsert);
                                        //             res.send({ mensaje: "Se ha realizado la reserva correctamente." });
                                        //         }
                                        //     })
                                        // }
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

////////////////////////////////  NO  //////////////////////////////////////////////
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
////////////////////////////////  NO  //////////////////////////////////////////////




////////////////////////////////  SEGUIR AQUI!!!!!   /////////////////////////////

// BORRAR UN LIBRO QUE YA NO ESTÉ DISPONIBLE EN ESA BIBLIO.
router.delete("/delete", function (req, res) {
    let prestamoElim = {  //creamos el objeto para que saque toda la info del input (del html)
        isbn: req.body.isbn,
        barrio: req.body.barrio,
    }
    let dbConnection = req.app.locals.db;

    let checkempty = funmod.checkProperties(prestamoElim);
    if (checkempty) {
        res.send({ mensaje: "Rellene todos los campos", status: false });
    } else {
        dbConnection.collection("libros").find({ "isbn": prestamoElim.isbn }).toArray(function (err, datoslibPrElim) {
            if (datoslibPrElim.length == 0) {
                res.send({ mensaje: "El libro con ISBN " + prestamoElim.isbn + " no se ha encontrado en el listado de préstamos.", status: false });
            }
            else {
                dbConnection.collection("bibliotecas").find({ "barrio": prestamoElim.barrio }).toArray(function (err, datosbibPrElim) {
                    if (datosbibPrElim.length == 0) {
                        res.send({ mensaje: "Nombre de biblioteca incorrecto o no registrado en la Sección de Bibliotecas.", status: false });
                    }
                    else {
                        dbConnection.collection("prestamos").find({ "isbn": prestamoElim.isbn, "barrio": prestamoElim.barrio }).toArray(function (err, datosPresElim) {
                            if (datosPresElim.length == 0) {
                                res.send({ mensaje: "No se ha registrado ningún préstamo del libro con ISBN " + prestamoElim.isbn + " en la biblioteca de " + prestamoElim.barrio, status: false });
                            }
                            else {
                                dbConnection.collection("catbiblios").updateOne({ "isbn": prestamoElim.isbn, "barrio": prestamoElim.barrio }, { $set: { "disponibilidad": "Disponible" } });
                                dbConnection.collection("prestamosHist").insertOne(datosPresElim[0]);
                                var dateObj = new Date();
                                dbConnection.collection("prestamosHist").updateOne({ "_id": ObjectId(datosPresElim[0]._id) }, { $set: { "fechaFin": `${dateObj.getUTCFullYear()}/${dateObj.getUTCMonth() + 1}/${dateObj.getUTCDate()}` } });
                                dbConnection.collection("prestamos").deleteOne(datosPresElim[0], function (err, datosPrestamoElim) {  /// otra forma:  .deleteOne({ "isbn": prestamoElim.isbn, "barrio": prestamoElim.barrio }
                                    if (err != null) {
                                        console.log(err);
                                        res.send({ mensaje: "error: " + err, status: false });
                                    } else {
                                        // console.log(datos);
                                        // res.send(datos);
                                        // res.json(datos);
                                        res.send({ mensaje: "El libro con ISBN " + prestamoElim.isbn + " ha sido devuelto correctamente a la base de datos de la biblioteca de " + prestamoElim.barrio + ".\nSe ha marcado de nuevo como Disponible.", status: true });
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