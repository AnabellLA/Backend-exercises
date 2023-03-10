import MessageModel from "../capaPersistencia/MessageModel.js";
import mongoose from "mongoose";

//container
class Chat {
    constructor() {
        this.url = process.env.URL_BD
        this.mongodb = mongoose.connect
    } 

    async getAll() {
        try {
            await this.mongodb(this.url)
            return await MessageModel.find().lean()
        } catch (error) {
            console.log(error);
        }
    }

    async getByEmail(email) {
        try {
            await this.mongodb(this.url)
            return await MessageModel.find({email: email}).lean()
        } catch (error) {
            console.log(error);
        }
    }

    async save(message) {
        try {
            await this.mongodb(this.url)
            const newMessage = new MessageModel(message)
            return await newMessage.save()
        } catch (error) {
            console.log(error);
        }
    }

    static returnSingleton() {
        if(!this.instance){
            this.instance = new Chat()
        }
        return this.instance
    }
}

export default Chat;