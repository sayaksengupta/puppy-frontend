import axios from "axios";
import moment from "moment";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Footer2 from "../Components/Footer2";
import Navbar from "../Components/Navbar";
import PayPal from "../Components/PayPal";
import SideNav from "../Components/SideNav";
import "../css/BreederProfile.css";

function BreederProfile() {
  const [user, setUser] = useState("");
  const token = localStorage.getItem("token");
  const [callApi, setCallApi] = useState(false);
  const [userDogs, setUserDogs] = useState([]);

  const [openSideNav, setOpenSideNav] = useState(false);

  const [showRenew, setShowRenew] = useState(true);

  const navigate = useNavigate();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  const USER = JSON.parse(localStorage.getItem("user"));

  console.log(USER);

  const [txnId, setTxnId] = useState("");

  const [amount, setAmount] = useState(0);

  const [dynamicImages, setDynamicImages] = useState({
    maleImage: USER?.maleImage ? USER?.maleImage : "",
    femaleImage: USER?.femaleImage ? USER?.femaleImage : "",
    availablePuppyImage: USER?.availablePuppyImage
      ? USER?.availablePuppyImage
      : "",
    pastPuppyImage: USER?.pastPuppyImage ? USER?.pastPuppyImage : "",
  });

  const getSettings = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}admin/get-settings`)
      .then((res) => {
        setAmount(res.data.settings.breederPlan.amount);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const renewPro = async () => {
    await axios
      .post(`${process.env.REACT_APP_BASE_URL}user/buy-pro`, {
        userId: USER._id,
        txnId: txnId,
      })
      .then((res) => {
        console.log(res.data);
        alert("Plan Renewed Successfully !");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getUser = async () => {
    let URL;
    if (id) {
      URL = `${process.env.REACT_APP_BASE_URL}user/get-user/${id}`;
    } else {
      URL = `${process.env.REACT_APP_BASE_URL}user/get-user`;
    }
    await axios
      .get(URL, {
        headers: { token },
      })
      .then((res) => {
        // console.log(res.data);
        setUser(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getUserDogs = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}user/get-user-dogs/${
          id ? id : USER?._id
        }`,
        {
          headers: { token },
        }
      )
      .then((res) => {
        console.log(res.data);
        setUserDogs(res.data.userDogs);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const uploadCoverFileHandler = async (file, type) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}upload`,
        formData
      );
      setUser({ ...user, coverImg: response.data.fileUrl });

      // Update dynamicImages state based on the type of image
      setDynamicImages((prevState) => ({
        ...prevState,
        [`${type}Image`]: response.data.fileUrl,
      }));

      editProfile(response.data.fileUrl);
    } catch (error) {
      console.error("Error uploading cover image:", error);
    }
  };

  const uploadDynamicImages = async (file, type) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}upload`,
        formData
      );

      editProfile(user.coverImg, user.profileImg, {
        [`${type}Image`]: response.data.fileUrl,
      });
      // // Update dynamicImages state based on the type of image
      // setDynamicImages((prevState) => ({
      //   ...prevState,
      //   [`${type}Image`]: response.data.fileUrl,
      // }));

      // if (
      //   dynamicImages.maleImage ||
      //   dynamicImages.femaleImage ||
      //   dynamicImages.pastPuppyImage ||
      //   dynamicImages.availablePuppyImage
      // ) {
      //   editProfile(user.coverImg, user.profileImg);
      // }
    } catch (error) {
      console.error("Error uploading dynamic image:", error);
    }
  };

  const editProfile = async (coverImg, profileImg, customImg) => {
    console.log(customImg);
    let data = {
      profileImg: profileImg,
      coverImg: coverImg,
    };
    data = { ...data, ...customImg };

    await axios
      .patch(`${process.env.REACT_APP_BASE_URL}user/update-user`, data, {
        headers: { token: token },
      })
      .then((res) => {
        console.log(res.data);
        setCallApi(!callApi);
      });
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadCoverFileHandler(file);
    }
  };

  const maleDogs = userDogs?.filter(
    (dog) => dog.gender === "male" && dog.type === "dog"
  );
  const femaleDogs = userDogs?.filter(
    (dog) => dog.gender === "female" && dog.type === "dog"
  );

  useEffect(() => {
    getSettings();
  }, []);

  useEffect(() => {
    getUser();
    getUserDogs();
  }, [callApi]);

  useEffect(() => {
    if (txnId) {
      renewPro();
    }
  }, [txnId]);

  return (
    <>
      {user && (
        <>
          <Navbar setOpenSideNav={setOpenSideNav} openSideNav={openSideNav} />

          {openSideNav && <SideNav />}

          <div>
            <div className="profile__details">
              <div className="profile_cover">
                <img
                  src={user.coverImg ? user.coverImg : "/images/cover.png"}
                  alt
                />
              </div>
              <div className="profile__main__img">
                <div className="wrapper">
                  <div
                    className="profile_flex"
                    style={{ justifyContent: "space-between" }}
                  >
                    <div className="profile__img">
                      <img
                        src={
                          user.profileImg
                            ? user.profileImg
                            : "/images/dummy.png"
                        }
                        alt
                      />
                    </div>
                    {/* <div className="edit__cover">
                      <a href="#">Edit Cover Image</a>
                    </div> */}
                    {user?._id === USER?._id && (
                      <>
                        <label
                          htmlFor="coverInput"
                          className="edit__cover"
                          style={{ width: "13rem", cursor: "pointer" }}
                        >
                          Edit Cover Image
                        </label>
                        <input
                          type="file"
                          id="coverInput"
                          style={{ display: "none" }}
                          onChange={handleCoverImageChange}
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="profile__meta">
              <div className="wrapper">
                <h2 className="user_Name" style={{ fontWeight: "bold" }}>
                  {user.name}{" "}
                  {user?._id === USER?._id && (
                    <Link to="/edit-breeder-profile">Edit Profile</Link>
                  )}
                </h2>
                <h6
                  className="user_Name"
                  style={{
                    fontWeight: "bold",
                    textTransform: "capitalize",
                    fontSize: "1.23rem",
                  }}
                >
                  {user.kennel}
                </h6>
                {/* {user.address?.line1 ||
                  (user.address?.line2 && (
                    <p>
                      {user.address?.line1}, {user.address?.line2},{" "}
                      {user.pincode}
                    </p>
                  ))} */}

                <p style={{ textTransform: "capitalize" }}>
                  {user.city}, {user.state}
                </p>

                {user.isPro && (
                  <p style={{ textTransform: "capitalize" }}>
                    Member Since {moment(user.createdAt).format("DD/MM/YYYY")}
                  </p>
                )}

                {user.expiresAt && (
                  <p style={{ textTransform: "capitalize" }}>
                    Plan Expires At{" "}
                    {moment(user.expiresAt).format("DD/MM/YYYY")}
                  </p>
                )}

                {user.type == "breeder" && user.isPro == false && showRenew && (
                  <button
                    style={{ margin: "0.5rem 0" }}
                    onClick={() => setShowRenew(false)}
                    className="btn btn-primary"
                  >
                    {" "}
                    Renew Breeder Plan
                  </button>
                )}

                {showRenew == false && !txnId && amount && (
                  <PayPal
                    style={{ width: "20rem", marginTop: "2rem" }}
                    order={{
                      description: "Breeder Profile",
                      amount: {
                        currency_code: "USD",
                        value: amount,
                      },
                    }}
                    setTxnId={setTxnId}
                  />
                )}

                {user.about && (
                  <>
                    <h2
                      className="user_Name mt-2"
                      style={{ fontWeight: "bold" }}
                    >
                      About Me:
                    </h2>
                    {user.about}
                  </>
                )}
              </div>
            </div>

            {user.isPro && (
              <div className="owner_of">
                <div className="wrapper">
                  <h2 style={{ fontWeight: "bold" }}>Owner of:</h2>
                  <ul style={{ display: "flex", flexDirection: "column" }}>
                    {userDogs?.map((userDog) => {
                      return (
                        <div style={{ display: "flex" }}>
                          <Link to={`/dog-profile?id=${userDog?._id}`}>
                            <li>&gt; {userDog.name} </li>
                          </Link>
                          {user?._id === USER?._id && (
                            <Link to={`/edit-puppy?id=${userDog._id}`}>
                              <li>
                                <icon
                                  style={{
                                    fontSize: "1.25rem",
                                    fontWeight: "bold",
                                    marginLeft: "0.5rem",
                                  }}
                                  className="fa fa-edit"
                                ></icon>
                              </li>
                            </Link>
                          )}
                        </div>
                      );
                    })}
                  </ul>
                </div>
              </div>
            )}

            <div className="dogs_images">
              <div className="wrapper">
                <h2 style={{ fontWeight: "bold", marginBottom: "2rem" }}>
                  Our Dogs
                </h2>

                {user.isPro && (
                  <div className="dogs_wrap">
                    <div className="dog-col">
                      <input
                        style={{ display: "none" }}
                        type="file"
                        id="maleInput"
                        onChange={(e) =>
                          uploadDynamicImages(e.target.files[0], "male")
                        }
                      ></input>
                      <h3 style={{ fontWeight: "bold" }}>
                        Males{" "}
                        <label htmlFor="maleInput">
                          <icon
                            style={{
                              color: "#000",
                              fontSize: "1.5rem",
                              fontWeight: "bold",
                              cursor: "pointer",
                            }}
                            className="fa fa-edit"
                          ></icon>
                        </label>
                      </h3>
                      {/* {userDogs
                      ?.filter((dog) => dog.gender === "male")
                      .map((userDog) => ( */}

                      <Link
                        to="/male-dogs"
                        state={{
                          Dogs: maleDogs,
                          auth: user?._id === USER?._id,
                        }}
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
                              src={
                                user.maleImage
                                  ? user.maleImage
                                  : "/images/MaleDogs.jpeg"
                              }
                              alt="MaleDogs"
                            />
                            {/* <div className="dog-name">{userDog.name}</div> */}
                          </div>
                        </div>
                      </Link>
                      {/* ))} */}
                    </div>
                    <div className="dog-col">
                      <input
                        style={{ display: "none" }}
                        type="file"
                        id="femaleInput"
                        onChange={(e) =>
                          uploadDynamicImages(e.target.files[0], "female")
                        }
                      ></input>
                      <h3 style={{ fontWeight: "bold" }}>
                        Females{" "}
                        <label htmlFor="femaleInput">
                          <icon
                            style={{
                              color: "#000",
                              fontSize: "1.5rem",
                              fontWeight: "bold",
                              cursor: "pointer",
                            }}
                            className="fa fa-edit"
                          ></icon>
                        </label>
                      </h3>
                      {/* {userDogs
                      ?.filter((dog) => dog.gender === "female")
                      .map((userDog) => ( */}
                      <Link
                        to="/female-dogs"
                        state={{
                          Dogs: femaleDogs,
                          auth: user?._id === USER?._id,
                        }}
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
                              src={
                                user.femaleImage
                                  ? user.femaleImage
                                  : "/images/FemaleDogs.jpeg"
                              }
                              alt="Female Dogs"
                            />
                            {/* <div className="dog-name">Female Dogs</div> */}
                          </div>
                        </div>
                      </Link>
                      {/* ))} */}
                    </div>
                  </div>
                )}

                <div className="dogs_wrap">
                  {user.isPro && (
                    <div className="dog-col">
                      <input
                        style={{ display: "none" }}
                        type="file"
                        id="pastPuppyInput"
                        onChange={(e) =>
                          uploadDynamicImages(e.target.files[0], "pastPuppy")
                        }
                      ></input>
                      <h3 style={{ fontWeight: "bold" }}>
                        Past Puppies{" "}
                        <label htmlFor="pastPuppyInput">
                          <icon
                            style={{
                              color: "#000",
                              fontSize: "1.5rem",
                              fontWeight: "bold",
                              cursor: "pointer",
                            }}
                            className="fa fa-edit"
                          ></icon>
                        </label>
                      </h3>

                      {/* {userDogs
                      ?.filter((dog) => dog.gender === "male")
                      .map((userDog) => ( */}
                      <Link to="/past-puppies">
                        <div className="single_dog">
                          <div className="dog-image">
                            <img
                              style={{
                                width: "532px",
                                height: "350px",
                                objectFit: "cover",
                                borderRadius: "8px",
                              }}
                              src={
                                user.pastPuppyImage
                                  ? user.pastPuppyImage
                                  : "/images/PastPuppies.jpeg"
                              }
                              alt="Past Puppies"
                            />
                            {/* <div className="dog-name">{userDog.name}</div> */}
                          </div>
                        </div>
                      </Link>

                      {/* ))} */}
                    </div>
                  )}
                  <div className="dog-col">
                    <input
                      style={{ display: "none" }}
                      type="file"
                      id="availablePuppyInput"
                      onChange={(e) =>
                        uploadDynamicImages(e.target.files[0], "availablePuppy")
                      }
                    ></input>
                    <h3 style={{ fontWeight: "bold" }}>
                      Available Puppies{" "}
                      <label htmlFor="availablePuppyInput">
                        <icon
                          style={{
                            color: "#000",
                            fontSize: "1.5rem",
                            fontWeight: "bold",
                            cursor: "pointer",
                          }}
                          className="fa fa-edit"
                        ></icon>
                      </label>
                    </h3>
                    {/* {userDogs
                      ?.filter((dog) => dog.gender === "female")
                      .map((userDog) => ( */}
                    <Link to="/available-puppies" state={{ Dogs: userDogs }}>
                      <div className="single_dog">
                        <div className="dog-image">
                          <img
                            style={{
                              width: "532px",
                              height: "350px",
                              objectFit: "cover",
                              borderRadius: "8px",
                            }}
                            src={
                              user.availablePuppyImage
                                ? user.availablePuppyImage
                                : "/images/PastPuppies.jpeg"
                            }
                            alt="Available Puppies"
                          />
                          {/* <div className="dog-name"></div> */}
                        </div>
                      </div>
                    </Link>
                    {/* ))} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer2 />
        </>
      )}
    </>
  );
}

export default BreederProfile;
