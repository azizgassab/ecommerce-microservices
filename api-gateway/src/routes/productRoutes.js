const express = require("express");
const router = express.Router();
const productClient = require("../grpc/productClient");

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
 *     CreateProductInput:
 *       type: object
 *       required:
 *         - name
 *         - price
 *       properties:
 *         name:
 *           type: string
 *           example: "Laptop"
 *         price:
 *           type: number
 *           format: float
 *           example: 999.99
 *     UpdateProductInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "Laptop"
 *         price:
 *           type: number
 *           format: float
 *           example: 1099.99
 */

/**
 * @openapi
 * /api/products:
 *   get:
 *     tags: [Products]
 *     summary: Retrieve all products
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *   post:
 *     tags: [Products]
 *     summary: Create a new product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProductInput'
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: Server error
 *
 * /api/products/{id}:
 *   get:
 *     tags: [Products]
 *     summary: Get a product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Product details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *   put:
 *     tags: [Products]
 *     summary: Update a product
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
 *             $ref: '#/components/schemas/UpdateProductInput'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 *   delete:
 *     tags: [Products]
 *     summary: Delete a product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *       404:
 *         description: Product not found
 */

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
