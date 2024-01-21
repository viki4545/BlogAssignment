const { Router } = require("express");
const { createPostController, updatePostController, deletePostController } = require("../controller/postController");

const postRouter = Router();

postRouter.post('/createBlog', createPostController);
postRouter.post('/updateBlog', updatePostController);
postRouter.post('/deleteBlog', deletePostController);


module.exports = {postRouter}