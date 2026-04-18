const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Create an order (Public Checkout)
router.post('/', async (req, res) => {
  try {
    const { customer, products, totalPrice } = req.body;
    const order = new Order({ customer, products, totalPrice });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin routes below -------------

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find({}).populate('products.product', 'name price');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update order status
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

