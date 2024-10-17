const catchAsyncError = require("./catchAsyncError");
const ErrorHandler = require("../utills/errorhandeler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticated = catchAsyncError(async (req, res, next) => {
  let { token } = req.cookies;

  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }
  // Check if token is present in Authorization header (Bearer token)
  else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1]; // Get token from "Bearer token"
  }

  if (!token) {
    return next(
      new ErrorHandler(" plese Login,Not authorized, token required", 401)
    );
  }

  try {
    const decodedData = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);

    next();
  } catch (error) {
    next(new ErrorHandler("Token is not valid, please Login again", 401));
  }
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role:${req.user.role} is not allow this resource`,
          403
        )
      );
    }

    next();
  };
};
