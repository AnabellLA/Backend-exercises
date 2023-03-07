import Chat from "../chat.daos.class.js";

export default class MyConnectionFactory{
    returnDbConnection(){
        if (process.env.STORE == 'MONGO') return Chat.returnSingleton();    
    }
}