require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const bcrypt = require('bcrypt');
const jwtMiddleware = require('./jwt').jwtMiddleware;
const UserModel = require('./Models/user');
const { generateToken } = require('./jwt');
const { userSchema, postSchema } = require('./schema');
const postModel = require('./Models/post');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await UserModel.findOne({ username: username });

        if(!user) {
          return res.status(401).json({ message: "User not found"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        
        if(!isMatch) {
          return res.status(401).json({ message : "Passowrd is incorrect"});
        }
        const payload =  {
          username : user.username,
          id: user._id,
        }
        const token = generateToken(payload);
        console.log("Token is:", token);
        res.status(200).json({ response: user, token});
    } catch (error) {
      return res.status(500).json({ message: "Server error", error: error.message });
    }
 });

 app.post('/register', async (req, res) => {
    const {error, value} = userSchema.validate(req.body);
    if(error) {
      return res.json({ message: "Invalid Request", details: error.details});
    }
    try {
      const hashedPassword = await bcrypt.hash(value.password, 10);
      value.password = hashedPassword;

      const user= await UserModel.create(value);
      const payload = {
        username: user.username,
        id: user,
      }
      // console.log(payload);
      const token = generateToken(payload);
      // console.log("Token is:", token);
      res.status(201).json({ response: user, token });
    }
    catch(err) {
      res.json({ message: "Server error", error: err.message });
    }
 });

 // Post
 app.post('/post', jwtMiddleware, async (req, res) => {
    // Validate request body
    const { error, value } = postSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: "Invalid Request", details: error.details });
    }

    try {
      const { content } = value;
      const newPost = await postModel.create({
        content,
        author: req.user.id, // Use req.user.id instead of req.user._id
      })
      res.status(201).json(newPost);
    }
    catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
 });

// Get all posts
app.get('/posts', async(req, res) => {
  try{
    const posts = await postModel.find()
    .populate('author', 'username') 
    .sort({ createdAt: -1 }); 

    res.status(200).json(posts);
  }
  catch(err) {
    res.status(500).json({ message: 'Server error', error: err.message});
  }
})
 app.listen(3000, () => {
  console.log("Server is running on 3000");
 })