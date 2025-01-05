import thought from "../models/thought.js";
import user from "../models/user.js";

// get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await user.find().populate("thoughts").populate("friends");
    res.json(users);
  } catch (error) {
    res.status(400).json(error);
  }
};

// get user by id
export const getUserById = async (req, res) => {
  try {
    const userById = await user.findById(req.params.id).populate("thoughts").populate("friends");
    if (!userById) {
      return res.status(404).json({ message: "No user with this id!" });
    }
    res.json(userById);
  } catch (error) {
    res.status(400).json(error);
  }
};

// create a user
export const createUser = async (req, res) => {
  try {
    const newUser = await user.create(req.body);
    res.json(newUser);
  } catch (error) {
    res.status(400).json(error);
  }
};

// update a user
export const updateUser = async (req, res) => {
  try {
    const updatedUser = await user.findByIdAndUpdate(
      req.params.id,
      req.body,
      { 
        new: true,
        runValidators: true
      }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "No user with this id!" });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json(error);
  }
};

// delete a user
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await user.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "No user with this id!" });
    }
    // delete all thoughts related to the user
    await thought.deleteMany({ username: user.username });
    res.json(deletedUser);
  } catch (error) {
    res.status(400).json(error);
  }
};

// add a friend
export const addFriend = async (req, res) => {
  try {
    const userFriend = await user.findByIdAndUpdate(
      req.params.userId,
      { $push: { friends: req.params.friendId } },
      { new: true }
    );
    if (!userFriend) {
      return res.status(404).json({ message: "No user with this id!" });
    }
    res.json(userFriend);
  } catch (error) {
    res.status(400).json(error);
  }
};

// remove a friend
export const deleteFriend = async (req, res) => {
  try {
    const userFriend = await user.findByIdAndUpdate(
      req.params.userId,
      { $pull: { friends: req.params.friendId } },
      { new: true }
    );
    if (!userFriend) {
      return res.status(404).json({ message: "No user with this id!" });
    }
    res.json(userFriend);
  } catch (error) {
    res.status(400).json(error);
  }
};