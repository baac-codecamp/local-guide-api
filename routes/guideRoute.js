const express = require('express')
const router = express.Router()
const guideController   = require('../controllers/guideController')


//GET localhost:3000/api/user/
router.get('/', guideController.index)

//GET localhost:3000/api/user/xxxxxxxxxxx
router.get('/:id', guideController.getGuideById)

//POST
router.post('/', guideController.createGuideAPI)

//PUT localhost:3000/api/user/xxxxxxxxxxxx {BODY}
router.put('/:id', guideController.updateGuideAPI)

//PATCH localhost:3000/api/post/xxxxxxxxxxxx {BODY}
router.patch('/:id', guideController.updateGuideSomeAPI)

// DELETED localhost:3000/api/user/xxxxxxxxxxxx
router.delete('/:id', guideController.deleteGuideAPI)

router.get('/review/:id', guideController.getGuideReview)

module.exports = router