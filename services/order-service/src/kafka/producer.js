const { Kafka } = require("kafkajs");

const kafka = new Kafka({
    clientId: "order-service",
    brokers: [process.env.KAFKA_BROKER || "kafka:9092"]
});

const producer = kafka.producer();

const connectProducer = async () => {
    await producer.connect();
    console.log("Kafka Producer Connected");
};

const sendOrderEvent = async (order) => {
    await producer.send({
        topic: "order-created",
        messages: [
            {
                value: JSON.stringify(order)
            }
        ]
    });

    console.log("Order Event Sent");
};

module.exports = {
    connectProducer,
    sendOrderEvent
};