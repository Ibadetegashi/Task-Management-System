const { body } = require('express-validator');

const createUserValidation = [
    // name
    body('name')
        .trim().notEmpty().withMessage('Name is required.')
        .isLength({ min: 2, max: 20 }).withMessage('Name must be between 2 and 20 characters.'),

    // email
    body('email')
        .trim().notEmpty().withMessage('Email is required.')
        .isEmail().withMessage('Invalid email format.'),
];
const editUserValidation = [
    // name
    body('name')
        .optional({ nullable: false }) 
        .trim()
        .notEmpty().withMessage('Name is required.')
        .isLength({ min: 2, max: 20 }).withMessage('Name must be between 2 and 20 characters.'),

    // email
    body('email')
        .optional({ nullable: false })
        .trim()
        .notEmpty().withMessage('Email is required.')
        .isEmail().withMessage('Invalid email format.'),
];

module.exports = {createUserValidation,editUserValidation};
