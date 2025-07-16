const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRETE = "RohitKadam@666";

// Create a new user
async function createUser(req, res) {
    const { first_name, last_name, role, hospitalId } = req.body;
    if (!first_name || !role) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    const year = new Date().getFullYear();
    console.log(year); // Outputs: 2025

    const email = first_name.toLowerCase() + '.' + last_name.toLowerCase() + year + '@Shwas.com';
    const password = role + '.' + first_name.toLowerCase();
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        first_name,
        last_name,
        email:email ,
        password: hashedPassword,
        role,
        hospitalId
    }); 
    try {
        await newUser.save();
        return res.status(201).json(newUser);
    } catch (err) {
        return res.status(500).json({ error: 'Failed to create user', details: err.message });
    }
}

// Login user
async function loginUser(req, res) { 
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    // const token = jwt.sign({ id: user._id, role: user.role }, SECRETE, { expiresIn: "7d" });

    // return res.status(200).json({ token, user });
    return res.status(200).json({user});

}

// Get all users
async function getAllUsers(req, res) {
    try {
        const users = await User.find().populate('hospitalId', 'name');
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to retrieve users', details: error.message });
    }
}

// Get user by ID
async function getUserById(req, res) {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId).populate('hospitalId', 'name');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to retrieve user', details: error.message });
    }
}

// Update user by ID
async function updateUser(req, res) {
    const userId = req.params.id;
    const updates = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true }).populate('hospitalId', 'name');
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }                       
        return res.status(200).json(updatedUser);
    } catch (error) {   
        return res.status(500).json({ error: 'Failed to update user', details: error.message });
    }
}

// Delete user by ID
async function deleteUser(req, res) {
    const userId = req.params.id;

    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to delete user', details: error.message });
    }
}

module.exports = {
    createUser, 
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    loginUser
};