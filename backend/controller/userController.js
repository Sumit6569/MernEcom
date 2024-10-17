const ErrorHandler = require("../utills/errorhandeler");
// Create and Save a new Product -- admin
const catchAsyncError = require("../middleware/catchAsyncError");
const sendToken = require("../utills/jwtTokens");
const sendEmail = require("../utills/sendEmail");
const User = require("../models/userModel");
const { route } = require("../routes/userRoute");
//const upload = require("../config/multerConfig");
const cloudinary = require("cloudinary");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
// Register a new user

exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  

  const user = await User.create({
    name,
    email,
    password,
  });
  sendToken(user, 201, res);
});

// Login an existing user

exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  // checking if the user already exists or is already
  if (!email || !password) {
    return next(new ErrorHandler("Please provide email and password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(user, 201, res);
});

// Logout

exports.logout = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, { expires: new Date(Date.now()), httpOnly: true });
  res.status(200).json({ success: true, message: "Logged out successfully" });
});

// Forget password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("User not found with this email", 404));
  }

  // Get Reset Password

  const resetToken = user.getResetPasswordToken();
  await user.save({
    validateBeforeSave: false,
  });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;
  const message = `You are receiving this email because you (or someone else) have requested a password reset. Please click on the following link or paste it into your browser to complete the process:\n\n${resetPasswordUrl}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`;

  try {
    await sendEmail({
      email: user.email,
      subject: " Ecommerce  Password Reset Request",
      message,
    });
    res.status(200).json({
      success: true,
      message: ` Reset password email sent to ${user.email} succesfully`,
    });
  } catch (error) {
    user.resPasswordToken = undefined;
    user.resPasswordExpire = undefined;
    await user.save({
      validateBeforeSave: false,
    });

    return next(new ErrorHandler(error.message, 500));
  }
});

// Get User Details

exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("-password");
  res.status(200).json({
    success: true,
    user,
  });
});

// Update User password

exports.updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  if (!user.comparePassword(req.body.oldPassword)) {
    return next(new ErrorHandler("Invalid old password", 401));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("Passwords do not match", 400));
  }

  user.password = req.body.newPassword;
  await user.save();

  sendToken(user, 200, res);
});

// Update User Profile
exports.updateUserProfile = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };
  // we will cloudnary later
  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    user,
  });
});

// Get All Users

exports.getAllUser = catchAsyncError(async (req, res, next) => {
  const users = await User.find().select("-password");
  res.status(200).json({
    success: true,
    users,
  });
});

// Get Single User(admin)

exports.getSingleUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) {
    return next(
      new ErrorHandler(404, `User Not Found with ID: ${req.params.id}`)
    );
  }
  res.status(200).json({
    success: true,
    user,
  });
});
// update UERR role

exports.updateUserRole = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user,
  });
});

// Delete User(admin)

exports.deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(new ErrorHandler(404, `User Not Found ${req.params.id}`));
  }

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});

// Creeat new Revieew or Update the review
