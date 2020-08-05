const express = require('express')
const router = express.Router()
const postController   = require('../controllers/postController')
const authentication = require('../middleware/authenticationHandler');
const authorization = require('../middleware/authorizationHandler');








//Plan

router.post('/:id',authentication.isLoggedIn,postController.createPlan)

router.put('/:id',authentication.isLoggedIn,postController.updatePlan)

router.delete('/:id',authentication.isLoggedIn,postController.deletePlan)

module.exports = router