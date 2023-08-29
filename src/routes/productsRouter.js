import { Router } from "express";

const productsRouter = (productManager) => {
  const router = Router();

  //GET PARA LEER TODOS LOS PRODUCTOS
  router.get("/", async (req, res) => {
    const limit = req.query.limit;
    const products = await productManager.getProducts();

    if (limit) {
      return res.send(products.slice(0, limit));
    }

    res.send(products);
  });

  //GET PARA LEER POR ID
  router.get("/:pid", async (req, res) => {
    const pid = parseInt(req.params.pid, 10);
    const products = await productManager.getProducts();

    const product = products.find(({ id }) => id === pid);
    if (!product) {
      return res.status(404).send("Producto no encontrado");
    }

    res.send(product);
  });

  //POST PARA AGREGAR UN NUEVO PRODUCTO
  router.post("/", async (req, res) => {
    const id = req.body.id;
    const title = req.body.title;
    const description = req.body.description;
    const code = req.body.code;
    const price = req.body.price;
    const status = req.body.status;
    const stock = req.body.stock;
    const category = req.body.category;

    //Compruebo si algún campo requerido no existe
    if (
      id === undefined ||
      title === undefined ||
      description === undefined ||
      code === undefined ||
      price === undefined ||
      status === undefined ||
      stock === undefined ||
      category === undefined
    ) {
      return res
        .status(400)
        .send("Faltan campos obligatorios para agregar el producto");
    }

    const newProduct = {
      id,
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
    };

    // Agregar el nuevo producto al manager y obtener el resultado
    try {
      const result = await productManager.addProduct(newProduct);
      res.status(201).json(result); // 201: Created
    } catch (error) {
      res.status(500).send("Error al agregar el producto");
    }
  });

  //PUT PARA ACTUALIZAR SIN MODIFICAR ID
  router.put("/:pid", async (req, res) => {
    const pid = parseInt(req.params.pid, 10);
    const updatedAttributes = req.body;

    try {
      const updatedProduct = await productManager.updateProduct(
        pid,
        updatedAttributes
      );

      if (!updatedProduct) {
        return res.status(404).send("Producto no encontrado");
      }

      res.send(updatedProduct);
    } catch (error) {
      res.status(500).send("Error al actualizar el producto");
    }
  });

  //DELETE PARA ELIMINAR PRODUCTO POR ID
  router.delete("/:pid", async (req, res) => {
    const pid = parseInt(req.params.pid, 10);

    try {
      const deletedProduct = await productManager.deleteProduct(pid);

      if (!deletedProduct) {
        return res.status(404).send("Producto no encontrado");
      }

      res.send(`Producto con ID ${pid} eliminado correctamente`);
    } catch (error) {
      res.status(500).send("Error al eliminar el producto");
    }
  });

  return router;
};

export default productsRouter;
