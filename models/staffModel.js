const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },
    // staffId: { type: String, unique: true }, // e.g., ""


    designation: {
      type: String,
      enum: [
        "security_guard",
        "receptionist",
        "ward_boy",
        "nurse",
        "lab_technician",
        "housekeeping",
        "pharmacist",
      ],
    }, // e.g., Nurse, Receptionist, Lab Assistant
    department: {
      type: String,
      enum: [
        "nursing",
        "pharmacy",
        "laboratory",
        "housekeeping",
        "reception",
        "security",
        "OPD",
        "ICU",
      ],
    }, // e.g., Emergency, OPD, ICU

    shift: {
      start: String, // "09:00"
      end: String, // "17:00"
    },

    contactNumber: String,
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    address: String,
    isActive: { type: Boolean, default: true },

    profilePicture: String,
    notes: String,
  },
  { timestamps: true }
);

const Staff = mongoose.model("Staff", staffSchema);
module.exports = Staff;
