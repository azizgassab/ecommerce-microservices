const db = require("../config/db");

const getOrders = (req, res) => {
    db.all("SELECT * FROM orders", [], (err, rows) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json(rows);
    });
};

const createOrder = (req, res) => {
    const { productId, quantity, total } = req.body;

    const query = `
        INSERT INTO orders(productId, quantity, total)
        VALUES (?, ?, ?)
    `;

    db.run(query, [productId, quantity, total], function(err) {
        if (err) {
            return res.status(500).json(err);
        }

        res.status(201).json({
            id: this.lastID,
            productId,
            quantity,
            total
        });
    });
};

module.exports = {
    getOrders,
    createOrder
};