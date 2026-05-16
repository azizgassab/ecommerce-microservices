require("dotenv").config();

const app = require("./app");

const {
    connectProducer
} = require("./kafka/producer");

const PORT = process.env.PORT || 3002;

const startServer = async () => {
    await connectProducer();

    app.listen(PORT, () => {
        console.log(`order-service running on port ${PORT}`);
    });
};

startServer();