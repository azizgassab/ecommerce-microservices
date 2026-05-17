require("dotenv").config();

const app = require("./app");
const { connectDB } = require("./config/db");
const { startGrpcServer } = require("./grpc/server");

const PORT = process.env.PORT || 3001;
const GRPC_PORT = process.env.GRPC_PORT || 50052;

const start = async () => {
  await connectDB();
  startGrpcServer(GRPC_PORT);
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`product-service REST running on port ${PORT}`);
  });
};

start();