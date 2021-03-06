const express = require('express')
const { body } = require('express-validator');
const userController = require('../controllers/userController')
const authentication = require('../middleware/authenticationHandler');
const authorization = require('../middleware/authorizationHandler');

const router = express.Router()

router.post('/signup', [
    //validation : express validator
    body('firstname').not().isEmpty().withMessage('Field firstname is required'),
    body('lastname').not().isEmpty().withMessage('Field lastname is required'),
    body('email').not().isEmpty().withMessage('Field email is required').isEmail().withMessage('Wrong email format'),
    body('password').not().isEmpty().withMessage('Field password is required').isLength({ min: 6 }).withMessage('Password must be  at least 6 digits')
], userController.signup);
router.post('/signin',
    body('email').not().isEmpty().withMessage('Field email is required').isEmail().withMessage('Wrong email format'),
    body('password').not().isEmpty().withMessage('Field password is required')
    , userController.signin);
router.get('/me', authentication.isLoggedIn, userController.getProfile);

router.get('/', userController.index);
router.get('/:id', userController.getUserById);
router.put('/:id', authentication.isLoggedIn, userController.updateUser);
router.delete('/:id', [authentication.isLoggedIn, authorization.isAdmin], userController.deleteUser);
module.exports = router

