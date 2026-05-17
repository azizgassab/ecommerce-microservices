require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const swaggerUi = require("swagger-ui-express");

const swaggerSpec = require("./swagger");
const graphqlSchema = require("./graphql/schema");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

const userClient = require("./grpc/userClient");
const productClient = require("./grpc/productClient");
const orderClient = require("./grpc/orderClient");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ service: "api-gateway", status: "running" });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

app.use(
  "/graphql",
  graphqlHTTP({ schema: graphqlSchema, graphiql: true })
);

const PORT = process.env.PORT || 4000;

const start = () => {
  userClient.connect(process.env.USER_GRPC_HOST || "localhost:50051");
  productClient.connect(process.env.PRODUCT_GRPC_HOST || "localhost:50052");
  orderClient.connect(process.env.ORDER_GRPC_HOST || "localhost:50053");

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`API Gateway running on port ${PORT}`);
    console.log(`GraphQL: http://localhost:${PORT}/graphql`);
    console.log(`REST:    http://localhost:${PORT}/api`);
  });
};

start();
