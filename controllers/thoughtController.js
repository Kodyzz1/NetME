import thought from "../models/thought.js";
import user from "../models/user.js";

// Get all thoughts
export const getAllThoughts = async (req, res) => {
  try {
    const thoughts = await thought.find().populate("reactions").populate("userId");
    res.json(thoughts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get thought by id
export const getThoughtById = async (req, res) => {
  try {
    const thoughtById = await thought.findById(req.params.id).populate("reactions").populate("userId");
    if (!thoughtById) {
      return res.status(404).json({ message: "No thought with this id!" });
    }
    res.json(thoughtById);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
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
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ error: messages });
    } else {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
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
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a thought
export const deleteThought = async (req, res) => {
  try {
    const deletedThought = await thought.findByIdAndDelete(req.params.id);
    if (!deletedThought) {
      return res.status(404).json({ message: "No thought with this id!" });
    }

    // Remove the thought from the user's thoughts array
    await user.findByIdAndUpdate(
      deletedThought.userId, 
      { $pull: { thoughts: req.params.id } }
    );

    res.json({ message: "Thought deleted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};