const express = require("express");
const userRoutes = express.Router();
const userController = require('../controllers/userController');

// Route to create a new user
userRoutes.post('/createUser', userController.createUser);

// Route to login a user
userRoutes.post('/loginUser', userController.loginUser);

// Route to get all users
userRoutes.get('/getUsers', userController.getAllUsers);
// // middleware to handle CORS
// const auth = require('./middlewares/authMiddleware');
// router.get('/getusers', auth, getAllUsers);


// Route to get a user by ID
userRoutes.get('/getUser/:id', userController.getUserById);

// Route to update a user by ID
userRoutes.put('/updateUser/:id', userController.updateUser);

// Route to update a user by ID
userRoutes.patch('/updateUser/:id', userController.updateUser);

// Route to delete a user by ID
userRoutes.delete('/deleteUser/:id', userController.deleteUser);

// Export the user routes
module.exports = userRoutes;

