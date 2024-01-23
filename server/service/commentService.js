const { Comment, Post } = require('../models');

const addCommentService = async (text, UserId, PostId) => {
  const blogPost = await Post.findByPk(PostId);
  if (!blogPost) {
    throw new Error('Blog post not found');
  }
  const comment = await Comment.create({ text, UserId, PostId });
  return comment;
};

const updateCommentService = async (commentId, text, UserId) => {
  const comment = await Comment.findByPk(commentId);
  if (!comment) {
    throw new Error('Comment not found');
  }

  if (comment.UserId !== UserId) {
    throw new Error('You are not authorized to update this comment');
  }

  await comment.update({ text });
  return comment;

};

const deleteCommentService = async (commentId, UserId) => {
  const comment = await Comment.findByPk(commentId);
  if (!comment) {
    throw new Error('Comment not found');
  }
  if (comment.UserId !== UserId) {
    throw new Error('You are not authorized to delete this comment');
  }
  await comment.destroy();
};

const getCommentsForPostService = async (PostId) => {
  const comments = await Comment.findAll({ where: { PostId } });
  return comments;
};

module.exports = { addCommentService, updateCommentService, deleteCommentService, getCommentsForPostService };
