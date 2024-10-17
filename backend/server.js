const app = require("./app");
const dotenv = require("dotenv");

const cloudinary = require("cloudinary").v2;

const connectDatabase = require("./config/database");

// uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error(`Error: ${err.message}`);
  console.error("Shutting down server... due to uncaught exceptions");

  process.exit(1);
});

// Confing
dotenv.config({ path: "backend/config/config.env" });

// Connectig Database



connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});















const server = app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(`Server is running on port http://localhost:${process.env.PORT}`);
});

// Unhandled Promise Rejection

process.on("unhandledRejection", (err) => {
  console.log(`Unhandled Rejection at: ${err.message}`);
  console.log(`Shutingh down the server due to Unhandled Rejection Rejection`);
  server.close(() => {
    process.exit(1);
  });
});

// Error Middleware
