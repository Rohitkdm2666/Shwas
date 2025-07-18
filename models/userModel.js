const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["admin", "doctor", "staff", "patient"] },
  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital" },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
module.exports = User;

