var express = require('express')
var router = express.Router()

//const {index, getPostById, createPost, updatePost, deletePost} = require('../controllers/postController')
const {index, getPostById, createPost} = require('../controllers/postController')

router.get('/', index)
router.get('/:id', getPostById)
router.post('/', createPost)

module.exports = router