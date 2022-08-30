const fs = require('fs')

class Container {
    constructor(name) {
        this.name = name
    }
    async Save (title, price, thumbnail){
        try{
            let content = await fs.promises.readFile(`./${this.name}`, 'utf-8')
            let contentJson = JSON.parse(content)
            let newId
            if (contentJson.length >=1){
                let lastIndex = contentJson.length - 1
                let lastId = contentJson[lastIndex].id
                newId = lastId + 1    
            }else{
                newId = 1
            }
            let newItem = {
                id : newId,
                title : title,
                price : price,
                thumbnail : thumbnail,
            }
            contentJson.push(newItem)
            await fs.promises.writeFile(`./${this.name}`, JSON.stringify(contentJson, null, 2));
            return newId
        }
    catch(err){
        console.log(err)
        }
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
            if(contentExtratedFromArray !== undefined){
                return contentExtratedFromArray
            }else{
                return null
            }
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

    async DeleteById(id){
        try{
            let content = await fs.promises.readFile(`./${this.name}`, 'utf-8')
            let contentJson = JSON.parse(content)
            let contentExtratedFromArray = []
            contentJson.forEach( element => {
                if(element.id !== id){
                    contentExtratedFromArray.push(element)
                    }
            });
            await fs.promises.writeFile(`./${this.name}`, JSON.stringify(contentExtratedFromArray, null, 2));    
            return id
        }catch(err){
            console.log(err)
        }
    }

    async DeleteAll(){
        try{
            let newArray = []
            await fs.promises.writeFile(`./${this.name}`, JSON.stringify(newArray));
            return newArray
        }
    catch(err){
        console.log(err)
        }
    }
}

//Functions

let container = new Container('producto.json')

container.Save("Chihayafuru V4", 120, "https://res.cloudinary.com/mangastore/image/upload/v1660682639/CHIHAYAFURU-V4_inljuh.jpg").then(promiseresponse => {console.log(promiseresponse)})
container.GetById(1).then(result => {console.log(result)})
container.GetAll().then(result => {console.log(result)})
container.DeleteById(1).then(result => {console.log(result)})
container.DeleteAll().then(result => {console.log(result)})
