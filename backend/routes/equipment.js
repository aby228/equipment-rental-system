const express = require('express');
const router = express.Router();
const equipmentController = require('../controllers/equipmentController');
const { adminOnly } = require('../middleware/adminOnly');

router.get('/', equipmentController.getAllEquipment);
router.post('/', adminOnly, equipmentController.createEquipment); // admin only
router.patch('/:id', adminOnly, equipmentController.updateEquipment); // admin only
router.delete('/:id', adminOnly, equipmentController.deleteEquipment); // admin only

module.exports = router; 