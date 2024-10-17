// src/components/Admin/UsersList.jsx

import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid"; // Updated import for DataGrid
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom"; // Removed useParams
import { toast } from "react-toastify"; // Updated import for toast notifications
import { Button } from "@mui/material"; // Updated import for Button
import MetaData from "../layout/MetaData";
import EditIcon from "@mui/icons-material/Edit"; // Updated import for Icons
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "./Sidebar";
import { getAllUsers, clearErrors, deleteUser } from "../../actions/userAction";
import { DELETE_USER_RESET } from "../../constants/userConstants";

const UsersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate

  // Accessing users from the correct slice
  const { error, users } = useSelector((state) => state.allUsers);

  // Assuming delete actions are in allUsers slice; adjust if different
  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.allUsers); // Changed from state.profile

  const deleteUserHandler = (id) => {
    // Optional: Confirm deletion with the user
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id));
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success(message);
      navigate("/admin/users"); // Using navigate instead of history.push
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [dispatch, error, deleteError, navigate, isDeleted, message]);

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },

    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "role",
      headerName: "Role",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) =>
        params.value === "admin" ? "greenColor" : "redColor",
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      sortable: false,
      renderCell: (params) => {
        const userId = params.row.id; // Extract id from row data
        console.log("Row ID for deletion:", userId); // Added log for debugging

        return (
          <>
            <Link to={`/admin/user/${userId}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() => deleteUserHandler(userId)}
              color="secondary" // Optional: Add color for better UI
            >
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id, // Ensure _id exists and is correctly populated
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });

  return (
    <>
      <MetaData title={`ALL USERS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </>
  );
};

export default UsersList;
