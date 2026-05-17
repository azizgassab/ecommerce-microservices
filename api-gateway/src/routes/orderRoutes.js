const express = require("express");
const router = express.Router();
const orderClient = require("../grpc/orderClient");

router.get("/", async (req, res) => {
  try {
    const orders = await orderClient.getOrders();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message || "gRPC call failed" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const order = await orderClient.getOrder(parseInt(req.params.id));
    res.json(order);
  } catch (error) {
    const status = error.code === 5 ? 404 : 500;
    res.status(status).json({ error: error.details || error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { productId, quantity, total } = req.body;
    const order = await orderClient.createOrder(productId, quantity, total);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.details || error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { productId, quantity, total } = req.body;
    const order = await orderClient.updateOrder(parseInt(req.params.id), productId, quantity, total);
    res.json(order);
  } catch (error) {
    const status = error.code === 5 ? 404 : 500;
    res.status(status).json({ error: error.details || error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await orderClient.deleteOrder(parseInt(req.params.id));
    res.json(result);
  } catch (error) {
    const status = error.code === 5 ? 404 : 500;
    res.status(status).json({ error: error.details || error.message });
  }
});

module.exports = router;
