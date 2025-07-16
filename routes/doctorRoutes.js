const express = require("express");
const doctorRouter = express.Router();

const { createDoctor,getAllDoctors,getDoctorById,updateDoctor,deleteDoctor } = require("../controllers/doctorController");

// Create a new doctor
doctorRouter.post("/createDoctor", createDoctor);

// Get all doctors
doctorRouter.get("/getDoctors", getAllDoctors);

// Get doctor by ID
doctorRouter.get("/getDoctor/:id", getDoctorById);

// Update doctor by ID
doctorRouter.put("/updateDoctor/:id", updateDoctor);
doctorRouter.patch("/updateDoctor/:id", updateDoctor);

// Delete doctor by ID
doctorRouter.delete("/deleteDoctor/:id", deleteDoctor);

module.exports = doctorRouter;

