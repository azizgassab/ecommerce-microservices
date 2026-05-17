const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "notification-service",
  brokers: ["kafka:9092"]
});

const consumer = kafka.consumer({
  groupId: "notification-group"
});

const connectConsumer = async () => {
  await consumer.connect();

  await consumer.subscribe({
    topic: "order-created",
    fromBeginning: true
  });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const order = JSON.parse(message.value.toString());

      console.log("New Order Received:");
      console.log(order);
    }
  });

  console.log("Kafka Consumer Connected");
};

module.exports = connectConsumer;