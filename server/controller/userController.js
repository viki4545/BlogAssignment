const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models');

const generateToken = (user) => {
  const token = jwt.sign({ id: user.id, username: user.username }, 'your-secret-key', {
    expiresIn: '24h',
  });
  return token;
};
const userRegisterController = async(req, res) => {
    try {
        const {username, email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = await User.create({
            username,email,password:hashedPassword
        })
        const token = generateToken(newUser);
        res.status(201).json({token})
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal Server Error"})
    }
}

const userLoginController = async(req, res) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}});
        if(!user){
            return res.status(401).json({message: 'Invalid email or password'});
        }

        const isPasswordValid = await bcrypt.compare(password,user.password)

        if(!isPasswordValid){
            return res.status(401).json({message: 'Invalid email or password'});
        }

        const token = generateToken(user);
        res.json({token});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal server error"});
    }
}

module.exports = {
    userRegisterController,
    userLoginController
}