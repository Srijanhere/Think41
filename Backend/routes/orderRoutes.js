const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const User = require('../models/user');

// GET /api/orders/customer/:id — All orders for a customer
router.get('/customer/:id', async (req, res) => {
  const { id } = req.params;

  // Validate customer ID
  if (isNaN(id)) {
    return res.status(400).json({ success: false, message: 'Invalid customer ID (must be numeric)' });
  }

  try {
    const customer = await User.findOne({ id: Number(id) });

    if (!customer) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }

    const orders = await Order.find({ user_id: Number(id) });

    res.json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (err) {
    console.error('❌ Error fetching orders:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/orders/:order_id — Get specific order details
router.get('/:order_id', async (req, res) => {
  const { order_id } = req.params;

  if (isNaN(order_id)) {
    return res.status(400).json({ success: false, message: 'Invalid order ID (must be numeric)' });
  }

  try {
    const order = await Order.findOne({ order_id: Number(order_id) });

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.json({
      success: true,
      data: order,
    });
  } catch (err) {
    console.error('❌ Error fetching order:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
