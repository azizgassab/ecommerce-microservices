const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ service: "user-service", status: "running" });
});

app.use("/users", userRoutes);

module.exports = app;
