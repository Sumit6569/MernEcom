const Order = require("../models/orderModels");
const Product = require("../models/productModel");

const ErrorHandler = require("../utills/errorhandeler");
// Create and Save a new Product -- admin
const catchAsyncError = require("../middleware/catchAsyncError");
exports.newOrder = catchAsyncError(async (req, res, next) => {
  try {
    const {
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      totalPrice,
      shippingPrice,
    } = req.body;

    if (!req.user || !req.user._id) {
      throw new Error("User not authenticated");
    }

    const order = await Order.create({
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paidAt: Date.now(),
      user: req.user._id,
    });

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Error while creating order:", error); // Log error
    res
      .status(500)
      .json({ success: false, message: "Server error while saving order" });
  }
});

// get Single Order

exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler(404, "Order not found With This Id"));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// get logged in user Orders

exports.myOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  if (!orders) {
    return next(new ErrorHandler(404, "No Orders Found"));
  }
  res.status(200).json({
    success: true,
    orders,
  });
});

// get all orders  -- Admin

exports.getAllOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  if (!orders) {
    return next(new ErrorHandler(404, "No Orders Found"));
  }
  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

// update Order Status -- Admin

exports.updateOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler(404, "Order not found With This Id"));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("You have already delivered this order", 400));
  }

  // Use map to create an array of promises and then pass it to Promise.all
  await Promise.all(
    order.orderItems.map(async (item) => {
      await updateStock(item.product, item.quantity); // Use item.product instead of item.Product
    })
  );

  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "Order updated successfully",
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.Stock -= quantity;
  await product.save();
}

// Delete Order  --Admin

exports.deleteOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler(404, "Order not found With This Id"));
  }

  // Delete the order using deleteOne
  await order.deleteOne();

  res.status(200).json({
    success: true,
    message: "Order deleted successfully",
  });
});
