//Add all Dependencies required For Server

const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./db');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const crypto = require('crypto');
const User = require('./Models/User-model'); // Import the User model
require('dotenv').config();

// Connect to MongoDB
connectDB();


const app = express();
app.use(bodyParser.json());

//To Deal With Cross-origin
app.use(cors({
   
  }));

// Middleware
app.use(express.json());

// const secretKey = crypto.randomBytes(32).toString('base64');

// Route for Signup
app.post('/', async (req, res) => {
    console.log('signup running')
    const { firstname, lastname , email, password } = req.body;
           console.log(req.body);
    try {
      // Check if user already exists
      let user = await User.findOne({ email });
  
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }
  
      // Create a new user
      user = new User({
        firstname,
        lastname ,
        email,
        password,
      });


//     Route for Signin
      app.post('/signin',async (req, res) => {
        const { email, password } = req.body;
               console.log(req.body);
        try {
          // Find user by email
          const user = await User.findOne({ email });
                   console.log(user) ;
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
      
          // Compare passwords
          console.log(user.password)
          const isPasswordValid = password == user.password;

          console.log('Password provided:', password);
          console.log('Password from database:', user.password);
          
          if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
          }
      
          // Generate JWT token
         
          const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
          );
      
          res.status(200).json({ token });
        } catch (error) {
          console.error('Signin failed:', error);
          res.status(500).json({ message: 'Internal server error' });
        }
      });
  
      // Save user to MongoDB
      
      await user.save();
     

      res.status(201).json({ msg: 'User created successfully' });
    } catch (error) {
      console.error('Signup failed:', error.message);
      res.status(500).send('Server Error');
    }
  });


//Finding userId From Token which is Coming From Client
const extractUserId = (req, res, next) => {
    console.log("Request body in extractUserId:", req.body); // Log request body
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            req.userId = decodedToken.userId;
            console.log("User ID extracted:", req.userId); // Log extracted user ID
            next();
        } catch (error) {
            console.error('Error verifying JWT token:', error);
            res.status(401).json({ message: 'Unauthorized' });
        }
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};
  
  // Route to add task to user's todo list
  app.post('/add-task', extractUserId, async (req, res) => {
   
    const { userId } = req;
    console.log(userId)
    const  task  = req.body;
            console.log(req.body ,"task is going ")
    try {
      // Find the user by ID
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Add the new task to the user's todo list array
      console.log("data add before" ,task.inputvalue)
      user.todoList.push(task['inputValue']);
      console.log("data add middle")
      await user.save();
      console.log("data add after")
         const arr = user.todoList
      res.status(201).json({ arr });
    } catch (error) {
      console.error('Error adding task:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

   //// Route for Creating Task
  app.get('/todo-list', extractUserId, async (req, res) => {
    const { userId } = req;

    try {
        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Extract todoList from user data
        const todoList = user.todoList;

        // Return todoList as response
        res.status(200).json({ todoList });
    } catch (error) {
        console.error('Error fetching todo list:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


//// Route for Delete Tasks
app.delete('/todo-list/:taskId', extractUserId, async (req, res) => {
    const { userId } = req;
    const { taskId } = req.params;
    console.log(userId, taskId);

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        console.log('Original todoList:', user.todoList);

        // Convert taskId to a number
        const taskIndex = parseInt(taskId);
        if (isNaN(taskIndex) || taskIndex < 0 || taskIndex >= user.todoList.length) {
            return res.status(400).json({ message: 'Invalid taskId' });
        }

        // Remove the task at the specified index
        user.todoList.splice(taskIndex, 1);

        console.log('Updated todoList:', user.todoList);

        await user.save();

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


//Route For Editing Tasks
app.put('/todo-list-edit/:taskId', extractUserId, async (req, res) => {
    console.log(req.params)
    const { userId } = req;
    const { taskId } = req.params;
    const { updatedTask } = req.body; // Assuming the client sends the updated task in the request body
    console.log(userId, taskId);

    try {
        // Convert taskId to a number (assuming taskId is the index)
        const taskIndex = parseInt(taskId, 10);

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        console.log('Original todoList:', user.todoList);

        // Check if taskIndex is valid
        if (taskIndex < 0 || taskIndex >= user.todoList.length) {
            return res.status(400).json({ message: 'Invalid taskId' });
        }

        // Update the task at the specified index
        user.todoList[taskIndex] = updatedTask;

        console.log('Updated todoList:', user.todoList);

        await user.save();

        res.status(200).json({ message: 'Task updated successfully' });
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
