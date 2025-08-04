const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user.js');
const customerRoutes = require('./routes/customerRoutes.js');
const orderRoutes = require('./routes/orderRoutes.js');
const cors = require("cors")
const dotenv = require('dotenv');
const app = express();
app.use(express.json());
dotenv.config();

app.use(cors({
  origin: 'http://localhost:5173', // or use "*" in dev, but be specific in prod
  credentials: true,
}));
const mongoURI = process.env.MONGO_URI ;
app.use('/api/customers', customerRoutes);
app.use('/api/orders', orderRoutes);

const PORT = 5000;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB');

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
})
.catch(err => {
  console.error('❌ Failed to connect to MongoDB', err);
  process.exit(1); // Exit process with failure
});

