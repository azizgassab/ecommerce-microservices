const { Kafka } = require("kafkajs");

const kafka = new Kafka({
    clientId: "notification-service",
    brokers: ["kafka:9092"]
});

const consumer = kafka.consumer({
    groupId: "notification-group"
});

const startConsumer = async () => {

    await consumer.connect();

    console.log("Kafka Consumer Connected");

    await consumer.subscribe({
        topic: "order-created",
        fromBeginning: true
    });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {

            const order = JSON.parse(message.value.toString());

            console.log("New Order Received");

            console.log(order);

            // future:
            // send email
            // send sms
            // push notification
        }
    });
};

module.exports = startConsumer;