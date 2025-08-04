const mongoose = require('mongoose');
const csv = require('csvtojson');
const dotenv = require('dotenv');
const User = require('./models/user.js');
const Order = require('./models/order');
mongoose.set('bufferCommands', false);

dotenv.config();


const importUsers = async () => {
  const users = await csv().fromFile("./user.csv");
  return User.insertMany(users);
};

const importOrders = async () => {
  const orders = await csv().fromFile('./order.csv');
  return Order.insertMany(orders);
};

const run = async () => {
  try {
    await mongoose.connection.dropDatabase();
    await importUsers();
    await importOrders();
    console.log(' Users and Orders imported successfully!');
  } catch (err) {
    console.error(' Error during import:', err);
  } finally {
    mongoose.disconnect();
  }
};

run();
