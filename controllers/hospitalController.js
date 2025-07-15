const Hospital = require('../models/hospitalModel');

//create a new hospital
async function createHospital(req, res) {
    const { name, email, phone1, phone2, address, patientCapacity, openAt, closeAt, gstNumber, registerNumber, established } = req.body;
    if (!name || !email || !phone1 || !address) {
        return res.status(400).json({ error: 'Name, email, phone1, and address are required.' });
    }   
    const newHospital = await new Hospital({
        name,
        email,
        phone1,
        phone2,
        address,    
        patientCapacity,
        openAt,
        closeAt,
        gstNumber,
        registerNumber,
        established: established ? new Date(established) : new Date(),
    }); 
    newHospital.save()
        .then(() => res.status(201).json(newHospital))
        .catch(err => res.status(500).json({ error: 'Failed to create hospital', details: err.message }));
    


    // Simulate saving to a database
    console.log('Hospital created:', newHospital);
    return res.status(201).json(newHospital);
}

//get all hospitals
async function getAllHospitals(req, res) {
    hospitals = await Hospital.find({status: 'active'});
    return res.status(200).json(hospitals);
}

//get a hospital by id
async function getHospitalById(req, res) {
    const hospitalId = req.params.id;
    try {
        const hospital = await Hospital.findById(hospitalId);
        if (!hospital) {
            return res.status(404).json({ error: 'Hospital not found' });
        }
        return res.status(200).json(hospital);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to retrieve hospital', details: error.message });
    }
}

//update a hospital by id
async function updateHospital(req, res) {
    const hospitalId = req.params.id;
    const updates = req.body;

    try {
        const updatedHospital = await Hospital.findByIdAndUpdate(hospitalId, updates, { new: true });
        if (!updatedHospital) {
            return res.status(404).json({ error: 'Hospital not found' });
        }
        return res.status(200).json(updatedHospital);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to update hospital', details: error.message });
    }
}

//delete a hospital by id
async function deleteHospital(req, res) {
    const hospitalId = req.params.id;

    try {
        const deletedHospital = await Hospital.findByIdAndDelete(hospitalId);
        if (!deletedHospital) {
            return res.status(404).json({ error: 'Hospital not found' });
        }
        return res.status(200).json({ message: 'Hospital deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to delete hospital', details: error.message });
    }
}




// Export the controller functions for use in routes
module.exports = {
    createHospital, 
    getAllHospitals,
    getHospitalById,
    updateHospital,
    deleteHospital,

};
