const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  getUserDetails,
  updatePassword,
  updateUserProfile,
  getAllUser,
  getSingleUser,
  updateUserRole,
  deleteUser,
} = require("../controller/userController");
const { isAuthenticated, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

// In your routes file (e.g., userRoute.js)
//

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword);

router.route("/logout").get(logout);

router.route("/me").get(isAuthenticated, getUserDetails);

router.route("/password/update").put(isAuthenticated, updatePassword);

router.route("/me/update").put(isAuthenticated, updateUserProfile);

router
  .route("/admin/users")
  .get(isAuthenticated, authorizeRoles("admin"), getAllUser);

router
  .route("/admin/user/:id")
  .get(isAuthenticated, authorizeRoles("admin"), getSingleUser) // Get single user
  .put(isAuthenticated, updateUserRole) // Update user role
  .delete(isAuthenticated, authorizeRoles("admin"), deleteUser); // Delete user

module.exports = router;
