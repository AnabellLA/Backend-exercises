import express from "express";
import MyConnectionFactory from '../capaServicio-DAO/DAOfactory/DAOfactory-Chat.js';
import { Server as IOServer } from "socket.io";
import { Server as HttpServer } from "http";

const routerChat = express.Router();
const httpServer = new HttpServer(routerChat);
const io = new IOServer(httpServer);
const connection = new MyConnectionFactory();
const getAllChat = connection.returnDbConnection();
const getByMailChat = connection.returnDbConnection();

routerChat.use(handleErrors);
routerChat.use(express.static("./public"));

routerChat.get("/", (req, res) => {
	res.sendFile("index.html", {root: "./capaRuteo/public/"});
    getAllChat.getAll().then( result => 
        io.on("connection", (socket) => {
            console.log("nuevo cliente conectado");
            socket.emit("messages", result);
            socket.on("new-message", (message) => {
                if (message.email.length > 0){
                    getAllChat.Save(message);
                    io.sockets.emit("messages", result);
                }
            });
        })
    )
});

routerChat.get("/:email", (req, res) => {
	res.sendFile("index.html", {root: "./capaRuteo/public/"});
    getByMailChat.getByEmail(req.params.email).then( result => 
        io.on("connection", (socket) => {
            console.log("nuevo cliente conectado");
            socket.emit("messages", result);
            socket.on("new-message", (message) => {
                if (message.email.length > 0){
                    getByMailChat.Save(message);
                    io.sockets.emit("messages", result);
                }
            });
        })
    )
});

function handleErrors(err, req, res, next) {
    console.log(err);
    res.status(500).send("An internal error occurred");
}

export default routerChat;