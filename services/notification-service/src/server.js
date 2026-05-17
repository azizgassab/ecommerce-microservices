const express = require("express");
const connectConsumer = require("./kafka/consumer");

const app = express();

connectConsumer();

app.listen(3003, () => {
  console.log("notification-service running on port 3003");
});