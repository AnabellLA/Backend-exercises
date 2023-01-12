import { Schema, model } from "mongoose";

const UsuariosSchema = new Schema({
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    name: { type: String, require: true },
    address: { type: String, require: true },
    age: { type: Number, require: true },
    phone: { type: String, require: true },
    avatar: { type: String, require: true },
});

export default model("Usuarios", UsuariosSchema);