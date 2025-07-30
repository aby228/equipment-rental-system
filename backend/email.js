const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for 465, false for 587/other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendOrderConfirmation = async (to, order) => {
  const info = await transporter.sendMail({
    from: `"Rentals" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Order Confirmation',
    text: `Thank you for your order! Order ID: ${order.order_id}`,
    html: `<b>Thank you for your order!</b><br>Order ID: ${order.order_id}`,
  });
  return info;
}; 