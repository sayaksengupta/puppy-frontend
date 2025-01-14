import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/navbar.css";

function MobileNavbar({ openSideNav, setOpenSideNav }) {
  const location = useLocation();
  console.log(location.pathname);

  const UserLoggedIn = JSON.parse(localStorage.getItem("user"));

  console.log(UserLoggedIn);

  const token = localStorage.getItem("token");

  const logout = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}user/logout`, {
        headers: { token },
      })
      .then((res) => {
        console.log(res.data);
        // alert("Logged out successfully !");
        localStorage.clear();
        sessionStorage.clear();
        window.location.replace("/");
      })
      .catch((e) => {
        console.log(e);
        localStorage.clear();
        sessionStorage.clear();
        window.location.replace("/");
      });
  };

  return (
    <>
      <header>
        <nav>
          <div
            className="logo-btn-container"
            style={{ marginLeft: "1rem", marginRight: "1rem" }}
          >
            <Link to="/">
              <div className>
                <img className="logo" src="./logo.png" alt="logo" />
                <h2
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 500,
                    fontSize: "1.5em",
                    margin: 0,
                  }}
                >
                  MyPuppyPro.com
                </h2>
              </div>
            </Link>
          </div>

          <ul className="desktop-nav-items">
            {location.pathname !== "/login" &&
              location.pathname !== "/register" &&
              location.pathname !== "/register-select" && (
                <li
                  className=""
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {openSideNav ? (
                    <i
                      style={{ fontSize: "1.5rem", cursor: "pointer" }}
                      className="fa fa-times ml-3"
                      onClick={() => setOpenSideNav(false)}
                    ></i>
                  ) : (
                    <i
                      style={{ fontSize: "1.5rem", cursor: "pointer" }}
                      className="fa fa-bars ml-3"
                      onClick={() => setOpenSideNav(true)}
                    ></i>
                  )}
                </li>
              )}
          </ul>
        </nav>
      </header>
    </>
  );
}

export default MobileNavbar;
