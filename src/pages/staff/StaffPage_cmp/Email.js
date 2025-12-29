// Email.js
import nodemailer from "nodemailer";
import QRCode from "qrcode";

// Configure transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // or your SMTP server
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER, // your email
    pass: process.env.EMAIL_PASS, // your app password or SMTP password
  },
});

/**
 * Send approval email to applicant with QR code
 * @param {Object} applicant - applicant info
 * @param {string} applicant.name - applicant name
 * @param {string} applicant.email - applicant email
 * @param {string} applicant.ic - applicant IC number
 * @param {string} applicant.phone - applicant phone
 */
export async function sendApprovalEmail(applicant) {
  try {
    // Generate QR code as Data URL
    const qrData = JSON.stringify({
      name: applicant.name,
      ic: applicant.ic,
      phone: applicant.phone,
      applicantId: applicant.id,
    });

    const qrImageUrl = await QRCode.toDataURL(qrData);

    // Email content
    const mailOptions = {
      from: `"Food Aid Team" <${process.env.EMAIL_USER}>`,
      to: applicant.email,
      subject: "Your Application is Approved ✅",
      html: `
        <p>Hi <strong>${applicant.name}</strong>,</p>
        <p>Congratulations! Your application has been approved. 
        Your aid will be sent to you within 7 days.</p>
        <p>Please find your QR code attached below:</p>
        <img src="${qrImageUrl}" alt="QR Code" />
        <p>Thank you for using our service.</p>
      `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info.messageId);
    return { success: true };
  } catch (error) {
    console.error("Error sending email: ", error);
    return { success: false, error };
  }
}
