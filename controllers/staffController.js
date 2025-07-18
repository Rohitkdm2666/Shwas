const Staff = require("../models/staffModel");
const User = require("../models/userModel");
const mongoose = require("mongoose");

//create staff
async function createStaff(req, res) {
    try {
        const { userId, hospitalId, designation, department, shift, contactNumber,gender, address, profilePicture, notes } = req.body;
        if (!userId || !hospitalId || !designation || !department) {
            return res.status(400).json({ message: "Required fields are missing" });
        }
        // Check if the userId and hospitalId are valid ObjectIds
        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(hospitalId)) {
            return res.status(400).json({ message: "Invalid userId or hospitalId"
            });
        } 
        // Check if the staff already exists for the user in the hospital
        const staffExists = await Staff.findOne({ userId, hospitalId });
        if (staffExists) {
            return res.status(400).json({ message: "Staff already exists for this user in this hospital" });
        }
        const newStaff = new Staff({
            userId,
            hospitalId,
            designation,
            department,
            shift,
            contactNumber,
            gender,
            address,
            profilePicture,
            notes,
        });
        const savedStaff = await newStaff.save();     
        if (!savedStaff) {
            return res.status(500).json({ message: "Error saving staff" });
        }
        // Return the saved staff data
        res.status(201).json({ message: "Staff created successfully", data: savedStaff });
    } catch (error) {
        res.status(500).json({ message: "Error creating staff", error: error.message });
    }
}

//get all staff
async function getAllStaff(req, res) {
    try {
        const staffList = await Staff.find().populate("userId hospitalId");
        res.status(200).json({ message: "Staff retrieved successfully", data: staffList });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving staff", error: error.message });
    }
}

//get staff by ID
async function getStaffById(req, res) {
    try {
        const staffId = req.params.id;
        const staff = await Staff.findById(staffId).populate("userId hospitalId");
        if (!staff) {
            return res.status(404).json({ message: "Staff not found" });
        }
        res.status(200).json({ message: "Staff retrieved successfully", data: staff });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving staff", error: error.message });
    }
}

//get staff by hospital ID
async function getStaffByHospitalId(req, res) {
    try {
        const hospitalId = req.params.hospitalId;
        const staffList = await Staff.find({ hospitalId }).populate("userId hospitalId");
        if (staffList.length === 0) {
            return res.status(404).json({ message: "No staff found for this hospital" });
        }
        res.status(200).json({ message: "Staff retrieved successfully", data: staffList });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving staff", error: error.message });
    }
}

//update staff
async function updateStaff(req, res) {
    try {
        const staffId = req.params.id;
        const updatedData = req.body;
        const updatedStaff = await Staff.findByIdAndUpdate(staffId, updatedData, { new: true }).populate("userId hospitalId");
        if (!updatedStaff) {
            return res.status(404).json({ message: "Staff not found" });
        }
        res.status(200).json({ message: "Staff updated successfully", data: updatedStaff });
    } catch (error) {
        res.status(500).json({ message: "Error updating staff", error: error.message });
    }
}

//delete staff
async function deleteStaff(req, res) {
    try {
        const staffId = req.params.id;
        const deletedStaff = await Staff.findByIdAndDelete(staffId);
        if (!deletedStaff) {
            return res.status(404).json({ message: "Staff not found" });
        }
        res.status(200).json({ message: "Staff deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting staff", error: error.message });
    }
}

module.exports = {
    createStaff,
    getAllStaff,
    getStaffById,
    updateStaff,
    deleteStaff,
    getStaffByHospitalId,
};      