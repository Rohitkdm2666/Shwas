const express = require("express");
const app = express();
const port = 3000;

//connect to the database
const connectDB = require("./connections");
connectDB();

// Middleware to parse JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import hospital routes
const hospitalRoutes = require("./routes/hospitalRoutes");
app.use("/api", hospitalRoutes);

// Import user routes
const userRoutes = require("./routes/UserRoutes");
app.use("/api", userRoutes);

// Import doctor routes
const doctorRoutes = require("./routes/doctorRoutes");
app.use("/api", doctorRoutes);

// Import patient routes
const patientRoutes = require("./routes/patientRoutes");
app.use("/api", patientRoutes);

// Handle 404 errors
app.use((req, res) => {
    res.status(404).json({ error: "Not Found" });
});

app.listen(port, () => {    
    console.log(`Server is running on http://localhost:${port}`);
});