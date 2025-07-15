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
// Use hospital routes
app.use("/api", hospitalRoutes);


// Handle 404 errors
app.use((req, res) => {
    res.status(404).json({ error: "Not Found" });
});

app.listen(port, () => {    
    console.log(`Server is running on http://localhost:${port}`);
});