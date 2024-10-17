const ErrorHandler = require("../utills/errorhandeler");


module.exports = (err, req, res, next) => {
  // Ensure default values for statusCode and message
  
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Handle specific error types
  if (err.name === "CastError") {
    const message = `Resource Not Found: Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }


// Mongoose dublicate key error 
  if (err.code === 11000) {
    const message = `Duplicate  ${Object.keys(err.keyValue)} Entered `;
    err = new ErrorHandler(message, 400);
  }




  // JWT Error
  if (err.name === "JsonWebTokenError") {
    const message = "Invalid token, Please Login again";
    err = new ErrorHandler(message, 401);
  }

  // JWT EXPIRE error
  if (err.name === "TokenExpiredError") {
    const message = "Token has expired, Please Login again";
    err = new ErrorHandler(message, 401);
  }


  // Respond with error details
  res.status(err.statusCode).json({
    success: false,
    error: err.message,
  });
};
