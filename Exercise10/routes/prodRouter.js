import express from "express";
const prodRouter = express.Router();
import { faker } from "@faker-js/faker";



prodRouter.post("/api/productos-test", async (req, res) => {
    let response = [];
    for (let index = 0; index <= 5; index++) {
        response.push({
            title: faker.commerce.product(),
            price: faker.commerce.price(),
            thumbnail: faker.image.image()
        });
    }
    res.json(response);
});

export default prodRouter;