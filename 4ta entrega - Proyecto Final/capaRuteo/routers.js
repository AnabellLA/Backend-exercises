import { Router } from 'express';
import compression from 'compression';
import { next, redirect, login, logout, loginError, register, registerError, info, random } from "../capaController/controller.js";
import bCrypt from "bcrypt";
import mongoose from "mongoose";
import nodemailer from 'nodemailer';
import UsuariosSchema from "../capaPersistencia/usersModel.js";
import MyConnectionFactory from '../capaServicio-DAO/DAOfactory-Product.js';
import * as dotenv from 'dotenv'
dotenv.config();
//passport imports
import passport from "passport";
import { Strategy } from "passport-local";

const rutaNueva = new Router();
const connection = new MyConnectionFactory();
const claseProductos = connection.returnDbConnection();

rutaNueva.use(compression());

const localStrategy = Strategy;

//middlewares passport
rutaNueva.use(passport.initialize());
rutaNueva.use(passport.session());

//estrategias
passport.use(
	"register",
	new localStrategy(
		{ passReqToCallback: true, usernameField: 'username', passwordField: 'password' },
		async (req, username, password, done) => {
			console.log("register", username + password);
			mongoose.connect(process.env.URL_BD);
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
		mongoose.connect(process.env.URL_BD);
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

//rutas

rutaNueva.post(
	"/login",
	passport.authenticate("login", {
		failureRedirect: "/login-error",
	}), function (req, res){
		claseProductos.getAll().then(result => {
			console.log(result),
			res.render("datos", {
				avatar: resultUser.avatar,
				name: resultUser.name,
				username: req.body.username,
				hayProductos: result.length > 0,
				productos: result})});
	}
);

rutaNueva.post(
	"/registrar",
	passport.authenticate("register", {
		successRedirect: "/login",
		failureRedirect: "/register-error",
	})
);
rutaNueva.use(next);
rutaNueva.get("/", redirect);
rutaNueva.get("/login", login);
rutaNueva.get("/login-error", loginError);
rutaNueva.get("/registrar", register);
rutaNueva.get("/register-error", registerError);
rutaNueva.get("/logout", logout);
rutaNueva.get("/info", info);
rutaNueva.route("/api/randoms").get(random);

export default rutaNueva