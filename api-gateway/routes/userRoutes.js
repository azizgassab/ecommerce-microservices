const express = require('express');

const client = require('../services/grpcClient');

const router = express.Router();

router.get('/users', (req, res) => {

    client.GetUsers({}, (error, response) => {

        if (error) {
            return res.status(500).json(error);
        }

        res.json(response.users);

    });

});

module.exports = router;