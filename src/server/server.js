// backend/server.js
import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors({ origin: "http://localhost:5173" })); // React app port
app.use(express.json());

// Email endpoint
app.post("/api/email/send", async (req, res) => {
  const applicant = req.body;

  // Configure transporter
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    // Generate QR code URL
    const QRCode = await import("qrcode");
    const qrData = JSON.stringify({
      name: applicant.name,
      ic: applicant.ic,
      phone: applicant.phone,
      applicantId: applicant.id,
    });
    const qrImageUrl = await QRCode.toDataURL(qrData);

    const mailOptions = {
      from: `"Food Aid Team" <${process.env.EMAIL_USER}>`,
      to: applicant.email,
      subject: "Your Application is Approved ✅",
      html: `
        <p>Hi <strong>${applicant.name}</strong>,</p>
        <p>Congratulations! Your application has been approved. Your aid will be sent within 7 days.</p>
        <p>Here is your QR code:</p>
        <img src="${qrImageUrl}" alt="QR Code" />
        <p>Thank you!</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.json({ success: false, error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
