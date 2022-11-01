const mongoose = require('mongoose');
const productoSchema = new mongoose.Schema({
    nombre: String,
    descripcion: String,
    codigo: String,
    url: String,
    precio: Number,
    stock: Number,
    timeStamp: { type: Date, default: Date.now }
    })

const ProductoModel = mongoose.model('productos', productoSchema);

module.exports = ProductoModel;