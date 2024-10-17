const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // SMTP server
    port: 465, // Port for TLS/STARTTLS
    secure: true, // Use TLS
    auth: {
      user: "tempistaken@gmail.com", // Replace with your Gmail address
      pass: "rubi6567", // Use the application-specific password if 2FA is enabled
    },
    tls: {
      rejectUnauthorized: false, // Optional: For ignoring self-signed certificate errors
    },
  });

  const mailOptions = {
    from: "sumitk4388kumar@gmail.com", // Sender address
    to: options.email, // List of recipients
    subject: options.subject, // Subject line
    text: options.message, // Plain text body
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw error;
  }
};

module.exports = sendEmail;
