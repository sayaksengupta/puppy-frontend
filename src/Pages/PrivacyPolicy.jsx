import React from "react";
import { useState } from "react";
import Footer from "../Components/Footer";
import Footer2 from "../Components/Footer2";
import Navbar from "../Components/Navbar";
import SideNav from "../Components/SideNav";
import "../css/banner.css";

function PrivacyPolicy() {
  const [openSideNav, setOpenSideNav] = useState(false);
  return (
    <>
      <Navbar setOpenSideNav={setOpenSideNav} openSideNav={openSideNav} />

      {openSideNav && <SideNav />}

      <div>
        <section className="container mt-4">
          <h1 className="text-center">
            <b>Privacy Policy</b>{" "}
          </h1>
          <p className="text-center">
            <b>
              {" "}
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
              facilis dignissimos eaque ad perferendis officiis magni culpa iste
              provident maiores molestias, delectus fugit. Quasi dolor eius
              repellendus, mollitia voluptatibus voluptas.
            </b>
          </p>
        </section>
        <section className="our-team">
          <h1 className="text-center  mt-5 mb-5">
            <b>Our Team</b>{" "}
          </h1>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-5 home-about-left">
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{
                    border: "4px solid black",
                    padding: "25px",
                    borderRadius: "20px",
                  }}
                >
                  <img
                    style={{ boxShadow: "0 5px 15px rgba(0, 0, 0, 0.15)" }}
                    className="img-fluid rounded"
                    src="images/person_1.jpg"
                    alt=""
                  />
                </div>
              </div>
              <div className="col-lg-7 home-about-right">
                <h1 style={{ margin: 0, lineHeight: "normal" }}>
                  {" "}
                  <b>Mark</b>{" "}
                </h1>
                <h1 style={{ margin: 0, lineHeight: "normal" }}>
                  Founder &amp; CEO
                </h1>
                <p className="mt-3">
                  <b>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Culpa vero molestiae nihil? Aut perferendis voluptatum, enim
                    tempore inventore, magni provident totam perspiciatis
                    tenetur accusamus, dolor ab quasi quam architecto et! Quidem
                    autem nam magnam quasi, vitae esse, error quo cum possimus
                    consequuntur, iure officia aperiam fugiat sed fuga. Quae
                    reprehenderit, possimus cumque fuga expedita earum tenetur
                    perferendis maiores provident sed. Quia eum quam, in commodi
                    atque, ut error, nesciunt culpa sunt sapiente laboriosam
                    iure adipisci! Molestiae quisquam cupiditate, similique
                    corporis deleniti temporibus obcaecati et officia maiores
                    doloribus fuga sed. Aperiam. Veniam aperiam quibusdam
                    possimus. Animi, autem minima earum accusantium obcaecati
                    error sapiente itaque numquam temporibus possimus non illo
                    quam tempore quo delectus vitae aliquid recusandae provident
                    unde quisquam. Iste, maxime.
                  </b>
                </p>
              </div>
            </div>
            <div className="row align-items-center mt-5 flex-row-reverse">
              <div className="col-lg-5 home-about-left">
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{
                    border: "4px solid black",
                    padding: "25px",
                    borderRadius: "20px",
                  }}
                >
                  <img
                    style={{ boxShadow: "0 5px 15px rgba(0, 0, 0, 0.15)" }}
                    className="img-fluid rounded"
                    src="images/person_1.jpg"
                    alt=""
                  />
                </div>
              </div>
              <div className="col-lg-7 home-about-right">
                <h1
                  style={{
                    margin: 0,
                    lineHeight: "normal",
                    textAlign: "right",
                  }}
                >
                  <b>Mark</b>{" "}
                </h1>
                <h1
                  style={{
                    margin: 0,
                    lineHeight: "normal",
                    textAlign: "right",
                  }}
                >
                  Founder &amp; CEO
                </h1>
                <p className="mt-3">
                  <b>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Culpa vero molestiae nihil? Aut perferendis voluptatum, enim
                    tempore inventore, magni provident totam perspiciatis
                    tenetur accusamus, dolor ab quasi quam architecto et! Quidem
                    autem nam magnam quasi, vitae esse, error quo cum possimus
                    consequuntur, iure officia aperiam fugiat sed fuga. Quae
                    reprehenderit, possimus cumque fuga expedita earum tenetur
                    perferendis maiores provident sed. Quia eum quam, in commodi
                    atque, ut error, nesciunt culpa sunt sapiente laboriosam
                    iure adipisci! Molestiae quisquam cupiditate, similique
                    corporis deleniti temporibus obcaecati et officia maiores
                    doloribus fuga sed. Aperiam. Veniam aperiam quibusdam
                    possimus. Animi, autem minima earum accusantium obcaecati
                    error sapiente itaque numquam temporibus possimus non illo
                    quam tempore quo delectus vitae aliquid recusandae provident
                    unde quisquam. Iste, maxime.
                  </b>
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="our-achievements mt-5">
          <h1 className="text-center">
            <b>Our Achievements</b>
          </h1>
          <div className="container mt-4">
            <div
              className="row align-items-center"
              style={{ margin: "0 !important" }}
            >
              <div
                className="card mb-3 "
                style={{
                  borderRadius: "20px !important",
                  boxShadow: "0 5px 15px rgba(0, 0, 0, 0.15)",
                  border: "none !important",
                }}
              >
                <div className="row g-0 flex-row-reverse">
                  <div className="col-lg-5">
                    <div className=" p-4">
                      <img
                        style={{
                          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.15)",
                          borderRadius: "20px !important",
                        }}
                        src="images/about-3.jpg"
                        className="img-fluid"
                        alt="..."
                      />
                    </div>
                  </div>
                  <div className="col-lg-7">
                    <div className="card-body">
                      <div className="p-3">
                        <h2 className="card-title">
                          <b>
                            Successfully Breed and Sell 1000 Purebred dogs to
                            loving homes.
                          </b>{" "}
                        </h2>
                        <hr style={{ borderTop: "3px solid #3d2121" }} />
                      </div>
                      <p className="card-text p-2">
                        <b>
                          Lorem, ipsum dolor sit amet consectetur adipisicing
                          elit. Laborum rem veniam autem illo dolore in magni
                          fuga, unde, accusamus voluptates placeat. Eum ullam
                          inventore natus a asperiores, possimus debitis.
                          Doloribus! Quidem neque corporis asperiores, mollitia
                          deleniti, aut voluptatibus molestiae dolore enim
                          quisquam officia tempore magni, cum harum omnis.
                          Nesciunt officia similique cum sapiente repellat dicta
                          omnis ad numquam ducimus eaque?
                        </b>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="our-achievements mt-4">
          <h1 className="text-center">
            <b>Certifications</b>
          </h1>
          <div className="container mt-4">
            <div
              className="row align-items-center"
              style={{ margin: "0 !important" }}
            >
              <div
                className="card mb-3 "
                style={{
                  borderRadius: "20px !important",
                  boxShadow: "0 5px 15px rgba(0, 0, 0, 0.15)",
                  border: "none !important",
                  width: "100%",
                  height: "100vh",
                }}
              >
                <div className="row g-0 flex-row-reverse">
                  <div className="col-lg-5"></div>
                  <div className="col-lg-7">
                    <div className="card-body"></div>
                  </div>
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

export default PrivacyPolicy;
