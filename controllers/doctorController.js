const Doctor = require("../models/doctorModel");
const User = require("../models/userModel");
const Hospital = require("../models/hospitalModel");


// Create a new doctor
async function createDoctor(req, res) {
  try {
    const {
      userId,
      hospitalId,
      specialization,
      education,
      experience,
      department,
      designation,
      consultationFee,
      availableDays,
      availableTime,
      contactNumber,
      address,
      profilePicture,
      bio,
      gender,
    } = req.body;

    // Validate required fields
    if (!userId || !hospitalId || !specialization) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if hospital exists
    const hospital = await Hospital.findById(hospitalId);
    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    const doctor = new Doctor({
      userId,
      hospitalId,
      specialization,
      education,
      experience,
      department,
      designation,
      consultationFee,
      availableDays,
      availableTime,
      contactNumber,
      address,
      profilePicture,
      bio,
      gender,
    });

    await doctor.save();
    res.status(201).json({ message: "Doctor created successfully", doctor });
  } catch (error) {
    console.error("Error creating doctor:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Get all doctors
async function getAllDoctors(req, res) {
    try {
        const doctors = await Doctor.find().populate("userId", "first_name last_name email").populate("hospitalId", "name address");
        res.status(200).json(doctors);
    } catch (error) {
        console.error("Error fetching doctors:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Get doctor by ID
async function getDoctorById(req, res) {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findById(id).populate("userId", "first_name last_name email").populate("hospitalId", "name location");

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json(doctor);
  } catch (error) {
    console.error("Error fetching doctor:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Update doctor by ID
async function updateDoctor(req, res) {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const doctor = await Doctor.findByIdAndUpdate(id, updateData, { new: true }).populate("userId", "first_name last_name email").populate("hospitalId", "name location");

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json({ message: "Doctor updated successfully", doctor });
  } catch (error) {
    console.error("Error updating doctor:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Delete doctor by ID
async function deleteDoctor(req, res) {
    try {
        const { id } = req.params;
    
        const doctor = await Doctor.findByIdAndDelete(id);
    
        if (!doctor) {
        return res.status(404).json({ message: "Doctor not found" });
        }
    
        res.status(200).json({ message: "Doctor deleted successfully" });
    } catch (error) {
        console.error("Error deleting doctor:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
  createDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor
};
