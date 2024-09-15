const path = require("path")
const { validImageExtensions, validDocumentExtensions } = require("../middlewares/fileUpload");
const User = require("../models/users");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({ users });
  } catch (error) {
    res.json({ error: true, message: error.message });
  }
};
const getOneUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) throw new Error("No such user");
    res.json({ user });
  } catch (error) {
    res.json({ error: true, message: error.message }).status(500);
  }
};

const addUser = async (req, res) => {
  try {
    if (!req.files || !req.files.cv || !req.files.profile_picture) {
      return res
        .status(400)
        .json({ message: "Both an profile image and a cv must be uploaded" });
    }
    if(!validImageExtensions.includes(path.extname(req.files.profile_picture[0].originalname).toLocaleLowerCase())){
      return res
        .status(400)
        .json({ message: "Image type can only be on of these: " + validImageExtensions.join(", ") });
    }
    if(!validDocumentExtensions.includes(path.extname(req.files.cv[0].originalname).toLowerCase())){
      return res
        .status(400)
        .json({ message: "CV type can only be on of these: " + validDocumentExtensions.join(", ") });
    }
    const user = new User(req.body);

    const savedUser = await user.save();
    res.json({ user: "savedUser" }).status(201);
  } catch (error) {
    res.json({ error: true, message: error.message }).status(500);
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) throw new Error("No such user");

    const updatedUser = await User.updateOne({ _id: id }, { ...req.body });
    res.json({ user: updatedUser });
  } catch (error) {
    res.json({ error: true, message: error.message }).status(500);
  }
};
const deletUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) throw new Error(`User with id ${id} is not found`);

    const data = await User.findOneAndDelete(id);
    res.json({ data });
  } catch (error) {
    res.json({ error: true, message: error.message }).status(500);
  }
};
module.exports = {
  getAllUsers,
  getOneUser,
  uploadFile,
  updateUser,
  addUser,
  deletUser,
};
