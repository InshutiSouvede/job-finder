const express = require('express')
const { getAllUsers, getOneUser, deletUser } = require('../controllers/userController')
const router = express.Router()
router.get("/", getAllUsers)
router.get("/:id", getOneUser)
router.delete("/:id", deletUser)

module.exports = router