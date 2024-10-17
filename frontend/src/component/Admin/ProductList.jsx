// src/components/Admin/ProductList.jsx

import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid"; // Updated import
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAdminProduct,
  deleteProduct,
} from "../../actions/productActions.jsx";
import { NavLink, useNavigate } from "react-router-dom"; // Updated import
import { toast } from "react-toastify"; // Import toast
import { Button } from "@mui/material"; // Updated import
import MetaData from "../layout/MetaData";
import EditIcon from "@mui/icons-material/Edit"; // Updated import
import DeleteIcon from "@mui/icons-material/Delete"; // Updated import
import SideBar from "./Sidebar";

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate

  // Selectors
  const { error, products } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  // Handler to delete a product
  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    // Handle errors
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    // Handle successful deletion
    if (isDeleted) {
      toast.success("Product Deleted Successfully");
      navigate("/admin/dashboard"); // Use navigate instead of history.push
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    // Fetch all admin products
    dispatch(getAdminProduct());
  }, [dispatch, error, deleteError, isDeleted, navigate]);

  // Define columns for DataGrid
  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <NavLink to={`/admin/product/${params.row.id}`}>
              <EditIcon style={{ color: "blue", marginRight: "10px" }} />
            </NavLink>

            <Button
              onClick={() => deleteProductHandler(params.row.id)}
              color="error"
            >
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];

  // Prepare rows for DataGrid
  const rows = [];

  if (products && Array.isArray(products)) {
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.Stock,
        price: item.price,
        name: item.name,
      });
    });
  }

  return (
    <>
      <MetaData title={`ALL PRODUCTS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </>
  );
};

export default ProductList;
