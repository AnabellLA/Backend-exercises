const mongoose = require('mongoose');
const carritoSchema = new mongoose.Schema(
    {productos : [],},
    {timeStamp: { type: Date, default: Date.now },}
    );

const CarritoModel = mongoose.model('carritos', carritoSchema);

module.exports = CarritoModel;