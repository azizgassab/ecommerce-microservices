const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User Service API",
      version: "1.0.0",
      description: "User microservice with direct REST access (also available via gRPC on port 50051)",
    },
    servers: [
      { url: "http://localhost:4001", description: "Local server" },
    ],
  },
  apis: ["./src/routes/*.js"],
};

module.exports = swaggerJsdoc(options);
