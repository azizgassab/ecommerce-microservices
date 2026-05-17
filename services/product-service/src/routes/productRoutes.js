const express = require('express');
const router = express.Router();

const {
  getProducts,
  createProduct
} = require('../controllers/productController');

/**
 * @openapi
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "Laptop"
 *         price:
 *           type: number
 *           format: float
 *           example: 999.99
 */

/**
 * @openapi
 * /products:
 *   get:
 *     tags: [Products]
 *     summary: List all products
 *     responses:
 *       200:
 *         description: Array of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *   post:
 *     tags: [Products]
 *     summary: Create a product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, price]
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Created product
 */

router.get('/', getProducts);
router.post('/', createProduct);

module.exports = router;
