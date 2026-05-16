require("dotenv").config();

const app = require("./app");

const startConsumer = require("./kafka/consumer");

const PORT = process.env.PORT || 3003;

const startServer = async () => {

    await startConsumer();

    app.listen(PORT, () => {
        console.log(`notification-service running on port ${PORT}`);
    });
};

startServer();