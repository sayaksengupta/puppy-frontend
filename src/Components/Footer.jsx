import React from "react";
import "../css/style.css";
import "../css/animate.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <div
        className="container-fluid pt-4 mt-5"
        style={{ backgroundColor: "#3d2121", overflow: "hidden" }}
      >
        {/* Footer */}
        <footer className="text-center text-lg-start text-white">
          {/* Section: Links  */}
          <section className>
            <div className="container text-center text-md-start mt-5">
              {/* Grid row */}
              <div className="row mt-3">
                {/* Grid column */}
                <div
                  className="col-md-6 col-lg-3 col-xl-3 mx-auto mb-4"
                  style={{ textAlign: "left" }}
                >
                  {/* Content */}
                  <Link to="/">
                    <img src="./images/logo1.png" alt="logo" width={200} />
                  </Link>
                  <p className="text-light">
                    we believe that every pet deserves to be treated with care,
                    compassion, and respect, and we are committed to creating a
                    positive experience for every customer who
                    visits&nbsp;our&nbsp;shop.
                  </p>
                  <ul class="ftco-footer-social d-flex ml-lg-n5 mt-2">
                    <li class="ftco-animate fadeInUp ftco-animated">
                      <a
                        href="#"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Facebook"
                      >
                        <img
                          src="./images/facebook.png"
                          alt=""
                          srcset=""
                          style={{
                            height: "25px",
                            width: "25px",
                            display: "block",
                            float: "left",

                            position: "relative",
                          }}
                        />
                      </a>
                    </li>
                    <li class="ftco-animate fadeInUp ftco-animated">
                      <a
                        href="#"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Instagram"
                      >
                        <img
                          src="./images/instagram.png"
                          alt=""
                          srcset=""
                          style={{
                            height: "25px",
                            width: "25px",
                            display: "block",
                            float: "left",

                            position: "relative",
                          }}
                        />
                      </a>
                    </li>
                    <li class="ftco-animate fadeInUp ftco-animated">
                      <a
                        href="#"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Twitter"
                      >
                        <img
                          src="./images/youtube.png"
                          alt=""
                          srcset=""
                          style={{
                            height: "25px",
                            width: "25px",
                            display: "block",
                            float: "left",

                            position: "relative",
                          }}
                        />
                      </a>
                    </li>

                    <li class="ftco-animate fadeInUp ftco-animated">
                      <a
                        href="#"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Twitter"
                      >
                        <img
                          src="./images/twitter.png"
                          alt=""
                          srcset=""
                          style={{
                            height: "25px",
                            width: "25px",
                            display: "block",
                            float: "left",
                            position: "relative",
                          }}
                        />
                      </a>
                    </li>
                    <li class="ftco-animate fadeInUp ftco-animated">
                      <a
                        href="#"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Twitter"
                      >
                        <img
                          src="./images/google-plus.png"
                          alt=""
                          srcset=""
                          style={{
                            height: "25px",
                            width: "25px",
                            display: "block",
                            float: "left",
                            position: "relative",
                          }}
                        />
                      </a>
                    </li>
                    <li class="ftco-animate fadeInUp ftco-animated">
                      <a
                        href="#"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Twitter"
                      >
                        <img
                          src="./images/linkedin.png"
                          alt=""
                          srcset=""
                          style={{
                            height: "25px",
                            width: "25px",
                            display: "block",
                            float: "left",
                            position: "relative",
                          }}
                        />
                      </a>
                    </li>
                  </ul>
                </div>
                {/* Grid column */}
                {/* Grid column */}
                <div
                  className="col-md-6 col-lg-3 col-xl-3 mx-auto mb-4"
                  style={{ textAlign: "left" }}
                >
                  {/* Links */}
                  <h6 className="text-uppercase text-white fw-bold">
                    Quick Links
                  </h6>
                  <hr
                    className="mb-4 mt-0 d-inline-block mx-auto"
                    style={{
                      width: "60px",
                      backgroundColor: "#C52F30",
                      height: "2px",
                    }}
                  />
                  <p>
                    <a href="index.html" className="text-white">
                      Home
                    </a>
                  </p>
                  <p>
                    <a href="about-us.html" className="text-white">
                      About Us
                    </a>
                  </p>
                  <p>
                    <a href="list-a-puppy.html" className="text-white">
                      List A Puppy
                    </a>
                  </p>
                  <p>
                    <a href="puppies_for_sale.html" className="text-white">
                      Find A Puppy
                    </a>
                  </p>
                  <p>
                    <a href="breed-matchmaker.html" className="text-white">
                      Breed Matcher
                    </a>
                  </p>
                </div>
                {/* Grid column */}
                {/* Grid column */}
                <div
                  className="col-md-6 col-lg-3 col-xl-3 mx-auto mb-4"
                  style={{ textAlign: "left" }}
                >
                  {/* Links */}
                  <h6 className="text-uppercase fw-bold text-white">
                    Customer
                  </h6>
                  <hr
                    className="mb-4 mt-0 d-inline-block mx-auto"
                    style={{
                      width: "60px",
                      backgroundColor: "#C52F30",
                      height: "2px",
                    }}
                  />
                  <p>
                    <a href="login.html" className="text-white">
                      Login
                    </a>
                  </p>
                  <p>
                    <a href="signup-1.html" className="text-white">
                      SignUp
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-white">
                      Support
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-white">
                      Help
                    </a>
                  </p>
                </div>
                {/* Grid column */}
                {/* Grid column */}
                <div
                  className="col-md-6 col-lg-3 col-xl-3  mx-auto mb-md-0 mb-4"
                  style={{ textAlign: "left" }}
                >
                  {/* Links */}
                  <h6 className="text-uppercase text-white fw-bold">
                    Contacts
                  </h6>
                  <hr
                    className="mb-4 mt-0 d-inline-block mx-auto"
                    style={{
                      width: "60px",
                      backgroundColor: "#C52F30",
                      height: "2px",
                    }}
                  />
                  <p className=" text-white">
                    <i className="fa fa-home mr-3" /> Waikoloa Beach Resort,
                    Unit D-8 250 Waikoloa&nbsp;Beach
                  </p>
                  <p className="text-white">
                    <i className="fa fa-envelope mr-3 " /> info@example.com
                  </p>
                  <p className=" text-white">
                    <i className="fa fa-phone mr-3" /> + 01 234 567 88
                  </p>
                  <p className=" text-white">
                    <i className="fa fa-print mr-3" /> + 01 234 567 89
                  </p>
                </div>
                {/* Grid column */}
              </div>
              {/* Grid row */}
            </div>
          </section>
          {/* Section: Links  */}
          {/* Copyright */}
          <div
            className="text-center p-3"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
          >
            MyPuppy Pro © 2023 Copyright | Designed by{" "}
            <a className="text-white text-danger" href="#">
              DigitalMitro
            </a>
          </div>
          {/* Copyright */}
        </footer>
        {/* Footer */}
      </div>
    </>
  );
}

export default Footer;
