import mongoose from "mongoose";
import ProductoModel from "../models/productModel.js";

class Productos {
    constructor() {
        this.url = "mongodb+srv://anabellbackend:yrithze987@backendcourse.tiddlcu.mongodb.net/?retryWrites=true&w=majority"
        this.mongodb = mongoose.connect
    } 

    async getAll() {
        try {
            await this.mongodb(this.url)
            return await ProductoModel.find().lean()
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id) {
        try {
            await this.mongodb(this.url)
            return await ProductoModel.findById(id).lean()
        } catch (error) {
            console.log(error);
        }
    }

    async save(prod) {
        try {
            await this.mongodb(this.url)
            const newProduct = new ProductoModel(prod)
            return await newProduct.save()
        } catch (error) {
            console.log(error);
        }
    }

    async update(id, objetoAGuardar) {
        try {
            await this.mongodb(this.url)
            return await ProductoModel.findByIdAndUpdate(id , objetoAGuardar,
            function(err) {
                if (err) return console.log('el ID ingresado es incorrecto')
            else return console.log(`El producto con el id: ${id} fue actualizado`)})
        } catch (error) {
            console.log(error);
        }
    }

    async deleteById(id) {
        try {
            await this.mongodb(this.url)
            return await ProductoModel.findByIdAndDelete(id, function(err) {
                if (err) return console.log('el ID ingresado es incorrecto')
            else return console.log(`El producto con el id: ${id} fue eliminado`)})
        } catch (error) {
            console.log(error);
        }
    }
}

export default Productos;
