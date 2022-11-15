import { Router } from "express";
import  productFaker from '../../mocks/prodFaker.js';
const prodRouter = new Router();


prodRouter.get("/api/productos-test",  (req, res) => 
    res.json(productFaker(5)));

export default prodRouter;