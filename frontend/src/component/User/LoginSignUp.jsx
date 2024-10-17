import React, { useRef, useState, useEffect } from "react";

import "./LoginSignUp.css";
import Loader from "../layout/Loader/Loader";
import { Link, redirect } from "react-router-dom";
import { FaEnvelope as MailOutlineIcon } from "react-icons/fa";
import { FaLock as LockOpenIcon } from "react-icons/fa";
import { FaUser as FaceIcon } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";

import { clearErrors, login, register } from "../../actions/userAction";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginSignUp() {
  const dispatch = useDispatch();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate(); // Initialize useNavigate hook
  const location = useLocation(); // Initialize useLocation hook

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  // const loginSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(login(loginEmail, loginPassword))
  //     .then(() => {
  //       toast.success("Login successful");
  //       const token = response.data.token; // Assuming your login action returns the token
  //       localStorage.setItem("token", token); // Store t
  //       navigate("/"); // Redirect or navigate to the desired route
  //     })
  //     .catch((error) => {
  //       toast.error("Login failed. Please try again.");
  //     });
  // };

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword))
      .then((response) => {
        // Handle response here
        // const token = response.data.token; // Assuming your login action returns the token
        if (response && response.success && response.token && response.user) {
          toast.success("Login successful");

          // Store the token in localStorage
           let token = response.token;
          localStorage.setItem("token", token);
          console.error("Login response", token);
          // Navigate to the homepage or desired route
          navigate("/");
        } else {
          console.error("Login response was invalid", response);
          toast.error("Login failed. Invalid response from server.");
        }
      })
      .catch((error) => {
        console.error("Login error:", error); // Log the error for debugging
        toast.error("Login failed. Please try again.");
      });
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Avatar:", avatar);

    const myForm = new FormData();
    console.log(" the foam data is ", myForm);
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    if (avatar) {
      myForm.append("avatar", avatar);
    } else {
      toast.error("Please select an avatar");
      return;
    }

    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();

        reader.onloadend = () => {
          setAvatarPreview(reader.result); // Update the preview
        };

        reader.readAsDataURL(file); // Read the file as a data URL

        // Set the actual file object for later use in form submission
        setAvatar(file);
      }
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const redirect = location.search ? location.search.split("=")[1] : "/account";

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [dispatch, error, isAuthenticated, redirect, navigate]);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="LoginSignUpContainer">
            <div className="LoginSignUpBox">
              <div>
                <div className="login_signUp_toggle">
                  <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                  <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                </div>
                <button ref={switcherTab}></button>
              </div>
              <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                <div className="loginEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <Link to="/contact">Forget Password ?</Link>
                <input type="submit" value="Login" className="loginBtn" />
              </form>
              <form
                className="signUpForm"
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div className="signUpName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                </div>

                <div id="registerImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
                <input type="submit" value="Register" className="signUpBtn" />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default LoginSignUp;
