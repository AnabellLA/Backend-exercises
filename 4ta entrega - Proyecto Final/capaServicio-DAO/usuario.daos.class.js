import UserModel from "../capaPersistencia/usersModel.js";
import mongoose from "mongoose";

//container
class User {
    constructor() {
        this.url = process.env.URL_BD
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
