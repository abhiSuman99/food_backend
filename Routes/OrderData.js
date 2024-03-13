const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');

router.post('/orderData', async (req, res) => {
  const data = [{ order_data: req.body.order_data }, ...req.body.order_data];
  const eId = await Order.findOne({ 'email': req.body.email });

  if (eId === null) {
    try {
      await Order.create({
        email: req.body.email,
        order_data: [data]
      });
      res.json({ success: true });
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server Error');
    }
  } else {
    try {
      await Order.findOneAndUpdate(
        { email: req.body.email },
        { $push: { order_data: data } }
      );
      res.json({ success: true });
    } catch (error) {
      res.status(500).send('Server Error');
    }
  }
});

module.exports = router;
