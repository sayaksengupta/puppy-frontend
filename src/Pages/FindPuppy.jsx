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

function FindPuppy() {
  const [categories, setCategories] = useState([]);
  const [dogs, setDogs] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const token = localStorage.getItem("token");
  const USER = JSON.parse(localStorage.getItem("user"));
  const [likedDogs, setLikedDogs] = useState([]);

  const [openSideNav, setOpenSideNav] = useState(false);

  const [callApi, setCallApi] = useState(false);

  const [currentPage, setCurrentPage] = useState(1); // Initialize currentPage state
  const [totalPages, setTotalPages] = useState(0);

  const [reviews, setReviews] = useState([]);

  const getAllDogs = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}user/get-dogs?page=${currentPage}&limit=12`
      )
      .then((res) => {
        console.log(res.data);
        setTotalPages(res.data.totalPages);
        setDogs(res.data.dogs);
      })
      .catch((e) => {
        console.log(e);
      });
  };

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
        window.location.replace("/login");
      });
  };

  const getLikedDogs = async () => {
    if (token) {
      await axios
        .get(`${process.env.REACT_APP_BASE_URL}user/get-liked-dogs`, {
          headers: { token },
        })
        .then((res) => {
          console.log(res.data);
          setLikedDogs(res.data.likedDogs);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const getReviews = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}user/get-all-dog-reviews`)
      .then((res) => {
        console.log(res.data);
        setReviews(res.data.reviews);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getAllBreeds = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}breed/get-all-breeds`)
      .then((res) => {
        console.log(res.data);
        setBreeds(res.data.breeds);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getAllCategories = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}category/get-all-categories`)
      .then((res) => {
        console.log(res.data);
        setCategories(res.data);
      });
  };

  const onPageChange = (newPage) => {
    setCurrentPage(newPage); // Update the currentPage state
  };

  const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    // Generate an array of page numbers from 1 to totalPages
    const pageNumbers = Array.from(
      { length: totalPages },
      (_, index) => index + 1
    );


    return (
      <div className="col-lg-12 text-center mt-4">
        <div className="pagination__option d-flex justify-content-center align-items-center">
          {pageNumbers.map((pageNumber) => (
            <div
              key={pageNumber}
              style={
                pageNumber === currentPage
                  ? {
                      backgroundColor: "rgba(129, 68, 14, 255)",
                      width: "30px",
                      height: "30px",
                      display: "inline-block",
                      borderRadius: "50%",
                      color: "#fff",
                    }
                  : {
                      width: "30px",
                      height: "30px",
                    }
              }
            >
              <Link
                // style={{ margin: "10px" }}
                to=""
                className={`${
                  pageNumber === currentPage ? "text-white" : "text-dark"
                }`}
                onClick={() => onPageChange(pageNumber)}
              >
                {pageNumber}
              </Link>
            </div>
          ))}
          <Link
            to=""
            style={{ marginLeft: "5px" }}
            className="text-dark"
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            <i className="fa fa-angle-right" />
          </Link>
        </div>
      </div>
    );
  };

  const [selectedGenders, setSelectedGenders] = useState([]);

  const handleGenderChange = (e) => {
    const gender = e.target.value;

    // Create a copy of the selectedGenders array
    const updatedSelectedGenders = [...selectedGenders];

    if (updatedSelectedGenders.includes(gender)) {
      // Remove the gender if it's already selected
      updatedSelectedGenders.splice(updatedSelectedGenders.indexOf(gender), 1);
    } else {
      // Add the gender if it's not selected
      updatedSelectedGenders.push(gender);
    }

    setSelectedGenders(updatedSelectedGenders);
  };

  const [minPrice, setMinPrice] = useState(100);
  const [maxPrice, setMaxPrice] = useState(6000);

  const handleMinChange = (e) => {
    const newMinPrice = parseInt(e.target.value);
    setMinPrice(newMinPrice);

    if (newMinPrice > maxPrice) {
      setMaxPrice(newMinPrice);
    }
  };

  const handleMaxChange = (e) => {
    const newMaxPrice = parseInt(e.target.value);
    setMaxPrice(newMaxPrice);

    if (newMaxPrice < minPrice) {
      setMinPrice(newMaxPrice);
    }
  };

  const [selectedAges, setSelectedAges] = useState([]); // Use an array for selected ages
  const [selectedBreedNames, setSelectedBreedNames] = useState([]); // Use an array for selected breed names

  const handleAgeChange = (e) => {
    const age = e.target.value;
    const updatedSelectedAges = [...selectedAges];

    if (updatedSelectedAges.includes(age)) {
      updatedSelectedAges.splice(updatedSelectedAges.indexOf(age), 1);
    } else {
      updatedSelectedAges.push(age);
    }

    setSelectedAges(updatedSelectedAges);
  };

  const handleBreedChange = (e) => {
    const breedName = e.target.value;
    console.log(e.target.value);
    const updatedSelectedBreedNames = [...selectedBreedNames];

    if (updatedSelectedBreedNames.includes(breedName)) {
      updatedSelectedBreedNames.splice(
        updatedSelectedBreedNames.indexOf(breedName),
        1
      );
    } else {
      updatedSelectedBreedNames.push(breedName);
    }
    setSelectedBreedNames(updatedSelectedBreedNames);
  };

  const getFilterDogs = async () => {
    try {
      let queryParams = "";

      // if (breedName) {
      //   queryParams += `breedName=${breedName}`;
      // }

      // if (age) {
      //   queryParams += `${queryParams ? "&" : ""}age=${age}`;
      // }

      if (selectedBreedNames.length > 0) {
        queryParams += `${
          queryParams ? "&" : ""
        }breedName=${selectedBreedNames.join("&breedName=")}`;
      }

      if (selectedAges.length > 0) {
        queryParams += `${queryParams ? "&" : ""}age=${selectedAges.join(
          "&age="
        )}`;
      }

      if (selectedGenders.length > 0) {
        queryParams += `${queryParams ? "&" : ""}gender=${selectedGenders.join(
          "&gender="
        )}`;
      }

      // if (minPrice) {
      //   queryParams += `${queryParams ? "&" : ""}minPrice=${minPrice}`;
      // }

      // if (maxPrice) {
      //   queryParams += `${queryParams ? "&" : ""}maxPrice=${maxPrice}`;
      // }

      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}user/find-dogs?page=${currentPage}&limit=12&${queryParams}`
      );
      setTotalPages(response.data.totalPages);
      setDogs(response.data.filteredDogs);
    } catch (error) {
      console.error("Error fetching filtered dogs:", error);
      // Handle errors or display an error message as needed
    }
  };

  function StarRating({ averageRating }) {
    const fullStars = Math.floor(averageRating);
    const halfStar = averageRating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    const starIcons = [];
    for (let i = 0; i < fullStars; i++) {
      starIcons.push(<i key={i} className="fa fa-star" aria-hidden="true" />);
    }
    if (halfStar) {
      starIcons.push(
        <i key="half" className="fa fa-star-half" aria-hidden="true" />
      );
    }
    for (let i = 0; i < emptyStars; i++) {
      starIcons.push(
        <i key={`empty-${i}`} className="fa fa-star-o" aria-hidden="true" />
      );
    }

    return <div className="star-rating">{starIcons}</div>;
  }

  useEffect(() => {
    getReviews();
  }, []);

  useEffect(() => {
    getAllDogs();
  }, [currentPage]);

  useEffect(() => {
    getAllBreeds();
    getAllCategories();
  }, []);

  useEffect(() => {
    getFilterDogs();
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [
    selectedBreedNames,
    selectedAges,
    selectedGenders,
    currentPage,
    totalPages,
  ]);

  useEffect(() => {
    getLikedDogs()
  }, [callApi])

  return (
    <>
      <Navbar setOpenSideNav={setOpenSideNav} openSideNav={openSideNav} />

      {openSideNav && <SideNav />}
      <div>
        <section>
          <div className="container">
            <h4>
              <b> Puppies for sale</b>
            </h4>
            <p className="text-justify">
              At MyPuppy Pro, we know that our exclusive network of breeders
              produces the best dog. That's why every puppy for sale is given a
              complete nose-to-tail checkup before being delivered right to your
              door. We then back that up with a full 10-year health commitment.
              We call it our MyPuppy Pro Promise.
            </p>
          </div>
        </section>
        <section className="shop spad">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-3">
                <div className="shop__sidebar">
                  <div className="sidebar__categories">
                    <div className="section-title mt-3">
                      <h6>Showing {dogs.length} Puppies</h6>
                    </div>
                    <div className="categories__accordion">
                      <div className="accordion" id="accordionExample">
                        <div className="card" id="accordionSectionFilter">
                          <div className="card-heading active d-flex justify-content-between">
                            <a
                              className="filters text-color"
                              data-toggle="collapse"
                              data-target="#collapseOne"
                            >
                              <b>Filters</b>
                            </a>
                            <a
                              className="text-dark reset"
                              data-toggle="collapse"
                              style={{ cursor: "pointer" }}
                              data-target="#collapseOne"
                              onClick={() => {
                                setSelectedGenders([]);
                                setSelectedAges([]);
                                setSelectedBreedNames([]);
                              }}
                            >
                              Reset
                            </a>
                          </div>
                        </div>
                        <div className="card" id="accordionSectionFilter">
                          <div className="card-heading d-flex justify-content-between align-items-center">
                            <a
                              className="text-color"
                              data-toggle="collapse"
                              data-target="#collapseTwo"
                            >
                              <b>Gender</b>
                            </a>
                            <i
                              data-toggle="collapse"
                              data-target="#collapseTwo"
                              className="fa fa-angle-down"
                              style={{ cursor: "pointer" }}
                            />
                          </div>
                          <div
                            id="collapseTwo"
                            className="collapse"
                            data-parent="#accordionExample"
                          >
                            <div className="card-body">
                              <ul>
                                <li className="d-flex text-color">
                                  <input
                                    className="mr-2"
                                    type="checkbox"
                                    name="gender"
                                    value="Male"
                                    checked={selectedGenders.includes("Male")}
                                    onChange={handleGenderChange}
                                  />
                                  <a href="#" className="text-color">
                                    Male
                                  </a>
                                </li>
                                <li className="d-flex text-color">
                                  <input
                                    className="mr-2"
                                    type="checkbox"
                                    name="gender"
                                    value="Female"
                                    checked={selectedGenders.includes("Female")}
                                    onChange={handleGenderChange}
                                  />
                                  <a href="#" className="text-color">
                                    Female
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="card" id="accordionSectionFilter">
                          <div className="card-heading d-flex justify-content-between align-items-center">
                            <a
                              data-toggle="collapse"
                              data-target="#collapseThree"
                              className="text-color"
                            >
                              <b>Breed</b>
                            </a>
                            <i
                              data-toggle="collapse"
                              data-target="#collapseThree"
                              className="fa fa-angle-down"
                              style={{ cursor: "pointer" }}
                            />
                          </div>
                          <div
                            id="collapseThree"
                            className="collapse"
                            data-parent="#accordionExample"
                          >
                            <div className="card-body">
                              <ul>
                                {breeds?.map((breed) => (
                                  <li
                                    className="d-flex text-color"
                                    key={breed.name}
                                  >
                                    <input
                                      className="mr-2"
                                      type="checkbox"
                                      name="breed"
                                      value={breed.name}
                                      checked={selectedBreedNames.includes(
                                        breed.name
                                      )}
                                      onChange={handleBreedChange}
                                    />
                                    <a href="#" className="text-color">
                                      {breed.name}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="card" id="accordionSectionFilter">
                          <div className="card-heading d-flex justify-content-between align-items-center">
                            <a
                              data-toggle="collapse"
                              data-target="#collapseFour"
                              className="text-color"
                            >
                              <b>Collections</b>
                            </a>
                            <i
                              data-toggle="collapse"
                              data-target="#collapseFour"
                              className="fa fa-angle-down"
                              style={{ cursor: "pointer" }}
                            />
                          </div>
                          <div
                            id="collapseFour"
                            className="collapse"
                            data-parent="#accordionExample"
                          >
                            <div className="card-body">
                              <ul>
                                {categories?.map((category) => {
                                  return (
                                    <li className="d-flex text-color">
                                      <input
                                        className="mr-2"
                                        type="checkbox"
                                        name
                                        id
                                      />
                                      <a
                                        href="#"
                                        style={{ textTransform: "capitalize" }}
                                        className="text-color"
                                      >
                                        {category.name}
                                      </a>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="card" id="accordionSectionFilter">
                          <div className="card-heading d-flex justify-content-between align-items-center">
                            <a
                              data-toggle="collapse"
                              data-target="#collapseFive"
                              className="text-color"
                            >
                              <b>Age</b>
                            </a>
                            <i
                              data-toggle="collapse"
                              data-target="#collapseFive"
                              className="fa fa-angle-down"
                              style={{ cursor: "pointer" }}
                            />
                          </div>
                          <div
                            id="collapseFive"
                            className="collapse"
                            data-parent="#accordionExample"
                          >
                            <div className="card-body">
                              <ul>
                                <li className="d-flex text-color">
                                  <input
                                    className="mr-2"
                                    type="checkbox"
                                    name="age"
                                    value="1"
                                    checked={selectedAges.includes("1")}
                                    onChange={handleAgeChange}
                                  />
                                  <a href="#" className="text-color">
                                    1
                                  </a>
                                </li>
                                <li className="d-flex text-color">
                                  <input
                                    className="mr-2"
                                    type="checkbox"
                                    name="age"
                                    value="2"
                                    checked={selectedAges.includes("2")}
                                    onChange={handleAgeChange}
                                  />
                                  <a href="#" className="text-color">
                                    2
                                  </a>
                                </li>
                                <li className="d-flex text-color">
                                  <input
                                    className="mr-2"
                                    type="checkbox"
                                    name="age"
                                    value="3"
                                    checked={selectedAges.includes("3")}
                                    onChange={handleAgeChange}
                                  />
                                  <a href="#" className="text-color">
                                    3
                                  </a>
                                </li>
                                <li className="d-flex text-color">
                                  <input
                                    className="mr-2"
                                    type="checkbox"
                                    name="age"
                                    value="4"
                                    checked={selectedAges.includes("4")}
                                    onChange={handleAgeChange}
                                  />
                                  <a href="#" className="text-color">
                                    4
                                  </a>
                                </li>
                                <li className="d-flex text-color">
                                  <input
                                    className="mr-2"
                                    type="checkbox"
                                    name="age"
                                    value="5"
                                    checked={selectedAges.includes("5")}
                                    onChange={handleAgeChange}
                                  />
                                  <a href="#" className="text-color">
                                    5
                                  </a>
                                </li>
                                <li className="d-flex text-color">
                                  <input
                                    className="mr-2"
                                    type="checkbox"
                                    name="age"
                                    value="6"
                                    checked={selectedAges.includes("6")}
                                    onChange={handleAgeChange}
                                  />
                                  <a href="#" className="text-color">
                                    6
                                  </a>
                                </li>
                                <li className="d-flex text-color">
                                  <input
                                    className="mr-2"
                                    type="checkbox"
                                    name="age"
                                    value="7"
                                    checked={selectedAges.includes("7")}
                                    onChange={handleAgeChange}
                                  />
                                  <a href="#" className="text-color">
                                    7
                                  </a>
                                </li>
                                <li className="d-flex text-color">
                                  <input
                                    className="mr-2"
                                    type="checkbox"
                                    name="age"
                                    value="8"
                                    checked={selectedAges.includes("8")}
                                    onChange={handleAgeChange}
                                  />
                                  <a href="#" className="text-color">
                                    8
                                  </a>
                                </li>
                                <li className="d-flex text-color">
                                  <input
                                    className="mr-2"
                                    type="checkbox"
                                    name="age"
                                    value="9"
                                    checked={selectedAges.includes("9")}
                                    onChange={handleAgeChange}
                                  />
                                  <a href="#" className="text-color">
                                    9
                                  </a>
                                </li>
                                <li className="d-flex text-color">
                                  <input
                                    className="mr-2"
                                    type="checkbox"
                                    name="age"
                                    value="10"
                                    checked={selectedAges.includes("10")}
                                    onChange={handleAgeChange}
                                  />
                                  <a href="#" className="text-color">
                                    10
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        {/* <div className="card" id="accordionSectionFilter">
                          <div className="card-heading d-flex justify-content-between align-items-center">
                            <a
                              data-toggle="collapse"
                              data-target="#collapseSix"
                              className="text-color"
                            >
                              <b>Color</b>
                            </a>
                            <i
                              data-toggle="collapse"
                              data-target="#collapseSix"
                              className="fa fa-angle-down"
                              style={{ cursor: "pointer" }}
                            />
                          </div>
                          <div
                            id="collapseSix"
                            className="collapse"
                            data-parent="#accordionExample"
                          >
                            <div className="card-body">
                              <ul>
                                <li className="d-flex text-color">
                                  <input
                                    className="mr-2"
                                    type="checkbox"
                                    name
                                    id
                                  />
                                  <a href="#" className="text-color">
                                    Coats
                                  </a>
                                </li>
                                <li className="d-flex text-color">
                                  <input
                                    className="mr-2"
                                    type="checkbox"
                                    name
                                    id
                                  />
                                  <a href="#" className="text-color">
                                    Jackets
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="card" id="accordionSectionFilter">
                          <div className="card-heading d-flex justify-content-between align-items-center">
                            <a
                              data-toggle="collapse"
                              data-target="#collapseSeven"
                              className="text-color"
                            >
                              <b>Video</b>
                            </a>
                            <i
                              data-toggle="collapse"
                              data-target="#collapseSeven"
                              className="fa fa-angle-down"
                              style={{ cursor: "pointer" }}
                            />
                          </div>
                          <div
                            id="collapseSeven"
                            className="collapse"
                            data-parent="#accordionExample"
                          >
                            <div className="card-body">
                              <ul>
                                <li className="d-flex text-color">
                                  <input
                                    className="mr-2"
                                    type="checkbox"
                                    name
                                    id
                                  />
                                  <a href="#" className="text-color">
                                    Coats
                                  </a>
                                </li>
                                <li className="d-flex text-color">
                                  <input
                                    className="mr-2"
                                    type="checkbox"
                                    name
                                    id
                                  />
                                  <a href="#" className="text-color">
                                    Jackets
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="card" id="accordionSectionFilter">
                          <div className="card-heading d-flex justify-content-between align-items-center">
                            <a
                              data-toggle="collapse"
                              data-target="#collapseEight"
                              className="text-color"
                            >
                              <b>Ready to travel</b>
                            </a>
                            <i
                              data-toggle="collapse"
                              data-target="#collapseEight"
                              className="fa fa-angle-down"
                              style={{ cursor: "pointer" }}
                            />
                          </div>
                          <div
                            id="collapseEight"
                            className="collapse"
                            data-parent="#accordionExample"
                          >
                            <div className="card-body">
                              <ul>
                                <li className="d-flex text-color">
                                  <input
                                    className="mr-2"
                                    type="checkbox"
                                    name
                                    id
                                  />
                                  <a href="#" className="text-color">
                                    Coats
                                  </a>
                                </li>
                                <li className="d-flex text-color">
                                  <input
                                    className="mr-2"
                                    type="checkbox"
                                    name
                                    id
                                  />
                                  <a href="#" className="text-color">
                                    Jackets
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="card" id="accordionSectionFilter">
                          <div className="card-heading d-flex justify-content-between align-items-center">
                            <a
                              data-toggle="collapse"
                              data-target="#collapseNine"
                              className="text-color"
                            >
                              <b>OFA Certified</b>
                            </a>
                            <i
                              data-toggle="collapse"
                              data-target="#collapseNine"
                              className="fa fa-angle-down"
                              style={{ cursor: "pointer" }}
                            />
                          </div>
                          <div
                            id="collapseNine"
                            className="collapse"
                            data-parent="#accordionExample"
                          >
                            <div className="card-body">
                              <ul>
                                <li className="d-flex text-color">
                                  <input
                                    className="mr-2"
                                    type="checkbox"
                                    name
                                    id
                                  />
                                  <a href="#" className="text-color">
                                    Coats
                                  </a>
                                </li>
                                <li className="d-flex text-color">
                                  <input
                                    className="mr-2"
                                    type="checkbox"
                                    name
                                    id
                                  />
                                  <a href="#" className="text-color">
                                    Jackets
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                  <div className="categories__accordion mt-4">
                    <div className="accordion" id="accordionExample">
                      <div className="card" id="accordionSectionFilter">
                        <div className="card-heading active d-flex justify-content-center">
                          <a
                            data-toggle="collapse"
                            data-target="#collapseOne"
                            className="text-center text-color"
                          >
                            <b>Related Articles</b>
                          </a>
                        </div>
                      </div>
                      <div className="card" id="accordionSectionFilter">
                        <div className="card-heading d-flex justify-content-center">
                          <a
                            style={{ fontWeight: 500 }}
                            data-toggle="collapse"
                            data-target="#collapseTwo"
                            className="text-center text-color"
                          >
                            How MyPuppy Pro Works
                          </a>
                        </div>
                      </div>
                      <div
                        className="card"
                        id="accordionSectionFilter"
                        style={{ border: "none !important" }}
                      >
                        <div className="card-heading d-flex justify-content-center">
                          <a
                            style={{ fontWeight: 500 }}
                            data-toggle="collapse"
                            data-target="#collapseFive"
                            className="text-center text-color"
                          >
                            A step by step tutorial to leash training
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-9 col-md-9">
                <div className="row" id="main-view">
                  <div className="col-lg-3 col-md-2"></div>
                  <div className="col-lg-3 col-md-2 "></div>
                  <div className="col-lg-2 col-md-2"></div>
                  <div className="btn-group shadow-0 col-lg-4 col-md-6">
                    <button
                      type="button"
                      className="btn btn-link dropdown-toggle sort-by-btn"
                      data-mdb-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Sort By Featured
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <a className="dropdown-item" href="#">
                          Action
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Another action
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Something else here
                        </a>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Separated link
                        </a>
                      </li>
                    </ul>
                  </div>

                  {/* DOGS DISPLAY START */}
                  <div className="row" id="mobile-view-cards">
                    {dogs?.map((dog) => {
                      const isLiked = likedDogs.some(
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
                                {USER?.type === "customer" && (
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
                                    onClick={(e) => {
                                      e.preventDefault();
                                      toggleLikeDog(dog._id);
                                    }}
                                  />
                                )}
                                <img
                                  className="card-img-top"
                                  src={
                                    dog.images.length > 0
                                      ? dog.images[0]
                                      : dog.image
                                  }
                                  alt="Card image cap"
                                  style={{ height: "8rem", objectFit: "cover" }}
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
                    })}
                  </div>
                  {/* DOGS DISPLAY END */}

                  <div className="col-lg-12 text-center mt-4">
                    {/* <div className="pagination__option d-flex justify-content-center align-items-center">
                      <div>
                        {" "}
                        <a href="#" className="mr-1 next-btn">
                          1
                        </a>
                      </div>
                      <div>
                        <a href="#" className=" text-dark next-btn-next">
                          2
                        </a>
                      </div>
                      <div>
                        <a href="#" className=" text-dark next-btn-next">
                          3
                        </a>
                      </div>
                      <div>
                        <a href="#" className=" text-dark next-btn-next">
                          4
                        </a>
                      </div>
                      <div>
                        <a href="#" className=" text-dark next-btn-next">
                          5
                        </a>
                      </div>
                      <div>
                        {" "}
                        <a href="#" className=" text-dark next-btn-next">
                          6
                        </a>
                      </div>
                      <div>
                        {" "}
                        <a href="#" className=" text-dark">
                          .
                        </a>
                      </div>
                      <div>
                        {" "}
                        <a href="#" className=" text-dark">
                          .
                        </a>
                      </div>
                      <div>
                        {" "}
                        <a href="#" className=" text-dark">
                          .
                        </a>
                      </div>
                      <div>
                        <a href="#" className=" text-dark">
                          .
                        </a>
                      </div>
                      <div>
                        {" "}
                        <a href="#" className=" text-dark next-btn-next">
                          96
                        </a>
                      </div>
                      <a href="#" className=" text-dark">
                        <i className="fa fa-angle-right" />
                      </a>
                    </div> */}
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={onPageChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="ftco-section">
          <div id="trusted" className="container">
            <p className="text-justify">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia
              officiis rem temporibus harum, asperiores, pariatur ipsam dolore
              molestiae tempore ullam atque nihil nulla ea praesentium, debitis
              fuga sequi quod. Laborum? Doloribus, ad at debitis cumque maxime
              quia eligendi. Officia dolore iste harum laudantium dicta,
              repellendus totam, omnis porro labore suscipit doloribus facere
              ipsa amet dolor, laboriosam officiis iure consequatur cumque.
              Quisquam culpa magnam ipsa voluptatum esse. Architecto nesciunt,
              eius, vero animi magni fugit numquam laudantium corrupti quas vel
              hic nam. Magnam incidunt repellendus ipsum fugit modi dicta, vitae
              fuga. Eum? Ut iusto minima dolore veritatis nam omnis aliquid,
              exercitationem fuga in natus. Dignissimos, rerum facere quos
              repudiandae fuga voluptate cumque nisi, at molestias amet natus,
              sit perspiciatis aspernatur culpa cum. Commodi officiis ipsum vel
              rerum itaque ipsa optio hic, libero est. Minima aspernatur,
              aliquid natus autem placeat labore, iure voluptatibus quis
              tempora, excepturi eum voluptate molestias suscipit accusamus
              repudiandae! Repellat. Rerum deleniti illum ipsam aut blanditiis,
              exercitationem voluptatum, error, earum voluptatem libero
              laboriosam eligendi sit hic nostrum voluptate quisquam? Illo
              impedit nulla atque earum ea sapiente esse temporibus recusandae
              incidunt!
            </p>
          </div>
        </section>
        <section className="ftco-section" style={{ padding: "1em 0" }}>
          {/* <h1 class="text-center">MyPuppy Pro Promises </h1> */}
          <div id="trusted" className="container">
            {/* <div class="row justify-content-center pb-5 mb-3">
				<div class="col-md-7 heading-section text-center ">
					<h2>Affordable Packages</h2>
				</div>
			</div> */}
            <div className="row" style={{ marginTop: "50px" }}>
              <div className="col-md-4 ">
                <div className="block-7 .block-7-shadow">
                  <div
                    className="img"
                    style={{ backgroundImage: "url(images/pricing-1.jpg)" }}
                  />
                  <div className="text-center">
                    <p>
                      Our breeders are vetted and screened in partnership with
                      USDA
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 ">
                <div className="block-7 .block-7-shadow">
                  <div
                    className="img"
                    style={{ backgroundImage: "url(images/pricing-2.jpg)" }}
                  />
                  <div className="text-center">
                    <p>
                      All our puppies recive our industry-leading 10-year puppy
                      health commitment.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 ">
                <div className="block-7 .block-7-shadow">
                  <div
                    className="img"
                    style={{ backgroundImage: "url(images/pricing-3.jpg)" }}
                  />
                  <div className="text-center">
                    <p>
                      Our private travel network ensures your pup arrives home
                      healthy and safe
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-12 d-flex justify-content-center trusted_section">
                <div className="col-lg-8 d-flex align-items-center justify-content-center trusted-content">
                  <img src="images/trust.png" alt="logo" srcSet />
                  <h3>Trusted By Over 1000+ Families</h3>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="ftco-section">
          <div className="container">
            <div className="row justify-content-center ">
              <div className="col-md-7 heading-section text-center ">
                <h2 className="text-color">Reviews</h2>
              </div>
            </div>
            <div className="card-deck mt-3">
              {reviews?.map((review) => {
                return (
                  <>
                    <div
                      className="card review-cards"
                      style={{ maxWidth: "40%", minWidth: 0 }}
                    >
                      <img
                        className="card-img-top"
                        src={review.image}
                        alt="Card image cap"
                      />
                      <div className="card-body">
                        <h5 className="card-title  m-0">{review.dogName}</h5>
                        <p className="  m-0">
                          {moment(review.createdAt).format("DD/MM/YYYY")}
                        </p>
                        <p className="  m-0">{review.breed}</p>

                        <StarRating averageRating={review.averageRating} />

                        <p className="card-text  text-justify">
                          {review.review}
                        </p>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          <div className="d-flex justify-content-center mt-4">
            <button class="review btn">All Reviews</button>
          </div>
        </section>
        <section className="ftco-section ftco-no-pt ftco-no-pb ">
          <h1 className="collection-heading">Collections</h1>
          <br />
          <div className="container">
            <div className="row align-items-center justify-content-center">
              {categories?.map((category) => {
                return (
                  <div
                    className="col-sm-12 col-lg-4 d-flex justify-content-center collectionImg mt-2"
                    style={{ margin: 0, padding: 0 }}
                  >
                    <img
                      className="card-img1 collection-imgs"
                      src={category.image}
                      alt="Bologna"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
      <Footer2 />
    </>
  );
}

export default FindPuppy;
