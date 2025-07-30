const pool = require('../db');

exports.getAllEquipment = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM equipment');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin: create equipment
exports.createEquipment = async (req, res) => {
  const { name, description, quantity, daily_rate } = req.body;
  if (!name || !quantity || !daily_rate) {
    return res.status(400).json({ error: 'Name, quantity, and daily_rate are required.' });
  }
  try {
    const result = await pool.query(
      'INSERT INTO equipment (name, description, quantity, daily_rate) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, description, quantity, daily_rate]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin: update equipment
exports.updateEquipment = async (req, res) => {
  const equipment_id = req.params.id;
  const { name, description, quantity, daily_rate } = req.body;
  try {
    const result = await pool.query(
      'UPDATE equipment SET name = $1, description = $2, quantity = $3, daily_rate = $4 WHERE equipment_id = $5 RETURNING *',
      [name, description, quantity, daily_rate, equipment_id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Equipment not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin: delete equipment
exports.deleteEquipment = async (req, res) => {
  const equipment_id = req.params.id;
  try {
    const result = await pool.query('DELETE FROM equipment WHERE equipment_id = $1 RETURNING *', [equipment_id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Equipment not found' });
    res.json({ message: 'Equipment deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 