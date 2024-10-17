import React from "react";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";

function ProductCard({ product }) {
    const defaultImageUrl =
      "https://redtape.com/cdn/shop/files/RSO4102_1_c0a68240-77e5-4003-8465-bff2bb2280a7.jpg?v=1719938886";

  const options = {
    value: product.ratings , // Provide a default value
    readOnly: true,
    precision: 0.5,
  };

  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img
        src={product.images[0]?.url || defaultImageUrl}
        alt={product.name}
      />
      <p>{product.name}</p>
      <div>
        <Rating {...options} />
        <span className="productCardSpan">
          ({product.numOfReviews} Reviews)
        </span>
      </div>
      <span>{`₹${product.price}`}</span>
    </Link>
  );
}

export default ProductCard;
