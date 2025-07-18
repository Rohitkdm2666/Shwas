const Appointment = require("../models/appointmentModel");
const Patient = require("../models/patientModel");
const Doctor = require("../models/doctorModel");
const Hospital = require("../models/hospitalModel");
const mongoose = require("mongoose");

// Create a new appointment
async function createAppointment(req, res) {
    const { patientId, doctorId, hospitalId, scheduledAt, reason } = req.body;

    // Validate required fields
    if (!patientId || !doctorId || !hospitalId || !scheduledAt) {
        return res.status(400).json({ error: 'Patient ID, Doctor ID, Hospital ID, and Scheduled At are required.' });
    }

    // Check if patient exists
    const patient = await Patient.findById(patientId);
    if (!patient) {
        return res.status(404).json({ error: 'Patient not found.' });
    }

    // Check if doctor exists
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
        return res.status(404).json({ error: 'Doctor not found.' });
    }

    // Check if hospital exists
    const hospital = await Hospital.findById(hospitalId);
    if (!hospital) {
        return res.status(404).json({ error: 'Hospital not found.' });
    }
    // Create a new appointment
    const newAppointment = new Appointment({
        patientId,
        doctorId,
        hospitalId,
        scheduledAt: new Date(scheduledAt),
        reason,
    });
    try {
        const savedAppointment = await newAppointment.save();
        res.status(201).json({ message: 'Appointment created successfully', appointment: savedAppointment });
    } catch (error) {
        console.error('Error creating appointment:', error);
        res.status(500).json({ error: 'Failed to create appointment', details: error.message });
    }
}

//get all appointments
async function getAllAppointments(req, res) {
    try{
        const appointments = await Appointment.find().populate('patientId doctorId hospitalId');
        res.status(200).json(appointments);
    }
    catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ error: 'Failed to fetch appointments', details: error.message });
    }
}

// Get all appointments for a patient
async function getPatientAppointments(req, res) {
    const { patientId } = req.params;

    // Validate patientId
    if (!mongoose.Types.ObjectId.isValid(patientId)) {
        return res.status(400).json({ error: 'Invalid Patient ID.' });
    }

    try {
        const appointments = await Appointment.find({ patientId }).populate('userId doctorId hospitalId');
        res.status(200).json(appointments);
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ error: 'Failed to fetch appointments', details: error.message });
    }
}
// Get all appointments for a doctor
async function getDoctorAppointments(req, res) {
    const { doctorId } = req.params;

    // Validate doctorId
    if (!mongoose.Types.ObjectId.isValid(doctorId)) {
        return res.status(400).json({ error: 'Invalid Doctor ID.' });
    }

    try {
        const appointments = await Appointment.find({ doctorId }).populate('patientId hospitalId');
        res.status(200).json(appointments);
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ error: 'Failed to fetch appointments', details: error.message });
    }
}

// Get all appointments for a hospital
async function getHospitalAppointments(req, res) {
    const { hospitalId } = req.params;

    // Validate hospitalId
    if (!mongoose.Types.ObjectId.isValid(hospitalId)) {
        return res.status(400).json({ error: 'Invalid Hospital ID.' });
    }

    try {
        const appointments = await Appointment.find({ hospitalId }).populate('patientId doctorId');
        res.status(200).json(appointments);
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ error: 'Failed to fetch appointments', details: error.message });
    }
}

// Update an appointment
async function updateAppointment(req, res) {
    const { appointmentId } = req.params;
    const updateData = req.body;

    // Validate appointmentId
    if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
        return res.status(400).json({ error: 'Invalid Appointment ID.' });
    }

    try {
        const updatedAppointment = await Appointment.findByIdAndUpdate(appointmentId, updateData, { new: true });
        if (!updatedAppointment) {
            return res.status(404).json({ error: 'Appointment not found.' });
        }
        res.status(200).json({ message: 'Appointment updated successfully', appointment: updatedAppointment });
    } catch (error) {
        console.error('Error updating appointment:', error);
        res.status(500).json({ error: 'Failed to update appointment', details: error.message });
    }
}

// Delete an appointment
async function deleteAppointment(req, res) {
    const { appointmentId } = req.params;

    // Validate appointmentId
    if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
        return res.status(400).json({ error: 'Invalid Appointment ID.' });
    }

    try {
        const deletedAppointment = await Appointment.findByIdAndDelete(appointmentId);
        if (!deletedAppointment) {
            return res.status(404).json({ error: 'Appointment not found.' });
        }
        res.status(200).json({ message: 'Appointment deleted successfully' });
    } catch (error) {
        console.error('Error deleting appointment:', error);
        res.status(500).json({ error: 'Failed to delete appointment', details: error.message });
    }
}

module.exports = {
    createAppointment,
    getPatientAppointments,
    getDoctorAppointments,
    getHospitalAppointments,
    updateAppointment,
    deleteAppointment,
    getAllAppointments,
};


