const mongoose = require("mongoose");
const Product = require("../models/productModel");

const ErrorHandler = require("../utills/errorhandeler");
// Create and Save a new Product -- admin
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utills/apifetures");

exports.createProduct = catchAsyncError(async (req, res, next) => {
  // Create a new Product instance with the request body

  req.body.user = req.user.id;
  const product = await Product.create(req.body);

  // Save the product to the database

  // Respond with the saved product
  res.status(201).json({
    success: true,
    product,
  });
});

// Get all products
// exports.getAllProducts = async (req, res, next) => {
//   try {
//     const resultPerPage = 2;
//     const productCount = await Product.countDocuments();
//     // const page = parseInt(req.query.page, 10) || 1;
//     const apiFeatures = new ApiFeatures(Product.find(), req.query)
//       .search()
//       .filter();

//     // Execute the query to get filtered products
//     let products = await apiFeatures.query;

//     // Get the count of filtered products before pagination
//     let filteredProductsCount = products.length;

//     // Step 2: Apply pagination after filtering
//     apiFeatures.pagination(resultPerPage);

//     // Execute the query again to get paginated products
//     products = await apiFeatures.query.clone();

//     // Respond with the products and other metadata
//     res.status(200).json({
//       success: true,
//       products,
//       productCount,
//       resultPerPage,
//       filteredProductsCount,
//     });
//   } catch (error) {
//     next(new ErrorHandler(error.message, 400)); // Forward the error to the error-handling middleware
//   }
// };

// controllers/productController.js

// controllers/productController.js
// Get all products
exports.getAllProducts = async (req, res, next) => {
  try {
    const apiFeatures = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter();

    // Execute the query to get filtered products
    const products = await apiFeatures.query;

    // Respond with the products and metadata
    res.status(200).json({
      success: true,
      products,
      productCount: products.length, // Total count of products after filtering
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 400)); // Forward the error to the error-handling middleware
  }
};

// Get all Products Details

// Example in a controller
exports.getProductDetails = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return next(new ErrorHandler(404, "Product Not Found"));
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    next(error); // Forward the error to the error-handling middleware
  }
};

// update  product -- Admin

exports.updateProduct = async (req, res, next) => {
  try {
    // Retrieve the product by ID
    let product = await Product.findById(req.params.id);

    // Check if the product exists
    if (!product) {
      return next(new ErrorHandler(404, "Product Not Found"));
    }

    // Update the product with the new data
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    // Respond with the updated product
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error); // Forward the error to the error-handling middleware
  }
};

// Delete a product

exports.deleteProduct = async (req, res, next) => {
  try {
    // Retrieve the product by ID
    const product = await Product.findById(req.params.id);

    // Check if the product exists
    if (!product) {
      return next(new ErrorHandler(404, "Product Not Found"));
    }

    // Delete the product
    await Product.findByIdAndDelete(req.params.id);

    // Respond with a success message
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    next(error); // Forward the error to the error-handling middleware
  }
};

exports.createProductReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  console.log(productId, rating, comment);
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };
  // Find the product by ID
  const product = await Product.findById(productId);

  // Check if product is found

  // Check if the user has already reviewed the product
  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    // Update the existing review
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) rev.rating = rating;
      rev.comment = comment;
    });
  } else {
    // Add a new review
    product.reviews.push(review);
    product.numofReviews = product.reviews.length;
  }

  // Calculate the average rating
  let avg = 0;
  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });
  product.ratings = avg / product.reviews.length;
  product.numofReviews = product.reviews.length;
  // Save the product
  await product.save({ validateBeforeSave: false });

  // Create a new review entry

  // Send response
  res
    .status(201)
    .json({ success: true, message: "Review created successfully" });
});

// Get All Review of Product

exports.getAllProductReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler(404, "Product Not Found"));
  }

  res.status(200).json({ success: true, reviews: product.reviews });
});

// Delete Review

exports.deleteProductReview = catchAsyncError(async (req, res, next) => {
  // Find the product by ID using req.params.productId

  console.log("Product ID:", req.query.productId);
  console.log("Review ID:", req.query.id);
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  // Check if review exists
  const reviewExists = product.reviews.some(
    (rev) => rev._id.toString() === req.query.id.toString()
  );

  if (!reviewExists) {
    return next(new ErrorHandler("Review Not Found", 404));
  }

  // Filter out the review to be deleted
  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  // Calculate average rating
  let avg = 0;
  reviews.forEach((rev) => {
    avg += rev.rating;
  });
  const ratings = reviews.length > 0 ? avg / reviews.length : 0;
  const numofReviews = reviews.length;

  // Update the product with the new reviews list and ratings
  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numofReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  // Send response
  res
    .status(200)
    .json({ success: true, message: "Review deleted successfully" });
});
