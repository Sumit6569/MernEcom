/*
 ** Author: Sumit 
 ** 
 ** Github URL: https://github.com/Sumit6569
 */

import React from "react";
import Banner1 from "../../images/banner_1.jpg";
import Banner2 from "../../images/banner_2.jpg";
import Banner3 from "../../images/banner_3.jpg";
 import "./CategoryBanner.css"; 
 import { Link } from "react-router-dom";
function CategoryBanner(props) {
  return (
    <div className="bannerincat">
      <div className="containerinbanner">
        <div className="row">
          <div className="col-md-4">
            <div
              className="test1 banner_item align-items-center"
              style={{
                backgroundImage: `url(${Banner1})`,
              }}
              data-aos="fade-right"
            >
              <div className="banner_category">
                <Link to="/products">Womens</Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div
              className="banner_item align-items-center"
              style={{
                backgroundImage: `url(${Banner2})`,
              }}
              data-aos="fade-up"
            >
              <div className="banner_category">
                <Link to="/products">accessories's</Link>
                
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div
              className="banner_item align-items-center"
              style={{
                backgroundImage: `url(${Banner3})`,
              }}
              data-aos="fade-left"
            >
              <div className="banner_category">
                <Link to="/products">Men's</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryBanner;
