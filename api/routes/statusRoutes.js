const router = require('express').Router();
const {
    createStatus,
    editTaskStatus,
    getStatuses
} = require('../controllers/statusController.js')
const customValidation = require('../middlewares/customValidation.js')
const {editTaskStatusValidation,createStatusValidation} = require('../middlewares/statusValidaton.js')

router.post(
    '/',
    createStatusValidation,
    customValidation,
    createStatus
)
router.put(
    '/task/:id',
    editTaskStatusValidation,
    customValidation,
    editTaskStatus
)
router.get('/', getStatuses)


module.exports = router