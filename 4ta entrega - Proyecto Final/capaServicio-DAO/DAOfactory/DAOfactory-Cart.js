import Carrito from "../carrito.daos.class.js";

export default class MyConnectionFactory{
    returnDbConnection(){
        if (process.env.STORE == 'MONGO') return Carrito.returnSingleton();    
    }
}