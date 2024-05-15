// commentController.js

const Comment = require('../models/CommentModel');

// Controller function to handle comment submission
const submitComment = async (req, res) => {
  const { userName, email, comment } = req.body;

  try {
    const newComment = new Comment({ userName, email, comment });
    await newComment.save();
    res.status(201).json({ message: 'Comment submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to submit comment' });
  }
};

module.exports = { submitComment };
