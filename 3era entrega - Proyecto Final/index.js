import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import hbs from "express-handlebars";
import bCrypt from "bcrypt";
import mongoose from "mongoose";
import UsuariosSchema from "./models/usersModel.js";
import productModel from "./models/productModel.js";
import routerProductos from "./rutas/routerProductos.js";
import routerCarrito from "./rutas/routerCarrito.js";
import User from "./DAOs/usuario.daos.class.js";
import pino from "pino";
import nodemailer from 'nodemailer';

//passport imports
import passport from "passport";
import { Strategy } from "passport-local";

const localStrategy = Strategy;

const app = express();
const loggerError = pino('error.log')
const loggerWarn = pino('warning.log')
const loggerInfo = pino()

loggerError.level = 'error'
loggerWarn.level = 'warn'
loggerInfo.level = 'info'

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
		cookie: {
			maxAge: 10000, //10 mins seg
		},
	})
);

//middlewares passport
app.use(passport.initialize());
app.use(passport.session());

//containers
class Productos {
    constructor() {
        this.url = "mongodb+srv://anabellbackend:yrithze987@backendcourse.tiddlcu.mongodb.net/?retryWrites=true&w=majority"
        this.mongodb = mongoose.connect
    } 

    async getAll() {
        try {
            await this.mongodb(this.url)
            return await productModel.find().lean()
        } catch (error) {
            console.log(error);
        }
    }
}

const claseProductos = new Productos();
const claseUsuario = new User();

//estrategias
passport.use(
	"register",
	new localStrategy(
		{ passReqToCallback: true, usernameField: 'username', passwordField: 'password' },
		async (req, username, password, done) => {
			console.log("register", username + password);
			mongoose.connect(
				'mongodb+srv://anabellbackend:yrithze987@backendcourse.tiddlcu.mongodb.net/?retryWrites=true&w=majority'
			);
			
			try {
				UsuariosSchema.create(
					{
						username,
						password: createHash(password),
						name: req.body.name,
						address: req.body.address,
						age: req.body.age,
						phone: req.body.phone,
						avatar: req.body.avatar,
					},
					(err, userWithId) => {
						if (err) {
							console.log(err)
							return done(err, null);
						}
						var transporter = nodemailer.createTransport({
							service: 'Gmail',
							auth: {
								user: 'hikarinoyoake97@gmail.com',
								pass: 'Carlos1206'
							}
						});
						var mailOptions = {
							from: 'MangaStore',
							to: 'hikarinoyoake97@gmail.com',
							subject: 'Nuevo registro',
							text: `un nuevo usuario se registró en la plataforma/n
							DATOS/n
							correo: ${userWithId.username}/n
							nombre: ${userWithId.name}/n
							edad: ${userWithId.age}/n
							dirección: ${userWithId.address}/n
							teléfono: ${userWithId.phone}/n
							avatar: ${userWithId.avatar}/n`
						};
						transporter.sendMail(mailOptions, function(error, info){
							if (error){
								console.log(error);
							} else {
								console.log("Email sent");
							}
						});		
						return done(null, userWithId);
					}
				);
			} catch (e) {
				return done(e, null);
			}
		}
	)
);

passport.use(
	"login",
	new localStrategy((username, password, done) => {
		mongoose.connect(
			'mongodb+srv://anabellbackend:yrithze987@backendcourse.tiddlcu.mongodb.net/?retryWrites=true&w=majority'
		);
		try {
			UsuariosSchema.findOne(
				{
					username,
				
				},
				(err, user) => {
					if (err) {
						return done(err, null);
					}
					

					if (!user){
						return done(null, false)
					}

					if(!isValidPassword(user, password)){
						return done(null, false)
					}

					return done(null, user)
				}
			);
			const nombre = username;
		} catch (e) {
			return done(e, null);
		}
	})
);

//serializar y deserializar

passport.serializeUser((usuario, done) => {
	console.log(usuario);
	done(null, usuario._id);
});

passport.deserializeUser((id, done) => {
	UsuariosSchema.findById(id, done);
});

//
function createHash(password) {
	return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

function isValidPassword(user, password) {
	return bCrypt.compareSync(password, user.password);
}

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

app.get("/", (req, res) => {
	res.redirect("/login");
});

app.post(
	"/login",
	passport.authenticate("login", {
		failureRedirect: "/login-error",
	}), function (req, res){
		claseUsuario.getByMail(req.body.username).then(resultUser =>{
			claseProductos.getAll().then(result => {
				res.render('datos', {
					avatar: resultUser.avatar,
					name: resultUser.name,
					username: req.body.username,
					hayProductos: result.length > 0,
					productos: result})});
		})
		;
	}
);

app.get("/login", (req, res) => {
	res.render("login");
});

app.get("/login-error", (req, res) => {
	loggerError.error('error de datos'),
	loggerInfo.error('error de datos')
	res.render("login-error");
});

app.post(
	"/registrar",
	passport.authenticate("register", {
		successRedirect: "/login",
		failureRedirect: "/register-error",
	})
);

app.get("/registrar", (req, res) => {
	res.render("register");
});

app.get("/register-error", (req, res) => {
	loggerError.error('error de datos'),
	loggerInfo.error('error de datos')
	res.render("register-error");
});

app.get("/logout", function (req, res) {
	res.render('logout');
});

//router para los productos
app.use("/productos", routerProductos);
//router para los carritos
app.use("/carritos", routerCarrito);


//servidor
app.listen(8080, () => {
	console.log("servidor levantado");
});
