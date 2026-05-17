const express = require("express");
const router = express.Router();
const productClient = require("../grpc/productClient");

router.get("/", async (req, res) => {
  try {
    const products = await productClient.getProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message || "gRPC call failed" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await productClient.getProduct(parseInt(req.params.id));
    res.json(product);
  } catch (error) {
    const status = error.code === 5 ? 404 : 500;
    res.status(status).json({ error: error.details || error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, price } = req.body;
    const product = await productClient.createProduct(name, price);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.details || error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { name, price } = req.body;
    const product = await productClient.updateProduct(parseInt(req.params.id), name, price);
    res.json(product);
  } catch (error) {
    const status = error.code === 5 ? 404 : 500;
    res.status(status).json({ error: error.details || error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await productClient.deleteProduct(parseInt(req.params.id));
    res.json(result);
  } catch (error) {
    const status = error.code === 5 ? 404 : 500;
    res.status(status).json({ error: error.details || error.message });
  }
});

module.exports = router;
