const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  order_id: {
    type: Number,
    required: true,
    unique: true
  },
  user_id: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Cancelled', 'Processing', 'Completed', 'Shipped', 'Pending'],
    required: true
  },
  gender: {
    type: String,
    enum: ['M', 'F', 'Other']
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  num_of_item: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Order', OrderSchema);
