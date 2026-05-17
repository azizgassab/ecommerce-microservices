const express = require("express");

const router = express.Router();

/**
 * @openapi
 * /api/notifications/health:
 *   get:
 *     tags: [Notifications]
 *     summary: Health check
 *     responses:
 *       200:
 *         description: Service status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 service:
 *                   type: string
 *                 status:
 *                   type: string
 *
 * /api/notifications:
 *   get:
 *     tags: [Notifications]
 *     summary: Service status
 *     responses:
 *       200:
 *         description: Active notification service
 */

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
