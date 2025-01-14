import React from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Footer2 from "../Components/Footer2";
import Navbar from "../Components/Navbar";
import SideNav from "../Components/SideNav";

function AvailablePuppies() {
  const location = useLocation();

  let Dogs;
  if (location.state) {
    Dogs = location.state.Dogs;
  }

  const [openSideNav, setOpenSideNav] = useState(false);

  return (
    <>
      <Navbar setOpenSideNav={setOpenSideNav} openSideNav={openSideNav} />

      {openSideNav && <SideNav />}

      <div className="dogs_images_past">
        <div className="wrapper">
          <h2 style={{ fontWeight: "bold" }}>Available Puppies</h2>

          {Dogs?.length > 0 ? (
            Dogs.filter((doggo) => {
              return doggo.type == "puppy";
            }).map((dog) => {
              return (
                <>
                  <Link to={`/dog-profile?id=${dog._id}`}>
                    <div key={dog._id} className="dogs_wrap">
                      <div className="dog-col">
                        <div className="single_dog">
                          <div className="dog-image">
                            <img
                              style={{
                                width: "532px",
                                height: "350px",
                                objectFit: "cover",
                                borderRadius: "8px",
                              }}
                              src={dog.image ? dog.image : dog.images[0]}
                              alt
                            />
                            <div className="dog-name">
                              <span>
                                {dog.name}&nbsp;[{dog.age} Weeks]
                              </span>
                              <br />
                              <span style={{ textTransform: "capitalize" }}>
                                {dog.gender}
                              </span>
                              <br />
                              <span style={{ textTransform: "capitalize" }}>
                                {dog.generic_name}
                              </span>
                              <br />
                              <span style={{ textTransform: "capitalize" }}>
                                {dog.address}
                              </span>
                              <br />
                              <span
                                style={{
                                  textTransform: "capitalize",
                                  color: "rgb(0, 255, 60)",
                                }}
                              >
                                $ {dog.price}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </>
              );
            })
          ) : (
            <h2 style={{ textAlign: "center", margin: "5rem" }}>
              No Available Puppies :(
            </h2>
          )}
        </div>
      </div>
      <Footer2 />
    </>
  );
}

export default AvailablePuppies;
