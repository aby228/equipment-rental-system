const pool = require('../db');

exports.getAllRentals = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM rentals');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get current user's rentals
exports.getMyRentals = async (req, res) => {
  const customer_id = req.user.customer_id;
  try {
    const result = await pool.query(
      `SELECT r.*, e.name AS equipment_name
       FROM rentals r JOIN equipment e ON r.equipment_id = e.equipment_id
       WHERE r.customer_id = $1
       ORDER BY r.rental_date DESC`,
      [customer_id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin: close a rental (set return_date to today)
exports.closeRental = async (req, res) => {
  const rental_id = req.params.id;
  try {
    const result = await pool.query(
      'UPDATE rentals SET return_date = CURRENT_DATE WHERE rental_id = $1 RETURNING *',
      [rental_id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Rental not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 