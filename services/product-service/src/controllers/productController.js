 
const db = require("../config/db");

const getProducts = (req, res) => {
    db.all("SELECT * FROM products", [], (err, rows) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json(rows);
    });
};

const createProduct = (req, res) => {
    const { name, price, description } = req.body;

    const query = `
        INSERT INTO products(name, price, description)
        VALUES (?, ?, ?)
    `;

    db.run(query, [name, price, description], function(err) {
        if (err) {
            return res.status(500).json(err);
        }

        res.status(201).json({
            id: this.lastID,
            name,
            price,
            description
        });
    });
};

module.exports = {
    getProducts,
    createProduct
};