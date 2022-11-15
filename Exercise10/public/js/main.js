const socket = io.connect();

socket.on("productList", (dataProducts) => {
    renderProduct(dataProducts);
})

function renderProduct(dataProducts) {
    const html = dataProducts.map((elemento) => {
        let modelo = `<tr class="table-dark">
                        <td>${elemento._id}</td>
                        <td>${elemento.title}</td>
                        <td>${elemento.price}</td>
                        <td><img width=50 src='${elemento.thumbnail}' alt="imgProducto"></td>
                        </tr>`
        return modelo
    }).join("\n")
    document.getElementById("productos").innerHTML = html
}
function addItem() {
    const producto = {
        title: document.getElementsById("title").value,
        price: document.getElementById("price").value,
        thumbnail: document.getElementById("thumbnail").value
    }

    socket.emit("newProduct", producto)
}