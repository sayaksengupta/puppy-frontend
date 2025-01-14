import axios from "axios";
import React, { useState } from "react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import "../css/dog-profile.css";
import "../css/style.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Footer2 from "../Components/Footer2";
import moment from "moment";
import SideNav from "../Components/SideNav";
import { Modal, Button, Form } from "react-bootstrap";
import Slider from "react-slick";

function DogProfile() {
  const [addModalShow, setAddModalShow] = useState(false);

  const [pedigreeModalShow, setPedigreeModalShow] = useState(false);

  const [messageModalShow, setMessageModalShow] = useState(false);

  const [dog, setDog] = useState("");
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [ratings, setRatings] = useState([]);

  const [openSideNav, setOpenSideNav] = useState(false);

  const [callApi, setCallApi] = useState(false);

  const [userReview, setUserReview] = useState("");

  const token = localStorage.getItem("token");
  const User = JSON.parse(localStorage.getItem("user"));

  const [hoverRating, setHoverRating] = useState(0);

  const [selectedImage, setSelectedImage] = useState("");

  const [selectedPedigreeImg, setSelectedPedigreeImg] = useState("");

  const [breeder, setBreeder] = useState("");

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  const stars = [1, 2, 3, 4, 5];

  let showPrice;

  console.log(location);

  if (location.state && location.state.showPrice) {
    showPrice = location.state.showPrice;
  }

  const navigate = useNavigate();

  const openDeletePuppyModal = () => {
    setAddModalShow(true);
  };

  const closeDeletePuppyModal = () => {
    setAddModalShow(false);
  };

  const closePedigreeModal = () => {
    setPedigreeModalShow(false);
  };

  const calculateAgeInYearsAndMonths = (dob) => {
    const dobDate = new Date(dob);
    const currentDate = new Date();
    const ageInMonths =
      currentDate.getMonth() -
      dobDate.getMonth() +
      12 * (currentDate.getFullYear() - dobDate.getFullYear());
    const years = Math.floor(ageInMonths / 12);
    const months = ageInMonths % 12;
    let ageString = "";
    if (years > 0) {
      ageString += `${years} year${years > 1 ? "s" : ""}`;
    }
    if (months > 0) {
      if (years > 0) {
        ageString += ", ";
      }
      ageString += `${months} month${months > 1 ? "s" : ""}`;
    }
    return ageString;
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  const getDog = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}user/get-dog/${id}`)
      .then((res) => {
        setDog(res.data.dog);
        setAverageRating(res.data.dog.averageRating);
        setReviews(res.data.dog.reviews);
        setRatings(res.data.dog.ratings);
        setSelectedImage(
          res.data.dog.images.length > 0
            ? res.data.dog.images[0]
            : res.data.dog.image
        );
      })
      .catch((e) => {
        alert(e.response.data.message);
      });
  };

  const getBreeder = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}user/get-user-by-dog/${id}`, {
        headers: { token: token },
      })
      .then((res) => {
        setBreeder(res.data.Breeder);
      })
      .catch((e) => {
        alert("Failed to fetch Breeder");
      });
  };

  const renderStars = (averageRating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i
          key={i}
          className={`fa ${i <= averageRating ? "fa-star" : "fa-star-o"}`}
          aria-hidden="true"
        />
      );
    }
    return stars;
  };

  const addRating = async (rating) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}user/add-dog-rating/${dog._id}`,
        {
          rating: rating,
        },
        { headers: { token: token } }
      );
      if (response.data.averageRating !== undefined) {
        setAverageRating(response.data.averageRating);
      }
      setCallApi(!callApi);
    } catch (error) {
      console.error("Error adding/updating dog rating: ", error);
      alert("You need to login !");
      navigate("/login");
    }
  };

  const addReview = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}user/add-dog-review/${dog._id}`,
        {
          review: userReview,
        },
        { headers: { token: token } }
      );
      setCallApi(!callApi);
      setUserReview("");
    } catch (error) {
      console.error("Error adding/updating dog rating: ", error);
      alert("You need to login !");
      navigate("/login");
    }
  };

  const deletePuppy = async (e) => {
    e.preventDefault();
    console.log(token);

    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}user/delete-dog/${dog._id}`,
        {
          headers: { token: token },
        }
      );

      console.log(response.data);
      navigate("/breeder-profile");
    } catch (error) {
      console.error(error);
      navigate("/login");
    }
  };

  const [startIndex, setStartIndex] = useState(0);
  const next = () => {
    setStartIndex((prevIndex) =>
      Math.min(prevIndex + 4, dog.images.length - 1)
    );
  };

  const prev = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - 4, 0));
  };

  const [message, setMessage] = useState("");
  const [enquiryEmail, setEnquiryEmail] = useState(null);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = async () => {
    // Handle sending the message to the breeder here
    await axios
      .post(`${process.env.REACT_APP_BASE_URL}user/contact-breeder`, {
        fromEmail: enquiryEmail ? enquiryEmail : User.email,
        toEmail: breeder.email,
        puppy: dog.name,
        message: message,
      })
      .then((res) => {
        alert(res.data.message);
        setMessageModalShow(false);
        setMessage(""); // Clear the message after sending
      })
      .catch((e) => {
        console.log(e.response.data);
      });
  };

  useEffect(() => {
    getDog();
    getBreeder();
  }, [callApi]);
  return (
    <>
      {dog && (
        <>
          <Navbar setOpenSideNav={setOpenSideNav} openSideNav={openSideNav} />

          {openSideNav && <SideNav />}
          <section>
            <div className="container" style={{ maxWidth: "1172px" }}>
              <div className="row">
                <div
                  className="col-sm-12 col-lg-4 d-flex justify-content-center collectionImg mt-2 flex-column"
                  style={{ margin: 0, padding: 0 }}
                >
                  <div className="container d-flex flex-column">
                    <div className="video_section"></div>
                    <img
                      className="card-img1 puppies-main-img mt-3"
                      src={selectedImage}
                      style={{ objectFit: "cover" }}
                      alt="Bologna"
                    />
                    <div className="d-flex justify-content-start mt-2">
                      {dog.images.length > 0 && (
                        <>
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <button
                              className="btn btn-link"
                              onClick={prev}
                              disabled={startIndex === 0}
                              style={{
                                position: "absolute",
                                left: "-2.25rem",
                                bottom: "1rem",
                                zIndex: 99999,
                              }}
                            >
                              <i
                                class="fa fa-chevron-left"
                                aria-hidden="true"
                              ></i>
                            </button>
                            <button
                              className="btn btn-link"
                              onClick={next}
                              disabled={startIndex + 4 >= dog.images.length}
                              style={{
                                position: "absolute",
                                right: "-2rem",
                                bottom: "1rem",
                                zIndex: 100,
                              }}
                            >
                              <i
                                class="fa fa-chevron-right"
                                aria-hidden="true"
                              ></i>
                            </button>
                          </div>
                          <div className="d-flex flex-wrap mt-2">
                            {dog.images
                              .slice(startIndex, startIndex + 4)
                              .map((img, index) => (
                                <img
                                  key={index}
                                  className="card-img1 mr-1 puppies-img"
                                  style={{
                                    height: "5em",
                                    width: "5.7em",
                                    cursor: "pointer",
                                    objectFit: "cover",
                                  }}
                                  onClick={() => setSelectedImage(img)}
                                  src={img}
                                  alt="Bologna"
                                />
                              ))}
                          </div>
                        </>
                      )}

                      {/* <img
                    className="card-img1 mr-1 puppies-img"
                    style={{
                      height: "5em",
                      width: "6em",
                      cursor: "pointer",
                    }}
                    src="./images/about.jpg"
                    alt="Bologna"
                  />
                  <img
                    className="card-img1 mr-1 puppies-img"
                    style={{
                      height: "5em",
                      width: "6em",
                      cursor: "pointer",
                    }}
                    src="./images/about-2.jpg"
                    alt="Bologna"
                  /> */}
                      {/* <div>
                    <div className="card-img1 puppies-video">
                      <img
                        src="./images/play-button.png"
                        className="play-btn-1"
                        alt=""
                        srcSet
                        height={25}
                        width={25}
                      />
                    </div>
                    <img
                      className="card-img1 mr-1 puppies-videos-section"
                      style={{
                        height: "5em",
                        width: "6em",
                        cursor: "pointer",
                      }}
                      src="./images/about-3.jpg"
                      alt="Bologna"
                    />
                  </div> */}
                    </div>
                  </div>
                </div>
                <div className="col-sm-12 col-lg-4 d-flex collectionImg mt-2 flex-column m-0 p-0">
                  <div className="container">
                    <ul style={{ listStyleType: "none" }}>
                      <li>
                        <h1>
                          <b>{dog.name}</b>{" "}
                        </h1>
                      </li>
                      <li>
                        <h6 className="m-0 p-0 ml-2">{dog.generic_name}</h6>
                      </li>
                      <br />
                      <li style={{ textTransform: "capitalize" }}>
                        <h6>
                          {dog.city ? dog.city : breeder.city},{" "}
                          {dog.state ? dog.state : breeder.state} &nbsp;
                        </h6>
                      </li>
                      <br />
                      <li>
                        <h4 style={{ textTransform: "capitalize" }}>
                          {dog.gender} |{" "}
                          {dog?.type?.toLowerCase() === "puppy"
                            ? `${calculateAgeInYearsAndMonths(dog.DOB)}`
                            : `${
                                Math.floor(
                                  (new Date() - new Date(dog.DOB)) /
                                    (365 * 24 * 60 * 60 * 1000)
                                ) > 0
                                  ? `${Math.floor(
                                      (new Date() - new Date(dog.DOB)) /
                                        (365 * 24 * 60 * 60 * 1000)
                                    )} years,`
                                  : ""
                              } ${Math.floor(
                                ((new Date() - new Date(dog.DOB)) %
                                  (365 * 24 * 60 * 60 * 1000)) /
                                  (30 * 24 * 60 * 60 * 1000)
                              )} months`}
                        </h4>
                      </li>

                      {/* <li>
                        <p />
                      </li> */}
                      {/* <li>
                    <b>
                      {" "}
                      Puppy ID <span className="text-color">#00001</span>{" "}
                    </b>
                  </li> */}
                      {dog.type == "puppy" && (
                        <li style={{ display: "block" }}>
                          <b>
                            {" "}
                            Available:{" "}
                            <span className="text-color">
                              {new Date(dog.availableDate).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                            </span>
                          </b>{" "}
                        </li>
                      )}
                      <li>
                        <b>
                          {" "}
                          D.O.B:{" "}
                          <span className="text-color">
                            {" "}
                            {dog.DOB &&
                              moment(dog.DOB, "YYYY-MM-DD").format(
                                "MMMM Do, YYYY"
                              )}
                            {/* April 23rd,2023. */}
                          </span>{" "}
                        </b>
                      </li>

                      <br />
                      <li>
                        <b>
                          {" "}
                          Dad's Weight:{" "}
                          <span className="text-color">
                            {" "}
                            {dog.pedigree && dog.pedigree.father.weight}lbs
                          </span>
                        </b>
                      </li>
                      <br />
                      <li>
                        <b>
                          {" "}
                          Mom's Weight:{" "}
                          <span className="text-color">
                            {dog.pedigree && dog.pedigree.mother.weight}lbs
                          </span>{" "}
                        </b>
                      </li>
                      <br />
                      <li>
                        <b>
                          {" "}
                          Color:{" "}
                          <span
                            className="text-color"
                            style={{ textTransform: "capitalize" }}
                          >
                            {dog.color}
                          </span>{" "}
                        </b>
                      </li>
                      <br />
                      
                      <Link to={`/breeder-profile?id=${breeder?._id}`}>
                        <div
                          style={{
                            width: "15rem",
                            display: "flex",
                            borderRadius: "8px",
                            cursor: "pointer",
                            padding: "0.8rem",
                            boxShadow: " 0px 0px 6px 1px rgba(0, 0, 0, 0.25)",
                            alignItems: "center",
                            justifyContent: "space-evenly",
                            marginTop: "1rem",
                          }}
                        >
                          <img
                            src={breeder.profileImg}
                            style={{ width: "25%" }}
                          ></img>
                          <div style={{ margin: "0.25rem" }}>
                            <p style={{ fontWeight: "bold", color: "#000" }}>
                              {breeder.name}
                            </p>
                            <p style={{ fontSize: "0.75rem", color: "#000" }}>
                              Verified Breeder
                            </p>
                          </div>
                        </div>
                      </Link>
                    </ul>
                  </div>
                </div>
                <div className="col-sm-12 col-lg-4 d-flex  collectionImg mt-2 flex-column p-0 m-0">
                  <div className="container">
                    <ul style={{ listStyleType: "none" }}>
                      <li>
                        <li>
                          <div>
                            {stars.map((star) => (
                              <span
                                key={star}
                                style={{ cursor: "pointer" }}
                                className={`star ${
                                  star <= (hoverRating || averageRating)
                                    ? "text-yellow"
                                    : "text-dark-white"
                                }`}
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                                onClick={() => addRating(star)}
                              >
                                <i
                                  className={`fa fa-star${
                                    star <= (hoverRating || averageRating)
                                      ? ""
                                      : "-o"
                                  }`}
                                />
                              </span>
                            ))}
                            <span className="text-color ml-2">
                              ({reviews ? reviews.length : 0}{" "}
                              {reviews.length === 1 ? `Review` : `Reviews`})
                            </span>

                            <div
                              style={{
                                position: "absolute",
                                right: "0",
                                display: "flex",
                                top: "0",
                                flexDirection: "column",
                                alignItems: "end",
                              }}
                            >
                              {breeder?._id === User?._id && (
                                <>
                                  <Link
                                    className="btn btn-primary ml-4"
                                    to={`/edit-puppy?id=${dog?._id}`}
                                  >
                                    Edit{" "}
                                    {dog.type === "puppy" ? "Puppy" : "Dog"}{" "}
                                    <icon
                                      style={{ fontSize: "1rem" }}
                                      className="fa fa-edit"
                                    ></icon>
                                  </Link>

                                  <button
                                    className="btn btn-primary mt-2"
                                    onClick={openDeletePuppyModal}
                                  >
                                    Delete{" "}
                                    {dog.type === "puppy" ? "Puppy" : "Dog"}{" "}
                                    <icon
                                      style={{ fontSize: "1rem" }}
                                      className="fa fa-trash"
                                    ></icon>
                                  </button>
                                </>
                              )}
                              {showPrice !== "no" && dog.type === "puppy" && (
                                <li>
                                  <h1 className="price-style">
                                    <b className="price-box">$ {dog.price}</b>
                                  </h1>
                                </li>
                              )}
                              <br />
                            </div>
                          </div>
                        </li>
                      </li>
                      {/* <div
                        className="last-section"
                        style={{ marginTop: "6rem", marginLeft: "6rem" }}
                      >
                        {showPrice !== "no" && dog.type === "puppy" && (
                          <li>
                            <h1 className="price-style">
                              <b className="price-box">$ {dog.price}</b>
                            </h1>
                          </li>
                        )}
                        <br />
                      </div> */}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="d-flex">
                <div className="extra-hide col-sm-4 col-lg-4" />
                <div className="know-more col-sm-4 col-lg-4 d-flex ml-5">
                  {/* <button className="btn btn-primary know-more-btn">
                    Know More
                  </button> */}
                </div>
                {((User?._id && User._id !== breeder?._id) || !User) && (
                  <div className="buy-now col-sm-4 col-lg-4 d-flex ml-5">
                    <button
                      className="btn btn-primary"
                      onClick={() => setMessageModalShow(true)}
                    >
                      Ask About Me
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>
          <section className="our-achievements mt-4">
            <div className="container mt-4">
              <div
                className="row align-items-center"
                style={{ margin: "0 !important" }}
              >
                <div className="card mb-3 p-4 about-card">
                  <div className="row g-0 flex-row-reverse">
                    <div className="col-lg-12">
                      <h3 className="text-center">
                        <b>About {dog.name}</b>
                      </h3>
                      <p style={{ fontWeight: 500 }}> {dog.comments}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="mt-4">
            <h1 className="text-center">Pedigree</h1>
            <div className="container">
              <h1 className="level-1 rectangle text-center ">
                <img
                  className="padigree-img"
                  src={dog?.images.length > 0 ? dog.images[0] : dog.image}
                  alt=""
                  srcSet
                />
                <p className="padigree-text">{dog.name}</p>
                <p className="padigree-text">{dog.generic_name}</p>
              </h1>
              <ol className="level-2-wrapper" style={{ padding: 0 }}>
                <li>
                  <h2 className="level-2 rectangle text-center">
                    <p className="padigree-text">Father</p>
                    <img
                      className="padigree-img"
                      src={
                        dog.pedigree?.father?.image
                          ? dog.pedigree.father.image
                          : "/images/MaleIcon.png"
                      }
                      alt=""
                      srcSet
                      onClick={() => {
                        setSelectedPedigreeImg(dog.pedigree.father.image);
                        setPedigreeModalShow(true);
                      }}
                    />
                    <p className="padigree-text">
                      {dog.pedigree && dog.pedigree.father.name}
                    </p>
                    <p className="padigree-text">
                      {dog.pedigree && dog.pedigree.father.breed}
                    </p>
                  </h2>
                  <ol className="level-3-wrapper" style={{ padding: 0 }}>
                    <li>
                      <h3 className="level-3 rectangle text-center">
                        <p className="padigree-text">Father</p>
                        <img
                          className="padigree-img"
                          src={
                            dog.pedigree &&
                            dog.pedigree.fratFather &&
                            dog.pedigree.fratFather.image
                              ? dog.pedigree.fratFather.image
                              : "/images/MaleIcon.png"
                          }
                          alt=""
                          srcSet
                          onClick={() => {
                            setSelectedPedigreeImg(
                              dog.pedigree.fratFather.image
                            );
                            setPedigreeModalShow(true);
                          }}
                        />
                        <p className="padigree-text">
                          {dog.pedigree && dog.pedigree.fratFather?.name}
                        </p>
                        <p className="padigree-text">
                          {dog.pedigree &&
                            dog.pedigree.fratFather &&
                            dog.pedigree.fratFather.breed}
                        </p>
                      </h3>
                    </li>
                    <li>
                      <h3 className="level-3 rectangle text-center">
                        <p className="padigree-text">Mother</p>
                        <img
                          className="padigree-img"
                          src={
                            dog.pedigree &&
                            dog.pedigree.fratMother &&
                            dog.pedigree.fratMother.image
                              ? dog.pedigree.fratMother.image
                              : "/images/FemaleIcon.png"
                          }
                          alt=""
                          srcSet
                          onClick={() => {
                            setSelectedPedigreeImg(
                              dog.pedigree.fratMother.image
                            );
                            setPedigreeModalShow(true);
                          }}
                        />
                        <p className="padigree-text">
                          {dog.pedigree && dog.pedigree.fratMother?.name}
                        </p>
                        <p className="padigree-text">
                          {dog.pedigree &&
                            dog.pedigree.fratMother &&
                            dog.pedigree.fratMother.breed}
                        </p>
                      </h3>
                    </li>
                  </ol>
                </li>
                <li>
                  <h2 className="level-2 rectangle text-center">
                    <p className="padigree-text">Mother</p>
                    <img
                      className="padigree-img"
                      src={
                        dog.pedigree?.mother?.image
                          ? dog.pedigree.mother.image
                          : "/images/FemaleIcon.png"
                      }
                      alt=""
                      srcSet
                      onClick={() => {
                        setSelectedPedigreeImg(dog.pedigree.mother.image);
                        setPedigreeModalShow(true);
                      }}
                    />
                    <p className="padigree-text">
                      {dog.pedigree && dog.pedigree.mother?.name}
                    </p>
                    <p className="padigree-text">
                      {dog.pedigree?.mother?.breed}
                    </p>
                  </h2>
                  <ol className="level-3-wrapper" style={{ padding: 0 }}>
                    <li>
                      <h3 className="level-3 rectangle text-center">
                        <p className="padigree-text">Father</p>
                        <img
                          className="padigree-img"
                          src={
                            dog.pedigree?.matFather?.image
                              ? dog.pedigree.matFather.image
                              : "/images/MaleIcon.png"
                          }
                          alt=""
                          srcSet
                          onClick={() => {
                            setSelectedPedigreeImg(
                              dog.pedigree.matFather.image
                            );
                            setPedigreeModalShow(true);
                          }}
                        />
                        <p className="padigree-text">
                          {dog.pedigree && dog.pedigree.matFather?.name}
                        </p>
                        <p className="padigree-text">
                          {dog.pedigree?.matFather?.breed}
                        </p>
                      </h3>
                    </li>
                    <li>
                      <h3 className="level-3 rectangle text-center">
                        <p className="padigree-text">Mother</p>
                        <img
                          className="padigree-img"
                          src={
                            dog.pedigree?.matMother?.image
                              ? dog.pedigree.matMother.image
                              : "/images/FemaleIcon.png"
                          }
                          alt=""
                          srcSet
                          onClick={() => {
                            setSelectedPedigreeImg(
                              dog.pedigree.matMother.image
                            );
                            setPedigreeModalShow(true);
                          }}
                        />
                        <p className="padigree-text">
                          {dog.pedigree && dog.pedigree.matMother?.name}
                        </p>
                        <p className="padigree-text">
                          {dog.pedigree?.matMother?.breed}
                        </p>
                      </h3>
                    </li>
                  </ol>
                </li>
              </ol>
            </div>
          </section>
          <section style={{ marginTop: "50px" }}>
            <div className="container">
              <div className="row reviews-card">
                <div className="col-sm-12 col-lg-4 d-flex justify-content-center collectionImg mt-2 flex-column align-items-center">
                  <h1>
                    <b>Reviews</b>{" "}
                  </h1>
                  <h1>
                    <b>{averageRating ? `${averageRating}.0` : 0}</b>{" "}
                  </h1>
                  <div className="d-flex">{renderStars(averageRating)} </div>
                  <ul style={{ listStyleType: "none", width: "100%" }}>
                    <li className="d-flex align-items-center justify-content-center">
                      <b className="text-color">1</b>
                      <div
                        className={`progress-bar-dog ${
                          averageRating === 1 ? "active" : ""
                        } ml-2`}
                      ></div>
                    </li>
                    <li className="d-flex align-items-center justify-content-center">
                      <b className="text-color">2</b>
                      <div
                        className={`progress-bar-dog ${
                          averageRating === 2 ? "active" : ""
                        } ml-2`}
                      ></div>
                    </li>
                    <li className="d-flex align-items-center justify-content-center">
                      <b className="text-color">3</b>
                      <div
                        className={`progress-bar-dog ${
                          averageRating === 3 ? "active" : ""
                        } ml-2`}
                      ></div>
                    </li>
                    <li className="d-flex align-items-center justify-content-center">
                      <b className="text-color">4</b>
                      <div
                        className={`progress-bar-dog ${
                          averageRating === 4 ? "active" : ""
                        } ml-2`}
                      ></div>
                    </li>
                    <li className="d-flex align-items-center justify-content-center">
                      <b className="text-color">5</b>
                      <div
                        className={`progress-bar-dog ${
                          averageRating === 5 ? "active" : ""
                        } ml-2`}
                      ></div>
                    </li>
                  </ul>
                </div>
                <div
                  className="vertical-line"
                  style={{
                    borderLeft: "3px solid rgba(246, 246, 246, 255)",
                    height: "320px",
                    margin: "25px",
                    width: "min-content",
                  }}
                ></div>
                <div className="col-sm-12 col-lg-7 d-flex justify-content-start collectionImg mt-2 flex-column ">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "end",
                      width: "100%",
                    }}
                  >
                    <label>Add Review</label>
                    <textarea
                      style={{
                        width: "100%",
                        height: "50px",
                        border: "none",
                        outline: 0,
                        borderRadius: "5px",
                        border: "1px solid #cbced4",
                        gap: "20px",
                        boxSizing: "border-box",
                        padding: "0px 10px",
                        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.15) !important",
                      }}
                      value={userReview}
                      onChange={(e) => setUserReview(e.target.value)}
                      disabled={
                        User ? (User._id == breeder?._id ? true : false) : true
                      }
                    ></textarea>
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "end",
                      }}
                    >
                      <button
                        className="btn btn-primary mt-2"
                        style={{ width: "10rem" }}
                        disabled={
                          // userReview.length === 0 ||
                          reviews.some(
                            (review) => review.userId === User?._id
                          ) ||
                          userReview.length === 0 ||
                          userReview.trim() === ""
                          //&&
                          //   userReview.trim() === "")
                        }
                        onClick={addReview}
                      >
                        Add Review
                      </button>
                    </div>
                  </div>
                  {reviews?.map((review) => {
                    const rating = ratings.find(
                      (rating) => rating.userId === review.userId
                    );
                    console.log(rating);
                    return (
                      <div className="review-1 mt-2">
                        <p style={{ margin: 0, color: "#000" }}>
                          <b className="mr-1">{review.userName}</b>{" "}
                          {rating && renderStars(rating.rating)}{" "}
                          {/* Render stars based on the rating */}
                        </p>
                        <p style={{ margin: 0 }}>{review.review}</p>
                      </div>
                    );
                  })}

                  {/* <div className="review-1 mt-2">
                <p style={{ margin: 0 }}>
                  <b className="mr-1"> Ishi Sindhu</b>{" "}
                  <i className="fa fa-star m-1" aria-hidden="true" />{" "}
                  <i className="fa fa-star m-1" aria-hidden="true" />{" "}
                  <i className="fa fa-star m-1" aria-hidden="true" />{" "}
                  <i className="fa fa-star m-1" aria-hidden="true" />{" "}
                  <i className="fa fa-star m-1" aria-hidden="true" />
                </p>
                <p style={{ margin: 0 }}>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Autem eum harum qui sit ullam vero modi, obcaecati expedita
                  quos.{" "}
                </p>
              </div>
              <div className="review-2 mt-2">
                <p style={{ margin: 0 }}>
                  <b className="mr-1"> Ishi Sindhu</b>{" "}
                  <i className="fa fa-star m-1" aria-hidden="true" />{" "}
                  <i className="fa fa-star m-1" aria-hidden="true" />{" "}
                  <i className="fa fa-star m-1" aria-hidden="true" />{" "}
                  <i className="fa fa-star m-1" aria-hidden="true" />{" "}
                  <i className="fa fa-star m-1" aria-hidden="true" />
                </p>
                <p style={{ margin: 0 }}>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Autem eum harum qui sit ullam vero modi, obcaecati expedita
                  quos.{" "}
                </p>
              </div>
              <div className="review-3 mt-2">
                <p style={{ margin: 0 }}>
                  <b className="mr-1"> Ishi Sindhu</b>{" "}
                  <i className="fa fa-star m-1" aria-hidden="true" />{" "}
                  <i className="fa fa-star m-1" aria-hidden="true" />{" "}
                  <i className="fa fa-star m-1" aria-hidden="true" />{" "}
                  <i className="fa fa-star m-1" aria-hidden="true" />{" "}
                  <i className="fa fa-star m-1" aria-hidden="true" />
                </p>
                <p style={{ margin: 0 }}>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Autem eum harum qui sit ullam vero modi, obcaecati expedita
                  quos.{" "}
                </p>
              </div> */}
                  {/* <div className="d-flex justify-content-end mb-3">
                <a style={{ color: "rgba(15,95,1,255)" }}>
                  <b>See all reviews</b>{" "}
                </a>
              </div> */}
                </div>
              </div>
            </div>
          </section>
          <Footer2 />
        </>
      )}

      <Modal
        size="sm"
        centered={true}
        show={addModalShow}
        onHide={closeDeletePuppyModal}
      >
        <Modal.Header style={{ textAlign: "center" }} closeButton>
          <Modal.Title>Delete {dog?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: "center" }}>
          <p> Are You Sure? </p>
        </Modal.Body>
        <Modal.Footer
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button variant="primary" onClick={deletePuppy}>
            Yes
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              closeDeletePuppyModal();
            }}
          >
            No
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        size="lg"
        centered={true}
        show={pedigreeModalShow}
        onHide={closePedigreeModal}
      >
        <Modal.Header
          style={{ textAlign: "center" }}
          closeButton
        ></Modal.Header>
        <Modal.Body style={{ textAlign: "center" }}>
          <img
            style={{ width: "100%", maxHeight: "30rem", objectFit: "contain" }}
            src={selectedPedigreeImg}
          ></img>
        </Modal.Body>
      </Modal>

      {/* MESSAGE MODAL      */}
      <Modal
        size="lg"
        centered={true}
        show={messageModalShow}
        onHide={() => setMessageModalShow(false)}
      >
        <Modal.Header style={{ textAlign: "center" }} closeButton>
          <Modal.Title>Send a Message to the Breeder</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: "center" }}>
          <Form>
            <Form.Group controlId="messageTextArea">
              {!User && (
                <>
                  <Form.Label>Your Email</Form.Label>
                  <Form.Control
                    as="input"
                    rows={3}
                    value={enquiryEmail}
                    onChange={(e) => setEnquiryEmail(e.target.value)}
                    placeholder="Enter your email..."
                  />
                </>
              )}
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={message}
                onChange={handleMessageChange}
                placeholder="Type your message here..."
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setMessageModalShow(false)}
          >
            Close
          </Button>
          <Button variant="primary" onClick={handleSendMessage}>
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DogProfile;
