import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import Footer2 from "../Components/Footer2";
import "../css/Profile.css";
import SideNav from "../Components/SideNav";
import { useNavigate } from "react-router-dom";

function Pedigree() {
  const token = localStorage.getItem("token");
  const [userDogs, setUserDogs] = useState([]);
  const [selectedDog, setSelectedDog] = useState("");
  const [selectedDogData, setSelectedDogData] = useState({});
  const [puppy, setPuppy] = useState({
    DOB: "",
    weight: "",
  });

  const [openSideNav, setOpenSideNav] = useState(false);

  const navigate = useNavigate();

  const [breeds, setBreeds] = useState([]);

  const [pedigreeDetails, setPedigreeDetails] = useState({
    father: {
      name: "",
      breed: "",
      image: null,
    },
    mother: {
      name: "",
      breed: "",
      image: null,
    },
    fratFather: {
      name: "",
      breed: "",
      image: null,
    },
    fratMother: {
      name: "",
      breed: "",
      image: null,
    },
    matFather: {
      name: "",
      breed: "",
      image: null,
    },
    matMother: {
      name: "",
      breed: "",
      image: null,
    },
  });

  const USER = JSON.parse(localStorage.getItem("user"));

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

  const handlePedigreeChange = (e, parentKey, fieldKey) => {
    const { name, value, type, files } = e.target;
    const updatedDetails = { ...pedigreeDetails };

    if (type === "file") {
      updatedDetails[parentKey][fieldKey] = files[0];
    } else {
      updatedDetails[parentKey][fieldKey] = value;
    }

    setPedigreeDetails(updatedDetails);
  };

  const handleFileChange = async (e, parentKey, fieldName) => {
    const { files } = e.target;
    const file = files[0];

    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        // Send the file to the server using Axios or any other HTTP library
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}upload`,
          formData
        );

        // Update the pedigreeDetails with the received image URL
        setPedigreeDetails((prevDetails) => ({
          ...prevDetails,
          [parentKey]: {
            ...prevDetails[parentKey],
            [fieldName]: response.data.fileUrl,
          },
        }));
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDog) {
      alert("Please select a dog first.");
      return;
    }

    // Prepare the payload for the API
    const payload = {
      DOB: puppy.DOB,
      weight: puppy.weight,
      pedigreeDetails: pedigreeDetails,
    };

    try {
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}user/add-pedigree/${selectedDog}`,
        payload, // Send the payload as JSON
        {
          headers: {
            token: token,
            "Content-Type": "application/json", // Set the content type to JSON
          },
        }
      );
      alert("Pedigree details added successfully!");
      navigate("/breeder-profile");
    } catch (error) {
      console.error("Error adding pedigree details:", error);
      alert("An error occurred while adding pedigree details.");
    }
  };

  const getUserDogs = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}user/get-user-dogs/${USER._id}`, {
        headers: { token: token },
      })
      .then((res) => {
        console.log(res.data);
        setUserDogs(res.data.userDogs);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleDogChange = (e) => {
    const selectedDogId = e.target.value;
    const selectedDogInfo = userDogs.find((dog) => dog._id === selectedDogId);
    setSelectedDog(selectedDogId);
    setSelectedDogData(selectedDogInfo);
  };

  useEffect(() => {
    getAllBreeds();
    getUserDogs();
  }, []);

  useEffect(() => {
    setPedigreeDetails({
      ...pedigreeDetails,
      father: {
        ...pedigreeDetails.father, // Copy existing father details
        weight: selectedDogData?.pedigree?.father?.weight, // Update only the weight of the father
      },
      mother: {
        ...pedigreeDetails.mother, // Copy existing mother details
        weight: selectedDogData?.pedigree?.mother?.weight, // Update only the weight of the mother
      },
    });
  }, [selectedDogData]);

  return (
    <>
      <Navbar setOpenSideNav={setOpenSideNav} openSideNav={openSideNav} />

      {openSideNav && <SideNav />}
      <div className="pedigree_form">
        <div className="wrapper my-4">
          <h2 style={{ fontWeight: "bold" }}>Add Pedigree Details</h2>
          <form onSubmit={handleFormSubmit}>
            <h3 className="f_head mt-5" style={{ fontWeight: 600 }}>
              Puppy Details
            </h3>
            <div className="form_wrap">
              <div className="single_form col-50">
                <label>Select Puppy</label>
                <select
                  className="my-2"
                  onChange={handleDogChange}
                  value={selectedDog}
                >
                  <option>Select Puppy</option>
                  {userDogs?.map((dog) => (
                    <option key={dog._id} value={dog._id}>
                      {dog.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="single_form col-50">
                <label htmlFor="Puppy Name">Puppy Name</label>
                <input
                  className="my-2"
                  type="text"
                  value={selectedDogData.name}
                  disabled
                />
              </div>
              <div className="single_form col-50">
                <label htmlFor="Puppy Breed">Puppy Breed</label>
                <input
                  className="my-2"
                  type="text"
                  value={selectedDogData.generic_name}
                  disabled
                />
              </div>
              <div
                className="single_form two_input"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <label htmlFor>D.O.B</label>
                <input
                  style={{
                    width: "100%",
                    height: "40px",
                    border: "none",
                    outline: "0",
                    borderRadius: "5px",
                    border: "1px solid #cbced4",
                    gap: "20px",
                    boxSizing: "border-box",
                    padding: "0px 10px",
                    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.15) !important",
                  }}
                  className="my-2"
                  type="date"
                  value={selectedDogData.DOB}
                  disabled
                  onChange={(e) => setPuppy({ ...puppy, DOB: e.target.value })}
                />
              </div>
              {/* <div className="single_form two_input">
                <label htmlFor>Weight</label>
                <input
                  className="my-2"
                  type="text"
                  value={puppy.weight}
                  onChange={(e) =>
                    setPuppy({ ...puppy, weight: parseInt(e.target.value) })
                  }
                />
              </div> */}
              {selectedDogData && selectedDogData.image && (
                <img
                  className="my-2"
                  src={selectedDogData.image}
                  style={{
                    width: "10rem",
                    height: "10rem",
                    objectFit: "cover",
                  }}
                ></img>
              )}
              {/* <div className="single_form file_upload">
                <label className="label" htmlFor="input">
                  Please upload a picture !
                </label>
                <div className="input">
                  <input name="input" id="file3" type="file" />
                </div>
              </div> */}
            </div>

            <div className="form_wrap">
              <div className="single_form col-50 mt-5">
                <div className="single_form two_input">
                  <label htmlFor>Father's Name</label>
                  <input
                    className="my-2"
                    type="text"
                    name="fatherWeight"
                    value={pedigreeDetails.father.name}
                    onChange={(e) => handlePedigreeChange(e, "father", "name")}
                  />
                </div>

                <label htmlFor>Father's Breed</label>
                <select
                  className="my-2"
                  type="text"
                  name="fatherBreed"
                  value={pedigreeDetails.father.breed}
                  defaultValue=""
                  onChange={(e) => handlePedigreeChange(e, "father", "breed")}
                >
                  <option value="">Select Breed</option>
                  {breeds?.map((breed) => {
                    return (
                      <option value={breed.name} key={breed._id}>
                        {breed.name}
                      </option>
                    );
                  })}
                </select>

                {/* <input
                  className="my-2"
                  type="text"
                  name="fatherBreed"
                  value={pedigreeDetails.father.breed}
                  onChange={(e) => handlePedigreeChange(e, "father", "breed")}
                /> */}
              </div>
              {/* <div className="single_form two_input">
                <label htmlFor>D.O.B</label>
                <input
                  style={{
                    width: "100%",
                    height: "40px",
                    border: "none",
                    outline: "0",
                    borderRadius: "5px",
                    border: "1px solid #cbced4",
                    gap: "20px",
                    boxSizing: "border-box",
                    padding: "0px 10px",
                    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.15) !important",
                  }}
                  className="my-2"
                  type="date"
                  name="fatherDOB"
                  value={pedigreeDetails.father.DOB}
                  onChange={(e) => handlePedigreeChange(e, "father", "DOB")}
                />
              </div>
              <div className="single_form two_input">
                <label htmlFor>Weight</label>
                <input
                  className="my-2"
                  type="text"
                  name="fatherWeight"
                  value={pedigreeDetails.father.weight}
                  onChange={(e) => handlePedigreeChange(e, "father", "weight")}
                />
              </div> */}
              <div className="single_form file_upload">
                <label className="label" htmlFor="input">
                  Please upload a picture !
                </label>
                <div className="input">
                  <input
                    name="input"
                    id="file"
                    type="file"
                    onChange={(e) => handleFileChange(e, "father", "image")}
                  />
                </div>
                {pedigreeDetails.father && pedigreeDetails.father.image && (
                  <img
                    className="my-2"
                    src={pedigreeDetails.father.image}
                    style={{
                      width: "10rem",
                      height: "10rem",
                      objectFit: "cover",
                    }}
                  ></img>
                )}
              </div>
              <div className="single_form col-50 mt-5">
                <div className="single_form two_input">
                  <label htmlFor>Mother's Name</label>
                  <input
                    className="my-2"
                    type="text"
                    name="fatherWeight"
                    value={pedigreeDetails.mother.name}
                    onChange={(e) => handlePedigreeChange(e, "mother", "name")}
                  />
                </div>
                <label htmlFor>Mother's Breed</label>
                <select
                  className="my-2"
                  type="text"
                  name="motherBreed"
                  value={pedigreeDetails.mother.breed}
                  onChange={(e) => handlePedigreeChange(e, "mother", "breed")}
                >
                  <option value="">Select Breed</option>
                  {breeds?.map((breed) => {
                    return (
                      <option value={breed.name} key={breed._id}>
                        {breed.name}
                      </option>
                    );
                  })}
                </select>
                {/* <input
                  className="my-2"
                  type="text"
                  name="motherBreed"
                  value={pedigreeDetails.mother.breed}
                  onChange={(e) => handlePedigreeChange(e, "mother", "breed")}
                /> */}
              </div>
              {/* <div className="single_form two_input">
                <label htmlFor>D.O.B</label>
                <input
                  style={{
                    width: "100%",
                    height: "40px",
                    border: "none",
                    outline: "0",
                    borderRadius: "5px",
                    border: "1px solid #cbced4",
                    gap: "20px",
                    boxSizing: "border-box",
                    padding: "0px 10px",
                    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.15) !important",
                  }}
                  className="my-2"
                  type="date"
                  name="motherDOB"
                  value={pedigreeDetails.mother.DOB}
                  onChange={(e) => handlePedigreeChange(e, "mother", "DOB")}
                />
              </div>
              <div className="single_form two_input">
                <label htmlFor>Weight</label>
                <input
                  className="my-2"
                  type="text"
                  name="motherWeight"
                  value={pedigreeDetails.mother.weight}
                  onChange={(e) => handlePedigreeChange(e, "mother", "weight")}
                />
              </div> */}
              <div className="single_form file_upload">
                <label className="label" htmlFor="input">
                  Please upload a picture !
                </label>
                <div className="input">
                  <input
                    name="input"
                    id="file"
                    type="file"
                    onChange={(e) => handleFileChange(e, "mother", "image")}
                  />
                </div>
                {pedigreeDetails.mother && pedigreeDetails.mother.image && (
                  <img
                    className="my-2"
                    src={pedigreeDetails.mother.image}
                    style={{
                      width: "10rem",
                      height: "10rem",
                      objectFit: "cover",
                    }}
                  ></img>
                )}
              </div>
            </div>
            <h3 className="f_head mt-5" style={{ fontWeight: 600 }}>
              Father's Parents
            </h3>
            <div className="form_wrap">
              <div className="single_form col-50">
                <div className="single_form two_input">
                  <label htmlFor>Father's Name</label>
                  <input
                    className="my-2"
                    type="text"
                    name="fratFatherName"
                    value={pedigreeDetails.fratFather.name}
                    onChange={(e) =>
                      handlePedigreeChange(e, "fratFather", "name")
                    }
                  />
                </div>
                <label htmlFor>Father's Breed</label>
                <select
                  className="my-2"
                  type="text"
                  name="fratFatherBreed"
                  value={pedigreeDetails.fratFather.breed}
                  onChange={(e) =>
                    handlePedigreeChange(e, "fratFather", "breed")
                  }
                >
                  <option value="">Select Breed</option>
                  {breeds?.map((breed) => {
                    return (
                      <option value={breed.name} key={breed._id}>
                        {breed.name}
                      </option>
                    );
                  })}
                </select>
                {/* <input
                  className="my-2"
                  type="text"
                  name="fratFatherBreed"
                  value={pedigreeDetails.fratFather.breed}
                  onChange={(e) =>
                    handlePedigreeChange(e, "fratFather", "breed")
                  }
                /> */}
              </div>
              {/* <div className="single_form two_input">
                <label htmlFor>D.O.B</label>
                <input
                  style={{
                    width: "100%",
                    height: "40px",
                    border: "none",
                    outline: "0",
                    borderRadius: "5px",
                    border: "1px solid #cbced4",
                    gap: "20px",
                    boxSizing: "border-box",
                    padding: "0px 10px",
                    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.15) !important",
                  }}
                  className="my-2"
                  type="date"
                  name="fratFatherDOB"
                  value={pedigreeDetails.fratFather.DOB}
                  onChange={(e) => handlePedigreeChange(e, "fratFather", "DOB")}
                />
              </div>
              <div className="single_form two_input">
                <label htmlFor>Weight</label>
                <input
                  className="my-2"
                  type="text"
                  name="fratFatherWeight"
                  value={pedigreeDetails.fratFather.weight}
                  onChange={(e) =>
                    handlePedigreeChange(e, "fratFather", "weight")
                  }
                />
              </div> */}
              <div className="single_form file_upload">
                <label className="label" htmlFor="input">
                  Please upload a picture !
                </label>
                <div className="input">
                  <input
                    name="input"
                    id="file2"
                    type="file"
                    onChange={(e) => handleFileChange(e, "fratFather", "image")}
                  />
                </div>
                {pedigreeDetails.fratFather &&
                  pedigreeDetails.fratFather.image && (
                    <img
                      className="my-2"
                      src={pedigreeDetails.fratFather.image}
                      style={{
                        width: "10rem",
                        height: "10rem",
                        objectFit: "cover",
                      }}
                    ></img>
                  )}
              </div>
              <div className="single_form col-50 mt-5">
                <div className="single_form two_input">
                  <label htmlFor>Mother's Name</label>
                  <input
                    className="my-2"
                    type="text"
                    name="fratMotherWeight"
                    value={pedigreeDetails.fratMother.name}
                    onChange={(e) =>
                      handlePedigreeChange(e, "fratMother", "name")
                    }
                  />
                </div>
                <label htmlFor>Mother's Breed</label>
                <select
                  className="my-2"
                  type="text"
                  name="fratMotherBreed"
                  value={pedigreeDetails.fratMother.breed}
                  onChange={(e) =>
                    handlePedigreeChange(e, "fratMother", "breed")
                  }
                >
                  <option value="">Select Breed</option>
                  {breeds?.map((breed) => {
                    return (
                      <option value={breed.name} key={breed._id}>
                        {breed.name}
                      </option>
                    );
                  })}
                </select>
                {/* <input
                  className="my-2"
                  type="text"
                  name="fratMotherBreed"
                  value={pedigreeDetails.fratMother.breed}
                  onChange={(e) =>
                    handlePedigreeChange(e, "fratMother", "breed")
                  }
                /> */}
              </div>
              {/* <div className="single_form two_input">
                <label htmlFor>D.O.B</label>
                <input
                  style={{
                    width: "100%",
                    height: "40px",
                    border: "none",
                    outline: "0",
                    borderRadius: "5px",
                    border: "1px solid #cbced4",
                    gap: "20px",
                    boxSizing: "border-box",
                    padding: "0px 10px",
                    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.15) !important",
                  }}
                  className="my-2"
                  type="date"
                  name="fratMotherDOB"
                  value={pedigreeDetails.fratMother.DOB}
                  onChange={(e) => handlePedigreeChange(e, "fratMother", "DOB")}
                />
              </div>
              <div className="single_form two_input">
                <label htmlFor>Weight</label>
                <input
                  className="my-2"
                  type="text"
                  value={pedigreeDetails.fratMother.weight}
                  onChange={(e) =>
                    handlePedigreeChange(e, "fratMother", "weight")
                  }
                />
              </div> */}
              <div className="single_form file_upload">
                <label className="label" htmlFor="input">
                  Please upload a picture !
                </label>
                <div className="input">
                  <input
                    name="input"
                    id="file2"
                    type="file"
                    onChange={(e) => handleFileChange(e, "fratMother", "image")}
                  />
                </div>
                {pedigreeDetails.fratMother &&
                  pedigreeDetails.fratMother.image && (
                    <img
                      className="my-2"
                      src={pedigreeDetails.fratMother.image}
                      style={{
                        width: "10rem",
                        height: "10rem",
                        objectFit: "cover",
                      }}
                    ></img>
                  )}
              </div>
            </div>
            <h3 className="f_head mt-5" style={{ fontWeight: 600 }}>
              Mother's Parents
            </h3>
            <div className="form_wrap">
              <div className="single_form col-50">
                <div className="single_form two_input">
                  <label htmlFor>Father's Name</label>
                  <input
                    className="my-2"
                    type="text"
                    name="matFatherName"
                    value={pedigreeDetails.matFather.name}
                    onChange={(e) =>
                      handlePedigreeChange(e, "matFather", "name")
                    }
                  />
                </div>

                <label htmlFor>Father's Breed</label>
                <select
                  className="my-2"
                  type="text"
                  name="matFatherBreed"
                  value={pedigreeDetails.matFather.breed}
                  onChange={(e) =>
                    handlePedigreeChange(e, "matFather", "breed")
                  }
                >
                  <option value="">Select Breed</option>
                  {breeds?.map((breed) => {
                    return (
                      <option value={breed.name} key={breed._id}>
                        {breed.name}
                      </option>
                    );
                  })}
                </select>
                {/* <input
                  className="my-2"
                  type="text"
                  name="matFatherBreed"
                  value={pedigreeDetails.matFather.breed}
                  onChange={(e) =>
                    handlePedigreeChange(e, "matFather", "breed")
                  }
                /> */}
              </div>
              {/* <input
                style={{
                  width: "100%",
                  height: "40px",
                  border: "none",
                  outline: "0",
                  borderRadius: "5px",
                  border: "1px solid #cbced4",
                  gap: "20px",
                  boxSizing: "border-box",
                  padding: "0px 10px",
                  boxShadow: "0 5px 15px rgba(0, 0, 0, 0.15) !important",
                }}
                className="my-2"
                type="date"
                name="matFatherDOB"
                value={pedigreeDetails.matFather.DOB}
                onChange={(e) => handlePedigreeChange(e, "matFather", "DOB")}
              />
              <div className="single_form two_input">
                <label htmlFor>Weight</label>
                <input
                  className="my-2"
                  type="text"
                  value={pedigreeDetails.matFather.weight}
                  onChange={(e) =>
                    handlePedigreeChange(e, "matFather", "weight")
                  }
                />
              </div> */}
              <div className="single_form file_upload">
                <label className="label" htmlFor="input">
                  Please upload a picture !
                </label>
                <div className="input">
                  <input
                    name="input"
                    id="file3"
                    type="file"
                    onChange={(e) => handleFileChange(e, "matFather", "image")}
                  />
                </div>
                {pedigreeDetails.matFather &&
                  pedigreeDetails.matFather.image && (
                    <img
                      className="my-2"
                      src={pedigreeDetails.matFather.image}
                      style={{
                        width: "10rem",
                        height: "10rem",
                        objectFit: "cover",
                      }}
                    ></img>
                  )}
              </div>

              <div className="single_form col-50 mt-5">
                <div className="single_form two_input">
                  <label htmlFor>Mother's Name</label>
                  <input
                    className="my-2"
                    type="text"
                    name="matMotherName"
                    value={pedigreeDetails.matMother.name}
                    onChange={(e) =>
                      handlePedigreeChange(e, "matMother", "name")
                    }
                  />
                </div>

                <label htmlFor>Mother's Breed</label>
                <select
                  className="my-2"
                  type="text"
                  value={pedigreeDetails.matMother.breed}
                  onChange={(e) =>
                    handlePedigreeChange(e, "matMother", "breed")
                  }
                >
                  <option value="">Select Breed</option>
                  {breeds?.map((breed) => {
                    return (
                      <option value={breed.name} key={breed._id}>
                        {breed.name}
                      </option>
                    );
                  })}
                </select>
                {/* <input
                  className="my-2"
                  type="text"
                  value={pedigreeDetails.matMother.breed}
                  onChange={(e) =>
                    handlePedigreeChange(e, "matMother", "breed")
                  }
                /> */}
              </div>
              {/* <input
                style={{
                  width: "100%",
                  height: "40px",
                  border: "none",
                  outline: "0",
                  borderRadius: "5px",
                  border: "1px solid #cbced4",
                  gap: "20px",
                  boxSizing: "border-box",
                  padding: "0px 10px",
                  boxShadow: "0 5px 15px rgba(0, 0, 0, 0.15) !important",
                }}
                className="my-2"
                type="date"
                value={pedigreeDetails.matMother.DOB}
                onChange={(e) => handlePedigreeChange(e, "matMother", "DOB")}
              />
              <div className="single_form two_input">
                <label htmlFor>Weight</label>
                <input
                  className="my-2"
                  type="text"
                  value={pedigreeDetails.matMother.weight}
                  onChange={(e) =>
                    handlePedigreeChange(e, "matMother", "weight")
                  }
                />
              </div> */}
              <div className="single_form file_upload">
                <label className="label" htmlFor="input">
                  Please upload a picture !
                </label>
                <div className="input">
                  <input
                    name="input"
                    id="file3"
                    type="file"
                    onChange={(e) => handleFileChange(e, "matMother", "image")}
                  />
                </div>
                {pedigreeDetails.matMother &&
                  pedigreeDetails.matMother.image && (
                    <img
                      className="my-2"
                      src={pedigreeDetails.matMother.image}
                      style={{
                        width: "10rem",
                        height: "10rem",
                        objectFit: "cover",
                      }}
                    ></img>
                  )}
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <button
                type="submit"
                style={{
                  borderRadius: "5px",
                  background: "#3e2121",
                  border: "0px solid",
                  color: "#fff",
                  padding: "12px 45px",
                  fontSize: "18px",
                  marginTop: "5rem",
                }}
              >
                Add Details
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer2 />
    </>
  );
}

export default Pedigree;
