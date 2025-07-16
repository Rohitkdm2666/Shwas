const express = require("express");
const doctorRouter = express.Router();

const { createDoctor,getAllDoctors,getDoctorById,updateDoctor,deleteDoctor,getDoctorsByHospitalId } = require("../controllers/doctorController");

// Create a new doctor
doctorRouter.post("/createDoctor", createDoctor);

// Get all doctors
doctorRouter.get("/getDoctors", getAllDoctors);

// Get doctor by ID
doctorRouter.get("/getDoctor/:id", getDoctorById);

// Get doctors by hospital ID
doctorRouter.get("/getDoctorsOfHospital/:hospitalId", getDoctorsByHospitalId);

// Update doctor by ID
doctorRouter.put("/updateDoctor/:id", updateDoctor);
doctorRouter.patch("/updateDoctor/:id", updateDoctor);

// Delete doctor by ID
doctorRouter.delete("/deleteDoctor/:id", deleteDoctor);

module.exports = doctorRouter;

