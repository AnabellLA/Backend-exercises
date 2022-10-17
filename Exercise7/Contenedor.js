class Contenedor {
    constructor(tabla, config) {
        this.knex = require("knex")(config);
        this.tabla = tabla;
    }
    
        async Save(newElement) {
        try {
            return await this.knex(this.tabla).insert(newElement);
        } catch (error) {
            console.log(error);
        }
        }
    
        async GetAll() {
        try {
            let datosAlmacenados = await this.knex.from(this.tabla).select("*");
            return datosAlmacenados ?? null;
        } catch (error) {
            console.log(error);
        }
        }
    }
    
    module.exports = { Contenedor };