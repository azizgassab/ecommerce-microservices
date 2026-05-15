const express = require('express');

const router = express.Router();

router.get('/users', (req, res) => {
    res.json({
        success: true,
        message: 'Get all users'
    });
});

router.post('/users', (req, res) => {
    res.json({
        success: true,
        message: 'Create user'
    });
});

module.exports = router;