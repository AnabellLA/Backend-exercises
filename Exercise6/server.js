const express = require("express");
const PORT = 8080;
const { Server: IOServer } = require("socket.io");
const { Server: HttpServer } = require("http");

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

//Funciones para guardar mensajes
const fs = require('fs')

class Container {
    constructor(name) {
        this.name = name
    }

    async Save (newElement){
        try{
            let content = await fs.promises.readFile(`./${this.name}`, 'utf-8')
            let contentJson = JSON.parse(content)
            contentJson.push(newElement)
            await fs.promises.writeFile(`./${this.name}`, JSON.stringify(contentJson, null, 2));
            return console.log('nuevo registro agregado')
        }
    catch(err){
        console.log(err)
        }
    }

    async GetAll(){
        try{
            let content = await fs.promises.readFile(`./${this.name}`, 'utf-8')
            let contentJson = JSON.parse(content);
            return contentJson
        }catch(err){
            console.log(err)
        }
    }
}

//consigna 1
let containerProducts = new Container('product.json')
containerProducts.GetAll().then( result => 
    io.on("connection", (socket) => {
        console.log("nuevo cliente conectado");
        socket.emit("products", result);
        socket.on("new-product", (data) => {
            let lastIndex = result.length - 1
            let lastId = result[lastIndex].id
            let newId = lastId + 1
            let newProduct = {
                id: newId * 1,
                title: data.title,
                price: data.price * 1,
                thumbnail: data.thumbnail
            }    
            containerProducts.Save(newProduct);
            io.sockets.emit("products", result);
        });
    })
)

//consigna 2
let container = new Container('message.json')
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
