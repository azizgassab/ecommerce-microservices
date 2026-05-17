require("dotenv").config();

const app = require("./app");
const { connectProducer } = require("./kafka/producer");
const { startGrpcServer } = require("./grpc/server");

const PORT = process.env.PORT || 3002;
const GRPC_PORT = process.env.GRPC_PORT || 50053;

const startServer = async () => {
    await connectProducer();
    startGrpcServer(GRPC_PORT);
    app.listen(PORT, () => {
        console.log(`order-service REST running on port ${PORT}`);
    });
};

startServer();