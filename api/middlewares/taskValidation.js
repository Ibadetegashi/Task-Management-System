const { body } = require('express-validator')
const taskValidation = [
    // title
    body('title')
        .trim()
        .notEmpty().withMessage('Title is a required field.')
        .isLength({ min: 4 }).withMessage('Title must be at least 4 chars long.')
        .isLength({ max: 30 }).withMessage('Title must be less than 15 chars long.'),
    // description
    body('description')
        .optional({ nullable: false, checkFalsy: false })
        .isLength({ min: 5, max: 200 })
        .withMessage('Description must be between 5 and 200 characters.'),
];




module.exports = taskValidation;  