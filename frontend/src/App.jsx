import { useEffect } from "react";
import "./App.css";
import Header from "./component/layout/Header/Header.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WebFont from "webfontloader";
import Footer from "./component/Footer/Footer.jsx";
import Home from "./component/Home/Home.jsx";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products.jsx";
import Search from "./component/Product/Search.jsx";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginSignUp from "./component/User/LoginSignUp.jsx";

import store from "./store.jsx";
import { loadUser } from "./actions/userAction.jsx";
import UserOptions from "./component/layout/Header/UserOptions.jsx";
import Profile from "./component/User/Profile.jsx";
import ProtectedRoute from "./component/Route/ProtectedRoute.jsx";

import UpdateProfile from "./component/User/UpdateProfile.jsx";
import UpdatePassword from "./component/User/UpdatePassword.jsx";
import ForgotPassword from "./component/User/ForgotPassword.jsx";
import Cart from "./component/Cart/Cart.jsx";
import { useSelector } from "react-redux";
import Shipping from "./component/Cart/Shipping.jsx";
import ConfirmOrder from "./component/Cart/ConfirmOrder.jsx";
import OrderSuccess from "./component/Cart/OrderSuccess.jsx";
import MyOrders from "./component/Order/MyOrders.jsx";
import OrderDetails from "./component/Order/OrderDetails.jsx";
import Dashboard from "./component/Admin/Dashboard.jsx";
import ProductList from "./component/Admin/ProductList.jsx";
import UsersList from "./component/Admin/UsersList.jsx";
import OrderList from "./component/Admin/OrderList.jsx";
import NewProduct from "./component/Admin/NewProduct.jsx";
import Contact from "./component/Contact.jsx";
import About from "./component/About.jsx";
function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    WebFont.load({
      google: {
        families: [
          "Poppins:300,400,500,600,700",
          "Montserrat:300,400,500,600,700",
        ],
      },
    });

    store.dispatch(loadUser());
  }, []); // Added an empty dependency array to run useEffect only once

  return (
    <Router>
      <>
        
          <Header />
          
      </>

      {isAuthenticated && <UserOptions user={user} />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/about" element={<About />} />
        <Route
          path="/account"
          element={<ProtectedRoute element={<Profile />} />}
        />{" "}
        <Route exact path="/login" element={<LoginSignUp />} />{" "}
        <Route
          path="/me/update"
          element={<ProtectedRoute element={<UpdateProfile />} />}
        />{" "}
        <Route
          path="/password/update"
          element={<ProtectedRoute element={<UpdatePassword />} />}
        />{" "}
        <Route exact path="/password/forgot" element={<ForgotPassword />} />{" "}
        <Route exact path="/cart" element={<Cart />} />{" "}
        <Route
          path="/shipping"
          element={<ProtectedRoute element={<Shipping />} />}
        />{" "}
        <Route exact path="/order/confirm" element={<ConfirmOrder />} />{" "}
        <Route exact path="/Success" element={<OrderSuccess />} />
        <Route exact path="/orders" element={<MyOrders />} />
        <Route exact path="/order/:id" element={<OrderDetails />} />
        <Route
          isAdmin={true}
          path="/admin/dashboard"
          element={<ProtectedRoute element={<Dashboard />} />}
        />{" "}
        <Route
          isAdmin={true}
          path="/admin/products"
          element={<ProtectedRoute element={<ProductList />} />}
        />{" "}
        <Route
          isAdmin={true}
          path="/admin/users"
          element={<ProtectedRoute element={<UsersList />} />}
        />{" "}
        <Route
          isAdmin={true}
          path="/admin/orders"
          element={<ProtectedRoute element={<OrderList />} />}
        />{" "}
        <Route
          isAdmin={true}
          path="/admin/product"
          element={<ProtectedRoute element={<NewProduct />} />}
        />{" "}
      </Routes>

      <ToastContainer />
    </Router>
  );
}

export default App;
