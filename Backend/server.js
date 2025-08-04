const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user.js');
const customerRoutes = require('./routes/customerRoutes.js');
const dotenv = require('dotenv');
const app = express();
app.use(express.json());
dotenv.config();


const mongoURI = process.env.MONGO_URI ;
app.use('/api/customers', customerRoutes);


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

