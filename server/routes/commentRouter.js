const { Router } = require("express");
const { updateCommentController, deleteCommentController, addCommentController, getCommentsForPostController } = require("../controller/commentController.js");
const { verifyToken } = require("../middleware/authMiddleware.js");

const commentRouter = Router();

commentRouter.post('/addComment/:postId', verifyToken, addCommentController);
commentRouter.post('/updateComment/:id', verifyToken, updateCommentController);
commentRouter.post('/deleteComment/:id', verifyToken, deleteCommentController);
commentRouter.get('/getCommentForPost/:postId', getCommentsForPostController);


module.exports = {commentRouter}