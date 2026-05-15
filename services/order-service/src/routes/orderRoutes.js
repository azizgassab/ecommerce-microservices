const express = require("express");

const router = express.Router();

const {
    getOrders,
    createOrder
} = require("../controllers/orderController");

router.get("/health", (req, res) => {
    res.json({
        service: "order-service",
        status: "running"
    });
});

router.get("/", getOrders);

router.post("/", createOrder);

module.exports = router;