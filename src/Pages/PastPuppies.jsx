import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import Navbar from "../Components/Navbar";
import SideNav from "../Components/SideNav";
import Footer2 from "../Components/Footer2";

function PastPuppies() {
  const token = localStorage.getItem("token");

  const [pastPuppies, setPastPuppies] = useState([]);
  const [callApi, setCallApi] = useState(false);
  const [image, setImage] = useState("");
  const [openSideNav, setOpenSideNav] = useState(false);
  const [description, setDescription] = useState("");
  const inputRef = useRef(null);

  const getPastPuppies = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}user/get-past-puppies`,
        {
          headers: { token },
        }
      );
      setPastPuppies(response.data.pastPuppies);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadFileHandler = async () => {
    try {
      if (
        inputRef.current &&
        inputRef.current.files &&
        inputRef.current.files.length > 0
      ) {
        const file = inputRef.current.files[0];
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}upload`,
          formData
        );
        setImage(response.data.fileUrl);
      } else {
        console.error("No file selected");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const addPastPuppy = async (e) => {
    e.preventDefault();
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}user/add-past-puppy`,
        { image: image, description },
        {
          headers: { token },
        }
      )
      .then((res) => {
        console.log(res.data);
        setAddModalShow(false);
        setCallApi(!callApi);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getPastPuppies();
  }, [callApi]);

  const handleAddPastPuppyClick = () => {
    openAddPastPuppyModal();
  };

  const openAddPastPuppyModal = () => {
    setAddModalShow(true);
  };

  const closeAddPastPuppyModal = () => {
    setAddModalShow(false);
  };

  const [addModalShow, setAddModalShow] = useState(false);

  return (
    <>
      <Navbar setOpenSideNav={setOpenSideNav} openSideNav={openSideNav} />

      {openSideNav && <SideNav />}
      <div className="dogs_images_past">
        <div className="wrapper" style={{ position: "relative" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <h2 style={{ fontWeight: "bold" }}>Past Puppies</h2>
            <button
              style={{ position: "absolute", right: 0 }}
              className="btn btn-primary"
              onClick={handleAddPastPuppyClick}
            >
              Add Past Puppy
            </button>
          </div>

          <Modal
            centered={true}
            show={addModalShow}
            onHide={closeAddPastPuppyModal}
          >
            <Modal.Header closeButton>
              <Modal.Title>Add Past Puppy</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {!image && (
                <>
                  <input
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    ref={inputRef}
                    required
                    onChange={uploadFileHandler}
                  />
                  <br />
                  <br />
                </>
              )}

              {image && (
                <>
                  <img
                    style={{
                      width: "10rem",
                      height: "10rem",
                      objectFit: "cover",
                      borderRadius: "6px",
                    }}
                    src={image}
                  ></img>
                  <br />
                  <br />
                </>
              )}

              <textarea
                style={{
                  width: "100%",
                  height: "5rem",
                  borderRadius: "6px",
                  padding: "1rem",
                }}
                placeholder="Enter description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={addPastPuppy} type="submit">
                Submit
              </Button>
            </Modal.Footer>
          </Modal>

          <div className="dogs_wrap">
            {pastPuppies && pastPuppies.length > 0 ? (
              pastPuppies.map((puppy) => {
                return (
                  <div className="dog-col" key={puppy._id}>
                    <div className="single_dog">
                      <img
                        src={puppy.image}
                        alt=""
                        style={{
                          borderRadius: "6px",
                          width: "15rem",
                          height: "15rem",
                          objectFit: "cover",
                        }}
                      />
                      <p
                        style={{
                          textAlign: "center",
                          fontSize: "1.35rem",
                          color: "#3d2121",
                          fontWeight: "bold",
                          margin: "0.25rem",
                        }}
                      >
                        {puppy.description}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div style={{ textAlign: "center", width: "100%" }}>
                <h2 style={{ margin: "5rem" }}>No Past Puppies :(</h2>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer2 />
    </>
  );
}

export default PastPuppies;
