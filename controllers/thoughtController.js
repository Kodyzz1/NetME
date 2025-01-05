import thought from "../models/thought.js";
import user from "../models/user.js";

// Get all thoughts
export const getAllThoughts = async (req, res) => {
  try {
    const thoughts = await thought.find().populate("reactions");
    res.json(thoughts);
  } catch (error) {
    res.status(400).json(error);
  }
};

// Get thought by id
export const getThoughtById = async (req, res) => {
  try {
    const thoughtById = await thought.findById(req.params.id);
    if (!thoughtById) {
      return res.status(404).json({ message: "No thought with this id!" });
    }
    res.json(thoughtById);
  } catch (error) {
    res.status(400).json(error);
  }
};

// Create a thought
export const createThought = async (req, res) => {
  try {
    const newThought = await thought.create(req.body);
    // push craeted thought to user's thoughts array
    await user.findByIdAndUpdate(
        req.body.userId,
        { $push: { thoughts: newThought._id } },
        { new: true }
        );
    res.json(newThought);
  } catch (error) {
    res.status(400).json(error);
  }
};

// Update a thought
export const updateThought = async (req, res) => {
  try {
    const updatedThought = await thought.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedThought) {
      return res.status(404).json({ message: "No thought with this id!" });
    }
    res.json(updatedThought);
  } catch (error) {
    res.status(400).json(error);
  }
};

// Delete a thought
export const deleteThought = async (req, res) => {
  try {
    const deletedThought = await thought.findByIdAndDelete(req.params.id);
    if (!deletedThought) {
      return res.status(404).json({ message: "No thought with this id!" });
    }
    res.json({ message: "Thought deleted successfully!" });
  } catch (error) {
    res.status(400).json(error);
  }
};