// File: frontend/src/components/Home/Home.jsx

import React, { useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import ProductCard from "./ProductCard";
import MetaData from "../layout/MetaData";
import { getProduct } from "../../actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import SliderComponent from "../Slider/Slider"; // Renamed for clarity
import Search from "../Product/Search.jsx";
import Footer from "../Footer/Footer.jsx";
function Home() {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);
 const { isAuthenticated, user } = useSelector((state) => state.user);
  // Fetch all products on component mount
  useEffect(() => {
    dispatch(getProduct({})); // Pass an empty object to fetch all products
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="ECOMMERCE" />

          {/* Login/Signup Button */}

          {/* Banner Section */}
          <div className="banner">
            {/* New Button Above Search Bar */}

            {/* Slider Component */}
            <SliderComponent />

            <div className="top-button-container">
              <Link to="/login">
                <button className="login-signup-button">Login/Signup</button>
              </Link>
            </div>
            {/* Search Box */}
            <Search />
          </div>

          {/* Featured Products */}
          <h2 className="homeHeading">Featured Products</h2>
          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default Home;
