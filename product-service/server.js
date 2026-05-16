const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Product Service Running');
});

app.listen(3001, () => {
    console.log('Product Service running on port 3001');
});