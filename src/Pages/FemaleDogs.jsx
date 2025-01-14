import React from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Footer2 from "../Components/Footer2";
import Navbar from "../Components/Navbar";
import SideNav from "../Components/SideNav";

function FemaleDogs() {
  const [openSideNav, setOpenSideNav] = useState(false);
  const location = useLocation();

  let Dogs, auth;
  if (location.state) {
    Dogs = location.state.Dogs;
    auth = location.state.auth;
  }

  const calculateAgeInYearsAndMonths = (dob) => {
    const dobDate = new Date(dob);
    const currentDate = new Date();
    const ageInMonths = (currentDate.getMonth() - dobDate.getMonth()) + 
      (12 * (currentDate.getFullYear() - dobDate.getFullYear()));
    const years = Math.floor(ageInMonths / 12);
    const months = ageInMonths % 12;
    let ageString = "";
    if (years > 0) {
      ageString += `${years} year${years > 1 ? 's' : ''}`;
    }
    if (months > 0) {
      if (years > 0) {
        ageString += ", ";
      }
      ageString += `${months} month${months > 1 ? 's' : ''}`;
    }
    return ageString;
  };

  return (
    <>
      <Navbar setOpenSideNav={setOpenSideNav} openSideNav={openSideNav} />

      {openSideNav && <SideNav />}
      <div className="dogs_images_past">
        <div className="wrapper" style={{ position: "relative" }}>
          <h2 style={{ fontWeight: "bold" }}>Females</h2>

          {auth && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <Link
                style={{ position: "absolute", right: 0 }}
                className="btn btn-primary"
                to="/list-puppy"
                state={{ Type: "dog" }}
              >
                Add Dog
              </Link>
            </div>
          )}

          {Dogs?.length > 0 ? (
            <div className="dogs_wrap">
              {Dogs.filter((doggo) => {
                return doggo.type == "dog" && doggo.gender == "female";
              }).map((dog) => (
                <Link
                  to={`/dog-profile?id=${dog._id}`}
                  state={{ showPrice: "no" }}
                  key={dog._id}
                  className="dog-col"
                >
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
                        alt=""
                      />
                      <div className="dog-name">
                        <span>
                          {dog.name}&nbsp;[{calculateAgeInYearsAndMonths(dog.DOB)}]
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
                          {dog.address
                            .split(",")
                            .map((part) => part.trim())
                            .filter(Boolean)
                            .slice(-2)
                            .join(", ")}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <h2 style={{ textAlign: "center", margin: "5rem" }}>
              No Female Dogs :(
            </h2>
          )}
        </div>
      </div>
      <Footer2 />
    </>
  );
}

export default FemaleDogs;
