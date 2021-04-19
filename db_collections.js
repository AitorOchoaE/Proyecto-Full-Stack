//////////////////////////////////////////////////////////////
///OJO!!! NO HAY QUE EXPORTAR NADA, SINO QUE METEREMOS ESTAS COLECCIONES EN LA BD, EN CMD:
/////////en CMD pondremos:
// ir a la direccion: cd "C:\Program Files\MongoDB\Server\4.2\bin\"
// mongod
// mongo
// use hotel
// meter las colecciones:
db.usuarios.insertMany( [
    {
        nombre: "Jon",
        apellido1: "Garcia",
        apellido2: "Sancho",
        dni: "12345678F"
    },
    {
        nombre: "Nerea",
        apellido1: "Fernandez",
        apellido2: "Vazquez",
        dni: "83582598G"
    },
    {
        nombre: "Silvia",
        apellido1: "Blanco",
        apellido2: "Uribe",
        dni: "21436587H"
    },
    {
        nombre: "Pepe",
        apellido1: "Moreno",
        apellido2: "Etxabe",
        dni: "09876543J"
    },
    {
        nombre: "Bego",
        apellido1: "Dominguez",
        apellido2: "Uria",
        dni: "87654321K"
    },
    {
        nombre: "Iker",
        apellido1: "Domingo",
        apellido2: "Uria",
        dni: "56372859L"
    },
    {
        nombre: "Aitor",
        apellido1: "Ochoa",
        apellido2: "Ecenarro",
        dni: "11111111A"
    },
    {
        nombre: "Naroa",
        apellido1: "Etxebarria",
        apellido2: "Domingo",
        dni: "22222222N"
    },
    {
        nombre: "Ane",
        apellido1: "Uria",
        apellido2: "Moreno",
        dni: "67845623L"
    },
    {
        nombre: "Jokin",
        apellido1: "Etxabe",
        apellido2: "Blanco",
        dni: "98776554J"
    },
    {
        nombre: "Miren",
        apellido1: "Uribe",
        apellido2: "Dominguez",
        dni: "23456734U"
    },
    {
        nombre: "Sara",
        apellido1: "Vazquez",
        apellido2: "Fernandez",
        dni: "65498711S"
    },
    {
        nombre: "Ander",
        apellido1: "Qwerty",
        apellido2: "Qwerty",
        dni: "78934577Q"
    },
    {
        nombre: "Lorena",
        apellido1: "Sancho",
        apellido2: "Garcia",
        dni: "66339933Y"
    }
] );

