import React, { useState } from "react";
import "./Header.css";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom"; // Updated import
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../actions/userAction"; // Ensure this path is correct
import { Box } from "@mui/material"; // Import Box
const UserOptions = ({ user }) => {
  const { cartItems } = useSelector((state) => state.cart);

  const [open, setOpen] = useState(false);
  const navigate = useNavigate(); // Updated to useNavigate
  const dispatch = useDispatch();

  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    {
      icon: (
        <ShoppingCartIcon
          style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
        />
      ),
     name: `Cart(${cartItems.length})`,
      func: cart,
    },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    navigate("/admin/dashboard"); // Updated to useNavigate
  }

  function orders() {
    navigate("/orders"); // Updated to useNavigate
  }

  function account() {
    navigate("/account"); // Updated to useNavigate
  }

  function cart() {
    navigate("/cart"); // Updated to useNavigate
  }
function logoutUser() {
  dispatch(logout())
    .then(() => {
      toast.success("Logout successful");
      navigate("/"); // Redirect or navigate to the desired route
    })
    .catch((error) => {
      toast.error("Logout failed. Please try again.");
    });
}


  return (
    <>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: "11" }}
        open={open}
        direction="down"
        className="speedDial"
        icon={
          <>
            <Box
              sx={{
                backgroundColor: "#f0f0f0", // Background color
                borderRadius: "50%", // Circular background
                padding: "8px", // Padding to fit the icon
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                className="speedDialIcon"
                src={"/Profile.png"}
                alt="Profile"
               
              />
            </Box>
          </>
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600}
          />
        ))}
      </SpeedDial>
      {/* Add ToastContainer to render toasts */}
    </>
  );
};

export default UserOptions;
