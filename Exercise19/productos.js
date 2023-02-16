const Router = require('koa-router');

const router = new Router({
    prefix:'/productos'
});

let productos = [
    {
        "title": "MANGA CHIHAYAFURU VOLUMEN 1",
        "price": "120",
        "thumbnail": "https://res.cloudinary.com/mangastore/image/upload/v1657757547/CHIHAYAFURU-V1_ngqiea.jpg",
        "description": "Chihaya is a girl in the sixth grade, still not old enough to even know the meaning of the word zeal. But one day, she meets Arata, a transfer student from rural Fukui prefecture. Though docile and quiet, he has an unexpected skill: his ability to play competitive karuta, a traditional Japanese card game.",
        "timestamp": 1660756252760,
        "stock": "30",
        "codigo": 321,
        "id": 1
    },
    {
        "title": "MANGA CHIHAYAFURU VOLUMEN 2",
        "price": "110",
        "thumbnail": "https://res.cloudinary.com/mangastore/image/upload/v1657757547/CHIHAYAFURU-V2_p1t63f.jpg",
        "description": "Chihaya is a girl in the sixth grade, still not old enough to even know the meaning of the word zeal. But one day, she meets Arata, a transfer student from rural Fukui prefecture. Though docile and quiet, he has an unexpected skill: his ability to play competitive karuta, a traditional Japanese card game.",
        "timestamp": 1660756353012,
        "stock": "24",
        "codigo": 564,
        "id": 2
    },
    {
        "title": "MANGA CHIHAYAFURU VOLUMEN 3",
        "price": "110",
        "thumbnail": "https://res.cloudinary.com/mangastore/image/upload/v1657757547/CHIHAYAFURU-V3_nb10yj.jpg",
        "description": "Chihaya is a girl in the sixth grade, still not old enough to even know the meaning of the word zeal. But one day, she meets Arata, a transfer student from rural Fukui prefecture. Though docile and quiet, he has an unexpected skill: his ability to play competitive karuta, a traditional Japanese card game.",
        "timestamp": 1660756439722,
        "stock": "43",
        "codigo": 7656,
        "id": 3
    },
    {
        "title": "MANGA CHIHAYAFURU VOLUMEN 4",
        "price": "110",
        "thumbnail": "https://res.cloudinary.com/mangastore/image/upload/v1660682639/CHIHAYAFURU-V4_inljuh.jpg",
        "description": "Chihaya is a girl in the sixth grade, still not old enough to even know the meaning of the word zeal. But one day, she meets Arata, a transfer student from rural Fukui prefecture. Though docile and quiet, he has an unexpected skill: his ability to play competitive karuta, a traditional Japanese card game.",
        "timestamp": 1660756528816,
        "stock": "42",
        "codigo": 953,
        "id": 4
    },
    {
        "title": "MANGA CHIHAYAFURU VOLUMEN 5",
        "price": "110",
        "thumbnail": "https://res.cloudinary.com/mangastore/image/upload/v1662159016/CHIHAYAFURU-V5_k0ujfv.jpg",
        "description": "Chihaya is a girl in the sixth grade, still not old enough to even know the meaning of the word zeal. But one day, she meets Arata, a transfer student from rural Fukui prefecture. Though docile and quiet, he has an unexpected skill: his ability to play competitive karuta, a traditional Japanese card game.",
        "timestamp": 1660756620886,
        "stock": "17",
        "codigo": 2579,
        "id": 5
    },
    {
        "title": "MANGA CHIHAYAFURU VOLUMEN 6",
        "price": "115",
        "thumbnail": "https://res.cloudinary.com/mangastore/image/upload/v1662159016/CHIHAYAFURU-V6_zq1yow.jpg",
        "description": "Chihaya is a girl in the sixth grade, still not old enough to even know the meaning of the word zeal. But one day, she meets Arata, a transfer student from rural Fukui prefecture. Though docile and quiet, he has an unexpected skill: his ability to play competitive karuta, a traditional Japanese card game.",
        "timestamp": 1660756716809,
        "stock": "10",
        "codigo": 9664,
        "id": 6
    }
]

//Rutas//

router.get('/', ctx =>{
    ctx.body = {
        status: 'success',
        message: productos,
    }
})

router.get('/:id', ctx =>{
    const getCurrentProd = productos.filter(function (productos){
        if(productos.id == ctx.params.id){
            return true
        }
    })
    if(getCurrentProd.length){
        ctx.body = getCurrentProd[0]
    }else{
        ctx.response.status = 404
        ctx.body = {
            status: 'error',
            message: 'No hay productos con ese Id'
        }
    }
})

router.post('/', ctx =>{
    if(
        !ctx.request.body.title ||
        !ctx.request.body.price ||
        !ctx.request.body.thumbnail ||
        !ctx.request.body.description ||
        !ctx.request.body.timestamp ||
        !ctx.request.body.stock ||
        !ctx.request.body.codigo ||
        !ctx.request.body.id 
        ){
            ctx.response.status = 400
            ctx.body = {
                status: "error",
                message: 'Error, ingresar los datos requeridos'
            }
        }else{
            const newProd = productos.push({
        title: ctx.request.body.title,
        price: ctx.request.body.price,
        thumbnail: ctx.request.body.thumbnail,
        description: ctx.request.body.description,
        timestamp: ctx.request.body.timestamp,
        stock: ctx.request.body.stock,
        codigo: ctx.request.body.codigo,
        id: ctx.request.body.id,
            })
            ctx.response.status = 201
            ctx.body = {
                status: 'success',
                message: `Nuevo producto cargado correctamente:
                ${ctx.request.body.title}`,
            }
        }
})

router.put('/update/:id', ctx =>{
    if(
        !ctx.request.body.title ||
        !ctx.request.body.price ||
        !ctx.request.body.thumbnail ||
        !ctx.request.body.description ||
        !ctx.request.body.timestamp ||
        !ctx.request.body.stock ||
        !ctx.request.body.codigo ||
        !ctx.request.body.id 
    ){
        ctx.response.status = 400
        ctx.body = {
            status: "error",
            message: 'Error, ingresar los datos requeridos'
    }
}else{
        const id = ctx.params.id
        const index = productos.findIndex(producto => producto.id == id)
        productos.splice(index, 1, ctx.request.body)
        ctx.response.status = 201
        ctx.body = {
            status: 'success',
            message: `Se actualizo el producto id:
            ${ctx.request.body.id} titulo: ${ctx.request.body.title}`,
        }
}})

router.delete('/delete/:id', ctx => {
    const id = ctx.params.id
    const index = productos.findIndex(producto => producto.id == id)
    productos.splice(index, 1)
    ctx.response.status = 200
    ctx.body = {
        status: 'success',
        message: `Se elimino el producto id: ${id}`,
    }
})