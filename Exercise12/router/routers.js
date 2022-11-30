import { Router } from 'express'
import path from 'path'
import { fork } from "child_process"

const rutaNueva = new Router()
rutaNueva.get("/info", (req, res)=>{
    res.render("info", {
        title: process.title,
        path: process.argv[1],
        sistema: process.platform,
        processId: process.pid,
        version: process.version,
        carpeta: process.cwd(),
        memoria: process.memoryUsage().rss
    })
})


rutaNueva.route("/randoms").get(async(req, res)=>{
    const forked = fork(path.join('calculo.js'))
    //Se dejó en 100000 porque la computar no soportaba calcular más números
    const random = req.query.cant||100000
    forked.send(random)
    forked.on('message', msg =>{
        res.send(msg)
    })        
})
export default rutaNueva