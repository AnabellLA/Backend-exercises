import Productos from "../productos.daos.class.js";

export default class MyConnectionFactory{
    returnDbConnection(){
        if (process.env.STORE == 'MONGO') return Productos.returnSingleton();    
    }
}