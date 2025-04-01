import express from "express";
import nodemailer from "nodemailer";
const router = express.Router();

router.post("/send-booking-email", async (req, res) => {
  const { name, email, date, time, message } = req.body;

  try {
    // Configure the email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", // Use your email provider (e.g., Gmail, Outlook)
      auth: {
        user: "oanacorinatrifon@gmail.com", // Replace with your email
        pass: "salatanoua9", // Replace with your email password or app password
      },
    });

    // Email content
    const mailOptions = {
      from: "your-email@gmail.com",
      to: "oanacorinatrifon@gmail.com", // Replace with the recipient's email
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

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Booking email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send booking email." });
  }
});

export default router;
