const express = require("express");
const router = express.Router();
const userClient = require("../grpc/userClient");

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
