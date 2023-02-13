import MyConnectionFactory from '../capaServicio-DAO/DAOfactory.js';
import * as dotenv from 'dotenv'
dotenv.config();

const connection = new MyConnectionFactory();
const service = connection.returnDbConnection();

async function getProductByIdGraph({ id }) {
    try {
        const producto = await service.getById(id);
    if (!producto) throw new Error("producto no encontrado");
    return {
    id: producto._id,
    title: producto.title,
    price: producto.price,
    thumbnail: producto.thumbnail,
    };
    } catch (error) {
    throw new Error("error producto get by Id");
    }
};

async function getProductsGraph() {
    try {
        const productos = await service.getAll();
    if (!productos) throw new Error("no hay productos");

    return productos.map((x) ({
    id: x._id,
    title: x.title,
    price: x.price,
    thumbnail: x.thumbnail,
    }));
    } catch (error) {
    throw new Error("error producto getAll");
    }
};

async function createProductGraph({ datos }) {
    try {
        const producto = await service.save(datos);
    if (!producto) throw new Error("no se pudo registrar el producto");
    return {
    id: producto._id,
    title: producto.title,
    price: producto.price,
    thumbnail: producto.thumbnail,
    };
    } catch (error) {
    throw new Error("error producto create");
    }
};

async function updateProductGraph({ id, datos }) {
    try {
        const producto = await service.update(id, datos);
    if (!producto) throw new Error("no se pudo actualizar el producto");
    return {
    id: producto._id,
    title: producto.title,
    price: producto.price,
    thumbnail: producto.thumbnail,
    };
    } catch (error) {
    throw new Error("error producto update");
    }
};

async function deleteProductGraph({ id }) {
    try {
        const producto = await service.deleteById(id);
    if (!producto) throw new Error("producto no encontrado");
    return {
    id: producto._id,
    title: producto.title,
    price: producto.price,
    thumbnail: producto.thumbnail,
    };
    } catch (error) {
    throw new Error("error producto delete");
    }
};

export {
    getProductByIdGraph,
    getProductsGraph,
    createProductGraph,
    updateProductGraph,
    deleteProductGraph,
};