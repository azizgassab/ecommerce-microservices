require("dotenv").config();

const app = require("./app");
const { connectProducer } = require("./kafka/producer");

// ✅ Supprimé: import dupliqué + app.use("/orders") dupliqué
// Routes déjà montées dans app.js sous /api/orders

const PORT = process.env.PORT || 3002;

const startServer = async () => {
    await connectProducer();
    app.listen(PORT, () => {
        console.log(`order-service running on port ${PORT}`);
    });
};

startServer();