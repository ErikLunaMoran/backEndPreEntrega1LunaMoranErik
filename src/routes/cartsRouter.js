import { Router } from "express";

const cartsRouter = (cartManager) => {
  const router = Router();

  //POST PARA CREAR UN NUEVO CARRITO
  router.post("/", async (req, res) => {
    try {
      const newCart = await cartManager.createCart();
      res.status(201).json(newCart); // 201: Created
    } catch (error) {
      res.status(500).send("Error al crear el carrito");
    }
  });

  //GET PARA LISTAR PRODUCTOS DE UN CARRITO
  router.get("/:cid", async (req, res) => {
    const cid = parseInt(req.params.cid, 10);

    try {
      const cartProducts = await cartManager.getCartProducts(cid);
      if (!cartProducts) {
        return res.status(404).send("Carrito no encontrado");
      }

      res.json(cartProducts);
    } catch (error) {
      res.status(500).send("Error al obtener los productos del carrito");
    }
  });

  //POST PARA AGREGAR PRODUCTOS A UN CARRITO
  router.post("/:cid/product/:pid", async (req, res) => {
    const cid = parseInt(req.params.cid, 10);
    const pid = parseInt(req.params.pid, 10);
    const quantity = parseInt(req.body.quantity, 10);

    if (!quantity || quantity <= 0) {
      return res.status(400).send("Cantidad inválida");
    }

    try {
      const addedProduct = await cartManager.addProductToCart(
        cid,
        pid,
        quantity
      );
      if (!addedProduct) {
        return res.status(404).send("Carrito o producto no encontrado");
      }

      res.status(201).json(addedProduct); // 201: Created
    } catch (error) {
      res.status(500).send("Error al agregar el producto al carrito");
    }
  });

  return router;
};

export default cartsRouter;
