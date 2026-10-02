
const express = require('express');

const router = express.Router();

const doctorController = require('../controllers/doctorController');

const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');


// Create doctor profile
router.post(
    '/profile',
    authMiddleware,
    roleMiddleware('doctor'),
    doctorController.createDoctor
);


// Get my doctor profile
router.get(
    '/profile',
    authMiddleware,
    roleMiddleware('doctor'),
    doctorController.getMyProfile
);


// Get all doctors
router.get(
    '/',
    doctorController.getAllDoctors
);


// Get doctor by ID
router.get(
    '/:id',
    doctorController.getDoctorById
);


module.exports = router;

