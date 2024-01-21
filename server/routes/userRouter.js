const { Router } = require("express");
const { userRegisterController, userLoginController } = require("../controller/userController");

const userRouter = Router();

userRouter.post('/register', userRegisterController);
userRouter.get('/login', userLoginController);

module.exports = {userRouter}