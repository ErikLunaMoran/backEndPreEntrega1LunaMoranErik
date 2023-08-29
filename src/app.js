import express from "express";
/* const express = require("express"); */
import ProductManager from "./ProductManager.js";
/* const ProductManager = require("./ProductManager.js"); */
import productsRouter from "./routes/productsRouter.js";

const app = express();
const productManager = new ProductManager();

//Para que nuestra API lea JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productsRouter(productManager));

app.listen(8080, () => console.log("Servidor encendido"));
