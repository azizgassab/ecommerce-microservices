require("dotenv").config();

const app = require("./app");
const connectConsumer = require("./kafka/consumer");

const PORT = process.env.PORT || 3003;

const start = async () => {
  await connectConsumer();
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`notification-service running on port ${PORT}`);
  });
};

start();
