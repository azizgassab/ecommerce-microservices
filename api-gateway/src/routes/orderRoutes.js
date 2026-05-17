const express = require("express");
const router = express.Router();
const orderClient = require("../grpc/orderClient");

/**
 * @openapi
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         productId:
 *           type: integer
 *           example: 1
 *         quantity:
 *           type: integer
 *           example: 2
 *         total:
 *           type: number
 *           format: float
 *           example: 199.98
 *     CreateOrderInput:
 *       type: object
 *       required:
 *         - productId
 *         - quantity
 *         - total
 *       properties:
 *         productId:
 *           type: integer
 *           example: 1
 *         quantity:
 *           type: integer
 *           example: 2
 *         total:
 *           type: number
 *           format: float
 *           example: 199.98
 *     UpdateOrderInput:
 *       type: object
 *       properties:
 *         productId:
 *           type: integer
 *           example: 1
 *         quantity:
 *           type: integer
 *           example: 3
 *         total:
 *           type: number
 *           format: float
 *           example: 299.97
 */

/**
 * @openapi
 * /api/orders:
 *   get:
 *     tags: [Orders]
 *     summary: Retrieve all orders
 *     responses:
 *       200:
 *         description: List of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *   post:
 *     tags: [Orders]
 *     summary: Create a new order
 *     description: Creates an order and emits an "order-created" Kafka event
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateOrderInput'
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       500:
 *         description: Server error
 *
 * /api/orders/{id}:
 *   get:
 *     tags: [Orders]
 *     summary: Get an order by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Order details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found
 *   put:
 *     tags: [Orders]
 *     summary: Update an order
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateOrderInput'
 *     responses:
 *       200:
 *         description: Order updated successfully
 *       404:
 *         description: Order not found
 *   delete:
 *     tags: [Orders]
 *     summary: Delete an order
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *       404:
 *         description: Order not found
 */

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
