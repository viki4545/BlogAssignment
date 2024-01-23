const { Post } = require('../models');
const { fetchUserDetailsVToken } = require('./authMiddleware');

const checkPostOwnership = async (req, res, next) => {
  const postId = req.params.id;
  const token = req.headers.authorization;
  const userDetails =  fetchUserDetailsVToken(token);
  const UserId = userDetails.id;
  try {
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the requesting user is the owner of the post
    if (post.UserId !== UserId) {
      return res.status(403).json({ message: 'Permission denied - You are not the owner of this post' });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { checkPostOwnership };
