const User = require("../models/users");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      res.json({ users })
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
    const user = new User(req.body);
    const savedUser = await user.save();
    res.json({ user: savedUser }).statues(201);
  } catch (error) {
    res.json({ error: true, message: error.message }).status(500);
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id)
    if (!user) throw new Error("No such user")
    
    const updatedUser = await User.updateOne({ _id: id }, {...req.body});
    res.json({ user: updatedUser });
  } catch (error) {
    res.json({ error: true, message: error.message }).status(500)
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
  updateUser,
  addUser,
  deletUser,
};
