const express = require("express");
const { Carrito } = require("../clases/carrito.class");

const routerCarrito = express.Router();
const claseCarrito = new Carrito();

routerCarrito.use(handleErrors);

routerCarrito.get("/:id/productos", async (req, res, next) => {
    try {
        if (!Number.isNaN(req.params.id)) {
            const carrito = await claseCarrito.getById(Number(req.params.id));
            res.status(200).json(
                carrito?.productos ?? { error: "El carrito no fue encontrado" }
            );
        } else {
            res.status(400).json({ error: "El parametro ingresado es incorrecto" });
        }
    } catch (error) {
        next(error);
    }
});

routerCarrito.post("/", async (req, res, next) => {
    try {
        const carrito = await claseCarrito.save();
        res.json(
            carrito !== null
                ? {mensaje: `Se registró el carrito con id: ${carrito}`}
                : { error: "El carrito no puede ser registrado" }
        );
    } catch (error) {
        next(error);
    }
});

routerCarrito.post("/:id/productos", async (req, res, next) => {
    try {
        if (!Number.isNaN(req.params.id)) {
            const result = await claseCarrito.saveProducto(
                Number(req.params.id),
                req.body
            );
            res.status(200).json(
                result !== null
                    ? {mensaje: `Se agrego el producto con id: ${req.body.id} al carrito con id: ${result.id}`}
                    : { error: "El carrito o producto no fue encontrado" }
            );
        } else {
            res.status(400).json({ error: "El parámetro ingresado es incorrecto" });
        }
    } catch (error) {
        next(error);
    }
});

routerCarrito.delete("/:id", async (req, res, next) => {
    try {
        if (!Number.isNaN(req.params.id)) {
            const result = await claseCarrito.delete(Number(req.params.id));
            res.status(200).json(
                result !== null
                    ? { mensaje: `El carrito con el id: ${result} fue eliminado` }
                    : { error: "El carrito no fue encontrado" }
            );
        } else {
            res.status(400).json({ error: "El parámetro ingresado es incorrecto" });
        }
    } catch (error) {
        next(error);
    }
});

routerCarrito.delete("/:id/productos/:id_prod", async (req, res, next) => {
    try {
        if (!Number.isNaN(req.params.id) && !Number.isNaN(req.params.id_prod)) {
            const result = await claseCarrito.deleteProducto(
                Number(req.params.id),
                Number(req.params.id_prod)
            );
            res.status(200).json(
                result !== null
                    ? { mensaje: `el producto ingresado (id: ${req.params.id_prod}) fue eliminado del carrito con id: ${result.id}`}
                    : { error: "El carrito o producto no fue encontrado" }
            );
        } else {
            res.status(400).json({ error: "El parámetro ingresado es incorrecto" });
        }
    } catch (error) {
        next(error);
    }
});

function handleErrors(err, req, res, next) {
    console.log(err);
    res.status(500).send("An internal error occurred");
}

module.exports = { routerCarrito };
