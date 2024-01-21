const { Router } = require("express");
const { postCommentController, updateCommentController, deleteCommentController } = require("../controller/commentController");

const commentRouter = Router();

commentRouter.post('/postComment', postCommentController);
commentRouter.post('/updateComment', updateCommentController);
commentRouter.post('/deleteComment', deleteCommentController);

module.exports = {commentRouter}