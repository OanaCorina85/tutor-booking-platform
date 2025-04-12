import express from "express";
// Removed unused bodyParser import
import emailRoutes from "./email.js"; // Import the email route
import dotenv from "dotenv";
import cors from "cors";
import process from "process";

// Load environment variables
dotenv.config();

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Enable CORS
const corsOptions = {
  origin: "*", // Replace with your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
};
app.use(cors(corsOptions));

let bookedSlots = {}; // Example in-memory storage for booked slots

// Route to fetch booked slots for a specific date
app.get("/api/booked-slots", (req, res) => {
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ message: "Date is required." });
  }

  const slots = bookedSlots[date] || [];
  res.status(200).json({ bookedSlots: slots });
});

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
