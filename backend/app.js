const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const errorMiddleware = require("./middleware/error");
const path = require("path");



const allowedOrigins = ['https://mernecom-1-frontend.onrender.com', 'http://localhost:5173'];

app.use(cors({
  origin: allowedOrigins,
  methods: 'GET,POST,PUT,DELETE',
  credentials: true // Enable cookies for cross-origin requests
}));/ Enable CORS for all routes


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
// Route Imports

// Use fileUpload middleware if you want to handle file uploads
app.use(fileUpload());

// Serve static files (e.g., uploaded files) from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");






app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);

app.use(errorMiddleware);

// Middleware for Error

module.exports = app;
