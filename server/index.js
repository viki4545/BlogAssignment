const express = require('express');
const bodyParser = require('body-parser');


const app = express();


const db = require("./models");
const { userRouter } = require('./routes/userRouter.js');
const { postRouter } = require('./routes/postRouter.js');
const { commentRouter } = require('./routes/commentRouter.js');
const { errorHandler } = require('./middleware/errorMiddleware.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req,res) => {
    res.send('Hello World');
})

app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/comment', commentRouter);


app.use(errorHandler);


db.sequelize.sync().then((req) => {
    app.listen(3000, () => {
        console.log("server will be running on port 3000");
    })
})