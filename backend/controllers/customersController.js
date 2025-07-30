const pool = require('../db');

exports.getAllCustomers = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM customers');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin: update user
exports.updateCustomer = async (req, res) => {
  const customer_id = req.params.id;
  const { name, email, phone, role } = req.body;
  try {
    const result = await pool.query(
      'UPDATE customers SET name = $1, email = $2, phone = $3, role = $4 WHERE customer_id = $5 RETURNING *',
      [name, email, phone, role, customer_id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Customer not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin: delete user
exports.deleteCustomer = async (req, res) => {
  const customer_id = req.params.id;
  try {
    const result = await pool.query('DELETE FROM customers WHERE customer_id = $1 RETURNING *', [customer_id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Customer not found' });
    res.json({ message: 'Customer deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 