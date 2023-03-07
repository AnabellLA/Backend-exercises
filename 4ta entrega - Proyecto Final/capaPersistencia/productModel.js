import { Schema, model } from "mongoose";

const productSchema = new Schema({
    nombre: String,
    descripcion: String,
    codigo: String,
    url: String,
    precio: Number,
    stock: Number,
    timeStamp: { type: Date, default: Date.now }
});

const productModel = model("productos", productSchema);

export default productModel;
