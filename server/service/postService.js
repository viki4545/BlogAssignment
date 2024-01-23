const { Post } = require('../models');

const getAllPosts = async () => {
    const posts = await Post.findAll();
    return posts;
};

const getPostById = async (postId) => {
    const post = await Post.findByPk(postId);
    return post;
};

const createPost = async (postData) => {
    const post = await Post.create(postData);
    return post;
};

const updatePost = async (postId, postData) => {
  try {
    const post = await Post.findByPk(postId);
    if (!post) {
      throw { status: 404, message: 'Post not found' };
    }

    await post.update(postData);
    return post;
  } catch (error) {
    throw error;
  }
};

const deletePost = async (postId) => {
  try {
    const post = await Post.findByPk(postId);
    if (!post) {
      throw { status: 404, message: 'Post not found' };
    }

    await post.destroy();
    return post;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
