const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models');
const { validationResult } = require('express-validator');


const generateToken = (user) => {
  const token = jwt.sign({ id: user.id, username: user.username }, 'your-secret-key', {
    expiresIn: '24h',
  });
  return token;
};
const userRegisterController = async(req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        const { username,email, password } = req.body;

        // Check if the username is already taken
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
          return res.status(400).json({ message: 'User is already registered' });
        }

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

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

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
        res.json({ message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal server error"});
    }
}

module.exports = {
    userRegisterController,
    userLoginController
}