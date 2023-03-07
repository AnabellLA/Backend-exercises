import { Schema, model } from "mongoose";

const messagesSchema = new Schema({
        email: { type: String, required: true, max: 100 },
        userType: { type: String, required: true, max: 100 },
        timestamp: { type: Date, default: Date.now },
        message: { type: String, required: true, max: 400 }
});

const MessageModel = model("Usuarios", messagesSchema);

export default MessageModel;