const express = require("express");
const { routerProductos } = require("./rutas/routerProductos");
const { routerCarrito } = require("./rutas/routerCarrito");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const listener = app.listen(process.env.PORT || 8080, function () {
    console.log(`Your app is listening to port: ${listener.address().port}`);
});
listener.on("error", (error) => console.log(`error en el servidor: ${error}`));

var userLogged = false;

//root de la app
app.get("/", (req, res) => {
    res.json({ msg: "Bienvenido a la primera entrega del proyecto final" });
});

app.post("/login", (req, res) => {
    module.exports.logged = true;
    res.json({ msg: "user logged in" });
});

//router para los productos
app.use("/productos", routerProductos);
//router para los carritos
app.use("/carritos", routerCarrito);

module.exports.logged = userLogged;
