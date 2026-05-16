require('dotenv').config();

const express = require('express');
const cors = require('cors');

const productRoutes = require('./routes/productRoutes');

const { connectDB } = require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use('/products', productRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`product-service running on port ${PORT}`);
});