const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  appointmentId: { type: String, unique: true },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true },
  scheduledAt: { type: Date, required: true },
  status: { type: String, enum: ["Scheduled", "Completed", "Cancelled"], default: "Scheduled" },
  reason: String,
//   mode: { type: String, enum: ["InPerson", "Online"], default: "InPerson" },
//   isFollowUp: { type: Boolean, default: false },
//   followUpOf: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment" },
//   notes: String,
//   prescriptionId: { type: mongoose.Schema.Types.ObjectId, ref: "Prescription" },
}, { timestamps: true });

appointmentSchema.pre("save", async function (next) {
  if (this.appointmentId) return next();
  const count = await mongoose.model("Appointment").countDocuments({});
  this.appointmentId = "APT" + (count + 1).toString().padStart(5, "0");
  next();
});

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;