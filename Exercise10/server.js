import express from "express"
import routerSession from "./src/routes/web/newConnect.js"
import prodRouter from "./routes/prodRouter.js"

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static("/public"))
app.use("/", routerSession)
app.use("/api/productos-test", prodRouter);

app.set("view engine", "ejs");
app.set("views", "./views");


const PORT = process.env.port || 8080

const server = app.listen(PORT, () => {
	console.log(`Http server started on port ${server.address().port}`)
})
server.on("error", (error) => console.log(`Error in server ${error}`))
