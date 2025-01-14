import React from "react";

function DogType() {
  return (
    <>
      <div className="container d-flex align-items-center justify-content-center min-vh-100">
        <div className="card mt-4 main-card;">
          <div className="form">
            <div className="left-side" style={{ minWidth: "35%" }}>
              <div id="content-head-mobile">
                <div>
                  <p>Breader Signup</p>
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
              <ul className="progress-bar">
                <li className=" text-left text-white">
                  <p className="left-word">Breeder Signup</p>
                </li>
                <li className="active text-left text-white">
                  <p className="left-word">Select dog type</p>
                </li>
                <li className="text-left text-white">
                  <p className="left-word">Pet Details</p>
                </li>
                <li className="text-left text-white">
                  <p className="left-word">Confirm</p>
                </li>
                <li className="text-left text-white">
                  <p className="left-word"> Pay &amp; Publish</p>
                </li>
              </ul>
            </div>
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
                  <ul className="dog-type">
                    <li>
                      <input type="checkbox" id="cb1" />
                      <label id="labelSelect" htmlFor="cb1">
                        <img className="card-img-top" src="images/diti.png" />
                        <p className="card-title text-center">
                          german shepherd
                        </p>
                      </label>
                    </li>
                    <li>
                      <input type="checkbox" id="cb2" />
                      <label id="labelSelect" htmlFor="cb2">
                        <img className="card-img-top" src="images/diti.png" />
                        <p className="card-title text-center">
                          german shepherd
                        </p>
                      </label>
                    </li>
                    <li>
                      <input type="checkbox" id="cb3" />
                      <label id="labelSelect" htmlFor="cb3">
                        <img className="card-img-top" src="images/diti.png" />
                        <p className="card-title text-center">
                          german shepherd
                        </p>
                      </label>
                    </li>
                    <li>
                      <input type="checkbox" id="cb4" />
                      <label id="labelSelect" htmlFor="cb4">
                        <img className="card-img-top" src="images/diti.png" />
                        <p className="card-title text-center">
                          german shepherd
                        </p>
                      </label>
                    </li>
                    <li>
                      <input type="checkbox" id="cb5" />
                      <label id="labelSelect" htmlFor="cb5">
                        <img className="card-img-top" src="images/diti.png" />
                        <p className="card-title text-center">
                          german shepherd
                        </p>
                      </label>
                    </li>
                    <li>
                      <input type="checkbox" id="cb6" />
                      <label id="labelSelect" htmlFor="cb6">
                        <img className="card-img-top" src="images/diti.png" />
                        <p className="card-title text-center">
                          german shepherd
                        </p>
                      </label>
                    </li>
                    <li>
                      <input type="checkbox" id="cb7" />
                      <label id="labelSelect" htmlFor="cb7">
                        <img className="card-img-top" src="images/diti.png" />
                        <p className="card-title text-center">
                          german shepherd
                        </p>
                      </label>
                    </li>
                    <li>
                      <input type="checkbox" id="cb8" />
                      <label id="labelSelect" htmlFor="cb8">
                        <img className="card-img-top" src="images/diti.png" />
                        <p className="card-title text-center">
                          german shepherd
                        </p>
                      </label>
                    </li>
                    <li>
                      <input type="checkbox" id="cb9" />
                      <label id="labelSelect" htmlFor="cb9">
                        <img className="card-img-top" src="images/diti.png" />
                        <p className="card-title text-center">
                          german shepherd
                        </p>
                      </label>
                    </li>
                    <li>
                      <input type="checkbox" id="cb10" />
                      <label id="labelSelect" htmlFor="cb10">
                        <img className="card-img-top" src="images/diti.png" />
                        <p className="card-title text-center">
                          german shepherd
                        </p>
                      </label>
                    </li>
                    <li>
                      <input type="checkbox" id="cb11" />
                      <label id="labelSelect" htmlFor="cb11">
                        <img className="card-img-top" src="images/diti.png" />
                        <p className="card-title text-center">
                          german shepherd
                        </p>
                      </label>
                    </li>
                    <li>
                      <input type="checkbox" id="cb12" />
                      <label id="labelSelect" htmlFor="cb12">
                        <img className="card-img-top" src="images/diti.png" />
                        <p className="card-title text-center">
                          german shepherd
                        </p>
                      </label>
                    </li>
                    <li>
                      <input type="checkbox" id="cb13" />
                      <label id="labelSelect" htmlFor="cb13">
                        <img className="card-img-top" src="images/diti.png" />
                        <p className="card-title text-center">
                          german shepherd
                        </p>
                      </label>
                    </li>
                  </ul>
                </div>
                <div
                  className="btnDiv d-flex align-items-center justify-content-around"
                  id="btnDiv1"
                >
                  <a
                    className="back_button btn btn-primary"
                    href="signup-1.html"
                  >
                    Back
                  </a>
                  <a
                    type="submit"
                    href="signup-3.html"
                    className="btn btn-primary next_button"
                  >
                    Next
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DogType;
