import React from "react";
import { useState } from "react";
import Footer from "../Components/Footer";
import Footer2 from "../Components/Footer2";
import Navbar from "../Components/Navbar";
import SideNav from "../Components/SideNav";
import "../css/breed-matchmaker.css";

function BreedMatchmaker() {
  const [openSideNav, setOpenSideNav] = useState(false);
  return (
    <>
      <Navbar setOpenSideNav={setOpenSideNav} openSideNav={openSideNav} />

      {openSideNav && <SideNav />}

      <div class="mt-3 breed-matcher-banner"></div>
      <section>
        <h1
          className="text-center mt-4 breed-matcher"
          style={{ color: "#3d2121", fontWeight: 600 }}
        >
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
              <button
                className="button"
                type="button"
                style={{ cursor: "pointer" }}
                data-submit="...Submitting"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer2 />
    </>
  );
}

export default BreedMatchmaker;
