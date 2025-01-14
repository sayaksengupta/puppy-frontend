import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import Footer2 from "../Components/Footer2";
import MobileNavbar from "../Components/MobileNavbar";
import Navbar from "../Components/Navbar";
import SideNav from "../Components/SideNav";
import "../css/home.css";
import "../css/index-style.css";

function Home() {
  const [categories, setCategories] = useState([]);
  const [dogs, setDogs] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [likedDogs, setLikedDogs] = useState([]);

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [searchBy, setSearchBy] = useState("all");
  const [openSideNav, setOpenSideNav] = useState(false);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [callApi, setCallApi] = useState(false);

  const USER = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const getAllCategories = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}category/get-all-categories`)
      .then((res) => {
        console.log(res.data);
        setCategories(res.data);
      });
  };

  const getAllDogs = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}user/get-dogs?limit=8`)
      .then((res) => {
        console.log(res.data);
        setDogs(res.data.dogs);
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
        setLikedDogs(res.data.likedDogs);
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

  const [minPrice, setMinPrice] = useState(100);
  const [maxPrice, setMaxPrice] = useState(9000);

  const [minAge, setMinAge] = useState(0);
  const [maxAge, setMaxAge] = useState(72);

  const handleMinChange = (e) => {
    const newMinPrice = parseInt(e.target.value);
    setMinPrice(newMinPrice);

    // Make sure minPrice is less than or equal to maxPrice
    if (newMinPrice > maxPrice) {
      setMaxPrice(newMinPrice);
    }
  };

  const handleMaxChange = (e) => {
    const newMaxPrice = parseInt(e.target.value);
    setMaxPrice(newMaxPrice);

    // Make sure maxPrice is greater than or equal to minPrice
    if (newMaxPrice < minPrice) {
      setMinPrice(newMaxPrice);
    }
  };

  const handleMinAgeChange = (e) => {
    const newMinAge = parseInt(e.target.value);
    setMinAge(newMinAge);

    // Make sure minPrice is less than or equal to maxPrice
    if (newMinAge > maxAge) {
      setMaxAge(newMinAge);
    }
  };

  const handleMaxAgeChange = (e) => {
    const newMaxAge = parseInt(e.target.value);
    setMaxAge(newMaxAge);

    // Make sure maxPrice is greater than or equal to minPrice
    if (newMaxAge < minAge) {
      setMinAge(newMaxAge);
    }
  };

  const [breedNames, setBreedNames] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");
  const [bredType, setBredType] = useState("purebred_designer");

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const getFilterDogs = async () => {
    const queryParams = {
      breedNames: breedNames.length > 0 ? breedNames.join(",") : [],
      gender,
      location,
      minPrice,
      maxPrice,
      minAge,
      maxAge,
      bredType,
      searchBy,
    };

    // // Add age to queryParams only if it's greater than 0
    // if (age > 0) {
    //   queryParams.age = age;
    // }

    await axios
      .get(`${process.env.REACT_APP_BASE_URL}user/filter-dogs`, {
        params: queryParams,
      })
      .then((res) => {
        console.log(res.data);
        setDogs(res.data.filteredDogs);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const fetchStates = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}admin/get-all-states`)
      .then((res) => {
        console.log(res.data);
        setStates(res.data.states);
      })
      .catch((e) => {
        alert(e.response.data.message);
      });
  };

  const fetchCities = async (city) => {
    if (city.length < 2) return; // Do not fetch if less than 2 characters

    await axios
      .get(`${process.env.REACT_APP_BASE_URL}admin/search-city?city=${city}`)
      .then((res) => {
        setCities(res.data.cities); // Assuming the response contains the cities directly
      })
      .catch((e) => {
        // alert(e.response.data.message);
      });
  };

  useEffect(() => {
    getAllCategories();
    getAllDogs();
    getAllBreeds();
    fetchStates();
  }, []);

  useEffect(() => {
    if (token) {
      getLikedDogs();
    }
  }, [token, callApi]);

  const [searchTerm, setSearchTerm] = useState("");
  const [locSearchTerm, setLocSearchTerm] = useState("");
  const [filteredBreeds, setFilteredBreeds] = useState(breeds);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value) {
      const filtered = breeds.filter((breed) =>
        breed.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredBreeds(filtered);
    } else {
      setFilteredBreeds(breeds);
    }
  };

  const handleBreedChange = (breedName) => {
    setBreedNames((prevBreedNames) => {
      if (prevBreedNames.includes(breedName)) {
        return prevBreedNames.filter((name) => name !== breedName);
      } else {
        return [...prevBreedNames, breedName];
      }
    });
    setSearchTerm(breedName);
    setFilteredBreeds([]);
  };

  return (
    <>
      <Navbar setOpenSideNav={setOpenSideNav} openSideNav={openSideNav} />
      {/* <MobileNavbar setOpenSideNav={setOpenSideNav} openSideNav={openSideNav} /> */}

      {openSideNav && <SideNav />}

      <div>
        {/* <div
          className="hero-wrap js-fullheight"
          style={{
            backgroundImage: 'url("/images/breed-matchmaker.jpg")',
            height: "580px",
            display: "flex",
            alignItems: "center",
            backgroundPosition: "50% 50%",
            backgroundSize: "cover",
          }}
        >
          <div className="container">
            <div
              className="row no-gutters search-form slider-text js-fullheight align-items-center justify-content-center"
              data-scrollax-parent="true"
            >
              <div className="col-md-12 text-center">
                <div className="container">
                  <div className="row">
                    <div className="col-md-3 d-flex align-self-stretch px-4 flex-column">
                      <div className="dropdown d-flex flex-column">
                        <label
                          htmlFor="customRange1"
                          className="form-label filter-text"
                        >
                          Breed
                        </label>
                        <select
                          className="form-control"
                          id="exampleFormControlSelect1"
                          onChange={handleBreedChange}
                          value={breedName}
                        >
                          <option value="">Select Breed Type</option>
                          {breeds &&
                            breeds.map((breed) => {
                              return (
                                <>
                                  <option value={breed.name}>
                                    {breed.name}
                                  </option>
                                </>
                              );
                            })}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-3 d-flex align-self-stretch px-4 flex-column">
                      <div className="dropdown d-flex flex-column">
                        <label
                          htmlFor="customRange1"
                          className="form-label filter-text"
                        >
                          Age
                        </label>
                        <select
                          className="form-control"
                          id="exampleFormControlSelect1"
                          onChange={handleAgeChange}
                          defaultValue={0}
                          value={age}
                        >
                          <option value={0}>Select Age</option>
                          <option value={8}>Up To 8 Weeks</option>
                          <option value={16}>Up To 16 Weeks</option>
                          <option value={17}>Older Than 16 Weeks</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-3 d-flex align-self-stretch px-4 flex-column">
                      <div className="dropdown d-flex flex-column">
                        <label
                          htmlFor="customRange1"
                          className="form-label filter-text"
                        >
                          Gender
                        </label>
                        <select
                          className="form-control"
                          id="exampleFormControlSelect1"
                          onChange={handleGenderChange}
                          value={gender}
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="">Either</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-3 d-flex align-self-stretch px-4 flex-column">
                      <div className="dropdown d-flex flex-column">
                        <label
                          htmlFor="customRange1"
                          className="form-label filter-text"
                        >
                          Location
                        </label>
                        <select
                          className="form-control"
                          id="exampleFormControlSelect1"
                          style={{ textTransform: "capitalize" }}
                          onChange={(e) => setLocation(e.target.value)}
                        >
                          <option value="">Select State</option>
                          {states?.map((state) => {
                            return (
                              <option value={state.name}>{state.name}</option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div
                      className="col-md-9 d-flex align-self-stretch px-4"
                      style={{ flexDirection: "column" }}
                    >
                      <label
                        htmlFor="customRange1"
                        className="form-label filter-text"
                      >
                        Range
                      </label>
                      <div className="slider">
                        <div className="progress" />
                      </div>
                      <div className="range-input d-flex">
                        <input
                          type="range"
                          className="range-min"
                          style={{ cursor: "pointer" }}
                          min={1}
                          max={30000}
                          value={minPrice}
                          step={1}
                          onChange={handleMinChange}
                        />
                        <input
                          type="range"
                          className="range-max"
                          style={{ cursor: "pointer" }}
                          min={1}
                          max={30000}
                          value={maxPrice}
                          step={1}
                          onChange={handleMaxChange}
                        />
                      </div>
                      <div className="d-flex justify-content-between price-input">
                        <div className="d-flex align-items-center">
                          <label className="mt-2" htmlFor="$">
                            $
                          </label>
                          <input
                            style={{
                              background: "transparent",
                              border: "none",
                            }}
                            type="number"
                            className="input-min"
                            value={minPrice}
                            onChange={handleMinChange}
                          />
                        </div>
                        <div className="d-flex align-items-center justify-content-end">
                          <label className="mt-2" htmlFor="$">
                            $
                          </label>
                          <input
                            id="price6000"
                            type="number"
                            className="input-max input-filter"
                            value={maxPrice}
                            onChange={handleMaxChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3 d-flex align-self-stretch px-4 flex-column">
                      <button
                        type="button"
                        className="btn btn-transparent mt-2 clear-btn"
                        onClick={() => {
                          setBreedName("");
                          setAge(0);
                          setGender("");
                          setMinPrice(1);
                          setMaxPrice(30000);
                          setLocation("");
                          getAllDogs();
                        }}
                      >
                        Clear Filter
                      </button>
                      <button
                        type="button"
                        style={{ backgroundColor: "green" }}
                        className="btn btn-success mt-2"
                        onClick={getFilterDogs}
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        <div
          className={
            showAdvanced ? "hero-section adjusted-height" : "hero-section"
          }
          style={{ display: "flex", alignItems: "center" }}
        >
          <div className="hero-main">
            <div
              className="hero-inputs"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              {/* <div>
                <label style={{ display: "block", fontWeight: "bold" }} htmlFor>
                  Breed
                </label>
                <select
                  className="form-control"
                  id="exampleFormControlSelect1"
                  onChange={handleBreedChange}
                  value={breedNames}
                  style={{ width: "15rem" }}
                  multiple // Add the multiple attribute
                >
                  <option value="">Select Breed Type</option>
                  {breeds &&
                    breeds.map((breed) => {
                      return (
                        <option key={breed._id} value={breed.name}>
                          {breed.name}
                        </option>
                      );
                    })}
                </select>
              </div> */}

              <div style={{ position: "relative", width: "15rem" }}>
                <label
                  style={{
                    display: "block",
                    fontWeight: "bold",
                    color: "#f47e1e",
                    fontSize: "1.35rem",
                    textShadow: "1px 1px 1px #000",
                  }}
                  htmlFor="breedSearch"
                >
                  Breed
                </label>
                <input
                  type="text"
                  id="breedSearch"
                  className="form-control"
                  placeholder="Search Breeds..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  style={{ width: "100%" }}
                />
                {searchTerm && filteredBreeds.length > 0 && (
                  <ul
                    style={{
                      // position: "absolute",
                      // bottom: "-1.8rem",
                      // left: "0",
                      // width: "100%",
                      // border: "1px solid #ccc",
                      // backgroundColor: "#fff",
                      // maxHeight: "150px",
                      // overflowY: "auto",
                      // padding: "0",
                      // margin: "0",
                      // listStyleType: "none",
                      // zIndex: "1000",

                      position: "absolute",
                      top: "100%",
                      left: "0",
                      width: "100%",
                      border: "1px solid #ccc",
                      backgroundColor: "#fff",
                      maxHeight: "150px",
                      overflowY: "auto",
                      padding: "0",
                      margin: "0",
                      listStyleType: "none",
                      zIndex: "1000",
                    }}
                  >
                    {filteredBreeds.map((breed) => (
                      <li
                        key={breed._id}
                        onClick={() => handleBreedChange(breed.name)}
                        style={{
                          padding: "0.5rem",
                          cursor: "pointer",
                          backgroundColor: breedNames.includes(breed.name)
                            ? "#e9ecef"
                            : "#fff",
                          display: "block",
                        }}
                      >
                        {breed.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontWeight: "bold",
                    color: "#f47e1e",
                    fontSize: "1.35rem",
                    textShadow: "1px 1px 1px #000",
                  }}
                  htmlFor
                >
                  Search By
                </label>
                <select
                  className="form-control"
                  id="searchBySelect"
                  style={{ width: "15rem" }}
                  onChange={(e) => {
                    setSearchBy(e.target.value);
                  }} // Add a handler for search type change
                  value={searchBy}
                >
                  <option value="all">All Locations</option>
                  <option value="state">State</option>
                  <option value="city">City</option>
                </select>
              </div>

              {searchBy !== "all" && (
                <div>
                  <label
                     style={{
                      display: "block",
                      fontWeight: "bold",
                      color: "#f47e1e",
                      fontSize: "1.35rem",
                      textShadow: "1px 1px 1px #000",
                    }}
                    htmlFor="location"
                  >
                    Location
                  </label>
                  {searchBy === "state" ? (
                    <select
                      className="form-control"
                      id="exampleFormControlSelect1"
                      style={{ textTransform: "capitalize", width: "15rem" }}
                      onChange={(e) => setLocation(e.target.value)}
                      value={location}
                    >
                      <option value="" style={{ textTransform: "capitalize" }}>
                        Select State
                      </option>
                      {states?.map((state) => (
                        <option key={state.name} value={state.name}>
                          {state.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div style={{ position: "relative", width: "15rem" }}>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search Cities..."
                        value={locSearchTerm}
                        onChange={(e) => {
                          setLocSearchTerm(e.target.value);
                          fetchCities(e.target.value);
                        }}
                        style={{
                          width: "100%",
                          marginBottom: "1rem",
                          textTransform: "capitalize",
                        }}
                      />
                      {locSearchTerm && cities.length > 0 && (
                        <ul
                          style={{
                            position: "absolute",
                            top: "100%",
                            left: "0",
                            width: "100%",
                            border: "1px solid #ccc",
                            backgroundColor: "#fff",
                            maxHeight: "150px",
                            overflowY: "auto",
                            padding: "0",
                            margin: "0",
                            listStyleType: "none",
                            zIndex: "1000",
                          }}
                        >
                          {cities.map((city) => (
                            <li
                              key={city.name}
                              onClick={() => {
                                setLocation(city.name);
                                setLocSearchTerm(city.name);
                                setCities([]);
                              }}
                              style={{
                                padding: "0.5rem",
                                cursor: "pointer",
                                backgroundColor:
                                  location === city.name ? "#e9ecef" : "#fff",
                                display: "block",
                                textTransform: "capitalize",
                              }}
                            >
                              {city.name}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              )}

              <div>
                <label
                  style={{
                    display: "block",
                    fontWeight: "bold",
                    color: "#f47e1e",
                    fontSize: "1.35rem",
                    textShadow: "1px 1px 1px #000",
                  }}
                  htmlFor
                >
                  Gender
                </label>
                <select
                  className="form-control"
                  id="exampleFormControlSelect1"
                  onChange={handleGenderChange}
                  value={gender}
                  style={{ width: "15rem" }}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="">Either</option>
                </select>
              </div>
            </div>

            <div
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <button
                style={{
                  textTransform: "uppercase",
                  backgroundColor: "#00a650",
                  border: "none",
                  outline: "none",
                  padding: "5px",
                  color: "white",
                  cursor: "pointer",
                  height: "30px",
                  display: "flex",
                  alignItems: "center",
                }}
                onClick={getFilterDogs}
              >
                Search
              </button>
              <button
                id="advance-search"
                style={{
                  textTransform: "uppercase",
                  backgroundColor: "#00adef",
                  border: "none",
                  outline: "none",
                  padding: "5px",
                  color: "white",
                  cursor: "pointer",
                  height: "30px",
                  display: "flex",
                  alignItems: "center",
                }}
                onClick={() => setShowAdvanced(!showAdvanced)}
              >
                Advance Search
                <svg
                  style={{ width: "15px" }}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z"
                      fill="#FFFFFF"
                    />{" "}
                  </g>
                </svg>
              </button>
              <button
                style={{
                  textTransform: "uppercase",
                  backgroundColor: "#f47e1e",
                  border: "none",
                  outline: "none",
                  padding: "5px",
                  color: "white",
                  cursor: "pointer",
                  height: "30px",
                  display: "flex",
                  alignItems: "center",
                }}
                onClick={() => {
                  setBreedNames([]);
                  setAge(0);
                  setGender("");
                  setMinPrice(100);
                  setLocation("");
                  setMaxPrice(9000);
                  getAllDogs();
                  setMinAge(0);
                  setMaxAge(72);
                  setBredType("");
                  setSearchTerm("");
                  setLocSearchTerm("");
                }}
              >
                Clear filter
              </button>
            </div>
            <div
              id="advance-search-container"
              style={
                showAdvanced
                  ? {
                      position: "relative",
                      width: "100%",
                      top: "1rem",
                      display: "flex",
                    }
                  : {
                      display: "none",
                      position: "relative",
                      top: "1rem",
                      width: "100%",
                    }
              }
            >
              <div
                id="one"
                style={{
                  flex: 1,
                  borderRight: "1px solid black",
                  paddingRight: "20px",
                  width: "20rem !important",
                }}
              >
                <h3
                  style={{
                    fontWeight: "bold",
                    display: "block",
                    fontSize: "1.1rem",
                  }}
                >
                  Details
                </h3>
                <select
                  name
                  id
                  style={{ width: "100%", height: "50px", border: "none" }}
                  onChange={(e) => setBredType(e.target.value)}
                >
                  <option value="purebred_designer" selected>
                    Designer + Purebred
                  </option>
                  <option value="purebred">Purebred</option>
                  <option value="designer">Designer</option>
                </select>
              </div>
              <div id="two" style={{ flex: 1, paddingLeft: "20px" }}>
                <h3
                  style={{
                    fontWeight: "bold",
                    display: "flex",
                    fontSize: "1.1rem",
                  }}
                >
                  Selected Breeds
                </h3>

                {breedNames.length > 0 &&
                  breedNames?.map((elem) => {
                    return (
                      <button
                        style={{
                          padding: "0.4rem",
                          borderRadius: "100vw",
                          border: "none",
                          outline: "none",
                          backgroundColor: "#00adef",
                          color: "white",
                          marginTop: "0.25rem",
                          marginRight: "0.25rem",
                        }}
                      >
                        {elem}
                      </button>
                    );
                  })}
              </div>
              <div
                id="three"
                style={{
                  flex: 2,
                  display: "flex",
                  justifyContent: "center",
                  gap: "130px",
                  marginTop: "2rem",
                }}
              >
                <div style={{ position: "relative" }}>
                  <div
                    id="ageFilter"
                    style={{
                      backgroundColor: "#00adef",
                      borderRadius: "100vw",
                      width: "100px",
                      fontSize: "0.7rem",
                      padding: "2px 5px",
                      textAlign: "center",
                      position: "absolute",
                      bottom: "0.5rem",
                      left: "50%",
                      transform: "translateX(-50%)",
                      // marginBottom: "1rem",
                    }}
                  >
                    0 - 72 Weeks
                  </div>
                  <div className="slider ml-2">
                    <div className="progress" />
                  </div>
                  <div className="range-input d-flex">
                    <input
                      type="range"
                      className="range-min"
                      style={{ cursor: "pointer" }}
                      min={0}
                      max={72}
                      value={minAge}
                      step={1}
                      onChange={handleMinAgeChange}
                    />
                    <input
                      type="range"
                      className="range-max"
                      style={{ cursor: "pointer" }}
                      min={0}
                      max={72}
                      value={maxAge}
                      step={1}
                      onChange={handleMaxAgeChange}
                    />
                  </div>
                  <div className="d-flex justify-content-between price-input">
                    <div className="d-flex align-items-center">
                      <input
                        style={{
                          background: "transparent",
                          border: "none",
                        }}
                        type="number"
                        className="input-min"
                        value={minAge}
                        onChange={handleMinAgeChange}
                      />
                    </div>
                    <div className="d-flex align-items-center justify-content-end">
                      <input
                        id="price6000"
                        type="number"
                        className="input-max input-filter"
                        value={maxAge}
                        onChange={handleMaxAgeChange}
                      />
                    </div>
                  </div>
                </div>

                <div style={{ position: "relative" }}>
                  <div
                    style={{
                      backgroundColor: "#00adef",
                      borderRadius: "100vw",
                      width: "100px",
                      fontSize: "0.7rem",
                      padding: "2px 5px",
                      textAlign: "center",
                      position: "absolute",
                      bottom: "0.5rem",
                      left: "50%",
                      transform: "translateX(-50%)",
                    }}
                  >
                    100 - 9000+
                  </div>
                  <div className="slider">
                    <div className="progress" />
                  </div>
                  <div className="range-input d-flex">
                    <input
                      type="range"
                      className="range-min"
                      style={{ cursor: "pointer" }}
                      min={100}
                      max={9000}
                      value={minPrice}
                      step={50}
                      onChange={handleMinChange}
                    />
                    <input
                      type="range"
                      className="range-max"
                      style={{ cursor: "pointer" }}
                      min={100}
                      max={9000}
                      value={maxPrice}
                      step={50}
                      onChange={handleMaxChange}
                    />
                  </div>
                  <div className="d-flex justify-content-between price-input">
                    <div className="d-flex align-items-center">
                      <label className="mt-2" htmlFor="$">
                        $
                      </label>
                      <input
                        style={{
                          background: "transparent",
                          border: "none",
                        }}
                        type="number"
                        className="input-min"
                        value={minPrice}
                        onChange={handleMinChange}
                      />
                    </div>
                    <div className="d-flex align-items-center justify-content-end">
                      <label className="mt-2" htmlFor="$">
                        $
                      </label>
                      <input
                        id="price6000"
                        type="number"
                        className="input-max input-filter"
                        value={maxPrice}
                        onChange={handleMaxChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="container mt-4">
          <div className="title">
            <h1 className="new-puppies-heading">New Puppies</h1>
            <br />
          </div>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            <div className="container">
              <div className="row justify-content-center">
                {dogs.length > 0 ? (
                  dogs.map((dog) => {
                    const isLiked = likedDogs.some(
                      (likedDog) => likedDog._id === dog._id
                    );
                    return (
                      <div
                        className="col-12 col-sm-8 col-md-6 col-lg-3 col-xs-12 mt-3 mb-5"
                        id="mobile-view-card"
                      >
                        <div className="card new-puppies-cards">
                          <Link to={`/dog-profile?id=${dog._id}`}>
                            <div className="heading-card d-flex justify-content-between">
                              <img
                                className="new-puppies-cards-img"
                                src="./images/premium.png"
                                alt=""
                              />
                              {USER?.type == "customer" && (
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
                            </div>
                            <img
                              className="card-img"
                              src={dog.image ? dog.image : dog.images[0]}
                              alt="Bologna"
                              style={{
                                height: "21rem",
                                width: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </Link>
                          <div className="card-img-overlay text-white d-flex flex-column justify-content-center">
                            <Link to={`/dog-profile?id=${dog._id}`}>
                              <h4
                                style={{ color: "#fff !important" }}
                                className="text-white"
                              >
                                {dog.name}
                              </h4>
                              <h6 className="card-subtitle mb-2 text-white">
                                {dog.generic_name}
                              </h6>
                              <p
                                className="card-text text-white"
                                style={{ textTransform: "capitalize" }}
                              >
                                {dog.gender}, Born on{" "}
                                {dog.DOB.replace(/-/g, "/")}{" "}
                              </p>
                            </Link>
                            <div className="link d-flex flex-column">
                              <Link to={`/dog-profile?id=${dog._id}`} />
                              <Link
                                to={`/dog-profile?id=${dog._id}`}
                                className="card-link text-warning"
                              >
                                <span
                                  style={{ textTransform: "capitalize" }}
                                  className="highspire"
                                >
                                  {/* {dog.address
                                    .split(",")
                                    .map((part) => part.trim())
                                    .filter(Boolean)
                                    .slice(-2)
                                    .join(", ")} */}
                                  {dog.city
                                    ? `${dog.city}, ${dog.state}`
                                    : dog.address
                                        .split(",")
                                        .map((part) => part.trim())
                                        .filter(Boolean)
                                        .slice(-2)
                                        .join(", ")}
                                </span>{" "}
                              </Link>
                              <Link
                                to={`/dog-profile?id=${dog._id}`}
                                className="card-link text-warning"
                              >
                                <span className="price-tag">${dog.price}</span>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <h3 className="my-5" style={{ textAlign: "center" }}>
                    No Puppies Found :(
                  </h3>
                )}
              </div>
            </div>
          </div>
        </section>
        <section
          className="ftco-section ftco-no-pt ftco-no-pb "
          style={{ marginTop: "70px" }}
        >
          <h1 className="collection-heading">Collections</h1>
          <br />
          <div className="container">
            <div className="row align-items-center justify-content-center">
              {categories &&
                categories.map((cat) => {
                  return (
                    <div
                      className="col-sm-12 col-lg-4 d-flex justify-content-center collectionImg mt-2"
                      style={{ margin: 0, padding: 0 }}
                    >
                      <img
                        className="card-img1 collection-imgs"
                        src={cat.image}
                        alt="Bologna"
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </section>
        <br />
        <br />

        {/* Breed MatchMaker */}
        {/* <section>
          <h1 className="text-center mt-4 breed-matcher-heading">
            Breed Matchmaker
          </h1>
          <br />
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="container">
                  <div
                    className="col-lg-12 col-sm-12"
                    style={{ margin: 0 }}
                    id="breed-matchmaker-content"
                  >
                    <h6>What size range is ok</h6>
                  </div>
                  <div
                    className="col-lg-12 col-sm-12 d-flex flex-column"
                    style={{ margin: 0 }}
                    id="breed-matchmaker-range"
                  >
                    <div className="d-flex justify-content-between">
                      <label htmlFor="customRange1" className="form-label">
                        Miniture
                      </label>
                      <label htmlFor="customRange1" className="form-label">
                        Extra Large
                      </label>
                    </div>
                    <div className="slider">
                      <div
                        className="progress"
                        id="slider1"
                        style={{ backgroundColor: "black !important" }}
                      />
                    </div>
                    <div className="range-input d-flex">
                      <input
                        type="range"
                        className="range-min2"
                        id="lower"
                        min={0}
                        max={100}
                        defaultValue={0}
                      />
                      <input
                        type="range"
                        className="range-max2"
                        id="upper"
                        min={0}
                        max={100}
                        defaultValue={100}
                      />
                    </div>
                  </div>
                  <div
                    className="col-lg-12 col-sm-12"
                    style={{ margin: 0 }}
                    id="breed-matchmaker-content"
                  >
                    <h6>How much grooming is ok?</h6>
                  </div>
                  <div
                    className="col-lg-12 col-sm-12 d-flex flex-column"
                    style={{ margin: 0 }}
                    id="breed-matchmaker-range"
                  >
                    <div className="d-flex justify-content-between">
                      <label htmlFor="customRange1" className="form-label">
                        Miniture
                      </label>
                      <label htmlFor="customRange1" className="form-label">
                        Extra Large
                      </label>
                    </div>
                    <div className="slider">
                      <div
                        className="progress"
                        id="slider2"
                        style={{ backgroundColor: "black !important" }}
                      />
                    </div>
                    <div className="range-input d-flex">
                      <input
                        type="range"
                        className="range-min2"
                        id="lower"
                        min={0}
                        max={100}
                        defaultValue={0}
                      />
                      <input
                        type="range"
                        className="range-max2"
                        id="upper"
                        min={0}
                        max={100}
                        defaultValue={100}
                      />
                    </div>
                  </div>
                  <div
                    className="col-lg-12 col-sm-12"
                    style={{ margin: 0 }}
                    id="breed-matchmaker-content"
                  >
                    <h6>Playfulness Preference ?</h6>
                  </div>
                  <div
                    className="col-lg-12 col-sm-12 d-flex flex-column"
                    style={{ margin: 0 }}
                    id="breed-matchmaker-range"
                  >
                    <div className="d-flex justify-content-between">
                      <label htmlFor="customRange1" className="form-label">
                        Miniture
                      </label>
                      <label htmlFor="customRange1" className="form-label">
                        Extra Large
                      </label>
                    </div>
                    <div className="slider">
                      <div
                        className="progress"
                        id="slider3"
                        style={{ backgroundColor: "black !important" }}
                      />
                    </div>
                    <div className="range-input d-flex">
                      <input
                        type="range"
                        className="range-min2"
                        id="lower"
                        min={0}
                        max={100}
                        defaultValue={0}
                      />
                      <input
                        type="range"
                        className="range-max2"
                        id="upper"
                        min={0}
                        max={100}
                        defaultValue={100}
                      />
                    </div>
                  </div>
                  <div
                    className="col-lg-12 col-sm-12"
                    style={{ margin: 0 }}
                    id="breed-matchmaker-content"
                  >
                    <h6>Do you need Watchdog ?</h6>
                  </div>
                  <div
                    className="col-lg-12 col-sm-12 d-flex flex-column"
                    style={{ margin: 0 }}
                    id="breed-matchmaker-range"
                  >
                    <div className="d-flex justify-content-between">
                      <label htmlFor="customRange1" className="form-label">
                        Miniture
                      </label>
                      <label htmlFor="customRange1" className="form-label">
                        Extra Large
                      </label>
                    </div>
                    <div className="slider">
                      <div
                        className="progress"
                        id="slider4"
                        style={{ backgroundColor: "black !important" }}
                      />
                    </div>
                    <div className="range-input d-flex">
                      <input
                        type="range"
                        className="range-min2"
                        id="lower"
                        min={0}
                        max={100}
                        defaultValue={0}
                      />
                      <input
                        type="range"
                        className="range-max2"
                        id="upper"
                        min={0}
                        max={100}
                        defaultValue={100}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="container">
                  <div
                    className="col-lg-12 col-sm-12"
                    style={{ margin: 0 }}
                    id="breed-matchmaker-content"
                  >
                    <h6>What size range is ok</h6>
                  </div>
                  <div
                    className="col-lg-12 col-sm-12 d-flex flex-column"
                    style={{ margin: 0 }}
                    id="breed-matchmaker-range"
                  >
                    <div className="d-flex justify-content-between">
                      <label htmlFor="customRange1" className="form-label">
                        Miniture
                      </label>
                      <label htmlFor="customRange1" className="form-label">
                        Extra Large
                      </label>
                    </div>
                    <div className="slider">
                      <div
                        className="progress"
                        id="slider5"
                        style={{ backgroundColor: "black !important" }}
                      />
                    </div>
                    <div className="range-input d-flex">
                      <input
                        type="range"
                        className="range-min2"
                        id="lower"
                        min={0}
                        max={100}
                        defaultValue={0}
                      />
                      <input
                        type="range"
                        className="range-max2"
                        id="upper"
                        min={0}
                        max={100}
                        defaultValue={100}
                      />
                    </div>
                  </div>
                  <div
                    className="col-lg-12 col-sm-12"
                    style={{ margin: 0 }}
                    id="breed-matchmaker-content"
                  >
                    <h6>How much grooming is ok?</h6>
                  </div>
                  <div
                    className="col-lg-12 col-sm-12 d-flex flex-column"
                    style={{ margin: 0 }}
                    id="breed-matchmaker-range"
                  >
                    <div className="d-flex justify-content-between">
                      <label htmlFor="customRange1" className="form-label">
                        Miniture
                      </label>
                      <label htmlFor="customRange1" className="form-label">
                        Extra Large
                      </label>
                    </div>
                    <div className="slider">
                      <div
                        className="progress"
                        id="slider6"
                        style={{ backgroundColor: "black !important" }}
                      />
                    </div>
                    <div className="range-input d-flex">
                      <input
                        type="range"
                        className="range-min2"
                        id="lower"
                        min={0}
                        max={100}
                        defaultValue={0}
                      />
                      <input
                        type="range"
                        className="range-max2"
                        id="upper"
                        min={0}
                        max={100}
                        defaultValue={100}
                      />
                    </div>
                  </div>
                  <div
                    className="col-lg-12 col-sm-12"
                    style={{ margin: 0 }}
                    id="breed-matchmaker-content"
                  >
                    <h6>Playfulness Preference ?</h6>
                  </div>
                  <div
                    className="col-lg-12 col-sm-12 d-flex flex-column"
                    style={{ margin: 0 }}
                    id="breed-matchmaker-range"
                  >
                    <div className="d-flex justify-content-between">
                      <label htmlFor="customRange1" className="form-label">
                        Miniture
                      </label>
                      <label htmlFor="customRange1" className="form-label">
                        Extra Large
                      </label>
                    </div>
                    <div className="slider">
                      <div
                        className="progress"
                        id="slider7"
                        style={{ backgroundColor: "black !important" }}
                      />
                    </div>
                    <div className="range-input d-flex">
                      <input
                        type="range"
                        className="range-min2"
                        id="lower"
                        min={0}
                        max={100}
                        defaultValue={0}
                      />
                      <input
                        type="range"
                        className="range-max2"
                        id="upper"
                        min={0}
                        max={100}
                        defaultValue={100}
                      />
                    </div>
                  </div>
                  <div
                    className="col-lg-12 col-sm-12"
                    style={{ margin: 0 }}
                    id="breed-matchmaker-content"
                  >
                    <h6>Do you need Watchdog ?</h6>
                  </div>
                  <div
                    className="col-lg-12 col-sm-12 d-flex flex-column"
                    style={{ margin: 0 }}
                    id="breed-matchmaker-range"
                  >
                    <div className="d-flex justify-content-between">
                      <label htmlFor="customRange1" className="form-label">
                        Miniture
                      </label>
                      <label htmlFor="customRange1" className="form-label">
                        Extra Large
                      </label>
                    </div>
                    <div className="slider">
                      <div
                        className="progress"
                        id="slider8"
                        style={{ backgroundColor: "black !important" }}
                      />
                    </div>
                    <div className="range-input d-flex">
                      <input
                        type="range"
                        className="range-min2"
                        id="lower"
                        min={0}
                        max={100}
                        defaultValue={0}
                      />
                      <input
                        type="range"
                        className="range-max2"
                        id="upper"
                        min={0}
                        max={100}
                        defaultValue={100}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex col-lg-12 justify-content-center mt-4">
                <button className="button" data-submit="...Submitting">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </section> */}

        <section className="ftco-section">
          <h1 className="text-center puppyfetcher-promises-heading">
            PuppyFetcher Promises{" "}
          </h1>
          <div id="trusted" className="container">
            <div className="row" style={{ marginTop: "50px" }}>
              <div className="col-md-4">
                <div className="block-7 puppyfetcher-promises-block">
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
              <div className="col-md-4">
                <div className="block-7 puppyfetcher-promises-block">
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
              <div className="col-md-4">
                <div className="block-7 puppyfetcher-promises-block">
                  <div
                    className="img"
                    style={{ backgroundImage: "url(./images/pricing-3.jpg)" }}
                  />
                  <div className="text-center">
                    <p>
                      Our private travel network ensures your pup arrives home
                      healthy and safe
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-12 d-flex justify-content-center puppyfetcher-promises-down-section">
                <div className="col-lg-8 d-flex align-items-center justify-content-center puppyfetcher-promises-down-section-content">
                  <img src="/images/trust.png" alt="logo" srcSet />
                  <h3 className="trusted">Trusted By Over 1000+ Families</h3>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer2 />
    </>
  );
}

export default Home;
