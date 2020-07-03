const express = require('express')
const router = express.Router()
const apiController   = require('../controllers/apiController')


//GET localhost:3000/api/user/
router.get('/', apiController.index)

//GET localhost:3000/api/user/xxxxxxxxxxx
router.get('/:id', apiController.getUserById)

//POST
router.post('/', apiController.createUserAPI)

//PUT localhost:3000/api/user/xxxxxxxxxxxx {BODY}
router.put('/:id', apiController.updateUser)

// DELETED localhost:3000/api/user/xxxxxxxxxxxx
router.delete('/:id', apiController.deleteUser)

module.exports = router