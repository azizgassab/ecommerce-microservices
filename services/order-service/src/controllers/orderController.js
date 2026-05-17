const db = require("../config/db");
const { sendOrderEvent } = require("../kafka/producer");
const Order = require("../models/order");

const getOrders = (req, res) => {
    db.all("SELECT * FROM orders", [], (err, rows) => {
        if (err) return res.status(500).json(err);
        res.json(rows);
    });
};

const createOrder = async (req, res) => {
    try {
        const order = await Order.create(req.body);
        await sendOrderEvent(order);
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getOrders, createOrder };