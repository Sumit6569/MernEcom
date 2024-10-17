// Sidebar.jsx

import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  ExpandLess,
  ExpandMore,
  PostAdd as PostAddIcon,
  Add as AddIcon,
  ListAlt as ListAltIcon,
  People as PeopleIcon,
  RateReview as RateReviewIcon,
} from "@mui/icons-material";
import "./sidebar.css";
import logo from "../../images/logo.png";

const Sidebar = () => {
  const [openProducts, setOpenProducts] = useState(false);

  const handleProductsClick = () => {
    setOpenProducts(!openProducts);
  };

  return (
    <div className="sidebar">
      {/* Logo Section */}
      <Link to="/" className="sidebarLogo">
        <img src={logo} alt="Ecommerce" />
      </Link>

      {/* Navigation List */}
      <List component="nav" className="sidebarList">
        {/* Dashboard Link */}
        <ListItem button component={Link} to="/admin/dashboard">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        {/* Products with Collapse */}
        <ListItem button onClick={handleProductsClick}>
          <ListItemIcon>
            <PostAddIcon />
          </ListItemIcon>
          <ListItemText primary="Products" />
          {openProducts ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openProducts} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              button
              component={Link}
              to="/admin/products"
              className="nestedListItem"
            >
              <ListItemIcon>
                <PostAddIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="All Products" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/admin/product"
              className="nestedListItem"
            >
              <ListItemIcon>
                <AddIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Create Product" />
            </ListItem>
          </List>
        </Collapse>

        {/* Orders Link */}
        <ListItem button component={Link} to="/admin/orders">
          <ListItemIcon>
            <ListAltIcon />
          </ListItemIcon>
          <ListItemText primary="Orders" />
        </ListItem>

        {/* Users Link */}
        <ListItem button component={Link} to="/admin/users">
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>

        {/* Reviews Link */}
        <ListItem button component={Link} to="/admin/reviews">
          <ListItemIcon>
            <RateReviewIcon />
          </ListItemIcon>
          <ListItemText primary="Reviews" />
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;
