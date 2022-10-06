const { Contenedor } = require("../container/contenedor");

class Productos {
    constructor() {
        this.contenedor = new Contenedor("productos.json");
    }

    async getAll() {
        return await this.contenedor.getAll();
    }

    async getById(id) {
        return await this.contenedor.getById(id);
    }

    async save(prod) {
        const timeStamp = Date.now();
        const producto = await this.contenedor.save({
            nombre: prod.nombre,
            descripcion: prod.descripcion,
            codigo: prod.codigo,
            url: prod.url,
            precio: prod.precio,
            stock: prod.stock,
            timeStamp,
        });
        return producto;
    }

    async update(id, prod) {
        const timeStamp = Date.now();
        const producto = await this.contenedor.update(id, {
            nombre: prod.nombre,
            descripcion: prod.descripcion,
            codigo: prod.codigo,
            url: prod.url,
            precio: prod.precio,
            stock: prod.stock,
            timeStamp,
        });
        return producto;
    }

    async delete(id) {
        return await this.contenedor.deleteById(id);
    }
}

module.exports = { Productos };
