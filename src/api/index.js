import express from "express";
import bodyParser from "body-parser";
import emailRoutes from "./email.js"; // Import the email route
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(bodyParser.json()); // Parse JSON request bodies

app.use("/api", emailRoutes); // Add the email route

const PORT = 5001; // Port for the API server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
