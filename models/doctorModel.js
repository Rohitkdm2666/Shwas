const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true },

  specialization: { type: String, required: true },
  education: { type: String },
  experience: { type: Number }, // in years

  department: { type: String },
  designation: { type: String },

  consultationFee: { type: Number, default: 0 },
  availableDays: [String],
  availableTime: {
    start: String,
    end: String
  },

  contactNumber: String,
  address: String,
  profilePicture: String,
  bio: { type: String },
  gender: { type: String, enum: ["male", "female"]},

  status: { type: String, enum: ["active", "inactive"], default: "active" }
}, { timestamps: true }); 

// module.exports = mongoose.model('Doctor', doctorSchema);
const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;

