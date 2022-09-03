const fs = require('fs')

class Container {
    constructor(name) {
        this.name = name
    }

    async GetById(id){
        try{
            let content = await fs.promises.readFile(`./${this.name}`, 'utf-8')
            let contentJson = JSON.parse(content)
            let contentExtratedFromArray
            contentJson.forEach( element => {
                if(element.id == id){
                    contentExtratedFromArray = element
                }
            });
            return contentExtratedFromArray
        }catch(err){
            console.log(err)
        }
    }

    async GetAll(){
        try{
            let content = await fs.promises.readFile(`./${this.name}`, 'utf-8')
            let contentJson = JSON.parse(content);
            return contentJson
        }catch(err){
            console.log(err)
        }
    }
}

//Functions

let container = new Container('producto.json')

const express = require("express");
const app = express();

const PORT = 8080;
const server = app.listen(PORT, () => {
        console.log("servidor iniciado");
    });

    app.get("/productos", (req, resp) => {
        container.GetAll().then(result => resp.send(`<div style='color:blue'> [
        ${result.map((producto)  => (`<p> { id : ${producto.id}</p>
        <p> title : ${producto.title}</p>
        <p> price : ${producto.price}</p>
        <p> thumbnail : ${producto.thumbnail} } </p>`))} ]
        </div>`));
    });

    app.get("/productosRandom", (req, resp) => {
        let random = Math.floor(Math.random()*10)+1;
        container.GetById(random).then(result =>
        resp.send(`<div>        
        <p style='color:blue'>El número random es ${random}</p>
        <p style='color:blue'>El ID es ${result.id}</p>
        <p style='color:blue'>El Título es ${result.title}</p>
        <p style='color:blue'>El Precio es S/${result.price}</p>
        <p style='color:blue'>La URL de la miniatura es ${result.thumbnail}</p>
        </div>`)
        );
    });