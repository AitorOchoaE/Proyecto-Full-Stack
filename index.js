const express = require('express')
const mongodb = require('mongodb');
const bcrypt = require("bcrypt");

let libros = require('./libros');
let bibliotecas = require('./bibliotecas');
let catbiblios = require('./catbiblios');
let usuarios = require('./usuarios');
let prestamos = require('./prestamos');
let prestamosHist = require('./prestamosHist');
let login = require('./login');

const app = express();

app.use('/libros', libros); //es como localhost:3000/libros, y dentro de libros js, si tenemos /post, será lo mismo que localhost:3000/libros/post
app.use('/bibliotecas', bibliotecas);
app.use('/catbiblios', catbiblios);
app.use('/usuarios', usuarios);
app.use('/prestamos', prestamos);
app.use('/prestamosHist', prestamosHist);
app.use('/login', login);

let MongoClient = mongodb.MongoClient; //MongoClient tiene la capacidad de conectarse a una base de datos (como un cliente)
let db;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

MongoClient.connect('mongodb://127.0.0.1:27017', function (err, client) { //Le decimos cuál es la dirección del servidor de la base de datos a la que se tiene que conectar.
    if (err !== null) {
        console.log(err);
    } else {
        app.locals.db = client.db('redbiblios');
    }
});

app.listen(3000);