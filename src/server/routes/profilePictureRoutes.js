const express = require('express')
const { getUserPicture, updatedUserPicture, deleteUserPicture } = require('../controllers/profilePictureController')
const { upload } = require('../middlewares/fileUpload')
const router  =  express.Router()

router.get('/:id',getUserPicture)
router.put('/:id',upload.single('profile_picture'),updatedUserPicture)
router.delete('/:id',deleteUserPicture)

module.exports = router