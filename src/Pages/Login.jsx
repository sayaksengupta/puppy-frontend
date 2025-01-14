import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import Footer2 from "../Components/Footer2";
import Navbar from "../Components/Navbar";
import "../css/login.css";

function Login() {
  const navigate = useNavigate();

  const [loginUser, setLoginUser] = useState({
    email: "",
    phone: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const input = e.target.value;

    // Regular expression for email validation
    const emailRegex = /^[A-Za-z0-9+_.-]+@(.+)$/;

    // Regular expression for phone number validation
    const phoneRegex = /^\d{10}$/; // Modify this regex as needed for your phone number format

    if (input === "") {
      // If the input is empty, clear both email and phone
      setLoginUser({ ...loginUser, email: "", phone: "" });
    } else if (emailRegex.test(input)) {
      // It's an email
      setLoginUser({ ...loginUser, email: input, phone: "" });
      setError("");
    }
    // else if (phoneRegex.test(input)) {
    //   // It's a phone number
    //   setLoginUser({ ...loginUser, email: "", phone: input });
    // }
    else {
      setError("Invalid Email Address !");
      // Neither email nor phone number
      setLoginUser({ ...loginUser, email: "", phone: "" });
    }
  };

  const login = async (e) => {
    e.preventDefault();
    if (loginUser.phone === "") {
      delete loginUser.phone;
    } else if (loginUser.email === "") {
      delete loginUser.email;
    }
    await axios
      .post(`${process.env.REACT_APP_BASE_URL}user/login-web`, loginUser)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("token", res.data.token);
        navigate("/");
      })
      .catch((e) => {
        console.log(e);
        alert("Invalid Credentials !");
      });
  };

  return (
    <>
      <Navbar />

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-7 mb-5">
            <img
              src="./images/login.jpg"
              alt=""
              style={{
                borderRadius: "25px",
                width: "100%",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              }}
              srcSet
            />
          </div>
          <div className="col-md-5" style={{ margin: "auto" }}>
            <p
              className="mb-lg-5 login-title"
              style={{ fontSize: "1.6rem", fontWeight: 700, color: "#351911" }}
            >
              Login into MyPuppy Pro
            </p>
            <div className="tab-content">
              <div
                className="tab-pane fade show active"
                id="pills-login"
                role="tabpanel"
                aria-labelledby="tab-login"
              >
                <form onSubmit={login}>
                  {/* Email input */}
                  <div
                    className={
                      error ? "form-outline lg-4" : "form-outline mb-lg-4"
                    }
                  >
                    <label
                      className="form-label font-weight-bold"
                      htmlFor="loginName"
                    >
                      Email
                    </label>
                    <input
                      type="text"
                      id="loginName"
                      required
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  {error && (
                    <p style={{ color: "red", marginTop: "0" }}>{error}</p>
                  )}
                  {/* Password input */}
                  <div className="form-outline mb-2">
                    <label
                      className="form-label font-weight-bold"
                      htmlFor="loginPassword"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="loginPassword"
                      required
                      value={loginUser.password}
                      onChange={(e) =>
                        setLoginUser({ ...loginUser, password: e.target.value })
                      }
                      className="form-control"
                    />
                  </div>

                  <p className="my-2" style={{ fontSize: "0.7rem" }}>
                    <input className="mr-1 mt-2" type="checkbox" checked />
                    By logging in to your MyPuppyPro.com account, you affirm
                    that you have read, understand, and agree to the{" "}
                    <Link to="/terms">Terms of Use</Link> and{" "}
                    <Link to="/privacy-policy">Privacy Policy.</Link>
                  </p>

                  {/* 2 column grid layout */}
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    {/* Checkbox */}
                    <div className="form-check mb-0">
                      <input
                        className="form-check-input me-2"
                        style={{ width: "19px", height: "19px" }}
                        type="checkbox"
                        defaultValue
                        id="form2Example3"
                      />
                      <label
                        className="form-check-label font-weight-bold"
                        htmlFor="form2Example3"
                      >
                        Remember me
                      </label>
                    </div>
                    <a
                      href="#!"
                      className="text-body font-weight-bold"
                      style={{ color: "#351911 !important" }}
                    >
                      Forgot password?
                    </a>
                  </div>
                  {/* Submit button */}
                  <button
                    type="submit"
                    className="btn btn-primary btn-block mb-2"
                  >
                    <strong> Login</strong>
                  </button>
                  {/* Register buttons */}
                  <div className="text-center font-weight-bold">
                    <p>
                      Don't have an account?{" "}
                      <Link
                        to="/register-select"
                        style={{ color: "#351911", fontWeight: "bold" }}
                      >
                        Click here to SignUp.
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
            {/* Pills content */}
          </div>
        </div>
      </div>
      <Footer2 />
    </>
  );
}

export default Login;
