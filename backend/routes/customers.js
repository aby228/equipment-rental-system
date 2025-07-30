const express = require('express');
const router = express.Router();
const customersController = require('../controllers/customersController');
const { adminOnly } = require('../middleware/adminOnly');

router.get('/', customersController.getAllCustomers);
router.patch('/:id', adminOnly, customersController.updateCustomer); // admin only
router.delete('/:id', adminOnly, customersController.deleteCustomer); // admin only

module.exports = router; 