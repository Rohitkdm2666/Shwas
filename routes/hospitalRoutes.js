const express = require('express');
const hospitalRoutes = express.Router();

const hospitalController = require('../controllers/hospitalController');

// Route to create a new hospital
hospitalRoutes.post('/registerHospital', hospitalController.createHospital);

// Route to get all active hospitals
hospitalRoutes.get('/getHospitals', hospitalController.getAllHospitals);

// Route to get a hospital by ID
hospitalRoutes.get('/getHospital/:id', hospitalController.getHospitalById);

// Route to update a hospital by ID
hospitalRoutes.put('/updateHospital/:id', hospitalController.updateHospital);

// Route to update a hospital by ID
hospitalRoutes.patch('/updateHospital/:id', hospitalController.updateHospital);

// Route to delete a hospital by ID
hospitalRoutes.delete('/deleteHospital/:id', hospitalController.deleteHospital);


// Export the hospital routes
module.exports = hospitalRoutes;
