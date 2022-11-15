import mongoose from "mongoose";
import ProductModel from "../models/productsModel.js";


class ConnectionMongo {
	constructor() {
		this.url = "mongodb+srv://anabellbackend:yrithze987@backendcourse.tiddlcu.mongodb.net/?retryWrites=true&w=majority"
		this.mongodb = mongoose.connect;
	}

	async save(prod){
		try{
			await this.mongodb(this.url)
			const result = await prod.save();
			console.log(`result ${result}`)
			return result;
		}catch(err){
			return err;
		}
	}

	async createData(prod) {
		try {
			await this.mongodb(this.url)
			const newProduct = await this.save(
				new ProductModel({
                title: prod.title,
                price: prod.price,
                thumbnail: prod.thumbnail
            })
			);
			console.log(`newProduct ${newProduct}`)
			return await newProduct;
		} catch (err) {
			console.log(err)
		}
	}

	async getById(id) {
		try {
			await this.mongodb(this.url);
			return await ProductModel.findById(id);

		} catch (error) {
			return { error: "Producto no existe" }
		}
	}

	async getAll() {
		try {
			await this.mongodb(this.url);
			return await ProductModel.find();

		} catch (err) {
			return { error: "No existen productos" }
		}
	}

	async put(id, prod) {
		try {
			await this.mongodb(this.url);
			return await ProductModel.findByIdAndUpdate(id, prod);

		} catch (err) {
			console.log(err)
		}
	}

	async delete(id) {
		try {
			await this.mongodb(this.url);
			return await ProductModel.findByIdAndDelete(id);

		} catch (err) {
			return { error: "No existen productos" }
		}
	}
}

export default ConnectionMongo;
