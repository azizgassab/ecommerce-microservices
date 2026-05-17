const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Notification Service API",
      version: "1.0.0",
      description: "Notification microservice that consumes Kafka order-created events and exposes health/status endpoints.",
    },
    servers: [
      { url: "http://localhost:3003", description: "Local server" },
    ],
  },
  apis: ["./src/routes/*.js"],
};

module.exports = swaggerJsdoc(options);
