const express = require("express");

const router = express.Router();

const {
    getOrders,
    createOrder
} = require("../controllers/orderController");

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
 */

/**
 * @openapi
 * /orders:
 *   get:
 *     tags: [Orders]
 *     summary: List all orders
 *     responses:
 *       200:
 *         description: Array of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *   post:
 *     tags: [Orders]
 *     summary: Create an order
 *     description: Creates an order and emits an order-created Kafka event
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [productId, quantity, total]
 *             properties:
 *               productId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *               total:
 *                 type: number
 *     responses:
 *       201:
 *         description: Created order with Kafka event sent
 */

router.get("/", getOrders);

router.post("/", createOrder);

module.exports = router;
