import React from "react";
import { Link } from "react-router-dom";

function Footer2() {
  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-3 mb-4 mb-md-0">
              <div className="d-flex">
                <img src="images/logo.jpg" alt="logo" srcSet width={200} />
              </div>
              <p className="footer-tex">Find a Puppy</p>
              <Link to="/find-puppy" className="footer-mini-text">
                View all puppies
              </Link>
              <br />
              <Link to="/find-puppy" className="footer-mini-text">
                View all Collections
              </Link>
              <div className="d-flex">
                <Link to="/breed-matchmaker">
                  <button
                    className="btn btn-dark mt-1"
                    style={{ borderRadius: 20 }}
                  >
                    Breed match Quiz
                  </button>
                </Link>
              </div>
              <ul className="ftco-footer-social d-flex justify-content-center mt-2">
                <li className="ftco-animate m-1 fadeInUp ftco-animated">
                  <img
                    className="footer_icon"
                    src="images/footer_images/facebook.png"
                    alt
                    srcSet
                    width={35}
                    height={35}
                  />
                </li>
                <li className="ftco-animate m-1 fadeInUp ftco-animated">
                  <img
                    className="footer_icon"
                    src="images/footer_images/instagram.png"
                    alt
                    srcSet
                    width={35}
                    height={35}
                  />
                </li>
                <li className="ftco-animate m-1 fadeInUp ftco-animated">
                  <img
                    className="footer_icon"
                    src="images/footer_images/youtube.png"
                    alt
                    srcSet
                    width={35}
                    height={35}
                  />
                </li>
                <li className="ftco-animate m-1 fadeInUp ftco-animated">
                  <img
                    className="footer_icon"
                    src="images/footer_images/twitter.png"
                    alt
                    srcSet
                    width={35}
                    height={35}
                  />
                </li>
                <li className="ftco-animate m-1 fadeInUp ftco-animated">
                  <img
                    className="footer_icon"
                    src="images/footer_images/google-plus.png"
                    alt
                    srcSet
                    width={35}
                    height={35}
                  />
                </li>
                <li className="ftco-animate m-1 fadeInUp ftco-animated">
                  <img
                    className="footer_icon"
                    src="images/footer_images/linkedin.png"
                    alt
                    srcSet
                    width={35}
                    height={35}
                  />
                </li>
              </ul>
            </div>
            <div className="col-md-6 col-lg-3 mb-4 mb-md-0">
              <p style={{color: "#000"}} className="text-left">Contact Us</p>
              <p className="footer-mini-text">+1-777-567-88907</p>
              <p className="footer-mini-text">Support@puppyfetcher.com</p>
            </div>
            <div className="col-md-6 col-lg-3 pl-lg-5 mb-4 mb-md-0">
              <p style={{color: "#000"}} className>Breeder</p>
              <Link to="/register" className="footer-mini-text">
                Signup
              </Link>
              <br />
              <Link to="/login" className="footer-mini-text">
                Login
              </Link>
              <p className="footer-mini-text">Support</p>
              <p className="footer-mini-text">Special Offer</p>
            </div>
            <div className="col-md-6 col-lg-3 mb-4 mb-md-0">
              <p className="footer-mini-text">About MyPuppy Pro</p>
              <br />
              <Link to="/about-us" className="footer-mini-text">
                About Us
              </Link>
              <br />
              <a className="footer-mini-text">MyPuppy Pro promises</a>
              <br />
              <a className="footer-mini-text">Careers</a>
              <br />
              <a className="footer-mini-text">Dog Registration</a>
              <br />
              <a className="footer-mini-text">AKC Reunite</a>
              <br />
            </div>
          </div>
          <div className="col-md-12 d-flex align-items-center mt-4">
            <img
              src="images/paypal.png"
              className="mr-3"
              alt
              srcSet
              width={70}
              height={50}
            />
            <img
              src="images/Visa.png"
              className="mr-3"
              alt
              srcSet
              width={70}
              height={30}
            />
            <img
              src="images/master_card.png"
              className="mr-3"
              alt
              srcSet
              width={70}
              height={30}
            />
          </div>
          <hr style={{ width: "100%" }} />
        </div>
      </footer>
    </>
  );
}

export default Footer2;
