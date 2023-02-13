import Productos from "./productMongoDAO.js";

export default class MyConnectionFactory{
    returnDbConnection(){
        if (process.env.STORE == 'MONGO') return Productos.returnSingleton();    
    }
}