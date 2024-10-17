const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getAllProductReviews,
  deleteProductReview,
} = require("../controller/productController");
const { isAuthenticated, authorizeRoles } = require("../middleware/auth");

const app = express();

const router = express.Router();

router.route("/products").get(getAllProducts);
router
  .route("/admin/product/new")
  .post(isAuthenticated, authorizeRoles("admin"), createProduct);

router
  .route("/admin/product/:id")
  .put(isAuthenticated, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticated, authorizeRoles("admin"), deleteProduct);

router.route("/product/:id").get(getProductDetails);

// isAuthenticated == is AuthenticatedUser

router.route("/review").put(isAuthenticated, createProductReview);

router
  .route("/reviews")
  .get(getAllProductReviews)
  .delete(isAuthenticated, deleteProductReview);

module.exports = router;
