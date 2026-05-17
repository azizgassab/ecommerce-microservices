const express = require("express");
const cors = require("cors");

const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
    res.json({
        service: "product-service",
        status: "running"
    });
});

app.use("/products", productRoutes);

module.exports = app;