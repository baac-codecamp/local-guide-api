const express = require('express')
const router = express.Router()
const planController   = require('../controllers/planController')
const authentication = require('../middleware/authenticationHandler');
const authorization = require('../middleware/authorizationHandler');


// //GET localhost:3000/api/post
// router.get('/', postController.index)
// //GET localhost:3000/api/post/xxxxxxxxxxx
// router.get('/:id', postController.getPostById)
// router.get('/tag/:id', postController.getTags)
// router.get('/comment/:id', postController.getComments)
// //POST localhost:3000/api/post  {BODY}
// router.post('/', postController.createPost)
// //PUT localhost:3000/api/post/xxxxxxxxxxxx {BODY}
// router.put('/:id', postController.updatePost)
// //PATCH localhost:3000/api/post/xxxxxxxxxxxx {BODY}
// router.patch('/:id', postController.updatePostSome)
// // DELETED localhost:3000/api/post/xxxxxxxxxxxx

// router.delete('/:id', postController.deletePost)


//comment

router.post('/:id',authentication.isLoggedIn,planController.addcomment)

router.put('/:id',authentication.isLoggedIn,planController.updatecomment)

router.delete('/:id',authentication.isLoggedIn,planController.deletecomment)




module.exports = router
