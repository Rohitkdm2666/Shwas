const express = require("express");
const router = express.Router();
const staffController = require("../controllers/staffController");

// Create staff
router.post("/createStaff", staffController.createStaff);

// Get all staff
router.get("/getStaffs", staffController.getAllStaff);
// Get staff by ID
router.get("getStaff/:id", staffController.getStaffById);
// Get staff by hospital ID
router.get("/getStaffsOfHospital/:hospitalId", staffController.getStaffByHospitalId);

// Update staff
router.put("updateStaff/:id", staffController.updateStaff);
router.patch("updateStaff/:id", staffController.updateStaff);

// Delete staff
router.delete("deleteStaff/:id", staffController.deleteStaff);

module.exports = router;