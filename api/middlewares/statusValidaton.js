const {body} = require('express-validator')

const editTaskStatusValidation = [
    body('statusId')
        .notEmpty().withMessage('Status id is a required field.')
        .isNumeric().withMessage('Status id must be an number.'),
]

const createStatusValidation = [
    body('statusName').trim()
        .notEmpty().withMessage('Status name is a required field.')
        .isLength({ min: 4, max: 15 }).withMessage('Status must be between 4 and 15 characters.'),
]

module.exports = { editTaskStatusValidation,createStatusValidation }