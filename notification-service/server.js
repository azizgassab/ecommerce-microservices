const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Notification Service Running');
});

app.listen(3003, () => {
    console.log('Notification Service running on port 3003');
});