// frontend/src/pages/PaymentExecution.js
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const PaymentExecution = ({ addMember }) => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const paymentId = searchParams.get('paymentId');
    const payerId = searchParams.get('PayerID');

    axios.post(`${process.env.REACT_APP_API_URL}/payment/execute`, {
      payment_id: paymentId,
      payer_id: payerId
    }).then(response => {
      // Ici, vous pouvez ajouter le membre après le paiement réussi
      const member = JSON.parse(localStorage.getItem('member'));
      axios.post(`${process.env.REACT_APP_API_URL}/members/`, member)
        .then(response => {
          addMember(response.data);
          localStorage.removeItem('member');
          window.location.href = '/';
        }).catch(error => {
          console.error('There was an error adding the member!', error);
        });
    }).catch(error => {
      console.error('There was an error executing the payment!', error);
    });
  }, [searchParams, addMember]);

  return (
    <div>
      <h1>Processing payment...</h1>
    </div>
  );
};

export default PaymentExecution;
