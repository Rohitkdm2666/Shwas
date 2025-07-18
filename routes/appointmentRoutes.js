const express = require("express");
const router = express();
const appointmentController = require("../controllers/appointmentController");

// Create a new appointment
router.post("/createAppointment", appointmentController.createAppointment);

//getall appointments
router.get("/getAppointments", appointmentController.getAllAppointments);
// Get all appointments for a patient
router.get("/appointments/patient/:patientId", appointmentController.getPatientAppointments);
// Get all appointments for a doctor
router.get("/appointments/doctor/:doctorId", appointmentController.getDoctorAppointments);
// Get all appointments for a hospital
router.get("/appointments/hospital/:hospitalId", appointmentController.getHospitalAppointments);

// Update an appointment
router.put("/updateAppointments/:appointmentId", appointmentController.updateAppointment);
router.patch("/updateAppointments/:appointmentId", appointmentController.updateAppointment);

// Delete an appointment
router.delete("/deleteAppointments/:appointmentId", appointmentController.deleteAppointment);

module.exports = router;

