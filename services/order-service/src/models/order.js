const db = require("../config/db");

const Order = {
    create: (data) => {
        return new Promise((resolve, reject) => {
            const { productId, quantity, total } = data;
            db.run(
                "INSERT INTO orders (productId, quantity, total) VALUES (?, ?, ?)",
                [productId, quantity, total],
                function (err) {
                    if (err) return reject(err);
                    resolve({ id: this.lastID, productId, quantity, total });
                }
            );
        });
    },

    findAll: () => {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM orders", [], (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    },

    findById: (id) => {
        return new Promise((resolve, reject) => {
            db.get("SELECT * FROM orders WHERE id = ?", [id], (err, row) => {
                if (err) return reject(err);
                resolve(row);
            });
        });
    }
};

module.exports = Order;