// Define the ErrorHandler class
// Define the ErrorHandler class
class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode; // Ensure this is a number
  }
}

module.exports = ErrorHandler;
