import React from 'react';
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import axios from 'axios';

const PayPalButton = () => {
    return (
        <PayPalScriptProvider options={{ "client-id": "your-client-id-here" }}>
            <PayPalButtons
                createOrder={(data, actions) => {
                    return axios.post('http://127.0.0.1:8000/create-payment')
                        .then(res => res.data.paymentID)
                        .catch(err => console.error(err));
                }}
                onApprove={(data, actions) => {
                    return axios.post('http://127.0.0.1:8000/execute-payment', {
                        paymentID: data.orderID,
                        payerID: data.payerID
                    })
                    .then(res => {
                        console.log("Payment successful", res.data);
                    })
                    .catch(err => console.error(err));
                }}
            />
        </PayPalScriptProvider>
    );
};

export default PayPalButton;
