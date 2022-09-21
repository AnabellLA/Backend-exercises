const fs = require("fs");
let productosArray = [
    {
        title: "Chihayafuru V1",
        price: 120,
        thumbnail:
            "https://res.cloudinary.com/mangastore/image/upload/v1657757547/CHIHAYAFURU-V1_ngqiea.jpg",
        id: 1,
    },
    {
        title: "Chihayafuru V2",
        price: 110,
        thumbnail:
            "https://res.cloudinary.com/mangastore/image/upload/v1657757547/CHIHAYAFURU-V2_p1t63f.jpg",
        id: 2,
    },
    {
        title: "Chihayafuru V3",
        price: 130,
        thumbnail:
            "https://res.cloudinary.com/mangastore/image/upload/v1657757547/CHIHAYAFURU-V3_nb10yj.jpg",
        id: 3,
    },
];

class Contenedor {
    constructor() {
        this.productos = productosArray;
        this.lastId = 1;
        if (this.productos.length > 0) {
            let max = this.productos[0].id;
            for (let i = 0; i < this.productos.length; i++) {
                if (this.productos[i].id > max) {
                    max = this.productos[i].id;
                }
            }
            this.lastId = max + 1;
        }
    }

    save(objetoAGuardar) {
        try {
            let datosAlmacenados = this.getAll();
            objetoAGuardar.id = this.lastId;
            datosAlmacenados = [...datosAlmacenados, objetoAGuardar];

            this.productos = datosAlmacenados;
            this.lastId++;

            return objetoAGuardar;
        } catch (err) {
            throw new Error(err);
        }
    }

    update(id, objetoAGuardar) {
        try {
            let datosAlmacenados = this.getAll();
            const index = datosAlmacenados.findIndex((x) => x.id === id);
            if (index >= 0) {
                datosAlmacenados.splice(index, 1, { ...objetoAGuardar, id });
                this.productos = datosAlmacenados;
                return objetoAGuardar;
            } else {
                return null;
            }
        } catch (err) {
            throw new Error(err);
        }
    }

    getById(id) {
        try {
            let datosAlmacenados = this.getAll();
            const result = datosAlmacenados.find((objeto) => objeto.id == id);
            return result ?? null;
        } catch (err) {
            throw new Error(err);
        }
    }

    getAll() {
        try {
            return this.productos;
        } catch (err) {
            throw new Error(err);
        }
    }

    deleteById(id) {
        try {
            let datosAlmacenados = this.getAll();
            const index = datosAlmacenados.findIndex((x) => x.id === id);
            if (index >= 0) {
                this.productos = [
                    ...datosAlmacenados.filter((dato) => dato.id !== id),
                ];
                return id;
            } else {
                return null;
            }
        } catch (err) {
            throw new Error(err);
        }
    }
}

module.exports = { Contenedor };