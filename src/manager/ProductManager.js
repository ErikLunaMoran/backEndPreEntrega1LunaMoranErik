import fs from "fs";

class ProductManager {
  async getProducts() {
    try {
      const data = await fs.promises.readFile(
        "./src/fileSystem/productos.json",
        "utf-8"
      );
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  //MANEJO DE AGREGAR PRODUCTOS
  async addProduct(newProduct) {
    try {
      const products = await this.getProducts();
      const newProductId = products.length + 1; // Asignar un nuevo ID al producto
      const productWithId = { id: newProductId, ...newProduct };
      products.push(productWithId);

      await fs.promises.writeFile(
        "./src/fileSystem/productos.json",
        JSON.stringify(products)
      );

      return productWithId;
    } catch (error) {
      return null; // Indica un error al agregar el producto
    }
  }

  //MANEJO DE ACTUALIZAR PRODUCTOS
  async updateProduct(pid, updatedAttributes) {
    try {
      const products = await this.getProducts();

      const productIndex = products.findIndex((product) => product.id === pid);

      if (productIndex === -1) {
        return null; // Indica que el producto no se encontró
      }

      // Asegurarse de que el ID no se actualice
      const updatedProduct = {
        ...products[productIndex],
        ...updatedAttributes,
        id: products[productIndex].id,
      };

      products[productIndex] = updatedProduct;

      await fs.promises.writeFile(
        "./src/fileSystem/productos.json",
        JSON.stringify(products)
      );

      return updatedProduct;
    } catch (error) {
      return null; // Indica un error al actualizar el producto
    }
  }

  //MANEJO DE ELIMINACION DE PRODUCTO POR ID
  async deleteProduct(pid) {
    try {
      const products = await this.getProducts();

      const productIndex = products.findIndex((product) => product.id === pid);

      if (productIndex === -1) {
        return null; // Indica que el producto no se encontró
      }

      const deletedProduct = products.splice(productIndex, 1)[0];
      await fs.promises.writeFile(
        "./src/fileSystem/productos.json",
        JSON.stringify(products)
      );

      return deletedProduct;
    } catch (error) {
      return null; // Indica un error al eliminar el producto
    }
  }
}

export default ProductManager;
