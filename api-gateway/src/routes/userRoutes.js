const express = require("express");
const router = express.Router();
const userClient = require("../grpc/userClient");

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "John Doe"
 *         email:
 *           type: string
 *           example: "john@example.com"
 *     CreateUserInput:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         name:
 *           type: string
 *           example: "John Doe"
 *         email:
 *           type: string
 *           example: "john@example.com"
 *     UpdateUserInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "John Doe"
 *         email:
 *           type: string
 *           example: "john@example.com"
 */

/**
 * @openapi
 * /api/users:
 *   get:
 *     tags: [Users]
 *     summary: Retrieve all users
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *   post:
 *     tags: [Users]
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserInput'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Server error
 *
 * /api/users/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Get a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: User details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *   put:
 *     tags: [Users]
 *     summary: Update a user
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
 *             $ref: '#/components/schemas/UpdateUserInput'
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 *   delete:
 *     tags: [Users]
 *     summary: Delete a user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *       404:
 *         description: User not found
 */

router.get("/", async (req, res) => {
  try {
    const users = await userClient.getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message || "gRPC call failed" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await userClient.getUser(parseInt(req.params.id));
    res.json(user);
  } catch (error) {
    const status = error.code === 5 ? 404 : 500;
    res.status(status).json({ error: error.details || error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await userClient.createUser(name, email);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.details || error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await userClient.updateUser(parseInt(req.params.id), name, email);
    res.json(user);
  } catch (error) {
    const status = error.code === 5 ? 404 : 500;
    res.status(status).json({ error: error.details || error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await userClient.deleteUser(parseInt(req.params.id));
    res.json(result);
  } catch (error) {
    const status = error.code === 5 ? 404 : 500;
    res.status(status).json({ error: error.details || error.message });
  }
});

module.exports = router;
