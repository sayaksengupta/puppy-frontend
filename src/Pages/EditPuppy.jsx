import React, { useState, useRef } from "react";
import axios from "axios";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer2 from "../Components/Footer2";
import "../css/ListPuppy.css";
import SideNav from "../Components/SideNav";

function EditPuppy() {
  const token = localStorage.getItem("token");

  const user = JSON.parse(localStorage.getItem("user"));

  const [openSideNav, setOpenSideNav] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  // console.log(user);

  const getDog = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}user/get-dog/${id}`)
      .then((res) => {
        setDogData({
          ...res.data.dog,
          momWeight: res.data.dog.pedigree?.mother.weight,
          dadWeight: res.data.dog.pedigree?.father.weight,
        });
        setSearchTerm(res.data.dog.generic_name);
        setLocSearchTerm(res.data.dog.city);
      })
      .catch((e) => {
        alert(e.response.data.message);
      });
  };

  const [images, setImages] = useState([]);

  const [dogData, setDogData] = useState({
    breed: "",
    generic_name: "",
    age: "",
    color: "",
    gender: "",
    disability: false,
    DOB: "",
    availableDate: "",
    momWeight: "",
    dadWeight: "",
    address: user?.address?.line1
      ? `${user.address.line1}, ${user.address.line2}, ${user.city}, ${user.state}`
      : `${user.city}, ${user.state}, ${user.country}`,
    price: "",
    name: "",
    images: [], // To store the selected image file
    state: "",
    city: "",
    comments: "",
  });

  const inputRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBreeds, setFilteredBreeds] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [locSearchTerm, setLocSearchTerm] = useState("");

  const navigate = useNavigate();

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "breed_id") {
      setSearchTerm(value);
      const filtered = breeds.filter((breed) =>
        breed.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredBreeds(filtered);
    }

    setDogData({
      ...dogData,
      [name]: value,
    });
  };

  const [breeds, setBreeds] = useState([]);

  const getAllBreeds = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}breed/get-all-breeds`)
      .then((res) => {
        setBreeds(res.data.breeds);
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // Function to handle file uploads one by one
  const uploadFileHandler = async () => {
    try {
      const files = inputRef.current.files; // Get the selected files from the input element

      // Check if the total number of images does not exceed 10
      if (files.length + dogData.images.length > 10) {
        alert("Exceeded maximum allowed images (10)");
        return;
      }

      const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];

      const newImages = [...dogData.images]; // Copy the existing images

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Check if the file type is allowed
        if (!allowedFileTypes.includes(file.type)) {
          alert(`Supported file types: ".jpg", ".jpeg", ".png"`);
          continue;
        }

        const formData = new FormData(); // Create a FormData object to send the file

        formData.append("file", file); // Append the file to the FormData object

        // Send the file to the server using Axios or any other HTTP library
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}upload`,
          formData
        );

        newImages.push({
          id: i,
          url: response.data.fileUrl,
        });
      }

      // Update the dogData with all the received image URLs after all uploads are complete
      setDogData({
        ...dogData,
        images: newImages,
      });
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  // Function to submit the dog listing
  const editPuppy = async (e) => {
    e.preventDefault();

    const imageURLs = dogData.images?.map((image) =>
      image.url ? image.url : image
    );

    const Payload = {
      breed_id: dogData.breed,
      generic_name: dogData.generic_name,
      age: dogData.age,
      gender: dogData.gender.trim(),
      color: dogData.color,
      disability: dogData.disability,
      dob: dogData.DOB,
      momWeight: parseInt(dogData.momWeight),
      dadWeight: parseInt(dogData.dadWeight),
      availableDate: dogData.availableDate,
      address: dogData.address.trim(),
      price: dogData.price,
      name: dogData.name.trim(),
      images: imageURLs, // To store the selected image file
      comments: dogData.comments,
      state: dogData.state,
      city: dogData.city,
    };
    try {
      // Send a POST request to the add-dog API with dogData
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}user/edit-dog/${dogData._id}`,
        Payload,
        { headers: { token: token } }
      );

      // Handle the response, show success message, or navigate to another page
      console.log("Dog added successfully:", response.data);

      // Optionally, you can reset the dogData state after successful submission
      setDogData({
        breed_id: "",
        generic_name: "",
        age: "",
        gender: "",
        disability: false,
        address: "",
        price: "",
        name: "",
        images: [],
        comments: "",
        state: "",
        city: "",
      });

      // alert("Dog Edited Successfully !");
      navigate("/breeder-profile");
    } catch (error) {
      console.error("Error adding dog:", error);
      // Handle the error, show an error message, or take appropriate action
    }
  };

  const removeImage = (index) => {
    const updatedImages = [...dogData.images];
    updatedImages.splice(index, 1);
    setDogData({
      ...dogData,
      images: updatedImages,
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

  const handleBreedSelect = (breed) => {
    console.log(breed._id);
    setDogData({
      ...dogData,
      breed_id: breed._id,
      generic_name: breed.name,
    });
    setSearchTerm(breed.name);
    setFilteredBreeds([]);
  };

  useEffect(() => {
    getAllBreeds();
    getDog();
    fetchStates();
  }, []);

  return (
    <>
      <Navbar setOpenSideNav={setOpenSideNav} openSideNav={openSideNav} />

      {openSideNav && <SideNav />}
      <div className="container d-flex align-items-center justify-content-center min-vh-100">
        <div
          className="card mt-4"
          style={{ boxShadow: "0 5px 15px rgba(0, 0, 0, 0.15) !important" }}
        >
          <div className="form">
            <div className="right-side">
              <div className="main active">
                <form onSubmit={editPuppy}>
                  <div className="picture-container" id="forOtherDevices2">
                    <div
                      className="picture"
                      style={{ border: "1px solid black" }}
                    >
                      <img
                        src={dogData.image || "images/placeholder-image.jpg"}
                        className="picture-src"
                        id="wizardPicturePreview"
                        title=""
                      />
                      <input
                        type="file"
                        id="wizard-picture"
                        ref={inputRef}
                        onChange={uploadFileHandler}
                      />
                    </div>
                    <label>
                      <i className="fa fa-upload mr-1" aria-hidden="true" />
                      <b>Upload New Images: jpg, png (Up to 10 images)</b>
                    </label>
                  </div>

                  <div className="form-group">
                    <label htmlFor="inputAddress">
                      <b>Select Dog Family</b>
                    </label>
                    <input
                      type="text"
                      name="breed_id"
                      value={searchTerm}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Type to search breeds..."
                    />
                    {filteredBreeds.length > 0 && (
                      <ul
                        style={{
                          position: "absolute",
                          backgroundColor: "#fff",
                          border: "1px solid #ccc",
                          width: "27.35rem",
                          maxHeight: "150px",
                          overflowY: "auto",
                          listStyle: "none",
                          padding: "0",
                          margin: "0",
                          zIndex: "1000",
                        }}
                      >
                        {filteredBreeds.map((breed) => (
                          <li
                            key={breed._id}
                            onClick={() => handleBreedSelect(breed)}
                            style={{
                              padding: "0.5rem",
                              cursor: "pointer",
                              backgroundColor:
                                dogData.breed_id === breed._id
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
                  {/* <div className="form-group">
                    <label htmlFor="inputAddress">
                      <b>Dog Generic name</b>
                    </label>
                    <select
                      name="generic_name"
                      value={dogData.generic_name}
                      onChange={handleInputChange}
                    >
                      <option value="">Dog Breed</option>
                      {breeds?.map((breed) => {
                        return (
                          <option key={breed._id} value={breed.name}>
                            {breed.name}
                          </option>
                        );
                      })}
                    </select>
                  </div> */}
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="inputEmail4">
                        <b> Dog Name</b>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputEmail4"
                        name="name"
                        value={dogData.name}
                        onChange={handleInputChange}
                        placeholder="Dog Name"
                      />
                    </div>
                    {dogData.type == "puppy" ? (
                      <div className="form-group col-md-6">
                        <label htmlFor="inputPassword4">
                          <b>Age (in weeks)</b>{" "}
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="inputPassword4"
                          name="age"
                          value={dogData.age}
                          onChange={handleInputChange}
                          placeholder="Age of Dog"
                        />
                      </div>
                    ) : (
                      <div className="form-group col-md-6 btn-group-toggle">
                        <label htmlFor="inputPassword4">
                          <b>Any Disabilities</b>{" "}
                        </label>
                        <div className="btn-group btn-group-toggle d-flex">
                          <label
                            className={
                              dogData.disability
                                ? "btn btn-secondary active"
                                : "btn btn-secondary"
                            }
                          >
                            <input
                              type="checkbox"
                              name="disability"
                              checked={dogData.disability}
                              onChange={() =>
                                setDogData({
                                  ...dogData,
                                  disability: !dogData.disability,
                                })
                              }
                            />{" "}
                            Yes
                          </label>
                          <label
                            className={
                              !dogData.disability
                                ? "btn btn-secondary active"
                                : "btn btn-secondary"
                            }
                          >
                            <input
                              type="checkbox"
                              name="disability"
                              checked={!dogData.disability}
                              onChange={() =>
                                setDogData({
                                  ...dogData,
                                  disability: !dogData.disability,
                                })
                              }
                            />{" "}
                            No
                          </label>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="inputEmail4">
                        <b>Gender</b>{" "}
                      </label>
                      <select
                        type="text"
                        className="form-control"
                        id="inputEmail4"
                        name="gender"
                        value={dogData.gender}
                        onChange={handleInputChange}
                        // placeholder="Male/Female"
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>

                    <div className="form-group col-md-6">
                      <label htmlFor="inputPassword4">
                        <b>Color</b>{" "}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputPassword4"
                        name="color"
                        value={dogData.color}
                        onChange={handleInputChange}
                        placeholder="Color of Dog"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="state">
                        <b>Select State</b>{" "}
                      </label>
                      <select
                        type="text"
                        className="form-control"
                        id="state"
                        name="state"
                        value={dogData.state}
                        onChange={handleInputChange}
                        style={{ textTransform: "capitalize" }}
                      >
                        <option value="">Select State</option>
                        {states?.map((state) => (
                          <option key={state.name} value={state.name}>
                            {state.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group col-md-6">
                      <label htmlFor="city">
                        <b>Select City</b>{" "}
                      </label>
                      <input
                        type="text"
                        name="city"
                        className="form-control"
                        placeholder="Search Cities..."
                        value={locSearchTerm}
                        onChange={(e) => {
                          setLocSearchTerm(e.target.value);
                          fetchCities(e.target.value);
                        }}
                        style={{ width: "100%", textTransform: "capitalize" }}
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
                                setDogData({ ...dogData, city: city.name });
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
                  </div>

                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="inputEmail4">
                        <b> Date of Birth</b>
                      </label>
                      <input
                        type="date"
                        max={new Date().toISOString().split("T")[0]} // Format to "YYYY-MM-DD"}
                        className="form-control"
                        id="inputEmail4"
                        name="DOB"
                        value={dogData.DOB}
                        onChange={handleInputChange}
                        placeholder="Dog's DOB"
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="inputPassword4">
                        <b>Est. Date Available</b>{" "}
                      </label>
                      <input
                        type="date"
                        // min={new Date().toISOString().split("T")[0]} // Format to "YYYY-MM-DD"
                        className="form-control"
                        id="inputPassword4"
                        name="availableDate"
                        value={dogData.availableDate}
                        onChange={handleInputChange}
                        placeholder="Est. date of availability"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="inputEmail4">
                        <b> Mom's Weight</b>
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="inputEmail4"
                        name="momWeight"
                        value={dogData.momWeight}
                        onChange={handleInputChange}
                        placeholder="Mom's Weight"
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="inputPassword4">
                        <b>Dad's Weight</b>{" "}
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="inputPassword4"
                        name="dadWeight"
                        value={dogData.dadWeight}
                        onChange={handleInputChange}
                        placeholder="Dad's Weight"
                      />
                    </div>
                  </div>

                  {/* <div className="form-group col-md-6 btn-group-toggle">
                      <label htmlFor="inputPassword4">
                        <b>Any Disabilities</b>{" "}
                      </label>
                      <div className="btn-group btn-group-toggle d-flex">
                        <label
                          className={
                            dogData.disability
                              ? "btn btn-secondary active"
                              : "btn btn-secondary"
                          }
                        >
                          <input
                            type="checkbox"
                            name="disability"
                            checked={dogData.disability}
                            onChange={() =>
                              setDogData({
                                ...dogData,
                                disability: !dogData.disability,
                              })
                            }
                          />{" "}
                          Yes
                        </label>
                        <label
                          className={
                            !dogData.disability
                              ? "btn btn-secondary active"
                              : "btn btn-secondary"
                          }
                        >
                          <input
                            type="checkbox"
                            name="disability"
                            checked={!dogData.disability}
                            onChange={() =>
                              setDogData({
                                ...dogData,
                                disability: !dogData.disability,
                              })
                            }
                          />{" "}
                          No
                        </label>
                      </div>
                    </div> */}

                  {/* <div className="form-group">
                    <label htmlFor="inputAddress">
                      <b>Address</b>{" "}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputAddress"
                      name="address"
                      value={dogData.address}
                      onChange={handleInputChange}
                      placeholder="Enter Your Address Here"
                    />
                  </div> */}

                  {dogData.type == "puppy" && (
                    <>
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label htmlFor="inputEmail4">
                            <b>Price</b>{" "}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputEmail4"
                            name="price"
                            value={dogData.price}
                            onChange={handleInputChange}
                            placeholder="$"
                          />
                        </div>

                        <div className="form-group col-md-6 btn-group-toggle">
                          <label htmlFor="inputPassword4">
                            <b>Any Disabilities</b>{" "}
                          </label>
                          <div className="btn-group btn-group-toggle d-flex">
                            <label
                              className={
                                dogData.disability
                                  ? "btn btn-secondary active"
                                  : "btn btn-secondary"
                              }
                            >
                              <input
                                type="checkbox"
                                name="disability"
                                checked={dogData.disability}
                                onChange={() =>
                                  setDogData({
                                    ...dogData,
                                    disability: !dogData.disability,
                                  })
                                }
                              />{" "}
                              Yes
                            </label>
                            <label
                              className={
                                !dogData.disability
                                  ? "btn btn-secondary active"
                                  : "btn btn-secondary"
                              }
                            >
                              <input
                                type="checkbox"
                                name="disability"
                                checked={!dogData.disability}
                                onChange={() =>
                                  setDogData({
                                    ...dogData,
                                    disability: !dogData.disability,
                                  })
                                }
                              />{" "}
                              No
                            </label>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="form-row">
                    <div className="form-group col-md-12">
                      <label htmlFor="inputPassword4">
                        <b>About Dog</b>{" "}
                      </label>
                      <textarea
                        type="text"
                        className="form-control"
                        id="inputPassword4"
                        name="comments"
                        value={dogData.comments}
                        onChange={handleInputChange}
                        style={{ height: "5em" }}
                        placeholder=""
                      />
                    </div>
                  </div>
                  <div
                    className=" justify-content-around mt-5"
                    style={{ textAlign: "center" }}
                  >
                    <button
                      name="submit"
                      type="submit"
                      className="btn btn-primary"
                      style={{ width: "80%", color: "#fff", zIndex: 1 }}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="profileDiv2">
              <div
                className="main active"
                id="main2"
                style={{ width: "37rem" }}
              >
                <div className="container-fluid">
                  {/* <div className="picture-container">
                    <div
                      className="picture"
                      style={{ border: "1px solid black" }}
                    >
                      <img
                        src={
                          dogData.image
                            ? dogData.image
                            : "images/resize-16821451881555912582about1.jpg"
                        }
                        className="picture-src"
                        id="wizardPicturePreview"
                        title
                      />
                      <input
                        type="file"
                        id="wizard-picture"
                        ref={inputRef} // Connect the ref to the file input element
                        onChange={uploadFileHandler}
                        className
                      />
                    </div>
                    <label className>
                      <i className="fa fa-upload mr-1" aria-hidden="true" />
                      <b>Upload new image</b>{" "}
                    </label>
                  </div> */}
                  <div className="picture-container">
                    <div className="Neon Neon-theme-dragdropbox">
                      <input
                        style={{
                          zIndex: 999,
                          opacity: 0,
                          width: "100%",
                          height: "100%",
                          position: "absolute",
                          right: 0,
                          left: 0,
                          marginRight: "auto",
                          marginLeft: "auto",
                          cursor: "pointer",
                        }}
                        type="file"
                        id="files"
                        name="files[]"
                        ref={inputRef} // Connect the ref to the file input element
                        onChange={uploadFileHandler}
                        multiple
                      />
                      <div className="Neon-input-dragDrop">
                        <div className="Neon-input-inner">
                          <div className="Neon-input-icon">
                            <i className="fa fa-file-image-o" />
                          </div>
                          <div className="Neon-input-text">
                            <h3
                              style={{
                                color: "#97A1A8",
                                fontFamily: "sans-serif",
                                fontWeight: "bold",
                              }}
                            >
                              Upload New Images: jpg, png (Up to 10 images)
                            </h3>
                            <span
                              style={{
                                display: "inline-block",
                                margin: "15px 0",
                              }}
                            >
                              or
                            </span>
                          </div>
                          <a className="Neon-input-choose-btn blue">
                            Browse Files
                          </a>
                        </div>
                      </div>
                    </div>
                    <div
                      className="uploaded-images-container-row"
                      style={{
                        width: "100%",
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                      }}
                    >
                      {dogData.images.length > 0 &&
                        dogData.images.map((image, index) => (
                          <div
                            key={image.id}
                            className="uploaded-image col-6"
                            style={{
                              flexBasis: "50%", // Set to 50% to have two items in a row
                              boxSizing: "border-box",
                              padding: "0.5rem",
                            }}
                          >
                            <img
                              src={image.url ? image.url : image}
                              style={{
                                width: "10rem",
                                height: "10rem",
                                objectFit: "cover",
                                margin: "0.3rem",
                              }}
                              alt={`Image ${index}`}
                            />
                            <button
                              className="btn btn-primary mb-5"
                              onClick={() => removeImage(index)}
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer2 />
    </>
  );
}

export default EditPuppy;
