import express from "express";
import Carrito from "../DAOs/carrito.daos.class.js";

const routerCarrito = express.Router();
const claseCarrito = new Carrito();

routerCarrito.use(handleErrors);

routerCarrito.get("/:id/productos", async (req, res, next) => {
    try {
            claseCarrito.getById(req.params.id).then(result => {
				res.render('carrito', {
                    carrito: req.params.id,
					hayProductos: result.productos.length > 0,
					productos: result.productos})})
    } catch (error) {
        next(error);
    }
});

routerCarrito.get("/:id/pedido", async (req, res, next) => {
    try {
            claseCarrito.getById(req.params.id).then(result => {
				res.render('pedido', {
                    carrito: req.params.id,
					productos: result.productos})})
    } catch (error) {
        next(error);
    }
});

routerCarrito.post("/", async (req, res, next) => {
    try {
        const carrito = await claseCarrito.save();
        res.status(200).json(
            carrito !== null
                ? {mensaje: `Se registró el carrito con id: ${carrito._id}`}
                : { error: "El carrito no puede ser registrado" }
        );
    } catch (error) {
        next(error);
    }
});

routerCarrito.post("/:id/productos", async (req, res, next) => {
    try {
        const cartid = req.params.id;
        const newProduct = req.body;
        const carrito = await claseCarrito.searchProduct(cartid, newProduct);
        if (carrito.length !== 0){
            const result = await claseCarrito.addElementToProduct(cartid, newProduct);
            res.status(200).json(
                result !== null
                    ? {mensaje: `Se agrego un elemento al producto con id: ${newProduct._id} en el carrito con id: ${cartid}`}
                    : { error: "El carrito o producto no fue encontrado" }
            );
        }else{
            const result = await claseCarrito.addProduct(cartid, newProduct);
            res.status(200).json(
                result !== null
                    ? {mensaje: `Se agrego el producto con id: ${newProduct._id} al carrito con id: ${cartid}`}
                    : { error: "El carrito o producto no fue encontrado" }
            );    
        }
    } catch (error) {
        next(error);
    }
});

routerCarrito.delete("/:id", async (req, res, next) => {
    try {
        const result = await claseCarrito.deleteById(req.params.id);
        res.status(200).json(result !== null
            ? { mensaje: `El carrito con el id: ${result} fue eliminado` }
            : { error: "El carrito no fue encontrado" });
    } catch (error) {
        next(error);
    }
});

routerCarrito.delete("/:id/productos/:id_prod", async (req, res, next) => {
    try {
            const result = await claseCarrito.deleteProductById(req.params.id, req.params.id_prod);
            res.status(200).json(result !== null
                ? { mensaje: `el producto ingresado (id: ${req.params.id_prod}) fue eliminado del carrito con id: ${result.id}`}
                : { error: "El carrito o producto no fue encontrado" });
    } catch (error) {
        next(error);
    }
});

function handleErrors(err, req, res, next) {
    console.log(err);
    res.status(500).send("An internal error occurred");
}

export default routerCarrito;
