const express = require('express')
const { getAllUsers, getOneUser, deletUser, addUser, updateUser, uploadFile, middleware } = require('../controllers/userController')
const { upload } = require('../middlewares/fileUpload')
const router = express.Router()
router.get("/", getAllUsers)
router.get("/:id", getOneUser)

router.post("/",upload.fields([
    { name: 'profile_picture', maxCount: 1 },
    { name: 'cv', maxCount: 1 }
  ]), addUser)

router.put("/:id", updateUser)
router.delete("/:id", deletUser)

module.exports = router