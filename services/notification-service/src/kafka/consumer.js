const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "notification-service",
  brokers: [process.env.KAFKA_BROKER || "kafka:9092"],
});

const consumer = kafka.consumer({
  groupId: "notification-group",
});

const connectConsumer = async () => {
  try {
    await consumer.connect();

    await consumer.subscribe({
      topic: "order-created",
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        try {
          const order = JSON.parse(message.value.toString());
          console.log("New Order Received via Kafka:");
          console.log(JSON.stringify(order, null, 2));
        } catch (parseError) {
          console.error("Failed to parse Kafka message:", parseError.message);
        }
      },
    });

    console.log("Kafka Consumer Connected");
  } catch (error) {
    console.error("Kafka consumer connection failed:", error.message);
    setTimeout(connectConsumer, 5000);
  }
};

module.exports = connectConsumer;
