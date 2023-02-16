const Koa = require('koa');
const koaBody = require('koa-bodyparser');

const app = new Koa();

app.use(koaBody());

let productos = require('./productos.js');

app.use(productos.routes());

const PORT = 8080
const server = app.listen(PORT, () =>{
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error =>console.log('Error en servidor:', error))