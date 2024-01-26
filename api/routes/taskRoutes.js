const router = require('express').Router();
const {
    createTask,
    getTasks,
    getTaskById,
    editTask,
    deleteTask,
    assignTaskToUser,
    getTasksByUser,
    getTasksByStatus
} = require('../controllers/taskController')
const taskValidation = require('../middlewares/taskValidation.js')
const customValidation = require('../middlewares/customValidation.js')
const assignTaskValidation = require('../middlewares/assignTaskValidation.js')



router.post('/', taskValidation, customValidation, createTask)
router.get('/', getTasks)
router.get('/:id', getTaskById)
router.put('/:id', taskValidation, customValidation, editTask)
router.delete('/:id', deleteTask)

router.put('/', assignTaskValidation, customValidation, assignTaskToUser)
router.get('/user/:id', getTasksByUser)
router.get('/status/:id', getTasksByStatus)

module.exports = router