import React from "react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import "../css/signup-1-style.css";
import "../css/signup-2-style.css";
import "../css/signup-3-style.css";
import "../css/signup-common-css.css";
import "../css/flaticon.css";
import "../css/animate.css";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Signup5 from "../Components/Signup5";
import { useRef } from "react";
import axios from "axios";
import { useEffect } from "react";
import Footer2 from "../Components/Footer2";
import "../css/ListPuppy.css";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import Paypal from "../Components/PayPal";
function Signup() {
  const [selectedStep, setSelectedStep] = useState(1);
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const [txnId, setTxnId] = useState("");

  const [isChecked, setIsChecked] = useState(false);

  const [breeds, setBreeds] = useState([]);

  const token = localStorage.getItem("token");

  const location = useLocation();
  let sellPuppy = false;

  if (location.state) {
    sellPuppy = location.state.sellPuppy;
  }

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
    addressLine1: "",
    addressLine2: "",
    country: "United States",
    state: "",
    pincode: "",
    type: "breeder",
    city: "",
    profileImg: "",
  });

  const [dogData, setDogData] = useState({
    breed_id: "",
    generic_name: "",
    age: "",
    gender: "",
    disability: false,
    address: "",
    price: "",
    name: "",
    images: [], // To store the selected image file
    comments: "",
  });

  const [states, setStates] = useState([]);

  const navigate = useNavigate();

  const inputRef = useRef(null); // Create a ref to access the file input element
  const inputDogRef = useRef(null); // Create a ref to access the file input element

  const [selectedBreeds, setSelectedBreeds] = useState([]);

  const [amount, setAmount] = useState(0);

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

  const toggleBreedSelection = (breed) => {
    // Check if the breed is already selected
    const isSelected = selectedBreeds.some(
      (selectedBreed) => selectedBreed._id === breed._id
    );

    if (isSelected) {
      // If the breed is already selected, remove it from the selectedBreeds array
      const updatedSelectedBreeds = selectedBreeds.filter(
        (selectedBreed) => selectedBreed._id !== breed._id
      );
      setSelectedBreeds(updatedSelectedBreeds);
    } else {
      // If the breed is not selected, add it to the selectedBreeds array
      setSelectedBreeds([...selectedBreeds, breed]);
    }
  };

  const addPreferences = async () => {
    const preferences = selectedBreeds.map((breed) => ({
      name: breed.name,
      breedId: breed._id,
      image: breed.image,
    }));
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}user/add-preferences`,
        { preferences: preferences },
        { headers: { token } }
      )
      .then((res) => {
        console.log(res.data);
        // alert("Preference added successfully !");
        sessionStorage.setItem("preference", true);
        setSelectedStep(3);
      })
      .catch((e) => {
        console.log(e);
        alert(e.response.data.message);
      });
  };

  // Function to handle file uploads
  const uploadFileHandler = async () => {
    try {
      const file = inputRef.current.files[0]; // Get the selected file from the input element
      const formData = new FormData(); // Create a FormData object to send the file

      formData.append("file", file); // Append the file to the FormData object

      // Send the file to the server using Axios or any other HTTP library
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}upload`,
        formData
      );

      // Update the user state with the received file URL
      setUser({ ...user, profileImg: response.data.fileUrl });
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  // Function to handle file uploads one by one
  const uploadDogFileHandler = async () => {
    try {
      const files = inputDogRef.current.files; // Get the selected files from the input element
      const newImages = [...dogData.images]; // Copy the existing images

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
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

  const handleInputChange = (e) => {
    const input = e.target.value;

    // Regular expression for email validation
    const emailRegex = /^[A-Za-z0-9+_.-]+@(.+)$/;

    // Regular expression for phone number validation
    const phoneRegex = /^\d{10}$/;

    let emailError = "";
    let phoneError = "";

    if (input === "") {
      // If the input is empty, clear both email and phone
      setUser({ ...user, email: "", phone: "" });
      setEmailError("");
      setPhoneError("");
    } else if (emailRegex.test(input)) {
      // It's an email
      setUser({ ...user, email: input, phone: "" });
      setEmailError("");
      setPhoneError("");
    }
    // else if (phoneRegex.test(input)) {
    //   // It's a phone number
    //   setUser({ ...user, email: "", phone: input });
    //   setEmailError("");
    //   setPhoneError("");
    // }
    else {
      // Neither email nor phone number
      emailError = !emailRegex.test(input);
      setUser({ ...user, email: "", phone: "" });

      // Check if the input contains digits but not exactly 10 digits for the phone number
      if (/\d/.test(input) && input.length !== 10) {
        phoneError = "Phone number must have exactly 10 digits";
      }
    }

    setEmailError(emailError);
    setPhoneError(phoneError);
  };

  console.log("emailError", emailError);

  // Function to handle input changes
  const handleDogInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDogData({
      ...dogData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const register = async (e) => {
    e.preventDefault();
    if (!txnId && !sellPuppy) {
      alert("You need to complete payment");
      return;
    }
    await axios
      .post(`${process.env.REACT_APP_BASE_URL}user/register-web`, {
        name: user.firstName + " " + user.lastName,
        email: user.email,
        phone: user.phone,
        password: user.password,
        type: "breeder",
        profileImg: user.profileImg,
        address: {
          line1: user.addressLine1,
          line2: user.addressLine2,
        },
        country: user.country,
        state: user.state,
        pincode: user.pincode,
        city: user.city,
        txnId,
        sellPuppy
      })
      .then((res) => {
        console.log(res.data);
        navigate("/");
        // setSelectedStep(2);
        // alert("User Registered Successfully!");
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
      })
      .catch((e) => {
        alert(e.response.data.message);
      });
  };

  // Function to submit the dog listing
  const submitDogListing = async (e) => {
    e.preventDefault();

    const imageURLs = dogData.images?.map((image) => image.url);

    const Payload = {
      breed_id: dogData.breed_id,
      generic_name: dogData.generic_name,
      age: dogData.age,
      gender: dogData.gender,
      disability: dogData.disability,
      address: dogData.address,
      price: dogData.price,
      name: dogData.name,
      images: imageURLs, // To store the selected image file
      comments: dogData.comments,
    };
    try {
      // Send a POST request to the add-dog API with dogData
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}user/add-dog`,
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
      });

      alert("Dog Listed Successfully !");
      sessionStorage.setItem("dogListed", true);
      setSelectedStep(4);
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

  useEffect(() => {
    getAllBreeds();
    fetchStates();
    getSettings();
  }, []);

  useEffect(() => {
    if (
      sessionStorage.getItem("preference") &&
      !sessionStorage.getItem("dogListed")
    ) {
      setSelectedStep(3);
    } else if (sessionStorage.getItem("dogListed")) {
      setSelectedStep(4);
    } else if (token) {
      setSelectedStep(2);
    }
  }, []);

  return (
    <>
      <Navbar />

      <div
        className="container d-flex align-items-center justify-content-center"
        style={{ maxWidth: "max-content" }}
      >
        <div className="card mt-4 main-card">
          <div className="form">
            <div className="left-side" style={{ minWidth: "35%" }}>
              <div id="content-head-mobile">
                <div>
                  <p>Breeder Signup</p>
                </div>
                <div>
                  <p>Select dog type</p>
                </div>
                <div>
                  <p>Pet Details</p>
                </div>
                <div>
                  <p>Confirm</p>
                </div>
                <div>
                  <p>Pay &amp; Publish</p>
                </div>
              </div>
              <ul className="progress-bar" style={{ paddingLeft: "2.5rem" }}>
                <li
                  className={
                    selectedStep === 1 ? "active text-left" : "text-left"
                  }
                  style={{ cursor: "pointer", color: "#fff" }}
                >
                  <p className="left-word text-white">Breeder Signup</p>
                </li>
                <li
                  className={
                    selectedStep === 2 ? "active text-left" : "text-left"
                  }
                  style={{ cursor: "pointer" }}
                >
                  <p className="left-word text-white">Select dog type</p>
                </li>
                <li
                  className={
                    selectedStep === 3 ? "active text-left" : "text-left"
                  }
                  style={{ cursor: "pointer" }}
                >
                  <p className="left-word text-white">Pet Details</p>
                </li>
                <li
                  className={
                    selectedStep === 4 ? "active text-left" : "text-left"
                  }
                  style={{ cursor: "pointer" }}
                >
                  <p className="left-word text-white">Confirm</p>
                </li>
                <li
                  className={
                    selectedStep === 5 ? "active text-left" : "text-left"
                  }
                  style={{ cursor: "pointer" }}
                >
                  <p className="left-word text-white"> Pay &amp; Publish</p>
                </li>
              </ul>
            </div>

            {/* First Step */}

            {selectedStep === 1 && (
              <>
                <div className="right-side">
                  <div className="main active">
                    <form onSubmit={register}>
                      <div className="picture-container" id="forOtherDevices">
                        <div className="picture">
                          <img
                            src="/images/profile_icon.png"
                            className="picture-src"
                            id="wizardPicturePreview"
                            title
                          />
                          <input type="file" id="wizard-picture" className />
                        </div>
                        <label className>
                          <b>Upload profile image(optional)</b>{" "}
                        </label>
                      </div>
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label htmlFor="inputAddress">
                            <b>First Name</b>{" "}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputAddress"
                            value={user.firstName}
                            onChange={(e) => {
                              setUser({ ...user, firstName: e.target.value });
                            }}
                            placeholder="Your First Name Here"
                            required
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label htmlFor="inputAddress">
                            <b>Last Name</b>{" "}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputAddress"
                            value={user.lastName}
                            onChange={(e) => {
                              setUser({ ...user, lastName: e.target.value });
                            }}
                            placeholder="Your Last Name Here"
                            required
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="inputAddress">
                          <b>Email Address</b>{" "}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputAddress"
                          onChange={handleInputChange}
                          placeholder="Enter Your Email Address"
                          required
                        />
                        <span style={{ color: "red" }}>
                          {emailError && "Invalid Email Address !"}
                        </span>
                        <br />
                        <span style={{ color: "red" }}>
                          {phoneError && phoneError}
                        </span>
                      </div>

                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label htmlFor="inputPassword4">
                            <b>Country</b>{" "}
                          </label>
                          <select
                            required
                            value={user.country}
                            onChange={(e) =>
                              setUser({ ...user, country: e.target.value })
                            }
                          >
                            <option value="Afghanistan">Afghanistan</option>
                            <option value="Aland Islands">Aland Islands</option>
                            <option value="Albania">Albania</option>
                            <option value="Algeria">Algeria</option>
                            <option value="American Samoa">
                              American Samoa
                            </option>
                            <option value="Andorra">Andorra</option>
                            <option value="Angola">Angola</option>
                            <option value="Anguilla">Anguilla</option>
                            <option value="Antarctica">Antarctica</option>
                            <option value="Antigua and Barbuda">
                              Antigua and Barbuda
                            </option>
                            <option value="Argentina">Argentina</option>
                            <option value="Armenia">Armenia</option>
                            <option value="Aruba">Aruba</option>
                            <option value="Australia">Australia</option>
                            <option value="Austria">Austria</option>
                            <option value="Azerbaijan">Azerbaijan</option>
                            <option value="Bahamas">Bahamas</option>
                            <option value="Bahrain">Bahrain</option>
                            <option value="Bangladesh">Bangladesh</option>
                            <option value="Barbados">Barbados</option>
                            <option value="Belarus">Belarus</option>
                            <option value="Belgium">Belgium</option>
                            <option value="Belize">Belize</option>
                            <option value="Benin">Benin</option>
                            <option value="Bermuda">Bermuda</option>
                            <option value="Bhutan">Bhutan</option>
                            <option value="Bolivia">Bolivia</option>
                            <option value="Bonaire, Sint Eustatius and Saba">
                              Bonaire, Sint Eustatius and Saba
                            </option>
                            <option value="Bosnia and Herzegovina">
                              Bosnia and Herzegovina
                            </option>
                            <option value="Botswana">Botswana</option>
                            <option value="Bouvet Island">Bouvet Island</option>
                            <option value="Brazil">Brazil</option>
                            <option value="British Indian Ocean Territory">
                              British Indian Ocean Territory
                            </option>
                            <option value="Brunei Darussalam">
                              Brunei Darussalam
                            </option>
                            <option value="Bulgaria">Bulgaria</option>
                            <option value="Burkina Faso">Burkina Faso</option>
                            <option value="Burundi">Burundi</option>
                            <option value="Cambodia">Cambodia</option>
                            <option value="Cameroon">Cameroon</option>
                            <option value="Canada">Canada</option>
                            <option value="Cape Verde">Cape Verde</option>
                            <option value="Cayman Islands">
                              Cayman Islands
                            </option>
                            <option value="Central African Republic">
                              Central African Republic
                            </option>
                            <option value="Chad">Chad</option>
                            <option value="Chile">Chile</option>
                            <option value="China">China</option>
                            <option value="Christmas Island">
                              Christmas Island
                            </option>
                            <option value="Cocos (Keeling) Islands">
                              Cocos (Keeling) Islands
                            </option>
                            <option value="Colombia">Colombia</option>
                            <option value="Comoros">Comoros</option>
                            <option value="Congo">Congo</option>
                            <option value="Congo, Democratic Republic of the Congo">
                              Congo, Democratic Republic of the Congo
                            </option>
                            <option value="Cook Islands">Cook Islands</option>
                            <option value="Costa Rica">Costa Rica</option>
                            <option value="Cote D'Ivoire">Cote D'Ivoire</option>
                            <option value="Croatia">Croatia</option>
                            <option value="Cuba">Cuba</option>
                            <option value="Curacao">Curacao</option>
                            <option value="Cyprus">Cyprus</option>
                            <option value="Czech Republic">
                              Czech Republic
                            </option>
                            <option value="Denmark">Denmark</option>
                            <option value="Djibouti">Djibouti</option>
                            <option value="Dominica">Dominica</option>
                            <option value="Dominican Republic">
                              Dominican Republic
                            </option>
                            <option value="Ecuador">Ecuador</option>
                            <option value="Egypt">Egypt</option>
                            <option value="El Salvador">El Salvador</option>
                            <option value="Equatorial Guinea">
                              Equatorial Guinea
                            </option>
                            <option value="Eritrea">Eritrea</option>
                            <option value="Estonia">Estonia</option>
                            <option value="Ethiopia">Ethiopia</option>
                            <option value="Falkland Islands (Malvinas)">
                              Falkland Islands (Malvinas)
                            </option>
                            <option value="Faroe Islands">Faroe Islands</option>
                            <option value="Fiji">Fiji</option>
                            <option value="Finland">Finland</option>
                            <option value="France">France</option>
                            <option value="French Guiana">French Guiana</option>
                            <option value="French Polynesia">
                              French Polynesia
                            </option>
                            <option value="French Southern Territories">
                              French Southern Territories
                            </option>
                            <option value="Gabon">Gabon</option>
                            <option value="Gambia">Gambia</option>
                            <option value="Georgia">Georgia</option>
                            <option value="Germany">Germany</option>
                            <option value="Ghana">Ghana</option>
                            <option value="Gibraltar">Gibraltar</option>
                            <option value="Greece">Greece</option>
                            <option value="Greenland">Greenland</option>
                            <option value="Grenada">Grenada</option>
                            <option value="Guadeloupe">Guadeloupe</option>
                            <option value="Guam">Guam</option>
                            <option value="Guatemala">Guatemala</option>
                            <option value="Guernsey">Guernsey</option>
                            <option value="Guinea">Guinea</option>
                            <option value="Guinea-Bissau">Guinea-Bissau</option>
                            <option value="Guyana">Guyana</option>
                            <option value="Haiti">Haiti</option>
                            <option value="Heard Island and Mcdonald Islands">
                              Heard Island and Mcdonald Islands
                            </option>
                            <option value="Holy See (Vatican City State)">
                              Holy See (Vatican City State)
                            </option>
                            <option value="Honduras">Honduras</option>
                            <option value="Hong Kong">Hong Kong</option>
                            <option value="Hungary">Hungary</option>
                            <option value="Iceland">Iceland</option>
                            <option value="India">India</option>
                            <option value="Indonesia">Indonesia</option>
                            <option value="Iran, Islamic Republic of">
                              Iran, Islamic Republic of
                            </option>
                            <option value="Iraq">Iraq</option>
                            <option value="Ireland">Ireland</option>
                            <option value="Isle of Man">Isle of Man</option>
                            <option value="Israel">Israel</option>
                            <option value="Italy">Italy</option>
                            <option value="Jamaica">Jamaica</option>
                            <option value="Japan">Japan</option>
                            <option value="Jersey">Jersey</option>
                            <option value="Jordan">Jordan</option>
                            <option value="Kazakhstan">Kazakhstan</option>
                            <option value="Kenya">Kenya</option>
                            <option value="Kiribati">Kiribati</option>
                            <option value="Korea, Democratic People's Republic of">
                              Korea, Democratic People's Republic of
                            </option>
                            <option value="Korea, Republic of">
                              Korea, Republic of
                            </option>
                            <option value="Kosovo">Kosovo</option>
                            <option value="Kuwait">Kuwait</option>
                            <option value="Kyrgyzstan">Kyrgyzstan</option>
                            <option value="Lao People's Democratic Republic">
                              Lao People's Democratic Republic
                            </option>
                            <option value="Latvia">Latvia</option>
                            <option value="Lebanon">Lebanon</option>
                            <option value="Lesotho">Lesotho</option>
                            <option value="Liberia">Liberia</option>
                            <option value="Libyan Arab Jamahiriya">
                              Libyan Arab Jamahiriya
                            </option>
                            <option value="Liechtenstein">Liechtenstein</option>
                            <option value="Lithuania">Lithuania</option>
                            <option value="Luxembourg">Luxembourg</option>
                            <option value="Macao">Macao</option>
                            <option value="Macedonia, the Former Yugoslav Republic of">
                              Macedonia, the Former Yugoslav Republic of
                            </option>
                            <option value="Madagascar">Madagascar</option>
                            <option value="Malawi">Malawi</option>
                            <option value="Malaysia">Malaysia</option>
                            <option value="Maldives">Maldives</option>
                            <option value="Mali">Mali</option>
                            <option value="Malta">Malta</option>
                            <option value="Marshall Islands">
                              Marshall Islands
                            </option>
                            <option value="Martinique">Martinique</option>
                            <option value="Mauritania">Mauritania</option>
                            <option value="Mauritius">Mauritius</option>
                            <option value="Mayotte">Mayotte</option>
                            <option value="Mexico">Mexico</option>
                            <option value="Micronesia, Federated States of">
                              Micronesia, Federated States of
                            </option>
                            <option value="Moldova, Republic of">
                              Moldova, Republic of
                            </option>
                            <option value="Monaco">Monaco</option>
                            <option value="Mongolia">Mongolia</option>
                            <option value="Montenegro">Montenegro</option>
                            <option value="Montserrat">Montserrat</option>
                            <option value="Morocco">Morocco</option>
                            <option value="Mozambique">Mozambique</option>
                            <option value="Myanmar">Myanmar</option>
                            <option value="Namibia">Namibia</option>
                            <option value="Nauru">Nauru</option>
                            <option value="Nepal">Nepal</option>
                            <option value="Netherlands">Netherlands</option>
                            <option value="Netherlands Antilles">
                              Netherlands Antilles
                            </option>
                            <option value="New Caledonia">New Caledonia</option>
                            <option value="New Zealand">New Zealand</option>
                            <option value="Nicaragua">Nicaragua</option>
                            <option value="Niger">Niger</option>
                            <option value="Nigeria">Nigeria</option>
                            <option value="Niue">Niue</option>
                            <option value="Norfolk Island">
                              Norfolk Island
                            </option>
                            <option value="Northern Mariana Islands">
                              Northern Mariana Islands
                            </option>
                            <option value="Norway">Norway</option>
                            <option value="Oman">Oman</option>
                            <option value="Pakistan">Pakistan</option>
                            <option value="Palau">Palau</option>
                            <option value="Palestinian Territory, Occupied">
                              Palestinian Territory, Occupied
                            </option>
                            <option value="Panama">Panama</option>
                            <option value="Papua New Guinea">
                              Papua New Guinea
                            </option>
                            <option value="Paraguay">Paraguay</option>
                            <option value="Peru">Peru</option>
                            <option value="Philippines">Philippines</option>
                            <option value="Pitcairn">Pitcairn</option>
                            <option value="Poland">Poland</option>
                            <option value="Portugal">Portugal</option>
                            <option value="Puerto Rico">Puerto Rico</option>
                            <option value="Qatar">Qatar</option>
                            <option value="Reunion">Reunion</option>
                            <option value="Romania">Romania</option>
                            <option value="Russian Federation">
                              Russian Federation
                            </option>
                            <option value="Rwanda">Rwanda</option>
                            <option value="Saint Barthelemy">
                              Saint Barthelemy
                            </option>
                            <option value="Saint Helena">Saint Helena</option>
                            <option value="Saint Kitts and Nevis">
                              Saint Kitts and Nevis
                            </option>
                            <option value="Saint Lucia">Saint Lucia</option>
                            <option value="Saint Martin">Saint Martin</option>
                            <option value="Saint Pierre and Miquelon">
                              Saint Pierre and Miquelon
                            </option>
                            <option value="Saint Vincent and the Grenadines">
                              Saint Vincent and the Grenadines
                            </option>
                            <option value="Samoa">Samoa</option>
                            <option value="San Marino">San Marino</option>
                            <option value="Sao Tome and Principe">
                              Sao Tome and Principe
                            </option>
                            <option value="Saudi Arabia">Saudi Arabia</option>
                            <option value="Senegal">Senegal</option>
                            <option value="Serbia">Serbia</option>
                            <option value="Serbia and Montenegro">
                              Serbia and Montenegro
                            </option>
                            <option value="Seychelles">Seychelles</option>
                            <option value="Sierra Leone">Sierra Leone</option>
                            <option value="Singapore">Singapore</option>
                            <option value="Sint Maarten">Sint Maarten</option>
                            <option value="Slovakia">Slovakia</option>
                            <option value="Slovenia">Slovenia</option>
                            <option value="Solomon Islands">
                              Solomon Islands
                            </option>
                            <option value="Somalia">Somalia</option>
                            <option value="South Africa">South Africa</option>
                            <option value="South Georgia and the South Sandwich Islands">
                              South Georgia and the South Sandwich Islands
                            </option>
                            <option value="South Sudan">South Sudan</option>
                            <option value="Spain">Spain</option>
                            <option value="Sri Lanka">Sri Lanka</option>
                            <option value="Sudan">Sudan</option>
                            <option value="Suriname">Suriname</option>
                            <option value="Svalbard and Jan Mayen">
                              Svalbard and Jan Mayen
                            </option>
                            <option value="Swaziland">Swaziland</option>
                            <option value="Sweden">Sweden</option>
                            <option value="Switzerland">Switzerland</option>
                            <option value="Syrian Arab Republic">
                              Syrian Arab Republic
                            </option>
                            <option value="Taiwan, Province of China">
                              Taiwan, Province of China
                            </option>
                            <option value="Tajikistan">Tajikistan</option>
                            <option value="Tanzania, United Republic of">
                              Tanzania, United Republic of
                            </option>
                            <option value="Thailand">Thailand</option>
                            <option value="Timor-Leste">Timor-Leste</option>
                            <option value="Togo">Togo</option>
                            <option value="Tokelau">Tokelau</option>
                            <option value="Tonga">Tonga</option>
                            <option value="Trinidad and Tobago">
                              Trinidad and Tobago
                            </option>
                            <option value="Tunisia">Tunisia</option>
                            <option value="Turkey">Turkey</option>
                            <option value="Turkmenistan">Turkmenistan</option>
                            <option value="Turks and Caicos Islands">
                              Turks and Caicos Islands
                            </option>
                            <option value="Tuvalu">Tuvalu</option>
                            <option value="Uganda">Uganda</option>
                            <option value="Ukraine">Ukraine</option>
                            <option value="United Arab Emirates">
                              United Arab Emirates
                            </option>
                            <option value="United Kingdom">
                              United Kingdom
                            </option>
                            <option value="United States">United States</option>
                            <option value="United States Minor Outlying Islands">
                              United States Minor Outlying Islands
                            </option>
                            <option value="Uruguay">Uruguay</option>
                            <option value="Uzbekistan">Uzbekistan</option>
                            <option value="Vanuatu">Vanuatu</option>
                            <option value="Venezuela">Venezuela</option>
                            <option value="Viet Nam">Viet Nam</option>
                            <option value="Virgin Islands, British">
                              Virgin Islands, British
                            </option>
                            <option value="Virgin Islands, U.s.">
                              Virgin Islands, U.s.
                            </option>
                            <option value="Wallis and Futuna">
                              Wallis and Futuna
                            </option>
                            <option value="Western Sahara">
                              Western Sahara
                            </option>
                            <option value="Yemen">Yemen</option>
                            <option value="Zambia">Zambia</option>
                            <option value="Zimbabwe">Zimbabwe</option>
                          </select>
                        </div>

                        <div className="form-group col-md-6">
                          <label htmlFor="inputPassword4">
                            <b>State</b>{" "}
                          </label>
                          <select
                            style={{ textTransform: "capitalize" }}
                            required
                            value={user.state}
                            onChange={(e) =>
                              setUser({ ...user, state: e.target.value })
                            }
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

                      {/* <div className="form-row">
                        <div className="form-group col-md-6">
                          <label htmlFor="inputEmail4">
                            <b> Country</b>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputEmail4"
                            value={user.country}
                            onChange={(e) =>
                              setUser({ ...user, country: e.target.value })
                            }
                            placeholder="Your Country"
                          />
                        </div> */}

                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label htmlFor="inputEmail4">
                            <b>Zipcode</b>{" "}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputEmail4"
                            required
                            value={user.pincode}
                            onChange={(e) =>
                              setUser({ ...user, pincode: e.target.value })
                            }
                            placeholder="9822xx"
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label htmlFor="inputPassword4">
                            <b>City</b>{" "}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputPassword4"
                            required
                            value={user.city}
                            onChange={(e) =>
                              setUser({ ...user, city: e.target.value })
                            }
                            placeholder="Your City"
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="inputAddress">
                          <b>Address Line 1</b>{" "}
                        </label>
                        <input
                          type="text"
                          value={user.addressLine1}
                          className="form-control"
                          id="inputAddress"
                          required
                          onChange={(e) =>
                            setUser({ ...user, addressLine1: e.target.value })
                          }
                          placeholder="Enter Your Address Here"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="inputAddress">
                          <b>Address Line 2</b>{" "}
                        </label>
                        <input
                          type="text"
                          value={user.addressLine2}
                          className="form-control"
                          id="inputAddress"
                          onChange={(e) =>
                            setUser({ ...user, addressLine2: e.target.value })
                          }
                          placeholder="Enter Your Address Here"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="inputAddress2">
                          <b>Password</b>{" "}
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="inputAddress2"
                          value={user.password}
                          required
                          minLength="8"
                          onChange={(e) =>
                            setUser({ ...user, password: e.target.value })
                          }
                          placeholder="Create Your Password (min. 8 characters)."
                        />
                      </div>

                      <span style={{ color: "red" }}>
                        {user.password &&
                          user.password.length < 8 &&
                          "Password should have atleast 8 characters!"}
                      </span>

                      <div
                        className="form-group"
                        style={{ marginBottom: "0.25rem" }}
                      >
                        <label htmlFor="inputAddress2">
                          <b>Confirm Password</b>{" "}
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="inputAddress2"
                          value={user.cpassword}
                          required
                          minLength="8"
                          onChange={(e) =>
                            setUser({ ...user, cpassword: e.target.value })
                          }
                          placeholder="Confirm Your Password"
                        />
                      </div>
                      <span style={{ color: "red" }}>
                        {user.password &&
                          user.password !== user.cpassword &&
                          "Passwords not matching !"}
                      </span>

                      <p style={{ marginTop: "1.5rem" }}>
                        <input className="mr-1 mt-2" type="checkbox" checked />
                        By clicking Sign Up, you agree to MyPuppyPro’s{" "}
                        <Link to="/terms">Terms of Use</Link> and{" "}
                        <Link to="/privacy-policy">Privacy Policy</Link>
                      </p>

                      <p style={{ marginTop: "1.5rem" }}>
                        Already have an account?{" "}
                        <Link to="/login">Click here</Link> to log in
                      </p>

                      {!txnId && amount && !sellPuppy && (
                        <Paypal
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
                      {/* <PayPalScriptProvider
                        options={{
                          "client-id":
                            "AcXrNd4aK1Mk-Ke9EDVhuYbrI9hRsWuOfdWAlDRycbtz0Vpy1omRnJHaRSv4_ZAmjBoaAej52OFHd9sP",
                        }}
                      >
                        <PayPalButtons
                          style={{
                            layout: "vertical",
                          }}
                          createOrder={(data, actions) => {
                            return actions.order.create({
                              purchase_units: [
                                {
                                  description: "List a puppy",
                                  amount: {
                                    currency_code: "USD",
                                    value: 45.0,
                                  },
                                },
                              ],
                            });
                          }}
                          onApprove={async (data, actions) => {
                            const order = await actions.order.capture();
                            console.log("order", order);

                            // handleApprove(data.orderID);
                          }}
                          onError={(err) => {
                            // setError(err);
                            console.error("PayPal Checkout onError", err);
                          }}
                        ></PayPalButtons>
                      </PayPalScriptProvider> */}

                      <div className="btnDiv d-flex justify-content-center align-items-center mt-5">
                        <button
                          type="submit"
                          to=""
                          className="btn btn-primary next_button"
                          // onClick={register}
                        >
                          Sign up
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="profileDiv">
                  <div className="main active">
                    <div className="container">
                      <div className="picture-container">
                        <div className="picture">
                          <img
                            src={
                              user.profileImg
                                ? user.profileImg
                                : "images/profile_icon.png"
                            }
                            className="picture-src"
                            id="wizardPicturePreview"
                            title
                          />
                          <input
                            type="file"
                            id="wizard-picture"
                            className="input-file" // Add a class to style the file input if needed
                            ref={inputRef} // Connect the ref to the file input element
                            onChange={uploadFileHandler} // Call the uploadFileHandler on change
                          />
                        </div>
                        <label className>
                          <b>Upload profile image</b>{" "}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Second Step */}

            {selectedStep === 2 && (
              <>
                <div className="right-side">
                  <div className="main active">
                    <div className="d-flex flex-column">
                      <label htmlFor="inputAddress">
                        <b>Select the type of Dog</b>{" "}
                      </label>
                      <label htmlFor style={{ margin: 0, padding: 0 }}>
                        You can choose upto 7 types of Breed
                      </label>
                      <div className="hr-line" />
                    </div>
                    <div className="row mt-2">
                      <ul
                        className="dog-type"
                        style={{ minHeight: "30rem", minWidth: "52rem" }}
                      >
                        {breeds &&
                          breeds.map((breed) => {
                            return (
                              <li key={breed._id}>
                                <input
                                  type="checkbox"
                                  id={`cb${breed._id}`}
                                  checked={selectedBreeds.some(
                                    (selectedBreed) =>
                                      selectedBreed._id === breed._id
                                  )}
                                  onChange={() => toggleBreedSelection(breed)}
                                />
                                <label
                                  id="labelSelect"
                                  htmlFor={`cb${breed._id}`}
                                >
                                  <img
                                    className="card-img-top"
                                    src={breed.image}
                                    alt={breed.name}
                                  />
                                  <p className="card-title text-center">
                                    {breed.name}
                                  </p>
                                </label>
                              </li>
                            );
                          })}
                      </ul>
                    </div>
                    <div
                      className="d-flex align-items-center justify-content-around"
                      id="btnDiv1"
                    >
                      <Link
                        className="back_button btn btn-primary"
                        to=""
                        onClick={() => setSelectedStep(1)}
                      >
                        Back
                      </Link>
                      <Link
                        type="submit"
                        to=""
                        onClick={addPreferences}
                        className="btn btn-primary next_button"
                      >
                        Next
                      </Link>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Third Step */}

            {selectedStep === 3 && (
              <>
                <div className="right-side" style={{ width: "40rem" }}>
                  <div className="main active">
                    <form onSubmit={submitDogListing}>
                      <div className="picture-container" id="forOtherDevices2">
                        <div
                          className="picture"
                          style={{ border: "1px solid black" }}
                        >
                          <img
                            src={
                              dogData.image || "images/placeholder-image.jpg"
                            }
                            className="picture-src"
                            id="wizardPicturePreview"
                            title=""
                          />
                          <input
                            type="file"
                            id="wizard-picture"
                            ref={inputDogRef}
                            onChange={uploadDogFileHandler}
                          />
                        </div>
                        <label>
                          <i className="fa fa-upload mr-1" aria-hidden="true" />
                          <b>Upload new image</b>
                        </label>
                      </div>
                      <div className="form-group">
                        <label htmlFor="inputAddress">
                          <b>Select Dog Family</b>
                        </label>
                        <select
                          name="breed_id"
                          value={dogData.breed_id}
                          onChange={handleDogInputChange}
                        >
                          <option value="">Dog Breed</option>
                          {breeds?.map((breed) => {
                            return (
                              <option key={breed._id} value={breed._id}>
                                {breed.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="inputAddress">
                          <b>Dog Generic name</b>
                        </label>
                        <select
                          name="generic_name"
                          value={dogData.generic_name}
                          onChange={handleDogInputChange}
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
                      </div>
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
                            onChange={handleDogInputChange}
                            placeholder="Dog Name"
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label htmlFor="inputPassword4">
                            <b>Age</b>{" "}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputPassword4"
                            name="age"
                            value={dogData.age}
                            onChange={handleDogInputChange}
                            placeholder="Age of Dog"
                          />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label htmlFor="inputEmail4">
                            <b>Gender</b>{" "}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputEmail4"
                            name="gender"
                            value={dogData.gender}
                            onChange={handleDogInputChange}
                            placeholder="Male/Female"
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
                      <div className="form-group">
                        <label htmlFor="inputAddress">
                          <b>Address</b>{" "}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputAddress"
                          name="address"
                          value={dogData.address}
                          onChange={handleDogInputChange}
                          placeholder="Enter Your Address Here"
                        />
                      </div>
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
                            onChange={handleDogInputChange}
                            placeholder="$1600"
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label htmlFor="inputPassword4">
                            <b>Additional Comment</b>{" "}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputPassword4"
                            name="comments"
                            value={dogData.comments}
                            onChange={handleDogInputChange}
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
                    style={{ width: "23rem" }}
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
                            ref={inputDogRef} // Connect the ref to the file input element
                            onChange={uploadDogFileHandler}
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
                                  Upload new Images
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
                          className="uploaded-images-container"
                          style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          {dogData.images.map((image, index) => (
                            <div
                              className="col-12"
                              key={image.id}
                              style={{ margin: "0.5rem 0" }}
                              // style={{
                              //   display: "flex",
                              //   flexDirection: "column !important",
                              // }}
                            >
                              <img
                                className="col-12"
                                src={image.url}
                                // style={{
                                //   width: "10rem",
                                //   height: "10rem",
                                //   objectFit: "cover",
                                //   margin: "0.3rem",
                                // }}
                                alt={`Image ${index}`}
                              />
                              <button
                                className="btn btn-primary mt-2"
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
              </>
            )}

            {/* Fourth Step */}

            {selectedStep === 4 && (
              <>
                <div className="right-side" style={{ position: "relative" }}>
                  <div
                    style={{
                      marginTop: "125px",
                      height: "100%",
                      width: "100%",
                    }}
                  />
                  <div className="main active " id="signup-tab-4">
                    <form>
                      <div className="box-form-4">
                        <div style={{ textAlign: "center" }}>
                          <img src="./images/SignUp tab 4th 1.png" alt="" />
                        </div>
                        <div
                          className="form-row confirm"
                          style={{
                            border: "2px solid #b2b2b2",
                            borderRadius: "10px",
                          }}
                        >
                          <div className="form-group col-12">
                            <label
                              style={{
                                display: "block",
                                paddingLeft: "15px",
                                margin: "auto",
                                textIndent: "-15px",
                              }}
                              htmlFor="checkbox"
                            >
                              <input
                                type="checkbox"
                                name="checkbox"
                                checked={isChecked}
                                onChange={() => {
                                  setIsChecked(!isChecked);
                                }}
                              />
                              <b>
                                {" "}
                                I hearby confirm that all the details that i
                                filled here is correct
                              </b>
                            </label>
                          </div>
                        </div>
                        <br />
                        <br />
                      </div>
                      <div
                        className="d-flex align-items-center justify-content-around"
                        style={{
                          position: "absolute",
                          width: "100%",
                          bottom: "0",
                          left: "0",
                          backgroundColor: "rgba(231,231,231,255)",
                          padding: "10px",
                          borderRadius: "0px 0px 21px",
                        }}
                      >
                        <Link
                          to=""
                          className="back_button btn btn-primary"
                          style={{
                            width: "auto",
                            backgroundColor: "rgba(113,113,113,255)",
                            border: "none",
                            color: "#fff",
                          }}
                          onClick={() => setSelectedStep(3)}
                        >
                          Back
                        </Link>
                        <Link
                          type="submit"
                          className="btn btn-primary next_button"
                          style={{ width: "atuo", color: "#fff" }}
                          onClick={() => {
                            if (isChecked) {
                              setSelectedStep(5);
                            } else {
                              alert("Please tick the checkbox to proceed !");
                            }
                          }}
                        >
                          Next
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
              </>
            )}

            {/* Fifth Step */}

            {selectedStep === 5 && <Signup5 DogData={dogData} />}
          </div>
        </div>
      </div>

      <Footer2 />
    </>
  );
}

export default Signup;
