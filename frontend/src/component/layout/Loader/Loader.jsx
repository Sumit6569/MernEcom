import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="loading">
      <div className="spinner"></div>{" "}
      {/* Spinner element for better visibility */}
    </div>
  );
};

export default Loader;
