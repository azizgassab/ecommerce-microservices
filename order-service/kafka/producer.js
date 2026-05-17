const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'order-service',
    brokers: ['kafka:9092'],
    connectionTimeout: 30000,
    retry: {
        retries: 10
    }
});

const producer = kafka.producer();

const connectProducer = async () => {
    await producer.connect();
    console.log('Kafka Producer Connected');
};

const sendOrderCreatedEvent = async (order) => {
    await producer.send({
        topic: 'order-created',
        messages: [
            {
                value: JSON.stringify(order)
            }
        ]
    });

    console.log('Order Created Event Sent');
};

module.exports = {
    connectProducer,
    sendOrderCreatedEvent
};