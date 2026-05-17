const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.resolve(__dirname, "../database/order.db");

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Order SQLite connected");

        db.run(`
            CREATE TABLE IF NOT EXISTS orders (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                productId INTEGER,
                quantity INTEGER,
                total REAL
            )
        `);
    }
});

module.exports = db;