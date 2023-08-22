const fs = require("fs");

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.loadProducts();
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.path, "utf-8");
      this.products = JSON.parse(data);
      this.nextId = this.calculateNextId();
    } catch (error) {
      this.products = [];
      this.nextId = 1;
    }
  }

  saveProducts() {
    const data = JSON.stringify(this.products, null, 2);
    fs.writeFileSync(this.path, data, "utf-8");
  }

  calculateNextId() {
    if (this.products.length === 0) {
      return 1;
    }
    const ids = this.products.map((product) => product.id);
    return Math.max(...ids) + 1;
  }

  addProduct(productData) {
    const product = {
      id: this.nextId,
      ...productData,
    };

    this.products.push(product);
    this.nextId++;
    this.saveProducts();
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    return this.products.find((product) => product.id === id);
  }

  updateProduct(id, updatedFields) {
    const productIndex = this.products.findIndex(
      (product) => product.id === id
    );
    if (productIndex !== -1) {
      this.products[productIndex] = {
        ...this.products[productIndex],
        ...updatedFields,
        id,
      };
      this.saveProducts();
      return true;
    }
    return false;
  }

  deleteProduct(id) {
    const productIndex = this.products.findIndex(
      (product) => product.id === id
    );
    if (productIndex !== -1) {
      this.products.splice(productIndex, 1);
      this.saveProducts();
      return true;
    }
    return false;
  }
}

const productManager = new ProductManager("productos.json");

// Ejemplo de uso
/* productManager.addProduct({
  title: "Kongo Gato Adulto",
  description: "Alimento para gato adulto",
  price: "$3.000",
  thumbnail: "imagenGato1.jpg",
  code: "2.19.1",
  stock: 50,
});

productManager.addProduct({
  title: "Kongo Gatito",
  description: "Alimento para gato joven",
  price: "$2.500",
  thumbnail: "imagenGato2.jpg",
  code: "2.19.2",
  stock: 11,
});

productManager.addProduct({
  title: "Kongo Gato Urinary",
  description: "Alimento para gato con cuidados urinarios",
  price: "$5.000",
  thumbnail: "imagenGato3.jpg",
  code: "2.19.3",
  stock: 25,
});

console.log(productManager.getProducts());

const product = productManager.getProductById(2);
if (product) {
  console.log("Producto encontrado:", product);
}

const updated = productManager.updateProduct(1, { stock: 40 });
if (updated) {
  console.log("Producto actualizado.");
} else {
  console.log("Producto no encontrado.");
}

const deleted = productManager.deleteProduct(3);
if (deleted) {
  console.log("Producto eliminado.");
} else {
  console.log("Producto no encontrado.");
}
 */
