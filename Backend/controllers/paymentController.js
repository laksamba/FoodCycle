import axios from 'axios';
import Order from './../models/OrderSchema.js';


export const initiateEsewaPayment = async (req, res) => {
  try {
    const { orderId, amount } = req.body;
    const order = await Order.findById(orderId);

    if (!order || order.userId.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const paymentData = {
      amount,
      tax_amount: 0,
      total_amount: amount,
      transaction_uuid: order._id.toString(),
      product_code: process.env.ESEWA_MERCHANT_ID,
      success_url: 'http://localhost:5000/api/payment/esewa/success',
      failure_url: 'http://localhost:5000/api/payment/esewa/failure'
    };

    res.json({
      payment_url: 'https://uat.esewa.com.np/epay/main',
      payment_data: paymentData
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to initiate payment', error: error.message });
  }
};

export const initiateKhaltiPayment = async (req, res) => {
  try {
    const { orderId, amount } = req.body;
    const order = await Order.findById(orderId);

    if (!order || order.userId.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const paymentData = {
      return_url: 'http://localhost:5000/api/payment/khalti/success',
      website_url: 'http://localhost:5000',
      amount: amount * 100, // Khalti uses paisa
      purchase_order_id: order._id.toString(),
      purchase_order_name: 'Food Order'
    };

    const response = await axios.post(
      'https://a.khalti.com/api/v2/epayment/initiate/',
      paymentData,
      {
        headers: {
          Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json({
      payment_url: response.data.payment_url,
      pidx: response.data.pidx
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to initiate payment', error: error.message });
  }
};

export const handleEsewaSuccess = async (req, res) => {
  try {
    const { oid, amt, refId } = req.query;
    const order = await Order.findById(oid);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Verify with eSewa
    const verificationData = {
      amt,
      scd: process.env.ESEWA_MERCHANT_ID,
      pid: oid,
      rid: refId
    };

    const response = await axios.post(
      'https://uat.esewa.com.np/epay/transrec',
      verificationData
    );

    if (response.data.status === 'success') {
      order.paymentStatus = 'completed';
      order.transactionId = refId;
      await order.save();
      req.io.emit('paymentConfirmed', { orderId: order._id });
      res.redirect('http://localhost:3000/payment/success');
    } else {
      order.paymentStatus = 'failed';
      await order.save();
      res.redirect('http://localhost:3000/payment/failure');
    }
  } catch (error) {
    res.status(500).json({ message: 'Payment verification failed', error: error.message });
  }
};

export const handleKhaltiSuccess = async (req, res) => {
  try {
    const { pidx, purchase_order_id } = req.query;
    const order = await Order.findById(purchase_order_id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Verify with Khalti
    const response = await axios.post(
      'https://a.khalti.com/api/v2/epayment/lookup/',
      { pidx },
      {
        headers: {
          Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.data.status === 'Completed') {
      order.paymentStatus = 'completed';
      order.transactionId = pidx;
      await order.save();
      req.io.emit('paymentConfirmed', { orderId: order._id });
      res.redirect('http://localhost:3000/payment/success');
    } else {
      order.paymentStatus = 'failed';
      await order.save();
      res.redirect('http://localhost:3000/payment/failure');
    }
  } catch (error) {
    res.status(500).json({ message: 'Payment verification failed', error: error.message });
  }
};