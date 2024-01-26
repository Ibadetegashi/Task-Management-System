const { body } = require('express-validator');

const assignTaskValidation = [
    // userId
    body('userId')
        .notEmpty().withMessage('User id is a required field.')
        .isInt().withMessage('User id must be an integer.'),

    // taskId
    body('taskId')
        .notEmpty().withMessage('Task id is a required field.')
        .isInt().withMessage('Task id must be an integer.'),
];

module.exports = assignTaskValidation;
