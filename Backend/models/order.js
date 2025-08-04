const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  order_id: {
    type: Number,
    required: true,
    unique: true,
  },
  user_id: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['Cancelled', 'Shipped', 'Delivered', 'Returned', 'Processing'], // adjust as needed
  },
  gender: {
    type: String,
    enum: ['M', 'F'],
  },
  created_at: {
    type: Date,
    required: true,
  },
  returned_at: {
    type: Date,
    default: null,
  },
  shipped_at: {
    type: Date,
    default: null,
  },
  delivered_at: {
    type: Date,
    default: null,
  },
  num_of_item: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Order', orderSchema);
