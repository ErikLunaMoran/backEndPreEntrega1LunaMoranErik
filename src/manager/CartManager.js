import fs from "fs";

class CartManager {
  async createCart() {
    try {
      const carts = await this.getCarts();
      const newCart = {
        id: this.generateUniqueId(carts),
        products: [],
      };

      carts.push(newCart);
      await this.saveCarts(carts);

      return newCart;
    } catch (error) {
      throw error;
    }
  }

  async getCartProducts(cid) {
    try {
      const carts = await this.getCarts();
      const cart = carts.find((cart) => cart.id === cid);
      return cart ? cart.products : null;
    } catch (error) {
      throw error;
    }
  }

  async addProductToCart(cid, pid, quantity) {
    try {
      const carts = await this.getCarts();
      const cart = carts.find((cart) => cart.id === cid);

      if (!cart) {
        return null; // Carrito no encontrado
      }

      const existingProduct = cart.products.find(
        (product) => product.product === pid
      );

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({
          product: pid,
          quantity: quantity,
        });
      }

      await this.saveCarts(carts);

      return cart;
    } catch (error) {
      throw error;
    }
  }

  // Métodos para obtener y guardar carritos en el archivo

  async getCarts() {
    try {
      const data = await fs.promises.readFile(
        "./src/fileSystem/carrito.json",
        "utf-8"
      );
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  async saveCarts(carts) {
    await fs.promises.writeFile(
      "./src/fileSystem/carrito.json",
      JSON.stringify(carts)
    );
  }

  // Generar un ID único para el nuevo carrito

  generateUniqueId(carts) {
    const usedIds = new Set(carts.map((cart) => cart.id));
    let newId = Math.floor(Math.random() * 1000000);

    while (usedIds.has(newId)) {
      newId = Math.floor(Math.random() * 1000000);
    }

    return newId;
  }
}

export default CartManager;
