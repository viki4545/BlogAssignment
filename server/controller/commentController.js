// controllers/commentController.js
const { validationResult } = require('express-validator');
const commentService = require('../service/commentService.js');
const { fetchUserDetailsVToken } = require('../middleware/authMiddleware.js');

const addCommentController = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { text } = req.body;
    const token = req.headers.authorization;
    const userDetails =  fetchUserDetailsVToken(token);
    const UserId = userDetails.id;
    const blogPostId = req.params.postId;

    const comment = await commentService.addCommentService(text, UserId, blogPostId);
    if(comment){
        res.status(201).json(comment);
    } else {
        res.status(400).json({message: "Comment added failed"})
    }
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateCommentController = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const commentId = req.params.id;
    const { text } = req.body;
    const token = req.headers.authorization;
    const userDetails =  fetchUserDetailsVToken(token);
    const UserId = userDetails.id;    

    const comment = await commentService.updateCommentService(commentId, text, UserId);
    if(comment){
        res.status(201).json(comment);
    } else {
        res.status(400).json({message: "Comment updation failed"});
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteCommentController = async (req, res) => {
  try {
    const commentId = req.params.id;
    const token = req.headers.authorization;
    const userDetails =  fetchUserDetailsVToken(token);
    const UserId = userDetails.id;

    await commentService.deleteCommentService(commentId, UserId);
    res.status(201).json({message: "comment deleted successfully"});

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getCommentsForPostController = async (req, res) => {
  try {
    const blogPostId = req.params.postId;
    const comments = await commentService.getCommentsForPostService(blogPostId);

    if(comments){
        res.status(201).json(comments);
    } else {
        res.status(404).json("Comment not found");
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { addCommentController, updateCommentController, deleteCommentController, getCommentsForPostController };
