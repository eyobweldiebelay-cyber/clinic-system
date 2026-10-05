
const express = require('express');

const router = express.Router();

const appointmentController = require('../controllers/appointmentController');

const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');


// Customer creates appointment
router.post(
    '/',
    authMiddleware,
    roleMiddleware('customer'),
    appointmentController.createAppointment
);


// Customer gets their appointments
router.get(
    '/customer',
    authMiddleware,
    roleMiddleware('customer'),
    appointmentController.getMyCustomerAppointments
);


// Doctor gets their appointments
router.get(
    '/doctor',
    authMiddleware,
    roleMiddleware('doctor'),
    appointmentController.getMyDoctorAppointments
);


// Doctor updates appointment status
router.patch(
    '/:id/status',
    authMiddleware,
    roleMiddleware('doctor'),
    appointmentController.updateAppointmentStatus
);


module.exports = router;
