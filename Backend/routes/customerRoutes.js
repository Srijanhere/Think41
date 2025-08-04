const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const Order = require('../models/order.js');

// GET /api/customers — List all users
router.get('/', async (req, res) => {
  try {
    // const users = await User.find({});
    const users = await User.find();
    console.log(users);
    

    res.json({ success: true, count: users.length, data: users });
  } catch (err) {
     console.error('❌ Error fetching users:', err);  // <-- add this
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// GET /api/customers/:id — Get single user by ID with order count
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  // Validate ID (should be a number)
  if (isNaN(id)) {
    return res.status(400).json({ success: false, message: 'Invalid user ID format (should be a number)' });
  }

  try {
    const user = await User.findOne({ id: Number(id) });
    if (!user) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }

    const orderCount = await Order.countDocuments({ user_id: Number(id) });

    res.json({
      success: true,
      data: {
        customer: user,
        orderCount,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

module.exports = router;
