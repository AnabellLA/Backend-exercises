import express from "express";
import Productos from "../DAOs/productos.daos.class.js";

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

routerProductos.post("/", async (req, res, next) => {
    try {
        if (
            req.body.title &&
            !Number.isNaN(req.body.price) &&
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

routerProductos.put("/:id", async (req, res, next) => {
    try {
        if (
            req.body.title &&
            !Number.isNaN(req.body.price) &&
            req.body.codigo &&
            !Number.isNaN(req.body.stock)
        ) {
            const producto = await claseProductos.update(req.params.id, req.body);
            res.status(200).json(
                producto !== null
                ? {mensaje: `Se actualizó el producto con id: ${req.params.id}`}
                : { error: "no se pudo actualizar el producto" }
            );
        } else {
            res.status(400).json({ error: "El producto no pudo ser actualizado, verifique la información ingresada" });
        }
    } catch (error) {
        next(error);
    }
});

routerProductos.delete("/:id", async (req, res, next) => {
    try {
            const producto = await claseProductos.deleteById(req.params.id);
            res.status(200).json(
                producto !== null
                    ? { mensaje: `El producto con el id: ${req.params.id} fue eliminado` }
                    : { error: "El producto no fue encontrado" }
            );
    } catch (error) {
        next(error);
    }
});

function handleErrors(err, req, res, next) {
    console.log(err);
    res.status(500).send("An internal error occurred");
}

export default routerProductos;
