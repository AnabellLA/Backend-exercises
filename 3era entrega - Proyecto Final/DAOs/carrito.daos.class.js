import mongoose from "mongoose";
import CarritoModel from "../models/carritoModel.js";


class Carrito {
    constructor() {
        this.url = "mongodb+srv://anabellbackend:yrithze987@backendcourse.tiddlcu.mongodb.net/?retryWrites=true&w=majority"
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
}

export default Carrito;
