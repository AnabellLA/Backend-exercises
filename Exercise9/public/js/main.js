const socket = io.connect();

socket.on("messages", (dataMessages) => {
	renderMessage(dataMessages);
});

function renderMessage(dataMessages) {
	const htmlMessage = dataMessages
		.map((elemento) => {
			return `<div>
				<strong style='color:blue'>${elemento.author.id}</strong>[<time style='color:maroon'>${elemento.date}</time>]:
				<em>${elemento.text}</em></div>
		`;
		})
		.join(" ");
	document.getElementById("mensajes").innerHTML = htmlMessage;
}

function addMessage(e) {
	const mensaje = {
		id: document.getElementById("email").value,
		text: document.getElementById("message").value,
		name: document.getElementById("name").value,
		surname: document.getElementById("surname").value,
		age: document.getElementById("age").value,
		nickname: document.getElementById("nickname").value,
		avatar:document.getElementById("avatar").value
	};

	socket.emit("new-message", mensaje);
	return false;
}	


socket.on("products", (dataProducts) => {
	renderProduct(dataProducts);
});

function renderProduct(dataProducts) {
	const html = `<table class="table table-striped table-hover">
	<thead>
		<tr>
			<th>N°</th>
			<th>Título</th>
			<th>Precio</th>
			<th>Miniatura</th>
		</tr>
	</thead>
	<tbody id="productos">` + dataProducts
		.map((elemento) => {
			return `<tr>
			<td>${elemento.id}</td>
            <td>${elemento.title}</td>
            <td>${elemento.price}</td>
            <td><img width="15%" src='${elemento.thumbnail}' ></td>
        </tr>
        `;
		})
		.join("\n") + `</tbody>
		</table>`;
	document.getElementById("productos").innerHTML = html;
}

function addProduct(e) {
	const producto = {
		title: document.getElementById("title").value,
		price: document.getElementById("price").value,
		thumbnail: document.getElementById("thumbnail").value,
	};

	socket.emit("new-product", producto);
	return false;
}