import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/navbar.css";

function Navbar({ openSideNav, setOpenSideNav }) {
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
    // <>
    //   <nav
    //     className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light"
    //     id="ftco-navbar"
    //     style={openSideNav ? { position: "fixed", width: "100%" } : null}
    //     // style={{ position: "fixed", width: "100%" }}
    //   >
    //     <div className="container-fluid mx-5">
    //       <Link className="navbar-brand" to="/">
    //         <img
    //           src="/logo.png"
    //           className="mr-2"
    //           width={100}
    //           height={90}
    //           style={{objectFit:"contain"}}
    //           alt
    //           srcSet
    //         />
    //       </Link>
    //       <button
    //         className="navbar-toggler"
    //         type="button"
    //         data-toggle="collapse"
    //         data-target="#ftco-nav"
    //         aria-controls="ftco-nav"
    //         aria-expanded="false"
    //         aria-label="Toggle navigation"
    //       >
    //         <span style={{ fontSize: 25 }} className="fa fa-bars" />
    //       </button>
    //       <div className="collapse navbar-collapse" id="ftco-nav">
    //         <ul className="navbar-nav ml-auto">
    //           <li
    //             className={`${
    //               location.pathname === "/" ? "nav-item active" : "nav-item"
    //             }`}
    //           >
    //             <Link to="/" className="nav-link">
    //               Home
    //             </Link>
    //           </li>
    //           <li
    //             className={`${
    //               location.pathname === "/about-us"
    //                 ? "nav-item active"
    //                 : "nav-item"
    //             }`}
    //           >
    //             <Link to="/about-us" className="nav-link">
    //               About Us
    //             </Link>
    //           </li>
    //           {UserLoggedIn?.type === "breeder" && (
    //             <li
    //               className={`${
    //                 location.pathname === "/list-puppy"
    //                   ? "nav-item active"
    //                   : "nav-item"
    //               }`}
    //             >
    //               <Link to="/list-puppy" className="nav-link">
    //                 List a Puppy
    //               </Link>
    //             </li>
    //           )}
    //           <li
    //             className={`${
    //               location.pathname === "/find-puppy"
    //                 ? "nav-item active"
    //                 : "nav-item"
    //             }`}
    //           >
    //             <Link to="/find-puppy" className="nav-link">
    //               Find a Puppy
    //             </Link>
    //           </li>
    //           <li
    //             className={`${
    //               location.pathname === "/breed-matchmaker"
    //                 ? "nav-item active"
    //                 : "nav-item"
    //             }`}
    //           >
    //             <Link to="/breed-matchmaker" className="nav-link">
    //               Breed Matcher
    //             </Link>
    //           </li>
    //           {/* <li className="nav-item">
    //             <a href="gallery.html" className="nav-link">
    //               Wishlist
    //             </a>
    //           </li> */}

    //           {UserLoggedIn?.type == "customer" && (
    //             <li
    //               className={`${
    //                 location.pathname === "/wishlist"
    //                   ? "nav-item active"
    //                   : "nav-item"
    //               }`}
    //             >
    //               <Link to="/wishlist" className="nav-link">
    //                 Wishlist
    //               </Link>
    //             </li>
    //           )}
    //           {!UserLoggedIn ? (
    //             <>
    //               <li
    //                 className={`${
    //                   location.pathname === "/login" || "/register" || "/"
    //                     ? "nav-item active"
    //                     : "nav-item"
    //                 }`}
    //               >
    //                 <Link to="/login" className="nav-link text-success">
    //                   Login/Signup
    //                 </Link>
    //               </li>
    //             </>
    //           ) : (
    //             UserLoggedIn?.type === "breeder" && (
    //               <>
    //                 <li
    //                   className={`${
    //                     location.pathname === "/breeder-profile"
    //                       ? "nav-item active"
    //                       : "nav-item"
    //                   }`}
    //                 >
    //                   <Link to="/breeder-profile" className="nav-link">
    //                     Profile
    //                   </Link>
    //                 </li>
    //                 <li
    //                   className={`${
    //                     location.pathname === "/add-pedigree"
    //                       ? "nav-item active"
    //                       : "nav-item"
    //                   }`}
    //                 >
    //                   <Link to="/add-pedigree" className="nav-link">
    //                     Pedigree
    //                   </Link>
    //                 </li>
    //               </>
    //             )
    //           )}
    //           {UserLoggedIn && (
    //             <li
    //               className={`${
    //                 location.pathname === "/login" || "/register" || "/"
    //                   ? "nav-item active"
    //                   : "nav-item"
    //               }`}
    //             >
    //               <Link
    //                 to=""
    //                 style={{ cursor: "pointer" }}
    //                 onClick={logout}
    //                 className="nav-link text-danger"
    //               >
    //                 Logout
    //               </Link>
    //             </li>
    //           )}
    //           {location.pathname !== "/login" &&
    //             location.pathname !== "/register" &&
    //             location.pathname !== "/register-select" && (
    //               <li
    //                 className="nav-item"
    //                 style={{
    //                   display: "flex",
    //                   justifyContent: "center",
    //                   alignItems: "center",
    //                 }}
    //               >
    //                 {openSideNav ? (
    //                   <i
    //                     style={{ fontSize: "1.5rem", cursor: "pointer" }}
    //                     className="fa fa-times ml-3"
    //                     onClick={() => setOpenSideNav(false)}
    //                   ></i>
    //                 ) : (
    //                   <i
    //                     style={{ fontSize: "1.5rem", cursor: "pointer" }}
    //                     className="fa fa-bars ml-3"
    //                     onClick={() => setOpenSideNav(true)}
    //                   ></i>
    //                 )}
    //               </li>
    //             )}
    //         </ul>
    //       </div>
    //     </div>
    //   </nav>
    // </>

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
            <div className="nav-btns">
              <Link to="/">
                <button className="btn-1">Find a Puppy</button>
              </Link>
              {UserLoggedIn?.type === "breeder" && (
                <Link to="/list-puppy">
                  <button className="btn-2">List a Puppy</button>
                </Link>
              )}
            </div>
          </div>

          <ul className="desktop-nav-items">
            <li className="active">
              <Link
                to="/"
                className={`${location.pathname === "/" ? "active" : ""}`}
                style={{ textDecoration: "none" }}
              >
                Home
              </Link>
            </li>
            <li>
              {" "}
              <Link
                to="/about-us"
                className={`${
                  location.pathname === "/about-us" ? "active" : ""
                }`}
                style={{ textDecoration: "none" }}
              >
                About Us{" "}
              </Link>
            </li>
            {/* <li>
              {" "}
              <Link
                to="/breed-matchmaker"
                className={`${
                  location.pathname === "/breed-matchmaker" ? "active" : ""
                }`}
                style={{ textDecoration: "none" }}
              >
                Breed Matcher
              </Link>
            </li> */}
            {UserLoggedIn?.type == "customer" && (
              <li>
                <Link
                  to="/wishlist"
                  className={`${
                    location.pathname === "/wishlist" ? "active" : ""
                  }`}
                >
                  Wishlist
                </Link>
              </li>
            )}
            {!UserLoggedIn ? (
              <>
                <li
                  className={`${
                    location.pathname === "/login" || "/register" || "/"
                      ? "active"
                      : ""
                  }`}
                >
                  <Link to="/login">Login/Signup</Link>
                </li>
              </>
            ) : (
              UserLoggedIn?.type === "breeder" && (
                <>
                  <li>
                    <Link
                      to="/breeder-profile"
                      className={`${
                        location.pathname === "/breeder-profile" ? "active" : ""
                      }`}
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/add-pedigree"
                      className={`${
                        location.pathname === "/add-pedigree" ? "active" : ""
                      }`}
                    >
                      Pedigree
                    </Link>
                  </li>
                </>
              )
            )}
            {UserLoggedIn && (
              <li
                className={`${
                  location.pathname === "/login" || "/register" || "/"
                    ? "active"
                    : ""
                }`}
              >
                <Link
                  to=""
                  style={{ cursor: "pointer" }}
                  onClick={logout}
                  className="text-danger"
                >
                  Logout
                </Link>
              </li>
            )}
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

          <ul className="mobile-nav-items">
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

export default Navbar;
