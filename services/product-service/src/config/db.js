 
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.resolve(__dirname, "../database/product.db");

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.log("Database connection error", err);
    } else {
        console.log("SQLite connected");

        db.run(`
            CREATE TABLE IF NOT EXISTS products (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                price REAL NOT NULL,
                description TEXT
            )
        `);
    }
});

module.exports = db;