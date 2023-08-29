import express from "express";

import ProductManager from "./manager/ProductManager.js";
import CartManager from "./manager/CartManager.js";

import productsRouter from "./routes/productsRouter.js";
import cartsRouter from "./routes/cartsRouter.js";

const app = express();
const productManager = new ProductManager();
const cartManager = new CartManager();

//Para que nuestra API lea JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productsRouter(productManager));
app.use("/api/carts", cartsRouter(cartManager));

app.listen(8080, () => console.log("Servidor encendido"));
