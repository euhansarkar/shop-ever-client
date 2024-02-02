"use client";
import BillingAddrss from "@/components/checkout/BillingAddrss";
import CartItem from "@/components/checkout/CartItem";
import PaymentMethod from "@/components/checkout/PaymentMethod";
import ShippingAddrss from "@/components/checkout/ShippingAddrss";
import ShippingMethod from "@/components/checkout/ShippingMethod";
import StepperForm from "@/components/stepper/FormStepper";
import SEBreadCrumb from "@/components/ui/SEBreadCrumb";
import { CHECKOUT_STEPPER_PERSIST_KEY } from "@/constants/storageKey";
import { resetCheckoutData } from "@/redux/features/checkout/checkoutSlice";
import { setStripeCardError } from "@/redux/features/payment/paymentSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Col, Row, message } from "antd";
import { redirect, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useAddOrderMutation } from "@/redux/api/orderApi";

const CheckOutPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [addOrder] = useAddOrderMutation();
  const { products } = useAppSelector((state) => state.cart);
  const stepData = useAppSelector((state) => state.checkout);
  const stripe = useStripe();
  const elements = useElements();
  const { clientSecret } = useAppSelector((state) => state.payment);

  const handleOrderSubmit = async (values: any) => {
    // const data = JSON.parse(getFromLocalStorage(CHECKOUT_STEPPER_PERSIST_KEY) as string);

    // console.log(`this is data submitttted`, data);

    // console.log(`this is valuuuuues`, values);

    if (values?.paymentMethod?.name === "card") {
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

      const { paymentIntent, error: confirmError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card,
            billing_details: {
              name: "Jenny Rosen",
            },
          },
        });

      if (confirmError) {
        setStripeCardError(confirmError?.message!);
        return;
      }

      // if (paymentIntent.status === "succeeded") {
      //   setSuccess("");
      // }

      console.log(`payment intent`, paymentIntent);
    }

    dispatch(resetCheckoutData());
    localStorage.removeItem(CHECKOUT_STEPPER_PERSIST_KEY);

    try {
      console.log(`pre add`, values);
      const res = await addOrder(values).unwrap();
      if (!!res?.id) {
        console.log(`this is order response`, res);
        message.success("Order created successfully!");
        router.push(`/checkout/success/${res?.id}`);
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  if (products?.length > 0) {
    return (
      <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
        <Col span={12} style={{ margin: "10px 0" }}>
          <div>
            <SEBreadCrumb
              items={[
                {
                  label: `Home`,
                  link: `/home`,
                },
                {
                  label: `Checkout`,
                  link: `/checkout`,
                },
              ]}
            />
          </div>
        </Col>

        [
        {
            "product_id": "your_product_id_here",
            "a": 2,
            "ks": "skd"
            "varients": [
                {
                    "attribute_id": "85a9fc3d-9ddd-4f94-aa3b-d9a18c75ef91",
                    "attribute_name": "color",
                    "option_id": "449a2a1b-690d-478a-8f9b-cd2f3c7ad1fd",
                    "varient_id": "28720336-0240-4234-b0a6-5e95bfb0c897",
                    "option": { 
                      "k":"sd",
                      "f": 4,
                      "p": 2
                    }
                }
            ]
        },
        {
            "product_id": "your_product_id_here-2",
            "varients": [
                {
                    "attribute_id": "85a9fc3d-9ddsfd-4f94-aa3b-d9a18c75ef91",
                    "attribute_name": "size",
                    "option_id": "449a2a1b-690sfd-478sfa-8f9b-cd2f3c7ad1fd",
                    "varient_id": "28720336-0sf240-4234-b0a6-5e95bfb0c897"
                    "option": {
                      "a": 1,
                      "b": 2,
                      "c": 3
                    }
                }
            ]
        }
    ]

        {/* second col */}
        <Col span={12} style={{ margin: "10px 0" }}>
          <CartItem />
        </Col>
      </Row>
    );
  } else {
    return redirect(`/cart`);
  }
};

export default dynamic(() => Promise.resolve(CheckOutPage), { ssr: false });



