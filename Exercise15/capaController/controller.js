import path from 'path';
import { fork } from "child_process";
import numCpu from "os";
import pino from "pino";

const procesador = numCpu.cpus().length

const loggerError = pino('error.log')
const loggerWarn = pino('warning.log')
const loggerInfo = pino()

loggerError.level = 'error'
loggerWarn.level = 'warn'
loggerInfo.level = 'info'

async function next(req, res, next) {
	loggerInfo.info(`Petición entrante --> Ruta: ${req.url}, Metodo: ${req.method}`)
	next();
}
async function redirect(req, res) {
    res.redirect("/login");
}
async function login(req, res) {
    res.render("login");
}
async function loginError(req, res) {
    res.render("login-error");
}
async function register(req, res) {
    res.render("register");
}
async function registerError(req, res) {
    res.render("register-error");
}
async function logout(req, res) {
    res.render("logout");
}
async function info(req, res) {
    let datos = {
        title: process.title,
        path: process.argv[1],
        sistema: process.platform,
        processId: process.pid,
        version: process.version,
        carpeta: process.cwd(),
        memoria: process.memoryUsage().rss,
        procesadores: procesador,
    }
    console.log(datos)
    res.render("info", datos);
}
async function random(req, res) {
    const forked = fork(path.join('../capaServicio/calculo.js'))
    //Se dejó en 100000 porque la computar no soportaba calcular más números
    const random = req.query.cant||100000
    forked.send(random)
    forked.on('message', msg =>{
        res.send(msg)
    });
};

export { next, redirect, login, logout, loginError, register, registerError, info, random }