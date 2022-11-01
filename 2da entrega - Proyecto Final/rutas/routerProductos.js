const express = require("express");
const { Productos } = require("../DAOs/productos.daos.class.js");
var index = require("../server");

const routerProductos = express.Router();
const claseProductos = new Productos();

routerProductos.use(handleErrors);

routerProductos.get("/", async (req, res, next) => {
    try {
        const productos = await claseProductos.getAll();
        res.json(productos);
    } catch (error) {
        next(error);
    }
});

routerProductos.get("/:id", async (req, res, next) => {
    try {
        const producto = await claseProductos.getById(req.params.id);
        res.status(200).json(
            producto ?? { error: "El producto no fue encontrado" }
        );
    } catch (error) {
        next(error);
    }
});

routerProductos.post("/", checkUser, async (req, res, next) => {
    try {
        if (
            req.body.nombre &&
            !Number.isNaN(req.body.precio) &&
            req.body.codigo &&
            !Number.isNaN(req.body.stock)
        ) {
            const producto = await claseProductos.save(req.body);
            console.log(producto);
            res.status(200).json(
                producto !== null
                ? {mensaje: `Se registró el producto con id: ${producto._id}`}
                : { error: "El producto no pudo ser registrado" }
            );
        } else {
            res.status(400).json({ error: "El producto no pudo ser registrado, verifique la información ingresada" });
        }
    } catch (error) {
        next(error);
    }
});

routerProductos.put("/:id", checkUser, async (req, res, next) => {
    try {
        if (
            req.body.nombre &&
            !Number.isNaN(req.body.precio) &&
            req.body.codigo &&
            !Number.isNaN(req.body.stock)
        ) {
            const producto = await claseProductos.update(req.params.id, req.body);
            res.status(200).json(
                producto !== null
                ? {mensaje: `Se actualizó el producto con id: ${producto}`}
                : { error: "no se pudo actualizar el producto" }
            );
        } else {
            res.status(400).json({ error: "El producto no pudo ser actualizado, verifique la información ingresada" });
        }
    } catch (error) {
        next(error);
    }
});

routerProductos.delete("/:id", checkUser, async (req, res, next) => {
    try {
            const producto = await claseProductos.deleteById(req.params.id);
            res.status(200).json(
                producto !== null
                    ? { mensaje: `El producto con el id: ${producto} fue eliminado` }
                    : { error: "El producto no fue encontrado" }
            );
    } catch (error) {
        next(error);
    }
});

function checkUser(req, res, next) {
    if (!index.logged) {
        res.status(401).json({
            error: -1,
            descripcion: `ruta ${req.baseUrl} y método ${req.method} no autorizados`,
        });
    }
    next();
}

function handleErrors(err, req, res, next) {
    console.log(err);
    res.status(500).send("An internal error occurred");
}

module.exports = { routerProductos };
