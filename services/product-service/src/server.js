require("dotenv").config();

const app = require("./app");

const { connectDB } = require("./config/db");

connectDB();

const PORT = process.env.PORT || 3001;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`product-service running on port ${PORT}`);
});