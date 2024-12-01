// src/server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors")
dotenv.config();

const connectDB = require("./config/dbconfig")
const app = express();
app.use(cors())
app.use(express.json());
app.use("/uploads", express.static("uploads"));


// Database Connection
connectDB(); 

// Routes
const routes = require("./src/routes/route")

app.use("/api" , routes)

// Error Handling Middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ success: false, message: err.message || "Server Error" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));