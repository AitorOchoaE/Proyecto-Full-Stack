const express = require('express');
const router = express.Router();

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.get("/get", function (req, res) { //el "/" es lo mismo que localhost:3000/clientes/, ya que /clientes lo hemos definido en el index.js
    let dbConnection = req.app.locals.db;
    dbConnection.collection("reservas").find().toArray(function (err, datos) {
        if (err != null) {
            console.log(err);
            res.send({ mensaje: "error: " + err });
        } else {
            // console.log(datos);
            // res.send(datos);
            res.json(datos);
        }
    });
})

router.post("/post", function (req, res) { //el "/post" es lo mismo que localhost:3000/clientes/post/, ya que /clientes lo hemos definido en el index.js
    let reservaNueva = {  //creamos el objeto para que saque toda la info del input (del html)
        dni: req.body.dni,
        num_habit: req.body.num_habit,
        fechaCheckIn: req.body.fechaCheckIn,
        fechaCheckOut: req.body.fechaCheckOut
    }
    let dbConnection = req.app.locals.db;
    dbConnection.collection("clientes").find({ "dni": reservaNueva.dni }).toArray(function (err, respdni){ //if (dbConnection.collection("clientes").find({ "dni": reservaNueva.dni }).count() > 0) { // serviria si hago != null??
        if (respdni.length == 0){ 
            // res.send({ respdni[0].apellido }); /////respdni es un array con un objeto dentro.
            res.send({ mensaje: "El cliente no está previamente registrado en la base de datos" });
        }
        else{
            dbConnection.collection("habitaciones").find({ "num_habit": parseInt(reservaNueva.num_habit) }).toArray(function (err, respnumhabit){
                if (respnumhabit.length == 0){
                    // res.send(respnumhabit);
                    res.send({ mensaje: "No existe una habitación con ese número" });
                }
                else{
                    if (!respnumhabit[0].estado){ //es decir, si está en false (ocupado)
                        res.send({ mensaje: "La habitación " + respnumhabit[0].num_habit + " está ocupada" });
                    }
                    else{
                        dbConnection.collection("habitaciones").updateOne({"num_habit": parseInt(reservaNueva.num_habit)},{$set:{"estado": false}})//, function(err, respdisphabit){}) //lo ponemos como ocupado.
                        dbConnection.collection("reservas").insertOne(reservaNueva, function(err,respinsert){
                            if (err != null) {
                                console.log(err);
                                res.send({ mensaje: "error: " + err });
                            } else {
                                // console.log("Hola");
                                // res.send(datos);
                                // res.send(respinsert);
                                res.send({ mensaje: "Has realizado la reserva correctamente" });
                            }
                        })
                    }
                }
            })
        }
    })
})

// router.post("/post", function (req, res) { //el "/post" es lo mismo que localhost:3000/clientes/post/, ya que /clientes lo hemos definido en el index.js
//     let reservaNueva = {  //creamos el objeto para que saque toda la info del input (del html)
//         dni: req.body.dni,
//         num_habit: req.body.num_habit,
//         fechaCheckIn: req.body.fechaCheckIn,
//         fechaCheckOut: req.body.fechaCheckOut
//     }
//     let dbConnection = req.app.locals.db;
//     dbConnection.collection("clientes").find({ "dni": reservaNueva.dni }).toArray(function (err, respdni){ //if (dbConnection.collection("clientes").find({ "dni": reservaNueva.dni }).count() > 0) { // serviria si hago != null??
//         if (respdni.length == 0){ 
//             res.send({ respdni[0].apellido }); /////respdni es un array con un objeto dentro.
//             // res.send({ mensaje: "El cliente no está previamente registrado en la base de datos" });
//         }
//         else{
//             dbConnection.collection("habitaciones").find({ "num_habit": reservaNueva.num_habit }).toArray(function (err, respnumhabit){
//                 if (respnumhabit.length == 0){
//                     // res.send(respnumhabit);
//                     res.send({ mensaje: "No existe una habitación con ese número" });
//                 }
//                 else{
//                     if (!respnumhabit.estado){ //es decir, si está en false (ocupado)
//                         res.send({ mensaje: "La habitación " + respnumhabit.num_habit + " está ocupada" });
//                     }
//                     else{
//                         dbConnection.collection("habitaciones").updateOne({"num_habit": reservaNueva.num_habit},{$set:{"estado": false}})//, function(err, respdisphabit){}) //lo ponemos como ocupado.
//                         dbConnection.collection("reservas").insertOne(reservaNueva, function(err,respinsert){
//                             if (err != null) {
//                                 console.log(err);
//                                 res.send({ mensaje: "error: " + err });
//                             } else {
//                                 // console.log("Hola");
//                                 // res.send(datos);
//                                 res.send(respinsert);
//                             }
//                         })
//                     }
//                 }
//             })
//         }
//     })
// })

//     if (dbConnection.collection("clientes").find({ "dni": reservaNueva.dni }).count() > 0) { // serviria si hago != null??
//         if (dbConnection.collection("habitaciones").find({ "num_habit": reservaNueva.num_habit }).count() > 0) {
//             if (dbConnection.collection("habitaciones").find({ "num_habit": reservaNueva.num_habit, "estado": true }).count() > 0) {
//                 dbConnection.collection("reservas").insertOne(reservaNueva, function (err, datos) {
//                     if (err != null) {
//                         console.log(err);
//                         res.send({ mensaje: "error: " + err });
//                     } else {
//                         // console.log(datos);
//                         // res.send(datos);
//                         res.json(datos);
//                     }
//                 });
//             }
//             else {
//                 res.send("La habitación no se encuentra disponible");
//             }
//         }
//         else {
//             res.send("No existe la habitación con ese número");
//         }
//     }
//     else {
//         res.send("No existe un cliente con ese DNI");
//     }
// })

// router.put("/put", function (req, res) {
//     let clienteModif = {  //creamos el objeto para que saque toda la info del input (del html)
//         nombre: req.body.nombre,
//         apellido: req.body.apellido,
//         dni: req.body.dni
//     }
//     let dbConnection = req.app.locals.db;
//     dbConnection.collection("clientes").updateOne({ "dni": clienteModif.dni }, { $set: { "nombre": clienteModif.nombre, "apellido": clienteModif.apellido } }, function (err, datos) {
//         if (err != null) {
//             console.log(err);
//             res.send({ mensaje: "error: " + err });
//         } else {
//             // console.log(datos);
//             // res.send(datos);
//             res.json(datos);
//         }
//     });
// })

// router.delete("/delete", function (req, res) {
//     let dbConnection = req.app.locals.db;
//     dbConnection.collection("clientes").deleteMany({"patas": mesaBorrar}, function (err, datos) {  ///////////////////
//         if (err != null) {
//             console.log(err);
//             res.send({ mensaje: "error: " + err });
//         } else {
//             // console.log(datos);
//             // res.send(datos);
//             res.json(datos);
//         }
//     });
// })

module.exports = router; ///////////habría que ver si es la manera de exportar router en este caso o si solo nos exporta el ultimo.