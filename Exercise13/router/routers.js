import { Router } from 'express'
import path from 'path'
import { fork } from "child_process"
import numCpu from "os"

const procesador = numCpu.cpus().length
const PORT = parseInt(process.argv[2]) || 8080;
const rutaNueva = new Router()

rutaNueva.get("/info", (req, res) => {
    res.render("info", {
        title: process.title,
        path: process.argv[1],
        sistema: process.platform,
        processId: process.pid,
        version: process.version,
        carpeta: process.cwd(),
        memoria: process.memoryUsage().rss,
        procesadores: procesador,
        puerto: PORT
    });
});

rutaNueva.route("/api/randoms").get(async(req, res) => {
    const forked = fork(path.join('calculo.js'))
    //Se dejó en 100000 porque la computar no soportaba calcular más números
    const random = req.query.cant||100000
    forked.send(random)
    forked.on('message', msg =>{
        res.send(msg)
    });      
});

rutaNueva.get("/datos", (req, res) => {
    console.log(`port ${PORT} -> FYH ${Date.now()}`);
    res.send(`servidor express <span style="color:blueviolet;"> (NGINX)</span> 
        en ${PORT} <b>PID: ${process.pid}</b> - ${new Date().toLocaleString()} as ${
        process.argv
}`);
});

export default rutaNueva