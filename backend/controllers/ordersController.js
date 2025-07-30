const pool = require('../db');
const { sendOrderConfirmation } = require('../email');

exports.createOrder = async (req, res) => {
  const { cart } = req.body;
  const customer_id = req.user.customer_id;
  if (!cart || !Array.isArray(cart) || cart.length === 0) {
    return res.status(400).json({ error: 'Cart is required and must be a non-empty array.' });
  }
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    // Check inventory for all items
    for (const item of cart) {
      const { equipment_id, quantity } = item;
      const eqRes = await client.query('SELECT quantity FROM equipment WHERE equipment_id = $1', [equipment_id]);
      if (eqRes.rows.length === 0) {
        throw new Error('Equipment not found');
      }
      if (eqRes.rows[0].quantity < quantity) {
        throw new Error('Not enough inventory for equipment_id ' + equipment_id);
      }
    }
    // Create order
    const orderRes = await client.query(
      'INSERT INTO orders (customer_id) VALUES ($1) RETURNING order_id, order_date',
      [customer_id]
    );
    const order_id = orderRes.rows[0].order_id;
    // Create order_items and update inventory
    for (const item of cart) {
      const { equipment_id, quantity, daily_rate } = item;
      await client.query(
        'INSERT INTO order_items (order_id, equipment_id, quantity, daily_rate) VALUES ($1, $2, $3, $4)',
        [order_id, equipment_id, quantity, daily_rate]
      );
      await client.query(
        'UPDATE equipment SET quantity = quantity - $1 WHERE equipment_id = $2',
        [quantity, equipment_id]
      );
    }
    await client.query('COMMIT');
    // Send order confirmation email
    const customerRes = await client.query('SELECT email FROM customers WHERE customer_id = $1', [customer_id]);
    const customerEmail = customerRes.rows[0].email;
    await sendOrderConfirmation(customerEmail, { order_id });
    res.status(201).json({ order_id, order_date: orderRes.rows[0].order_date });
  } catch (err) {
    await client.query('ROLLBACK');
    res.status(400).json({ error: err.message });
  } finally {
    client.release();
  }
};

// Get all orders (admin only)
exports.getAllOrders = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT o.order_id, o.customer_id, c.name, o.order_date
       FROM orders o JOIN customers c ON o.customer_id = c.customer_id
       ORDER BY o.order_date DESC`
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get current user's orders
exports.getMyOrders = async (req, res) => {
  const customer_id = req.user.customer_id;
  try {
    const result = await pool.query(
      `SELECT o.order_id, o.order_date
       FROM orders o WHERE o.customer_id = $1
       ORDER BY o.order_date DESC`,
      [customer_id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get order details (admin or owner)
exports.getOrderDetails = async (req, res) => {
  const order_id = req.params.id;
  const user = req.user;
  try {
    // Check if user is admin or owner of the order
    const orderRes = await pool.query('SELECT * FROM orders WHERE order_id = $1', [order_id]);
    if (orderRes.rows.length === 0) return res.status(404).json({ error: 'Order not found' });
    const order = orderRes.rows[0];
    if (user.role !== 'admin' && user.customer_id !== order.customer_id) {
      return res.sendStatus(403);
    }
    // Get order items
    const itemsRes = await pool.query(
      `SELECT oi.order_item_id, oi.equipment_id, e.name, oi.quantity, oi.daily_rate
       FROM order_items oi JOIN equipment e ON oi.equipment_id = e.equipment_id
       WHERE oi.order_id = $1`,
      [order_id]
    );
    res.json({ order, items: itemsRes.rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin: update order (e.g., change customer or date)
exports.updateOrder = async (req, res) => {
  const order_id = req.params.id;
  const { customer_id, order_date } = req.body;
  try {
    const result = await pool.query(
      'UPDATE orders SET customer_id = $1, order_date = $2 WHERE order_id = $3 RETURNING *',
      [customer_id, order_date, order_id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Order not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin: delete order
exports.deleteOrder = async (req, res) => {
  const order_id = req.params.id;
  try {
    const result = await pool.query('DELETE FROM orders WHERE order_id = $1 RETURNING *', [order_id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Order not found' });
    res.json({ message: 'Order deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 