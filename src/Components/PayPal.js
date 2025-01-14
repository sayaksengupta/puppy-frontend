import React, { useRef, useEffect } from "react";

export default function PayPal(props) {
  const paypal = useRef();

  console.log(props);
  useEffect(() => {
    const createAndRenderPaypalButton = () => {
      window.paypal
        .Buttons({
          createOrder: (data, actions, err) => {
            return actions.order.create({
              intent: "CAPTURE",
              purchase_units: [props.order],
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            console.log(order);
            props.setTxnId(order.id);
          },
          onError: (err) => {
            console.log(err);
          },
        })
        .render(paypal.current);
    };

    createAndRenderPaypalButton(); // Call the function to create and render PayPal button

    // Optionally return a cleanup function if needed
    return () => {
      // Remove the PayPal button only if it exists in the DOM
      if (paypal.current) {
        paypal.current.innerHTML = "";
      }
    };
  }, []); // Empty dependency array means this effect runs only once after initial render

  return <div style={props["style"]} ref={paypal}></div>;
}
