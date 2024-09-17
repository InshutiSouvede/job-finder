const express = require('express')
const { getUserCv, updatedUserCv, deleteUserCv } = require('../controllers/cvController')
const { upload } = require('../middlewares/fileUpload')
const router  =  express.Router()

router.get('/:id',getUserCv)
router.put('/:id',upload.single('cv'),updatedUserCv)
router.delete('/:id',deleteUserCv)

module.exports = router