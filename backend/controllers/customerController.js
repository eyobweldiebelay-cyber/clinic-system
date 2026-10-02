
const customerModel = require('../models/customerModel');


// Create customer profile
const createCustomer = async (req, res) => {
    try {
        const { phone, address, dateOfBirth, gender } = req.body;

        // Check required fields
        if (!phone || !address || !dateOfBirth || !gender) {
            return res.status(400).json({
                message: 'All fields are required'
            });
        }

        // Check if customer profile already exists
        const existingCustomer =
            await customerModel.findCustomerByUserId(req.user.id);

        if (existingCustomer.length > 0) {
            return res.status(409).json({
                message: 'Customer profile already exists'
            });
        }

        // Create customer
        const result = await customerModel.createCustomer(
            req.user.id,
            phone,
            address,
            dateOfBirth,
            gender
        );

        res.status(201).json({
            message: 'Customer profile created successfully',
            customerId: result.insertId
        });

    } catch (error) {
        console.error('Create customer error:', error);

        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};


// Get current customer profile
const getMyProfile = async (req, res) => {
    try {
        const customers =
            await customerModel.findCustomerByUserId(req.user.id);

        if (customers.length === 0) {
            return res.status(404).json({
                message: 'Customer profile not found'
            });
        }

        res.status(200).json({
            customer: customers[0]
        });

    } catch (error) {
        console.error('Get customer profile error:', error);

        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};


// Get all customers
const getAllCustomers = async (req, res) => {
    try {
        const customers = await customerModel.getAllCustomers();

        res.status(200).json({
            customers
        });

    } catch (error) {
        console.error('Get all customers error:', error);

        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};


module.exports = {
    createCustomer,
    getMyProfile,
    getAllCustomers
};

