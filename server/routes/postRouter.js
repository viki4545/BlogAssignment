const { Router } = require("express");
const { createPostController, updatePostController, deletePostController, getAllPostsController, getPostByIdController } = require("../controller/postController");
const { verifyToken } = require("../middleware/authMiddleware");
const { checkPostOwnership } = require("../middleware/postMiddleware");

const postRouter = Router();

postRouter.get('/getAllBlog', getAllPostsController);
postRouter.get('/getBlogById/:id', getPostByIdController);
postRouter.post('/createBlog', verifyToken, createPostController);
postRouter.post('/updateBlog/:id', verifyToken, checkPostOwnership, updatePostController);
postRouter.post('/deleteBlog/:id', verifyToken, checkPostOwnership, deletePostController);


module.exports = {postRouter}