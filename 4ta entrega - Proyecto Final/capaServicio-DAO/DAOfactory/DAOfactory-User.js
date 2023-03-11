import User from "../usuario.daos.class.js";

export default class MyConnectionFactoryUser{
    returnDbConnection(){
        if (process.env.STORE == 'MONGO') return User.returnSingleton();    
    }
}