const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Product Service API",
      version: "1.0.0",
      description: "Product microservice with direct REST access (also available via gRPC on port 50052)",
    },
    servers: [
      { url: "http://localhost:3001", description: "Local server" },
    ],
  },
  apis: ["./src/routes/*.js"],
};

module.exports = swaggerJsdoc(options);
