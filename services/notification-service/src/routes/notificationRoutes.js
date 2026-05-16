const express = require("express");

const router = express.Router();

router.get("/health", (req, res) => {
    res.json({
        service: "notification-service",
        status: "running"
    });
});

router.get("/", (req, res) => {
    res.json({
        message: "Notification Service Active"
    });
});

module.exports = router;