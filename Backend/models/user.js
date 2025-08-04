const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  first_name: String,
  last_name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: Number,
  gender: {
    type: String,
    enum: ['M', 'F'],
  },
  state: String,
  street_address: String,
  postal_code: String,
  city: String,
  country: String,
  latitude: Number,
  longitude: Number,
  traffic_source: String  // ← no enum at all
,
  created_at: {
    type: Date,
    default: Date.now,
  },
});



module.exports = mongoose.model('User', userSchema);
