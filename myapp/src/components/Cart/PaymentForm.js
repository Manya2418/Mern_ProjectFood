import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

import axios from 'axios';



const stripePromise = loadStripe("pk_test_51NmBxVSJm0EOvE96jDAKUOsep6pg3OfXGtTguyJdXCt0FFxOL8Ipho1HzbWtDVTUin5wJyEFX8jYwcmCrcHTx0gh00spEecMx7");

const PaymentForm = ({ totalPrice }) => {
    const [error, setError] = useState(null);
    const stripe=useStripe();
    const element=useElements();

    const handlePayment = async () => {
        try {
            const response = await axios.post('http://localhost:5000/payment/create-payment-intent', {
                amount: totalPrice * 100,
            });

            const clientSecret = response.data.clientSecret;

            const stripe = await stripePromise;
            const { error } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: stripe.elements.getElement('card'),
                    billing_details: {
                        name: 'Test User', 
                    },
                },
            });

            if (error) {
                setError(`Payment failed: ${error.message}`);
            } else {
                setError(null);
                alert('Payment successful!');
                   }
        } catch (error) {
            console.error('Error processing payment:', error.message);
            setError('Error processing payment. Please try again.');
        }
    };

    return (
        <div>
            <form onSubmit={handlePayment}>
                <div id="card-element">
                <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
                </div>
                <button type="submit" disabled={!stripe}>Pay Now</button>
            </form>
            {error && <div>{error}</div>}
        </div>
    );
};

export default PaymentForm;
