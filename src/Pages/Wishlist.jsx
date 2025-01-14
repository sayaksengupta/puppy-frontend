import axios from "axios";
import moment from "moment";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import Footer2 from "../Components/Footer2";
import Navbar from "../Components/Navbar";
import SideNav from "../Components/SideNav";
import "../css/findpuppy.css";
import "../css/puppies-sales-style.css";

function Wishlist() {
  const [openSideNav, setOpenSideNav] = useState(false);

  const token = localStorage.getItem("token");

  const [dogs, setDogs] = useState([]);

  const [callApi, setCallApi] = useState(false);

  const toggleLikeDog = async (dogId) => {
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}user/toggle-like-dog`,
        { dogId },
        { headers: { token } }
      )
      .then((res) => {
        console.log(res.data);
        setCallApi(!callApi);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getLikedDogs = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}user/get-liked-dogs`, {
        headers: { token },
      })
      .then((res) => {
        console.log(res.data);
        setDogs(res.data.likedDogs);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getLikedDogs();
  }, [callApi]);

  return (
    <>
      <Navbar setOpenSideNav={setOpenSideNav} openSideNav={openSideNav} />

      {openSideNav && <SideNav />}
      <div className="container my-5">
        <div className="row">
          <div className="col-lg-12">
            <div className="row" id="mobile-view-cards">
              {dogs.length > 0 ? (
                dogs.map((dog) => {
                  const isLiked = dogs.some(
                    (likedDog) => likedDog._id === dog._id
                  );
                  return (
                    <div className="col-lg-3 col-md-6 mt-4">
                      <div className="product__item">
                        <Link to={`/dog-profile?id=${dog._id}`}>
                          <div
                            className="card"
                            id="puppies_card"
                            style={{ padding: "10px" }}
                          >
                            {/* <div
                                style={{
                                  position: "absolute",
                                  right: "10px",
                                  top: "5px",
                                  display: "flex",
                                  justifyContent: "end",
                                  borderRadius: "0px 0px 0px 65%",
                                  backgroundColor: "#fff",
                                  padding: "10px",
                                }}
                              >
                                <i
                                  className="fa fa-heart fa-1x"
                                  style={{
                                    textShadow: "0 0 4px rgba(254,25,1,255)",
                                    color: "#fff",
                                  }}
                                />
                              </div> */}
                            <div
                              onClick={(e) => {
                                e.preventDefault();
                                toggleLikeDog(dog._id);
                              }}
                            >
                              <i
                                className={
                                  isLiked
                                    ? "fa fa-heart fa-2x"
                                    : "fa fa-heart-o fa-2x"
                                }
                                style={{
                                  position: "absolute",
                                  right: "10px",
                                  top: "10px",
                                  color: "red",
                                  zIndex: 99999,
                                }}
                              />
                            </div>

                            <img
                              className="card-img-top"
                              src={
                                dog.images.length > 0
                                  ? dog.images[0]
                                  : dog.image
                              }
                              alt="Card image cap"
                              style={{ height: "12rem", objectFit: "cover" }}
                            />
                            <div className="card-body">
                              <h4
                                className="card-title"
                                style={{ color: "#000 !important" }}
                              >
                                <b>{dog.name}</b>{" "}
                              </h4>
                              <p
                                className="card-text"
                                style={{ color: "#000 !important" }}
                              >
                                {dog.generic_name}
                              </p>
                              <p
                                className="card-text"
                                style={{ textTransform: "capitalize" }}
                              >
                                {dog.gender}, {dog.age}
                              </p>
                              <p className="card-text">{dog.address}</p>
                              <p className="card-price">$ {dog.price}</p>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  );
                })
              ) : (
                <h2 className="my-5" style={{ textAlign: "center" }}>
                  No Wishlisted Dogs :(
                </h2>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer2 />
    </>
  );
}

export default Wishlist;
