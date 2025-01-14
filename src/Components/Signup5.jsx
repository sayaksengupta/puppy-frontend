import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import "../css/signup-5-style.css";
import PayPal from "./PayPal";

function Signup5({ Dogdata }) {
  const [amount, setAmount] = useState(0);
  const [txnId, setTxnId] = useState("");

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

  useEffect(() => {
    getSettings();
  }, []);

  return (
    <>
      <div className="right-side">
        <div id="signup-4" />
        <div
          className="main active "
          id="signup-tab-4"
          style={{ padding: "163px 49px 0px 25px" }}
        >
          <div className="container mb-4">
            <h5>
              <b> What to do next ?</b>
            </h5>
            <div className="form-group form-check button-check" id="st-check">
              <label className="d-flex">
                <input
                  type="radio"
                  className="form-check ml-0 form-check-input"
                  id="checkbox"
                  checked={true}
                />
                <div
                  className="mt-1"
                  style={{ color: "#000", marginLeft: "40px" }}
                >
                  Publish Your Ad
                </div>
                <div
                  className="ml-5 text-success font-weight-bold"
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "10px",
                  }}
                >
                  $45
                </div>
              </label>
            </div>
            <div className="row">
              <style
                dangerouslySetInnerHTML={{
                  __html:
                    "\n                                    @media only screen and (max-width: 575px) {\n\n                                        .pay-now {\n                                            margin-bottom: -20px;\n                                        }\n                                    }\n                                ",
                }}
              />
              <h5 className="mt-4 mb-2">
                <b> Select Payment Method</b>
              </h5>
              <div className="col-sm-8 pay-now">
                <div
                  className="form-group"
                  // style={{ height: "8.25rem", overflow: "hidden" }}
                  id="sub-options"
                >
                  {!txnId && amount && (
                    <PayPal
                      order={{
                        description: "List a Puppy",
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

                        handleApprove(data.orderID);
                      }}
                      onError={(err) => {
                        // setError(err);
                        console.error("PayPal Checkout onError", err);
                      }}
                    ></PayPalButtons>
                  </PayPalScriptProvider> */}
                  {/* <label className="button-check w-100 d-flex">
                    <input
                      type="radio"
                      name="gender"
                      id="sub-select1"
                      disabled
                    />
                    <div className="ml-2" style={{ color: "#000" }}>
                      Paypal
                    </div>
                  </label> */}
                  {/* <label className="button-check w-100 d-flex">
                    <input
                      type="radio"
                      name="gender"
                      id="sub-select2"
                      disabled
                    />
                    <div className="ml-2" style={{ color: "#000" }}>
                      Credit Or Debit Card
                    </div>
                  </label> */}

                  {/* <div className="col-sm-4">
                {/* <a href="#" className="btn btn-dark mb-3">
                  PAY NOW
                </a> 

              </div> */}
                </div>
              </div>
            </div>
          </div>
          <div
            className="d-flex align-items-center justify-content-around"
            id="btnDiv2"
            style={{
              marginRight: "-50px",
              marginLeft: "-70px",
              marginBottom: "0px",
              backgroundColor: "rgba(231, 231, 231, 255)",
              padding: "10px",
              borderRadius: "0px 0px 21px",
            }}
          >
            <a
              href="signup-4.html"
              className="back_button btn btn-primary"
              style={{
                width: "atuo",
                backgroundColor: "rgba(113,113,113,255)",
                border: "none",
                color: "#fff",
              }}
            >
              Back
            </a>
            <button
              type="submit"
              className="btn btn-primary next_button"
              style={{ width: "auto", color: "#fff" }}
              disabled={txnId ? true : true}
            >
              Publish
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup5;
