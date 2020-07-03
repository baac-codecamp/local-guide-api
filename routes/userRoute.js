const express = require('express')
const router = express.Router()
const userController   = require('../controllers/userController')


//GET localhost:3000/api/user/
router.get('/', userController.index)

//GET localhost:3000/api/user/xxxxxxxxxxx
router.get('/:id', userController.getUserById)

//POST
router.post('/', userController.createUserAPI)

//PUT localhost:3000/api/user/xxxxxxxxxxxx {BODY}
router.put('/:id', userController.updateUser)

//PATCH localhost:3000/api/post/xxxxxxxxxxxx {BODY}
router.patch('/:id', userController.updateUserSome)

// DELETED localhost:3000/api/user/xxxxxxxxxxxx
router.delete('/:id', userController.deleteUser)

router.get('/review/:id', userController.getReview)

module.exports = router