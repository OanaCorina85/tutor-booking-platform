import express from "express";
import nodemailer from "nodemailer";
import process from "process"; // Explicitly import process

const router = express.Router();

let bookedSlots = {}; // Example in-memory storage for booked slots

// Route to handle booking form submissions
router.post("/send-booking-email", async (req, res) => {
  const { name, email, date, time, message } = req.body;

  // Check if the time slot is already booked
  if (bookedSlots[date] && bookedSlots[date].includes(time)) {
    return res.status(400).json({ message: "Time slot is already booked." });
  }

  // Add the time slot to the booked slots
  if (!bookedSlots[date]) {
    bookedSlots[date] = [];
  }
  bookedSlots[date].push(time);

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "New Booking Request",
      text: `
        You have received a new booking request:
        Name: ${name}
        Email: ${email}
        Date: ${date}
        Time: ${time}
        Message: ${message}
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Booking confirmed!" });
  } catch (error) {
    console.error("Error sending booking email:", error);
    res.status(500).json({ message: "Failed to send booking email." });
  }
});

// Route to handle contact form submissions
router.post("/send-contact-message", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password or app password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send the email to yourself
      subject: "New Contact Message",
      text: `
        You have received a new message:
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error sending contact message:", error);
    res.status(500).json({ message: "Failed to send contact message." });
  }
});

// Route to get booked slots
router.get("/booked-slots", (req, res) => {
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ message: "Date is required." });
  }

  // Example in-memory storage for booked slots
  const slots = bookedSlots[date] || [];
  res.status(200).json({ bookedSlots: slots });
});

export default router;
