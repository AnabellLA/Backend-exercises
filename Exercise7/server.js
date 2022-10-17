const express = require("express");
const PORT = 8080;
const { Server: IOServer } = require("socket.io");
const { Server: HttpServer } = require("http");
const { optionsMDB } = require("./mariaDB");
const { optionsSQL } = require("./SQLite3");
const { Contenedor } = require("./Contenedor");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static("./public"));
app.get("/", (req, res) => {
	res.sendFile("index.html");
});

//Funciones fechas
function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

function formatDate(date) {
    return (
        [padTo2Digits(date.getDate()), padTo2Digits(date.getMonth() + 1), date.getFullYear()].join('/')
        + ' ' +
        [padTo2Digits(date.getHours()), padTo2Digits(date.getMinutes()), padTo2Digits(date.getSeconds())].join(':')
    );
}

//consigna 1
let containerProducts = new Contenedor('productos', optionsMDB)
containerProducts.GetAll().then( result => 
    io.on("connection", (socket) => {
        console.log("nuevo cliente conectado"); 
        socket.emit("products", result);
        socket.on("new-product", (data) => {   
            containerProducts.Save(data);
            io.sockets.emit("products", result);
        });
    })
)

//consigna 2
let container = new Contenedor('mensajes', optionsSQL)
container.GetAll().then( result => 
    io.on("connection", (socket) => {
        console.log("nuevo cliente conectado");
        socket.emit("messages", result);
        socket.on("new-message", (data) => {
            var today = new Date();
            let dataFinal = {
                author: data.author,
                date: formatDate(today),
                text: data.text
            }
            if (dataFinal.author.length > 0){
                container.Save(dataFinal);
                io.sockets.emit("messages", result);
            }
        });
    })
)


httpServer.listen(8080, () => console.log("servidor Levantado"));
