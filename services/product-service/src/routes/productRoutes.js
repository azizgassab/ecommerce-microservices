 
const express = require("express");

const router = express.Router();

const {
    getProducts,
    createProduct
} = require("../controllers/productController");

router.get("/", getProducts);

router.post("/", createProduct);

router.get("/health", (req, res) => {
    res.json({
        service: "product-service",
        status: "running"
    });
});

module.exports = router;