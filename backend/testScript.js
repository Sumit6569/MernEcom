// testEmail.js

// Replace './path/to/sendEmail' with the actual path to your sendEmail module
const sendEmail = require("./utills/sendEmail");

const testEmail = async () => {
  try {
    await sendEmail({
      email: "recipient@example.com", // Replace with a valid recipient email
      subject: "Test Email",
      message: "This is a test email sent directly from the code.",
    });
    console.log("Test email sent successfully");
  } catch (error) {
    console.error("Error during test email:", error.message);
  }
};

testEmail();
