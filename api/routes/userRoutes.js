const router = require('express').Router();
const {
    createUser,
    deleteUser,
    editUser,
    getUsers
} = require('../controllers/userController.js')
const customValidation = require('../middlewares/customValidation.js')
const { createUserValidation, editUserValidation } = require('../middlewares/userValidation.js')

router.post('/', createUserValidation, customValidation, createUser);
router.put('/:id', editUserValidation, customValidation, editUser);
router.get('/', getUsers);
router.delete('/:id', deleteUser);

module.exports = router

