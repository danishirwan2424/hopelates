import express from "express";
import nodemailer from "nodemailer";
import QRCode from "qrcode";

const router = express.Router();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post("/send", async (req, res) => {
  const { name, email, ic, phone, id } = req.body;

  try {
    const qrData = JSON.stringify({ name, ic, phone, applicantId: id });
    const qrImageUrl = await QRCode.toDataURL(qrData);

    const mailOptions = {
      from: `"Food Aid Team" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Application is Approved ✅",
      html: `
        <p>Hi <strong>${name}</strong>,</p>
        <p>Congratulations! Your application has been approved. Your aid will be sent to you within 7 days.</p>
        <p>Please find your QR code attached below:</p>
        <img src="${qrImageUrl}" alt="QR Code" />
        <p>Thank you for using our service.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
