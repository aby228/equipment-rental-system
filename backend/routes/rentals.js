const express = require('express');
const router = express.Router();
const rentalsController = require('../controllers/rentalsController');
const { adminOnly } = require('../middleware/adminOnly');

router.get('/', adminOnly, rentalsController.getAllRentals); // admin only
router.get('/my', rentalsController.getMyRentals); // user: own rentals
router.patch('/:id/close', adminOnly, rentalsController.closeRental); // admin: close rental

module.exports = router; 