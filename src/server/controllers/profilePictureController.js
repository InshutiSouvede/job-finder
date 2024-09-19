const express = require("express");
const path = require("path");
const fs = require("fs");
const User = require("../models/users");
const {
  validImageExtensions
} = require("../middlewares/fileUpload");

const router = express.Router();

const getUserPicture =  async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  const profilePicture = user.profilePicture;
  const filepath = path.join(__dirname, "../public/uploads/images", profilePicture);
  console.log(profilePicture, filepath);
  // res.download(filepath)
  res.json({ filename: profilePicture });
}
const updatedUserPicture = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) throw new Error("No such user" + id);
    if (
      !validImageExtensions.includes(
        path.extname(req.file.originalname).toLowerCase()
      )
    ) {
      return res
        .status(400)
        .json({
          message:
            "ProfilePicture type can only be on of these: " +
            validImageExtensions.join(", "),
        });
    }
    const oldProfilePicture = user.profilePicture;
    console.log("old profile picture", user.profilePicture, req.file);

    const filepath = path.join(__dirname, "../public/uploads/images", oldProfilePicture);
    fs.unlink(filepath, () => {
      console.log("File deleted");
    });
    const profilePicture = req.file.filename;
    const updatedUser = await User.updateOne({ _id: id }, { profilePicture: '/public/uploads/images/'+profilePicture });
    res.json({ user: updatedUser }).status(201);
  } catch (error) {
    res.json({ error: true, message: error.message }).status(500);
  }
}
const deleteUserPicture =  async (req, res) => {
  try {
    const id = req.params.id
    const user = await User.findById(id)
    const profilePicture = user.profilePicture
    const filepath = path.join(__dirname, "../public/uploads/images", profilePicture)

      fs.unlink(filepath, () => {
        console.log("File deleted");
      });
    const updatedUser = await User.updateOne({ _id: id }, { profilePicture: '' })
    res.json({ user: updatedUser }).status(204)
  } catch (error) {
    res.json({ error: true, message: error.message }).status(500)
  }
}

module.exports = {
  getUserPicture,
  updatedUserPicture,
  deleteUserPicture
}
