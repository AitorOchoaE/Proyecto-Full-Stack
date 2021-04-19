const express = require('express');
const router = express.Router();

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.get("/get", function (req, res) { //el "/" es lo mismo que localhost:3000/catbiblios/, ya que /catbiblios lo hemos definido en el index.js
    let dbConnection = req.app.locals.db;
    dbConnection.collection("prestamosHist").find().toArray(function (err, datos) {
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

module.exports = router;