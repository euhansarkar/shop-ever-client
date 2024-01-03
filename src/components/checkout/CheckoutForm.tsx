import { usePaymentIntentMutation } from "@/redux/api/paymentApi";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Button } from "antd";
import { FormEvent, useEffect, useState } from "react";

const CheckoutForm = (price: { price: number }) => {
  const [paymentIntent] = usePaymentIntentMutation();
  const [stripeCardError, setStripeCardError] = useState<string>("");
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const response = await paymentIntent(price);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };

    createPaymentIntent();
  }, [price, paymentIntent]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    console.log(`hello world`);
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log(error);
      setStripeCardError(error?.message!);
    } else {
      setStripeCardError("");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <Button
          style={{ margin: "10px 0 0 0" }}
          type="primary"
          htmlType="submit"
          disabled={!stripe}
        >
          Pay
        </Button>
      </form>
      {stripeCardError && <p style={{ color: "red" }}>{stripeCardError}</p>}
    </div>
  );
};

export default CheckoutForm;
