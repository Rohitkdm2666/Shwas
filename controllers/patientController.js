const Patient = require("../models/patientModel");
const Doctor = require("../models/doctorModel");
const Hospital = require("../models/hospitalModel");
const User = require("../models/userModel");

// Create a new patient
async function createPatient(req, res) {
  try {
    const { userId, hospitalId, doctorId, ...patientData } = req.body;

    // Validate user and hospital existence
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const hospital = await Hospital.findById(hospitalId);
    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }
    if (doctorId) {
      const doctor = await Doctor.findById(doctorId);
      if (!doctor) {
        return res.status(404).json({ message: "Doctor not found" });
      }
    }

    // Check if the patient already exists for the user in the hospital
    const existingPatient = await Patient.findOne({ userId, hospitalId });
    if (existingPatient) {
      return res.status(400).json({ message: "Patient already exists for this user in this hospital" });
    }
    
    // Create patient
    const patient = new Patient({
      userId,
      hospitalId,
      doctorId,
      ...patientData,
    });
    await patient.save();
    res.status(201).json({ message: "Patient created successfully", patient });
  } catch (error) {
    console.error("Error creating patient:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

// Get all patients
async function getAllPatients(req, res) {
  try {
    const patients = await Patient.find().populate(
      "userId hospitalId doctorId"
    );
    res.status(200).json(patients);
  } catch (error) {
    console.error("Error fetching patients:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

// Get a patient by ID
async function getPatientById(req, res) {
  try {
    const { id } = req.params;
    const patient = await Patient.findById(id).populate(
      "userId hospitalId doctorId"
    );
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json(patient);
  } catch (error) {
    console.error("Error fetching patient:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

// Get patients by hospital ID
async function getPatientsByHospitalId(req, res) {
  try {
    const { hospitalId } = req.params;
    const patients = await Patient.find({ hospitalId }).populate(
      "userId doctorId"
    );
    if (patients.length === 0) {
      return res
        .status(404)
        .json({ message: "No patients found for this hospital" });
    }
    res.status(200).json(patients);
  } catch (error) {
    console.error("Error fetching patients by hospital ID:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

// Get patients by doctor ID
async function getPatientsByDoctorId(req, res) {
  try {
    const { doctorId } = req.params;
    const patients = await Patient.find({ doctorId }).populate(
      "userId hospitalId"
    );
    if (patients.length === 0) {
      return res
        .status(404)
        .json({ message: "No patients found for this doctor" });
    }
    res.status(200).json(patients);
  } catch (error) {
    console.error("Error fetching patients by doctor ID:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

// Update a patient
async function updatePatient(req, res) {
  try {
    const { id } = req.params;
    const { userId, hospitalId, doctorId, ...updateData } = req.body;

    // Validate user and hospital existence
    if (userId) {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
    }
    if (hospitalId) {
      const hospital = await Hospital.findById(hospitalId);
      if (!hospital) {
        return res.status(404).json({ message: "Hospital not found" });
      }
    }
    if (doctorId) {
      const doctor = await Doctor.findById(doctorId);
      if (!doctor) {
        return res.status(404).json({ message: "Doctor not found" });
      }
    }

    const updatedPatient = await Patient.findByIdAndUpdate(id, updateData, {
      new: true,
    }).populate("userId hospitalId doctorId");
    if (!updatedPatient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res
      .status(200)
      .json({
        message: "Patient updated successfully",
        patient: updatedPatient,
      });
  } catch (error) {
    console.error("Error updating patient:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

// Delete a patient
async function deletePatient(req, res) {
  try {
    const { id } = req.params;
    const deletedPatient = await Patient.findByIdAndDelete(id);
    if (!deletedPatient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json({ message: "Patient deleted successfully" });
  } catch (error) {
    console.error("Error deleting patient:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

module.exports = {
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient,
  getPatientsByHospitalId,
  getPatientsByDoctorId,
};
