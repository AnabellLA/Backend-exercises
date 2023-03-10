var socket = io.connect("http://localhost:8080", { forceNew: true });

socket.on("messages", (dataMessages) => {
	renderMessage(dataMessages);
	console.log(dataMessages)
});

function renderMessage(dataMessages) {
	const htmlMessage = dataMessages
		.map((elemento) => {
			return `<div>
				<strong style='color:blue'>${elemento.email}</strong>[<time style='color:maroon'>${elemento.userType}</time>]:
				<em>${elemento.message}</em></div>
		`;
		})
		.join(" ");
	document.getElementById("mensajes").innerHTML = htmlMessage;
}

function addMessage(e) {
	const mensaje = {
		email: document.getElementById("email").value,
        usertype: document.getElementById("usertype").value,
		message: document.getElementById("message").value,
	};

	socket.emit("new-message", mensaje);
	return false;
}	
