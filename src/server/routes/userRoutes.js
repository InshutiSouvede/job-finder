const express = require('express')
const { getAllUsers, getOneUser, deletUser, addUser, updateUser } = require('../controllers/userController')
const router = express.Router()
router.get("/", getAllUsers)
router.get("/:id", getOneUser)
router.post("/", addUser)
router.put("/:id", updateUser)
router.delete("/:id", deletUser)

module.exports = router