///////// ENCRIPTACION PASSWORD //////////////

const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

router.use(express.urlencoded({ extended: false }));
router.use(express.json());
let db;
// 1. SIGN IN. Vamos a registrarnos.

router.post("/post", function (req, res) {
    let usuarioNuevo = {
        username: req.body.username1,
        password: req.body.password1,
    }
    let dbConnection = req.app.locals.db;

    dbConnection.collection("login").find({ username: usuarioNuevo.username }).toArray(function (err, arrayUsuReg) {
        if (arrayUsuReg.length != 0) { //si ya existe alguien con ese nombre
            res.send({ mensaje: "Ya existe un usuario registrado con este nombre. Por favor, elija otro nombre.", status: false }); //si no puede hacer el insert correctamente.
        }
        else { //si el usuario no existe previamente.
            let contraseniaCifrada = bcrypt.hashSync(usuarioNuevo.password, 10); //HASHSYNC: para encriptar contraseña. Mediante bcrypt (que hemos importado) vamos a hacer una funcion que tiene el propio packgae, donde le pasamos una contraseña y nos pasará una encriptación con carácteres. Cuanto mayor sea en num, mas encriptado y mas tardará en generarlo.
            console.log("contraseña cifrada:" + contraseniaCifrada);

            let coincidencia = bcrypt.compareSync(usuarioNuevo.password, contraseniaCifrada); //COMPARESYNC: nos comparada la nuestra y la encriptada. Es variable booleana: Si son "iguales", nos dará un true y continúa haciendo lo de abajo, si no daría false.
            console.log(coincidencia);
            if (coincidencia) {
                dbConnection.collection("login").insertOne({ username: usuarioNuevo.username, password: contraseniaCifrada }, function (err, userUpdate) {
                    // console.log(userUpdate);
                    if (err !== null) {
                        res.send({ mensaje: "Ha habido un error", status: false }); //si ha habido algun error.
                    } else {
                        if (userUpdate.result.n > 0) {
                            res.send({ mensaje: "Usuario creado", status: true }); //si puede hacer el insert correctamente.
                        } else {
                            res.send({ mensaje: "El usuario no se ha podido crear", status: false }); //si no puede hacer el insert correctamente.
                        }
                    }
                })
            }
        }
    })

})

// 2. LOG IN. Vamos a comprobar que estamos metiendo bien la contraseña para poder entrar en una página.

router.post("/entrar", function (req, res) {
    let loginUsuario = {
        username: req.body.username2,
        password: req.body.password2,
    }

    let dbConnection = req.app.locals.db;
    dbConnection.collection("login")
        .find({ username: loginUsuario.username }).toArray(function (err, arrayUsuario) {
            // console.log(arrayUsuario);
            if (err !== null) {
                res.send({ mensaje: "Ha habido un error", status: false });
            } else {
                if (arrayUsuario.length > 0) {
                    if (bcrypt.compareSync(loginUsuario.password, arrayUsuario[0].password)) { //compara la que le metemos con la que tiene en la base de datos (la encriptada).
                        res.send({ mensaje: `Ingreso correcto a la página.\n¡Bienvenido/a, ${loginUsuario.username}!`, status: true, user: loginUsuario.username });
                    } else {
                        res.send({ mensaje: "Contraseña incorrecta.", status: false });
                    }
                } else {
                    res.send({ mensaje: "El usuario no está registrado.", status: false });
                }
            }
        });
});

module.exports = router;