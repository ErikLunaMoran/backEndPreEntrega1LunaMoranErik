const fs = require("fs");

class ProductManager {
  async getProducts() {
    const data = JSON.parse(
      await fs.promises.readFile("./src/productos.json", "utf-8")
    );
    return data;
  }

  async updateProduct(productId) {
    // Paso 1
    const data = await fs.promises.readFile("productos.json", "utf-8");

    // Paso 2
    const products = JSON.parse(data);

    // Paso 3
    const product = products.find(({ id }) => id === productId);

    // Paso 4
    product.atributo = nuevoValor;

    // Paso 5
    await fs.promises.writeFile("productos.json", JSON.stringify(products));
  }
}

module.exports = ProductManager;
