import CarritoModel from "../capaPersistencia/carritoModel.js";
import mongoose from "mongoose";

//container
class Carrito {
    constructor() {
        this.url = process.env.URL_BD
        this.mongodb = mongoose.connect
    } 

    async getById(id) {
        try {
            await this.mongodb(this.url)
            return await CarritoModel.findById(id).lean()
        } catch (error) {
            console.log(error);
        }
    }

    async save() {
        try {
            await this.mongodb(this.url)
            const newCart = new CarritoModel()
            return await newCart.save()
        } catch (error) {
            console.log(error);
        }
    }

    async searchProduct(cartid, product){
        try {
            await this.mongodb(this.url)
            return await CarritoModel.find({_id:cartid, 'productos._id': product._id}).lean();
        } catch (error) {
            console.log(error);
        }
    }

    async addElementToProduct(cartid, product){
        try {
            await this.mongodb(this.url)
            return await CarritoModel.updateOne({_id:cartid, 'productos._id': product._id}, {$inc: {'productos.$.cantidad': 1}});
        } catch (error) {
            console.log(error);
        }
    }

    async addProduct(cartid, product){
        try {
            await this.mongodb(this.url)
            return await CarritoModel.findByIdAndUpdate(cartid, {$push: {productos: product}});
        } catch (error) {
            console.log(error);
        }
    }

    async deleteById(id) {
        try {
            await this.mongodb(this.url)
            return await CarritoModel.findByIdAndDelete(id)
        } catch (error) {
            console.log(error);
        }
    }


    async deleteProductById(id, idProducto) {
        try {
            await this.mongodb(this.url);
            return await CarritoModel.findByIdAndUpdate(id, {$pull: {productos: {_id: idProducto}}});
        } catch (error) {
            console.log(error);
        }
    }

    static returnSingleton() {
        if(!this.instance){
            this.instance = new Carrito()
        }
        return this.instance
    }
}

export default Carrito;
