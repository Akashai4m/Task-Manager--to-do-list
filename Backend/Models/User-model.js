const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
   
  },
  lastname: {
    type: String,
    required: true,
    
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  todoList: [{
    type: String 
  }]
} , { collection: 'to-do-data' });

const User = mongoose.model('User', userSchema ,'to-do-data');

module.exports = User;
