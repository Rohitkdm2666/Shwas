const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
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
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },

    age: Number,
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    bloodGroup: String,
    height: Number,
    weight: Number,

    disease: String,
    isGenetic: Boolean,
    geneticType: String,
    isHandicap: Boolean,
    allergies: [String],
    medications: [String],

    isInsurance: Boolean,
    insuranceProvider: String,

    admissionDate: {
        type: Date,
        default: Date.now,
    },
    dischargeDate: Date,
    status: { type: String, enum: ["Admitted", "Discharged", "Outpatient"] },

    roomNumber: String,
    profilePicture: String,
    PatientcontactNumber: String,
    address: String,
    emergencyContact: {
      name: String,
      phone: String,
      relation: String,
    },

    notes: String,
  },
  { timestamps: true }
);

const Patient = mongoose.model("Patient", patientSchema);
module.exports = Patient;