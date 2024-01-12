import { usePaymentIntentMutation } from "@/redux/api/paymentApi";
import { setClientSecret } from "@/redux/features/payment/paymentSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { CardElement, useStripe } from "@stripe/react-stripe-js";
import { Button } from "antd";
import { useEffect } from "react";

const CheckoutForm = (price: { price: number }) => {
  const dispatch = useAppDispatch();
  const [paymentIntent] = usePaymentIntentMutation();
  const { clientSecret, stripeCardError } = useAppSelector(
    (state) => state.payment
  );

  const stripe = useStripe();

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        if (!clientSecret || clientSecret === "") {
          const response = await paymentIntent(price);
          dispatch(setClientSecret(response?.data));
        }
      } catch (error) {
        console.error(error);
      }
    };

    createPaymentIntent();
  }, [price, paymentIntent, dispatch, clientSecret]);

  return (
    <div>
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
        disabled={!stripe || !clientSecret}
      >
        Pay
      </Button>
      {stripeCardError && <p style={{ color: "red" }}>{stripeCardError}</p>}
    </div>
  );
};

export default CheckoutForm;
