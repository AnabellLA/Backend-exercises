const express = require("express");
const app = express();
const PORT = 8080;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const server = app.listen(PORT, () => {
	console.log("servidor levantado");
});

app.use("/formulario", express.static("public"));

let productos = [];

const routerProductos = express.Router();

//GET ALL PRODUCTS
routerProductos.get("/", (req, res) => {
	console.log('GET request recibido')
	if(productos.length > 0){
		res.json({ productos });
	}else{
		res.json({ Error: 'no se encontró ningún producto' });
	}
});

//GET A PRODUCT BY ITS ID
routerProductos.get("/:id", (req, res) => {
	console.log('GET BY ID request recibido')
	let id = Number(req.params.id)
	let productoFiltrado
	let approved = 1
	productos.forEach(producto => {
		if(producto.id === id) {
			productoFiltrado = producto
			approved = 0
		}
	})
	if (approved === 1){
		res.json({ Error: 'producto no encontrado' });
	} else {
		res.json({ productoFiltrado });
	}
});

//ADD A PRODUCT
routerProductos.post("/", (req, res) => {
	console.log('POST request recibido')
	console.log(req.body);
	let newId
			if (productos.length >=1){
				let lastIndex = productos.length - 1
				let lastId = productos[lastIndex].id
				newId = lastId + 1    
			}else{
				newId = 1
			}
	let newItem = {
		id : newId,
		title : req.body.title,
		price : req.body.price,
		thumbnail : req.body.thumbnail
	}
	productos.push(newItem);
	res.json({ mensaje: `se agrego el producto ${newItem.title}, identificado con id: ${newItem.id}` });
});

//REPLACE AN EXISTING PRODUCT
routerProductos.put("/:id", (req, res) => {
	console.log('PUT request recibido')
	console.log(req.body);
	id = Number(req.params.id)
	let approved = 1
	let newItem = {
		id : id,	
		title : req.body.title,
		price : req.body.price,
		thumbnail : req.body.thumbnail
	}
	let productosActualizados = []
	productos.forEach(producto => {
		if(producto.id != id) {
			productosActualizados.push(producto)
		}
		if(producto.id === id) {
			productosActualizados.push(newItem)
			approved = 0
		}
	})
	productos = productosActualizados
	if (approved === 1){
		res.json({ Error: 'producto no encontrado' });
	}else{
		console.log(`Objeto con id : ${newItem.id} modificado`)
		res.json({ productos });	
	}
});

//DELETE AN EXISTING PRODUCT
routerProductos.delete("/:id", (req, res) => {
	console.log('DELETE request recibido')
	let id = Number(req.params.id)
	let productosFiltrados = []
		productos.forEach(producto => {
			if(producto.id != id) {
				productosFiltrados.push(producto)
			}
		})
		if (productos.length === productosFiltrados.length){
			res.json({ Error: 'producto no encontrado' });
		}else{
			productos = productosFiltrados
			console.log(`Objeto con id : ${id} eliminado`)
			res.json({ productos });
		}
});

app.use("/productos", routerProductos);