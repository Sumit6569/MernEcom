// File: frontend/src/components/Product/Search.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import MetaData from "../layout/MetaData";
import "./Search.css";

function Search() {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    const trimmedKeyword = keyword.trim();
    if (trimmedKeyword) {
      navigate(`/products/${encodeURIComponent(trimmedKeyword)}`);
    } else {
      navigate("/products");
    }
  };

  return (
    <>
      <MetaData title="Search A Product -- ECOMMERCE" />
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search a Product ..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          aria-label="Search Products"
        />
        <input type="submit" value="Search" aria-label="Submit Search" />
      </form>
    </>
  );
}

export default Search;
