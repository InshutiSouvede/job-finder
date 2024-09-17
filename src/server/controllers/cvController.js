const express = require("express");
const path = require("path");
const fs = require("fs");
const User = require("../models/users");
const {
  validDocumentExtensions
} = require("../middlewares/fileUpload");

const router = express.Router();

const getUserCv =  async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  const cv = user.cv;
  const filepath = path.join(__dirname, "../public/uploads/documents", cv);
  console.log(cv, filepath);
  // res.download(filepath)
  res.json({ filename: cv });
}
const updatedUserCv = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) throw new Error("No such user" + id);
    if (
      !validDocumentExtensions.includes(
        path.extname(req.file.originalname).toLowerCase()
      )
    ) {
      return res
        .status(400)
        .json({
          message:
            "CV type can only be on of these: " +
            validDocumentExtensions.join(", "),
        });
    }
    const oldCv = user.cv;
    console.log("old cv", user.cv, req.file);

    const filepath = path.join(__dirname, "../public/uploads/documents", oldCv);
    fs.unlink(filepath, () => {
      console.log("File deleted");
    });
    const cv = req.file.filename;
    const updatedUser = await User.updateOne({ _id: id }, { cv: cv });
    res.json({ user: updatedUser }).status(201);
  } catch (error) {
    res.json({ error: true, message: error.message }).status(500);
  }
}
const deleteUserCv =  async (req, res) => {
  try {
    const id = req.params.id
    const user = await User.findById(id)
    const cv = user.cv
    const filepath = path.join(__dirname, "../public/uploads/documents", cv)
    fs.unlink(filepath, () => {
      console.log("File deleted")
    })
    const updatedUser = await User.updateOne({ _id: id }, { cv: '' })
    res.json({ user: updatedUser }).status(204)
  } catch (error) {
    res.json({ error: true, message: error.message }).status(500)
  }
}

module.exports = {
  getUserCv,
  updatedUserCv,
  deleteUserCv
}
