import { Schema, model } from "mongoose";

const carritoSchema = new Schema(
    {productos : [],},
    {timeStamp: { type: Date, default: Date.now },}
    );

const CarritoModel = model('carritos', carritoSchema);

export default CarritoModel;