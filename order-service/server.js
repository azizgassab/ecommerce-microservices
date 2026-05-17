const express = require('express');

const {
    connectProducer,
    sendOrderCreatedEvent
} = require('./kafka/producer');

const app = express();

app.use(express.json());

const startKafka = async () => {
    try {
        await connectProducer();
    } catch (error) {
        console.log('Waiting for Kafka...');
        setTimeout(startKafka, 5000);
    }
};

startKafka();

app.get('/', (req, res) => {
    res.send('Order Service Running');
});

app.post('/orders', async (req, res) => {

    const order = {
        id: Date.now(),
        product: req.body.product,
        quantity: req.body.quantity
    };

    await sendOrderCreatedEvent(order);

    res.json({
        success: true,
        order
    });

});

app.listen(3002, () => {
    console.log('Order Service running on port 3002');
});