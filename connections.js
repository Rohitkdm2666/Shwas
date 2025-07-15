const mongoose = require("mongoose");
function connectDB() {
    mongoose.connect("mongodb://127.0.0.1:27017/Shwas")
    .then(() => console.log("MongoDB connected successfully"))
    .catch(err => console.error("MongoDB connection error:", err));
}

module.exports = connectDB;