const { fetchUserDetailsVToken } = require('../middleware/authMiddleware.js');
const { validationResult } = require('express-validator');
const postService = require('../service/postService.js');

const getAllPostsController = async (req, res) => {
  try {
    const posts = await postService.getAllPosts();
    if(posts){
        res.status(201).json(posts);
    } else {
        res.status(400).json({message: "post not found"})
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getPostByIdController = async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await postService.getPostById(postId);
    if(post){
        res.status(201).json(post);
    } else {
        res.status(400).json({message: "post not found"})
    }
  } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
  }
};

const createPostController = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {title, content} = req.body;
  const token = req.headers.authorization;
  const userDetails =  fetchUserDetailsVToken(token);
  const UserId = userDetails.id;
  try {
    const post = await postService.createPost({title, content, UserId});
    if(post){
        res.status(201).json(post);
    } else {
        res.status(404).json({message: "error while creating the post"});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updatePostController = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const postId = req.params.id;
  const postData = req.body;

  try {
    const post = await postService.updatePost(postId, postData);
    res.status(201).json(post);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deletePostController = async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await postService.deletePost(postId);
    res.status(201).json(post);
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  getAllPostsController,
  getPostByIdController,
  createPostController,
  updatePostController,
  deletePostController,
};