db.libros.insertMany( [
    {
        titulo: "Cien años de soledad",
        autor: "Gabriel García Márquez",
        isbn: "9788467828700",
        genero: "Realismo mágico",
        img: "https://images-na.ssl-images-amazon.com/images/I/A1ULI3MovqL.jpg"
    },
    {
        titulo: "El señor de los anillos",
        autor: "J. R. R. Tolkien",
        isbn: "9788467828701",
        genero: "Fantasía",
        img: "https://images-na.ssl-images-amazon.com/images/I/81Hx32a745L.jpg"
    },
    {
        titulo: "1984",
        autor: "George Orwell",
        isbn: "9788467828703",
        genero: "Ficción distópica",
        img: "https://images-na.ssl-images-amazon.com/images/I/81HSpSoddtL.jpg"
    },
    {
        titulo: "Un mundo feliz",
        autor: "Aldous Huxley",
        isbn: "9788467828704",
        genero: "Ficción distópica",
        img: "https://images-na.ssl-images-amazon.com/images/I/81lB36lG5hL.jpg"
    },
    {
        titulo: "Orgullo y prejuicio",
        autor: "Jane Austen",
        isbn: "9788467828705",
        genero: "Ficción. Costumbrismo",
        img: "https://www.librosyliteratura.es/wp-content/uploads/2017/04/orgullo-y-prejuicio.jpg"
    },
    {
        titulo: "Crimen y castigo",
        autor: "Fiódor Dostoyevski",
        isbn: "9788467828706",
        genero: "Policíaco. Psicológico",
        img: "https://www.albaeditorial.es/wp-content/uploads/2020/10/9788490653517-crimen-y-castigo-alba-editorial.jpg"
    },
    {
        titulo: "Lolita",
        autor: "Vladimir Nabokov",
        isbn: "9788467828707",
        genero: "Ficción. Erótica.",
        img: "https://images-na.ssl-images-amazon.com/images/I/71554y7ajDL.jpg"
    },
    {
        titulo: "Ulises",
        autor: "James Joyce",
        isbn: "9788467828708",
        genero: "Épica",
        img: "https://www.elsotano.com/imagenes_grandes/9788496/978849697527.JPG"
    },
    {
        titulo: "Madame Bovary",
        autor: "Gustave Flaubert",
        isbn: "9788467828709",
        genero: "Ficción. Realismo. Novela rosa",
        img: "https://imagessl6.casadellibro.com/a/l/t7/36/9788415723936.jpg"
    },
    {
        titulo: "En busca del tiempo perdido",
        autor: "Marcel Proust",
        isbn: "9788467828710",
        genero: "Novela social",
        img: "https://images-na.ssl-images-amazon.com/images/I/51-qeFo4GML._SX331_BO1,204,203,200_.jpg"
    },
    {
        titulo: "Don Quijote de la Mancha",
        autor: "Miguel de Cervantes",
        isbn: "9788467828711",
        genero: "Sátira. Aventuras. Parodia",
        img: "https://imagessl8.casadellibro.com/a/l/t7/58/9788491873358.jpg"
    },
    {
        titulo: "El retrato de Dorian Gray",
        autor: "Oscar Wilde",
        isbn: "9788467828712",
        genero: "Novela gótica. Decadentismo",
        img: "https://imagessl6.casadellibro.com/a/l/t7/36/9788467032536.jpg"
    },
    {
        titulo: "Ana Karenina",
        autor: "León Tolstói",
        isbn: "9788467828713",
        genero: "Ficción. Romance histórico",
        img: "https://images-na.ssl-images-amazon.com/images/I/51gWSPD6BPL._SX362_BO1,204,203,200_.jpg"
    },
    {
        titulo: "El Principito",
        autor: "Antoine de Saint-Exupéry",
        isbn: "9788467828714",
        genero: "Fábula",
        img: "https://imagessl4.casadellibro.com/a/l/t7/94/9788478887194.jpg"
    },
    {
        titulo: "El proceso",
        autor: "Franz Kafka",
        isbn: "9788467828715",
        genero: "Ficción distópica",
        img: "https://resumiendolo.com/wp-content/uploads/2018/02/El-proceso-de-kafka-10.jpg"
    },
    {
        titulo: "El ruido y la furia",
        autor: "William Faulkner",
        isbn: "9788467828716",
        genero: "Ficción gótica",
        img: "https://static.megustaleer.com/images/libros_650_x/EAL89711.jpg"
    },
    {
        titulo: "Hamlet",
        autor: "William Shakespeare",
        isbn: "9788467828717",
        genero: "Drama",
        img: "https://images-na.ssl-images-amazon.com/images/I/71oi+8voZKL.jpg"
    },
    {
        titulo: "Lo que el viento se llevó",
        autor: "Margaret Mitchell",
        isbn: "9788467828718",
        genero: "Ficción histórica. Drama",
        img: "https://m.media-amazon.com/images/I/517buCKnBjL.jpg"
    },
    {
        titulo: "La Odisea",
        autor: "Homero",
        isbn: "9788467828719",
        genero: "Épica",
        img: "https://www.plutonediciones.com/tienda/wp-content/uploads/2016/12/la-odisea-jpg.jpg"
    },
    {
        titulo: "Las uvas de la ira",
        autor: "John Steinbeck",
        isbn: "9788467828720",
        genero: "Ficción",
        img: "https://imagessl0.casadellibro.com/a/l/t7/90/9788491813590.jpg"
    }
] );

