import express from "express";
import bodyParser from "body-parser";
import emailRoutes from "./email.js"; // Import the email route
import dotenv from "dotenv";
import cors from "cors";
import process from "process";

// Load environment variables
dotenv.config();

const app = express();

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Enable CORS
const corsOptions = {
  origin: "*", // Replace with your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
};
app.use(cors(corsOptions));

// API Routes
app.use("/api/email", emailRoutes); // Add the email route

// Default route for health check
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
