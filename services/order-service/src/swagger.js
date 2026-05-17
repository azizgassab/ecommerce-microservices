const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Order Service API",
      version: "1.0.0",
      description: "Order microservice with direct REST access (also available via gRPC on port 50053). Creates orders and emits Kafka events.",
    },
    servers: [
      { url: "http://localhost:3002", description: "Local server" },
    ],
  },
  apis: ["./src/routes/*.js"],
};

module.exports = swaggerJsdoc(options);