db.bibliotecas.insertMany( [
    {
        barrio: "Deusto",
        distrito: "Deusto",
        direccion: "Avenida Aguirre Lehendakari, 42",
        telefono: "944 474 604",
        mail: "bibliotecadeusto@bilbao.eus"
    },
    {
        barrio: "San Ignacio",
        distrito: "Deusto",
        direccion: "Avenida Aguirre Lehendakari, 170",
        telefono: "944 752 104",
        mail: "bibliotecasignacio@bilbao.eus"
    },
    {
        barrio: "Castaños",
        distrito: "Uribarri",
        direccion: "Calle Castaños, 11",
        telefono: "944 203 404",
        mail: "bibliotecacastanos@bilbao.eus"
    },
    {
        barrio: "Zurbaranbarri",
        distrito: "Uribarri",
        direccion: "Zurbaranbarri, 3",
        telefono: "944 466 001",
        mail: "bibliotecazurb@bilbao.eus"
    },
    {
        barrio: "Otxarkoaga",
        distrito: "Otxarkoaga-Txurdinaga",
        direccion: "Avenida Pau Casals, 19",
        telefono: "944 128 749",
        mail: "bibliotecasignacio@bilbao.eus"
    },
    {
        barrio: "San Ignacio",
        distrito: "Deusto",
        direccion: "Avenida Aguirre Lehendakari, 170",
        telefono: "944 752 104",
        mail: "bibliotecaotxarkoaga@bilbao.eus"
    },
    {
        barrio: "San Ignacio",
        distrito: "Deusto",
        direccion: "Avenida Aguirre Lehendakari, 170",
        telefono: "944 752 104",
        mail: "bibliotecasignacio@bilbao.eus"
    },
    {
        barrio: "Begoña",
        distrito: "Begoña",
        direccion: "Calle Circo Amateur Del Club Deportivo, 2",
        telefono: "944 734 754",
        mail: "bibliotecabegona@bilbao.eus"
    },
    {
        barrio: "Bidebarrieta",
        distrito: "Ibaiondo",
        direccion: "Calle Bidebarrieta, 4",
        telefono: "944 752 104",
        mail: "bidebarrieta@bilbao.eus"
    },
    {
        barrio: "Buia",
        distrito: "Ibaiondo",
        direccion: "Barrio Buia, 140",
        telefono: "944 752 477",
        mail: "bidebarrieta@bilbao.eus"
    },
    {
        barrio: "Ibaialde",
        distrito: "Ibaiondo",
        direccion: "Calle Ibaialde, 3",
        telefono: "944 752 753",
        mail: "bibliotecaibaialde@bilbao.eus"
    },
    {
        barrio: "San Adrián",
        distrito: "Ibaiondo",
        direccion: "Avenida San Adrian, 34",
        telefono: "944 752 222",
        mail: "bibliotecasanadrian@bilbao.eus"
    },
    {
        barrio: "San Francisco",
        distrito: "Ibaiondo",
        direccion: "Plaza Corazon de Maria, s/n",
        telefono: "944 752 086",
        mail: "bibliotecasanfrancisco@bilbao.eus"
    },
    {
        barrio: "Zabala",
        distrito: "Ibaiondo",
        direccion: "Calle Bruno Mauricio Zabala, 41",
        telefono: "944 752 502",
        mail: "bibliotecazabala@bilbao.eus"
    },
    {
        barrio: "Irala",
        distrito: "Rekalde",
        direccion: "Estrada Giña, 2",
        telefono: "944 752 772",
        mail: "bibliotecairala@bilbao.eus"
    },
    {
        barrio: "Rekalde",
        distrito: "Rekalde",
        direccion: "Travesía Altube, 6",
        telefono: "944 752 551",
        mail: "bibliotecarekalde@bilbao.eus"
    },
    {
        barrio: "Zorroza",
        distrito: "Basurto-Zorrotza",
        direccion: "Calle Fray Juan, 35",
        telefono: "944 752 001",
        mail: "bibliotecazorroza@bilbao.eus"
    }
] );

// OJO!!!  db.catbiblios debe estar VACIO!!
db.catbiblios.insertOne({})

// OJO!!!  db.prestamos debe estar VACIO!!
db.prestamos.insertOne({})

// OJO!!!  db.prestamosHist debe estar VACIO!!
db.prestamosHist.insertOne({})

// OJO!!!  db.login debe estar VACIO!!
db.login.insertOne({})

///////////////////CUANDO LO METAMOS EN CMD-MONGODB, LO PODREMOS VER EN ROBOT 3T






// esto no!!!
db.reservas.insertOne( 
    {
        cliente: "55555555H",
        num_habit: 105,
        fechaCheckIn: "03-05-2021",
        fechaCheckOut: "07-05-2021"
    }
);

db.libros.insertOne(
    {
        titulo: "Las uvas de la ira",
        autor: "John Steinbeck",
        isbn: "9788467828720",
        genero: "Ficción"
    },
)
db.bibliotecas.insertOne(
    {
        barrio: "Zorroza",
        distrito: "Basurto-Zorrotza",
        direccion: "Calle Fray Juan, 35",
        telefono: "944 752 001",
        mail: "bibliotecazorroza@bilbao.eus"
    },
)