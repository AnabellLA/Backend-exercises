import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import hbs from "express-handlebars";
import rutaNueva from "./capaRuteo/routers.js";
import routerProductos from "./capaRuteo/routerProductos.js";
import routerCarrito from "./capaRuteo/routerCarrito.js";
import * as dotenv from 'dotenv'
dotenv.config();
import MongoStore from "connect-mongo";
import yargs from "yargs";import MyConnectionFactory from './capaServicio-DAO/DAOfactory/DAOfactory-Chat.js';
import { Server as IOServer } from "socket.io";
import { Server as HttpServer } from "http";
import { login } from "./capaController/controller.js";

const app = express();

//io
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const connection = new MyConnectionFactory();
const getAllChat = connection.returnDbConnection();
const getByMailChat = connection.returnDbConnection();

//servidor
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/*----------- Session -----------*/
app.use(cookieParser());
app.use(
	session({
		secret: "SECRETO",
		resave: false,
		saveUninitialized: false,
		store: new MongoStore({
			mongoUrl: process.env.URL_BD,
			retries: 0,
			ttl: 10 * 60,
		}),
		cookie: {
			maxAge: 10000,
		},
	})
);

// motor de vistas
app.set("views", "./src/views");

app.engine(
	".hbs",
	hbs.engine({
		defaultLayout: "main",
		layoutsDir: "./src/views/layouts",
		extname: ".hbs",
	})
);
app.set("view engine", ".hbs");

//rutas
app.use(rutaNueva);
app.use("/productos", routerProductos);
app.use("/carritos", routerCarrito);


//SOCKET IO
app.get("/",(req, res) => {
	res.redirect("/login")
})
app.get("/chat", (req, res) => {
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
	),
    res.sendFile("index.html", {root: "./public/"})
});

app.get("/chat/:email", (req, res) => {
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
    ),
	res.sendFile("index.html", {root: "./public/"});
});

//servidor
const args = yargs(process.argv.slice(2))
.alias({
	m: "modo",
	p: "puerto",
	d: "debug",
})
.default({
	modo: "prod",
	puerto: 8080,
	debug: false,
}).argv;

//Port connection
const PORT = 8080 || parseInt(args.p)

app.get("/datos", (req, res) => {
	console.log(`port ${PORT} -> FYH ${Date.now()}`);
	res.send(`servidor express <span style="color:blueviolet;"> (NGINX)</span> 
		en ${PORT} <b>PID: ${process.pid}</b> - ${new Date().toLocaleString()} as ${
		process.argv
	}`);
});

const server = app.listen(args.p, () => {
		console.log(`Http server started on port ${server.address().port}`)
	})
	server.on("error", (error) => console.log(`Error in server ${error}`))