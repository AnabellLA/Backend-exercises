import productModel from "../capaPersistencia/productModel.js";
import mongoose from "mongoose";

//container
class Productos {
    constructor() {
        this.url = process.env.URL_BD
        this.mongodb = mongoose.connect
    } 

    async getAll() {
        try {
            await this.mongodb(this.url)
            return await productModel.find().lean()
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id) {
        try {
            await this.mongodb(this.url)
            return await productModel.findById(id).lean()
        } catch (error) {
            console.log(error);
        }
    }

    async save(prod) {
        try {
            await this.mongodb(this.url)
            const newProduct = new productModel(prod)
            return await newProduct.save()
        } catch (error) {
            console.log(error);
        }
    }

    async update(id, objetoAGuardar) {
        try {
            await this.mongodb(this.url)
            return await productModel.findByIdAndUpdate(id , objetoAGuardar,
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
            return await productModel.findByIdAndDelete(id, function(err) {
                if (err) return console.log('el ID ingresado es incorrecto')
            else return console.log(`El producto con el id: ${id} fue eliminado`)})
        } catch (error) {
            console.log(error);
        }
    }

    static returnSingleton() {
        if(!this.instance){
            this.instance = new Productos()
        }
        return this.instance
    }
}

export default Productos;