
const appointmentModel = require('../models/appointmentModel');
const customerModel = require('../models/customerModel');
const doctorModel = require('../models/doctorModel');


// Create appointment
const createAppointment = async (req, res) => {
    try {
        const {
            doctorId,
            appointmentDate,
            appointmentTime,
            reason
        } = req.body;

        // Check required fields
        if (
            !doctorId ||
            !appointmentDate ||
            !appointmentTime ||
            !reason
        ) {
            return res.status(400).json({
                message: 'All fields are required'
            });
        }

        // Find customer profile
        const customers =
            await customerModel.findCustomerByUserId(req.user.id);

        if (customers.length === 0) {
            return res.status(404).json({
                message: 'Customer profile not found'
            });
        }

        // Check doctor exists
        const doctors =
            await doctorModel.findDoctorById(doctorId);

        if (doctors.length === 0) {
            return res.status(404).json({
                message: 'Doctor not found'
            });
        }

        // Create appointment
        const result = await appointmentModel.createAppointment(
            customers[0].id,
            doctorId,
            appointmentDate,
            appointmentTime,
            reason
        );

        res.status(201).json({
            message: 'Appointment created successfully',
            appointmentId: result.insertId
        });

    } catch (error) {
        console.error('Create appointment error:', error);

        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};


// Get my appointments as customer
const getMyCustomerAppointments = async (req, res) => {
    try {
        const customers =
            await customerModel.findCustomerByUserId(req.user.id);

        if (customers.length === 0) {
            return res.status(404).json({
                message: 'Customer profile not found'
            });
        }

        const appointments =
            await appointmentModel.getCustomerAppointments(
                customers[0].id
            );

        res.status(200).json({
            appointments
        });

    } catch (error) {
        console.error(
            'Get customer appointments error:',
            error
        );

        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};


// Get my appointments as doctor
const getMyDoctorAppointments = async (req, res) => {
    try {
        const doctors =
            await doctorModel.findDoctorByUserId(req.user.id);

        if (doctors.length === 0) {
            return res.status(404).json({
                message: 'Doctor profile not found'
            });
        }

        const appointments =
            await appointmentModel.getDoctorAppointments(
                doctors[0].id
            );

        res.status(200).json({
            appointments
        });

    } catch (error) {
        console.error(
            'Get doctor appointments error:',
            error
        );

        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};


// Update appointment status
const updateAppointmentStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        // Allowed statuses
        const allowedStatuses = [
            'pending',
            'confirmed',
            'rejected',
            'cancelled',
            'completed'
        ];

        if (!status || !allowedStatuses.includes(status)) {
            return res.status(400).json({
                message: 'Invalid appointment status'
            });
        }

        // Find doctor profile
        const doctors =
            await doctorModel.findDoctorByUserId(req.user.id);

        if (doctors.length === 0) {
            return res.status(404).json({
                message: 'Doctor profile not found'
            });
        }

        // Find appointment
        const appointments =
            await appointmentModel.findAppointmentById(id);

        if (appointments.length === 0) {
            return res.status(404).json({
                message: 'Appointment not found'
            });
        }

        // Make sure appointment belongs to this doctor
        if (
            appointments[0].doctor_id !== doctors[0].id
        ) {
            return res.status(403).json({
                message: 'Access denied'
            });
        }

        // Update status
        await appointmentModel.updateAppointmentStatus(
            id,
            status
        );

        res.status(200).json({
            message: 'Appointment status updated successfully'
        });

    } catch (error) {
        console.error(
            'Update appointment status error:',
            error
        );

        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};


module.exports = {
    createAppointment,
    getMyCustomerAppointments,
    getMyDoctorAppointments,
    updateAppointmentStatus
};

