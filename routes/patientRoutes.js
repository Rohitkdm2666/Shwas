const express = require("express");
const patientRouter = express.Router();
const patientController = require("../controllers/patientController");

// Create a new patient
patientRouter.post("/createPatient", patientController.createPatient);

// Get all patients
patientRouter.get("/getPatients", patientController.getAllPatients);

// Get a patient by ID
patientRouter.get("getPatient/:id", patientController.getPatientById);

// Update a patient by ID
patientRouter.put("updatePatient/:id", patientController.updatePatient);
patientRouter.patch("updatePatient/:id", patientController.updatePatient);

// Delete a patient by ID
patientRouter.delete("deletePatient/:id", patientController.deletePatient);

// Get patients by hospital ID
patientRouter.get("/getPatientsOfHospital/:hospitalId", patientController.getPatientsByHospitalId);

// Get patients by doctor ID
patientRouter.get("/getPatientsOfDoctor/:doctorId", patientController.getPatientsByDoctorId);

// Export the patient routes
module.exports = patientRouter;
