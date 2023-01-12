import mongoose from "mongoose";
import UserModel from "../models/usersModel.js";


class User {
    constructor() {
        this.url = "mongodb+srv://anabellbackend:yrithze987@backendcourse.tiddlcu.mongodb.net/?retryWrites=true&w=majority"
        this.mongodb = mongoose.connect
    } 

    async getByMail(mail) {
        try {
            await this.mongodb(this.url)
            return await UserModel.findOne({ username: mail }).lean()
        } catch (error) {
            console.log(error);
        }
    }
}

export default User ;
