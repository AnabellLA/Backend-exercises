import Container from '../../../DAOs//connectionMongo.js'
import config from '../../../connection.js'
let prod = new Container("productos", config.mysql);

io.on("connection", async (socket) => {
    console.log('Usuario con id: ', socket.id, ' se ha conectado')

    let productos = await prod.getAll().lean();
    
    socket.emit("productList", productos);

    socket.on("newProduct", async (data) => {
        await prod.createData(data);
        io.sockets.emit("productList", productos)
    })

})
