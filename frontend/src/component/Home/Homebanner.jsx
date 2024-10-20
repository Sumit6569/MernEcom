import React from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Image1 from "../../images/slider_1.jpg";
import Image2 from "../../images/slider_2.jpg";
import Image3 from "../../images/slider_3.jpg";
import "./Homebanner.css";

const Homebanner = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <div className="carousel-content">
          <div className="carousel-text">
            <h3>Spring / Summer Collection 2017</h3>
            <h1>Get up to 30% Off New Arrivals</h1>
            <a href="/products" className="shop-now">
              SHOP NOW
            </a>
          </div>
          <img className="carousel-image" src={Image1} alt="First slide" />
        </div>
      </Carousel.Item>

      <Carousel.Item>
        <div className="carousel-content">
          <div className="carousel-text">
            <h3>Spring / Summer Collection 2017</h3>
            <h1>Get up to 30% Off New Arrivals</h1>
            <a href="/products" className="shop-now">
              SHOP NOW
            </a>
          </div>
          <img className="carousel-image" src={Image2} alt="Second slide" />
        </div>
      </Carousel.Item>

      <Carousel.Item>
        <div className="carousel-content">
          <div className="carousel-text">
            <h3>Spring / Summer Collection 2024</h3>
            <h1>Get up to 30% Off New Arrivals</h1>
            <a href="/products" className="shop-now">
              SHOP NOW
            </a>
          </div>
          <img className="carousel-image" src={Image3} alt="Third slide" />
        </div>
      </Carousel.Item>
    </Carousel>
  );
};

export default Homebanner;
