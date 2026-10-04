
const express = require('express');

const router = express.Router();

const customerController = require('../controllers/customerController');

const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');


// Create customer profile
router.post(
    '/profile',
    authMiddleware,
    roleMiddleware('customer'),
    customerController.createCustomer
);


// Get my customer profile
router.get(
    '/profile',
    authMiddleware,
    roleMiddleware('customer'),
    customerController.getMyProfile
);


// Get all customers
router.get(
    '/',
    authMiddleware,
    roleMiddleware('doctor'),
    customerController.getAllCustomers
);


module.exports = router;

