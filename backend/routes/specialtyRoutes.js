
const express = require('express');

const router = express.Router();

const specialtyController = require('../controllers/specialtyController');


// Get all specialties
router.get(
    '/',
    specialtyController.getAllSpecialties
);


// Get specialty by ID
router.get(
    '/:id',
    specialtyController.getSpecialtyById
);


// Create specialty
router.post(
    '/',
    specialtyController.createSpecialty
);


module.exports = router;

