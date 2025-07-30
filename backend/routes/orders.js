const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');
const { adminOnly } = require('../middleware/adminOnly');

router.post('/', ordersController.createOrder);
router.get('/', adminOnly, ordersController.getAllOrders); // admin only
router.get('/my', ordersController.getMyOrders); // user: own orders
router.get('/:id', ordersController.getOrderDetails); // admin or owner
router.patch('/:id', adminOnly, ordersController.updateOrder); // admin only
router.delete('/:id', adminOnly, ordersController.deleteOrder); // admin only

module.exports = router; 