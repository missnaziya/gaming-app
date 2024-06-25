import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
    PaymentElement,
    Elements,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import Button from "./shared/button";
import axios from "axios";
import KonfehtiService from "../constants/konfehti-api";
import { CREATE_PAYMENT_INTENT } from "../constants/endpoints";
// const REACT_APP_URL = "https://app.giovoyage.com/webservices/1.1.2/index.php";
// const REACT_APP_PUBLISHABLE_kEY =
// "pk_live_51Mo2nYIzbD2AKNMWfO12S6aNbSEqUxANImfmAkbtH0TDxECi2SkcDsjzgvIokMeBt2KwGNciURdmNT7O0HcmbD6h00CMc6BEZn";
// const stripePromise = loadStripe(REACT_APP_PUBLISHABLE_kEY);

const CheckoutForm = ({ payAmount, setToggleStripePayment }) => {
    const stripe = useStripe();
    const elements = useElements();

    const [errorMessage, setErrorMessage] = useState(null);
    const [intentSecret, setIntentSecret] = useState("");

    useEffect(() => {
        const getIntent = async () => {
            try {
                const res = await KonfehtiService.post(
                    `${CREATE_PAYMENT_INTENT}?amount=${payAmount}`
                );
                console.log("Stripe Intent Res:", res);
                setIntentSecret(res?.data?.response);
            } catch (error) {
                console.error("Error:", error);
            }
        };
        getIntent();
    }, []);

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();

            if (elements == null) {
                return;
            }

            // Trigger form validation and wallet collection
            const { error: submitError } = await elements.submit();
            if (submitError) {
                // Show error to your customer
                setErrorMessage(submitError.message);
                return;
            }

            // Create the PaymentIntent and obtain clientSecret from your server endpoint
            // console.log("---clientSecret:", intentSecret);
            const clientSecret = intentSecret;

            const { error } = await stripe.confirmPayment({
                //`Elements` instance that was used to create the Payment Element
                elements,
                clientSecret,
                confirmParams: {
                    return_url: process.env.GATSBY_PAYMENT_REDIRECT_URI,
                },
            });

            if (error) {
                // This point will only be reached if there is an immediate error when
                // confirming the payment. Show error to your customer (for example, payment
                // details incomplete)
                setErrorMessage(error.message);
                localStorage.removeItem("isPaymentSuccess");
            } else {
                // Your customer will be redirected to your `return_url`. For some payment
                // methods like iDEAL, your customer will be redirected to an intermediate
                // site first to authorize the payment, then redirected to the `return_url`.
                localStorage.setItem("isPaymentSuccess", "success");
            }
        } catch (error) {
            console.error("Error:", error);
            localStorage.removeItem("isPaymentSuccess");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="mb-5 flex items-center flex-col"
        >
            <PaymentElement />
            <div className="flex flex-col md:flex-row items-center justify-between mt-8 w-full">
                <Button
                    type="submit"
                    disabled={!stripe}
                    shape="square2xl"
                    className="text-white btn-bg-image"
                >
                    PAY
                </Button>
                <Button
                    type="button"
                    shape="square2xl"
                    className="text-white btn-bg-image md:ml-4 mt-4 md:mt-0"
                    onClick={() => setToggleStripePayment(false)}
                >
                    CANCEL
                </Button>
            </div>
            {/* Show error message to your customers */}
            {errorMessage && <div>{errorMessage}</div>}
        </form>
    );
};

const StripePayment = ({ payAmount, setToggleStripePayment }) => {
    // console.log("GATSBY_STRIPE_PUBLISHABLE_KEY:", process.env.GATSBY_STRIPE_PUBLISHABLE_KEY);
    console.log("----payamount:", payAmount);

    const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY);

    const options = {
        mode: "payment",
        amount: payAmount * 100,
        currency: "inr",
        // Fully customizable with appearance API.
        appearance: {
            rules: {
                ".Label": {
                    color: "white",
                },
            },
        },
    };

    return (
        <Elements stripe={stripePromise} options={options}>
            <CheckoutForm
                payAmount={payAmount}
                setToggleStripePayment={setToggleStripePayment}
            />
        </Elements>
    );
};

export default StripePayment;
