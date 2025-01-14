import React, { useState } from "react";
import '../css/animate.css';
import '../css/magnific-popup.css';
// import '../css/owl.carousel.min.css';
import '../css/owl.theme.default.min.css';
import '../css/bootstrap-datepicker.css';


function Banner() {
  return (
    <>
      <div
        className="hero-wrap js-fullheight"
        style={{
          backgroundImage: 'url("/images/banner.png")',
          height: 580,
          display: "flex",
          alignItems: "center",
          backgroundPosition: "100% 100%",
        }}
      >
        <div className="container">
          <div
            className="row no-gutters search-form slider-text js-fullheight align-items-center justify-content-center"
            data-scrollax-parent="true"
          >
            <div className="col-md-12 ftco-animate text-center">
              <div className="container">
                <div className="row">
                  <div className="col-md-3 d-flex align-self-stretch px-4 ftco-animate flex-column">
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
                      >
                        <option>Any</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-3 d-flex align-self-stretch px-4 ftco-animate flex-column">
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
                      >
                        <option>Any</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-3 d-flex align-self-stretch px-4 ftco-animate flex-column">
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
                      >
                        <option>Any</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-3 d-flex align-self-stretch px-4 ftco-animate flex-column">
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
                      >
                        <option>Any</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div
                    className="col-md-9 d-flex align-self-stretch px-4 ftco-animate"
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
                        min={100}
                        max={6000}
                        defaultValue={1}
                        step={100}
                      />
                      <input
                        type="range"
                        className="range-max"
                        min={100}
                        max={6000}
                        defaultValue={6000}
                        step={100}
                      />
                    </div>
                    <div className="d-flex justify-content-between price-input">
                      <div className="d-flex align-items-center ">
                        <label className="mt-2" htmlFor>
                          $
                        </label>
                        <input
                          style={{
                            backgroundColor: "transparent !important",
                            border: "none",
                          }}
                          type="number"
                          className="input-min"
                          defaultValue={100}
                        />
                      </div>
                      <div className="d-flex align-items-center justify-content-end">
                        <label className="mt-2" htmlFor>
                          $
                        </label>
                        <input
                          id="price6000"
                          type="number"
                          className="input-max input-filter"
                          defaultValue={6000}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 d-flex align-self-stretch px-4 ftco-animate flex-column">
                    <button
                      type="button"
                      className="btn btn-transparent mt-2 clear-btn"
                    >
                      Clear Filter
                    </button>
                    <button
                      type="button"
                      style={{ backgroundColor: "green" }}
                      className="btn btn-success mt-2"
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



      
    </>
  );
}

export default Banner;
