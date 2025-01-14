import React from "react";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import Footer2 from "../Components/Footer2";
import Navbar from "../Components/Navbar";
import "../css/RegisterSelect.css";

function RegisterSelect() {
  return (
    <>
      <Navbar />

      <div className="profile__creation">
        <div className="wrapper">
          <div className="creat_button">
            <Link to="/register">Create a Breeder Profile </Link>
          </div>
          <div className="creat_button">
            <Link to="/register" state={{sellPuppy: true}}>Sell a Puppy </Link>
          </div>
          <div className="creat_button">
            <Link to="/register-customer">Create a Customer Profile </Link>
          </div>
        </div>
      </div>
      <Footer2 />
    </>
  );
}

export default RegisterSelect;
