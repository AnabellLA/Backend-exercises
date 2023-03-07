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
import yargs from "yargs";
import { Server as IOServer } from "socket.io";
import { Server as HttpServer } from "http";
import { Socket } from "dgram";

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

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

io.on("connection", (socket) => {
	console.log("se conecto un usuario");
});
app.set("socketio", io);


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