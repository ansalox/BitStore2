// Variables de modulos (importamos librerias)
let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
// Variable para puerto de conexion del servidor
let port = process.env.PORT || 3001;

// variable de la aplicacion que ejecuta el server
let app = express();

// Realizamos conexion del servidor
app.listen(port, () => {
  console.log("Servidor Backend funcionando en el puerto :" + port);
});

// Routes
let Usuario = require("./routes/usuario");
let Categoria = require("./routes/categoria");
let Curso = require("./routes/curso");
let Estudiante = require("./routes/estudiante");
let Compra = require("./routes/compra");

// Conexion a DB
mongoose.connect(
  "mongodb://localhost:27017/bitstoredb",
  { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => console.log("Conexion con MongoDB: ON"))
  .catch((err) => console.log("Conexion a MongoDB: OFF"))

// Analizar la codificacion de las url
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req,res,next)=>{
  res.header('Content-Type: application/json');
  res.header('Access-Control-Allow-Origin','*'); 
  res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
  res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
  next();
});



// Usar las rutas (API)
app.use("/api", Usuario);
app.use("/api", Categoria);
app.use("/api", Curso);
app.use("/api", Estudiante);
app.use("/api", Compra);

// Creamos modulo para importar
module.exports = app;
