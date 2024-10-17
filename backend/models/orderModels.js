// const mongoose = require("mongoose");

// const orderSchema = new mongoose.Schema({
//   shippingInfo: {
//     address: {
//       type: String,
//       required: true,
//     },
//     city: {
//       type: String,
//       required: true,
//     },
//     state: {
//       type: String,
//       required: true,
//     },
//     country: {
//       type: String,
//       required: true,
//     },
//     pinCode: {
//       type: String, // number tha
//       required: true,
//     },
//     // phoneNo: {
//     //   type: Number,
//     //   required: true,
//     // },
//     phoneNo: {
//       type: String, // Changed to String
//       required: true,
//       validate: {
//         validator: function (v) {
//           return /^\d{10}$/.test(v); // Example validation for 10-digit phone numbers
//         },
//         message: (props) => `${props.value} is not a valid phone number!`,
//       },
//     },
//   },

//   orderItems: [
//     {
//       name: {
//         type: String,
//         required: true,
//       },
//       quantity: {
//         type: Number,
//         required: true,
//       },
//       price: {
//         type: Number,
//         required: true,
//       },
//       image: {
//         type: String,
//         required: true,
//       },
//       // product: {
//       //   type: mongoose.Schema.Types.ObjectId,
//       //   ref: "Product", // Ensure you're referencing the correct model
//       //   required: true,
//       // },
//       product: {
//         type: mongoose.Schema.ObjectId,
//         ref: "Product", // Reference the Product model
//         required: true,
//       },
//     },
//   ],
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   paymentInfo: {
//     id: {
//       type: String,
//       required: true,
//     },
//     status: {
//       type: String,
//       required: true,
//     },
//   },
//   paidAt: {
//     type: Date,
//     required: true,
//     default: Date.now,
//   },
//   itemPrice: {
//     type: Number,
//     required: true,
//     default: 0,
//   },
//   taxPrice: {
//     type: Number,
//     required: true,
//     default: 0,
//   },
//   shippingPrice: {
//     type: Number,
//     required: true,
//     default: 0,
//   },
//   totalPrice: {
//     type: Number,
//     required: true,
//     default: 0,
//   },
//   orderStatus: {
//     type: String,
//     required: true,
//     default: "Processing",
//   },
//   // deliverdAt: Date,
//   deliveredAt: {
//     // Corrected spelling
//     type: Date,
//   },

//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// module.exports = mongoose.model("Order", orderSchema);

const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  shippingInfo: {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    pinCode: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^\d{10}$/.test(v); // Example validation for 10-digit phone numbers
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
  },

  orderItems: [
    {
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
        default:
          "https://cdn.vectorstock.com/i/500p/46/50/missing-picture-page-for-website-design-or-mobile-vector-27814650.jpg", // <-- Added default value here
      },
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  paymentInfo: {
    id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  paidAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  itemPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  taxPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  orderStatus: {
    type: String,
    required: true,
    default: "Processing",
  },
  deliveredAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
